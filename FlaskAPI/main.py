import os
import psycopg2
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from flask_socketio import SocketIO, emit, join_room, leave_room
import base64
from UserTableInfo import add_user, get_user
from cryptography.fernet import Fernet
import jwt



from flask_cors import CORS



CREATE_USERS_TABLE = ("CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, firstname TEXT, lastname TEXT, email text, password text);")

load_dotenv()


app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})
socketio = SocketIO(app, cors_allowed_origins='*')


CORS(app, resources={r"/users/*": {"origins": "*"}},
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
    emit("chat", {"message": message['message'], "username": message['username']}, broadcast=True)

@app.post("/users/signin")
def signin():
    try:
        data = request.get_json()
        username = data['username']
        password = data['password']
        

        user = get_user(username, password)

        token = jwt.encode({"username": username}, token_key, algorithm="HS256")
        if user is None:
            return {"error": "Invalid username or password"}, 401

        return {"condition": "success", "token" : token, "user_data" : user}, 200

    except Exception as e:
        return {"error": str(e)}, 500

@app.route("/users/reset_password", methods=["GET"])
def reset_password():
    pass





if __name__ == "__main__":
    socketio.run(app, debug=True)
    
    app.run()
   
