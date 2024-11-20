import os
import psycopg2
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from flask_socketio import SocketIO, emit, join_room, leave_room
import base64
from UserTableInfo import add_user, get_user, update_user, get_user_preferences, get_user_with_email
from MatchTableInfo import add_inital_match, update_match_status_accepted, update_match_status_rejected
from messagetableinfo import add_message
from cryptography.fernet import Fernet
import jwt
from model_logic import fetch_mentors
from model_logic import model_route
from functools import wraps




from flask_cors import CORS



CREATE_USERS_TABLE = ("CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, firstname TEXT, lastname TEXT, email text, password text);")

load_dotenv()


app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})
socketio = SocketIO(app, cors_allowed_origins='*')


CORS(app, resources={r"/users/*": {"origins": "*"}},
     methods=["GET", "POST", "OPTIONS"],
     allow_headers=["Content-Type", "Authorization"])

dbname = os.getenv("DATABASE_NAME")
user = os.getenv("DATABASE_USER")
password = os.getenv("DATABASE_PASS")
port = os.getenv("DATABASE_PORT")
host = os.getenv("DATABASE_HOST")
encrypt_key = os.getenv("ENCRYPT_KEY")
token_key = os.getenv("TOKEN_KEY")

cipher_suite = Fernet(encrypt_key)

connection = psycopg2.connect(
    dbname=dbname, user=user, password=password, host=host, port=port
)

def jwttoken_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None

        if 'Authorization' in request.headers:
            token = request.headers['Authorization'].split(" ")[1]

        if not token:
            return jsonify({'message': 'Token is missing!'}), 401

        try:
            data = jwt.decode(token, token_key, algorithms=["HS256"])
            print("decoded data: ", data)
            request.user = data['username']
        except jwt.ExpiredSignatureError:
            return jsonify({'message': 'Token has expired!'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'message': 'Invalid token!'}), 401

        return f(*args, **kwargs)

    return decorated

def jwt_get_username():
    print("getting username")
    if 'Authorization' in request.headers:
        token = request.headers['Authorization'].split(" ")[1]
        try:
            data = jwt.decode(token, token_key, algorithms=["HS256"])
            print("decoded data: ", data)

            return data['username']
        except jwt.ExpiredSignatureError:
            print("Token has expired")
            return None
        except jwt.InvalidTokenError:
            print("Invalid token")
            return None
    print("No authorization header")
    return None

@app.get("/users/create_table")
def createUserTable():
    with connection:
        with connection.cursor() as cursor:
            cursor.execute(CREATE_USERS_TABLE)
    return {"Response": "Table Created Successfully"}, 201

@app.post("/users/add_user")
def addUser():
    data = request.get_json()
    firstname = data["firstname"]
    lastname = data["lastname"]
    username = data["username"]
    email = data["email"]
    role = data["role"]
    password = data["password"]

    encrypted_password = cipher_suite.encrypt(password.encode())

    newUser = add_user(firstname, lastname, username,  email, encrypted_password , role)
    if newUser == False:
        return {"Response": "User was not added successfully"}, 500
    return {"Response": "User was added successfully"}, 201

users = {}

# Handle user joining a unique room
@socketio.on('join_room')
def on_join(data):
    username = data['username']
    room = data['room']
    
    join_room(room)
    emit('chat', {'message': f'{username} has entered the room {room}.'}, room=room)
    print(f'{username} joined room: {room}')

# Handle user leaving the room
@socketio.on('leave_room')
def on_leave(data):
    username = data['username']
    room = data['room']
    
    leave_room(room)
    emit('chat', {'message': f'{username} has left the room {room}.'}, room=room)
    print(f'{username} left room: {room}')


@socketio.on("connect")
def handle_connect():
    print("Client connected!")

@socketio.on("user_join")
def handle_user_join(username):
    print(f"User {username} joined!")
    users[username] = request.sid

@socketio.on("new_message")
def handle_new_message(message):
    print(f"New message: {message}")
    username = None 
    for user in users:
        if users[user] == request.sid:
            username = user
    emit("chat", {"message": message['message'], "username": message['username']}, broadcast=True)
    add_message(message['username'], message['message'])

@app.post("/users/signin")
def signin():
    try:
        data = request.get_json()
        username = data['username']
        password = data['password']
        

        user = get_user(username, password)
        print("user info: ",user)
        role = user[6]
        print("user role: ", role)

        token = jwt.encode({"username": username}, token_key, algorithm="HS256")
        if user is None:
            return {"error": "Invalid username or password"}, 401

        return {"condition": "success", "token" : token, "user_data" : user}, 200

    except Exception as e:
        return {"error": str(e)}, 500

@app.route("/users/reset_password", methods=["GET"])
def reset_password():
    pass

@app.post("/users/getUser")
def find_user_with_email():
    data = request.get_json()
    user = None
    if data:
        email = data['email']
        user = get_user_with_email(email)
    if user:
        return {"Reponse": "User found", "User": user}
    return {"Response": "User not Found", "User": None}


@app.post("/users/updateprofile")
def add_interests_to_profile():
    data = request.get_json()
    email = data["email"]
    bio = data["bio"]
    jobtitle = data["jobTitle"]
    career_interest = data["careerInterest"]
    update = update_user(email, bio, jobtitle, career_interest)
    if update == False:
        return {"Response": "Profile was not updated successfully"}, 500
    user_preferences = get_user_with_email(email)
    return {"Response": "Profile was updated successfully", "UserPreferences": user_preferences}, 201

@app.post("/matches/addmatch")
def add_initial_match_request():
    data = request.get_json()
    menteeEmail = data["menteeEmail"]
    mentorEmail = data["mentorEmail"]
    success = add_inital_match(menteeEmail, mentorEmail)
    if success:
        return {"Response": "Request was made successfully"}
    else:
        return {"Response": "Request was not made successfully"}
    

@app.post("/matches/updatematch/statustoaccepted")
def update_match_status_to_accepted():
    data = request.get_json()
    menteeEmail = data["menteeEmail"]
    mentorEmail = data["mentorEmail"]
    success = update_match_status_accepted(menteeEmail, mentorEmail)
    if success:
        return {"Response": "Request was made successfully"}
    else:
        return {"Response": "Request was not made successfully"}
    
@app.post("/matches/updatematch/statustorejected")
def update_match_status_to_rejected():
    data = request.get_json()
    menteeEmail = data["menteeEmail"]
    mentorEmail = data["mentorEmail"]
    success = update_match_status_rejected(menteeEmail, mentorEmail)
    if success:
        return {"Response": "Request was made successfully"}
    else:
        return {"Response": "Request was not made successfully"}

@app.post("/users/fetchMentors")
@jwttoken_required
def fetch_mentors_from_model():
    print("request data: ", request)
    print("fetching mentors")
    username = request.user
    print("username: ", username)
    # fetch_mentors(career_interest)
    return jsonify({"Response": "Mentors fetched successfully"}), 200
#     #load the model to fetch relaated mentors 
#     return jsonify({"Response": "Mentors fetched successfully"}), 200

#     model = joblib.load('./model/model.joblib')
#     index = joblib.load('./model/index.joblib')



#     print("model loaded")


#     return jsonify({"Response": "Mentors fetched successfully"}), 200

app.register_blueprint(model_route)

if __name__ == "__main__":
    socketio.run(app, debug=True)
    
    app.run()
   
