import os
import psycopg2
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from flask_socketio import SocketIO, emit, join_room, leave_room
import base64
from UserTableInfo import add_user, get_user, update_user, get_user_preferences, get_user_with_email, get_mentees
from MatchTableInfo import add_inital_match, update_match_status_accepted, update_match_status_rejected, get_mentee_requests_from_database, get_mentors
from messagetableinfo import fetch_rooms, add_message_to_table
from cryptography.fernet import Fernet
import jwt
from model_logic import fetch_mentors
from model_logic import model_route



from flask_cors import CORS



CREATE_USERS_TABLE = ("CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, firstname TEXT, lastname TEXT, email text, password text);")

load_dotenv()


app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})
socketio = SocketIO(app, cors_allowed_origins='*')


CORS(app, resources={r"/users/*": {"origins": "*"}, r"/matches/*": {"origins": "*"}, r"/model/*": {"origins": "*"}, r"/messages/*": {"origins": "*"}},
     methods=["GET", "POST"],
     allow_headers=["Content-Type"])

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
    emit("chat", {"message": message['message'], "username": message['username1'], "roomID": message['room']}, broadcast=True)
    add_message_to_table(message['username'], message['message'], message['room'])

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
    try:
        success = add_inital_match(menteeEmail, mentorEmail)
        if success:
            return {"Response": "Request was made successfully"}
    except Exception as e:
        return {"error": str(e)}, 500
    

@app.post("/matches/updatematch/statustoaccepted")
def update_match_status_to_accepted():
    data = request.get_json()
    menteeEmail = data["menteeEmail"]
    mentorEmail = data["mentorEmail"]
    try:
        success = update_match_status_accepted(menteeEmail, mentorEmail)
        if success:
            return {"Response": "Request was made successfully"}
    except Exception as e:
        return {"error": str(e)}, 500
    
@app.post("/matches/updatematch/statustorejected")
def update_match_status_to_rejected():
    data = request.get_json()
    menteeEmail = data["menteeEmail"]
    mentorEmail = data["mentorEmail"]
    try: 
        success = update_match_status_rejected(menteeEmail, mentorEmail)
        if success:
            return {"Response": "Request was made successfully"}
    except Exception as e:
        return {"error": str(e)}, 500

@app.post("/matches/getmenteerequests")
def get_mentee_requests():
    data = request.get_json()
    mentorEmail = data["mentorEmail"]
    try:
        menteeEmails = get_mentee_requests_from_database(mentorEmail)
        if menteeEmails == None or len(menteeEmails) == 0: 
            return {"Response": "No mentee requests found" , "Success": False}
        emails = [row[0] for row in menteeEmails]
        print(emails)
        menteeList = get_mentees(emails)
        if menteeList:
            return {"Response": "Mentees gathered successfully", "MenteeList": menteeList, "Success": True}
    except Exception as e:
        print(f"Error: {e}")
        return {"error": str(e)}, 500

@app.post("/model/fetchMentors")
def fetch_mentors_from_model():
    data = request.get_json()
    career_interest = data["careerInterest"]
    try:
        results = fetch_mentors(career_interest)
        if len(results) == 0:
            results = get_mentors()

            return {"Response": "Default mentors as backup", "MentorList": results}
        return {"Response": "Mentees gathered successfully", "MentorList": results}
    except Exception as e:
        return {"error": str(e)}, 500
    
@app.post("/messages/get_rooms")
def get_message_rooms():
    data = request.get_json()
    email = data['email']
    try:
        rooms = fetch_rooms(email)
        return {"Response": "Mentees gathered successfully", "RoomList": rooms}
    except Exception as e:
        return {"error": str(e)}, 500

app.register_blueprint(model_route)

if __name__ == "__main__":
    socketio.run(app, debug=True)
    
    app.run()
   
