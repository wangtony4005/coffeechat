import os
import psycopg2
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from flask_socketio import SocketIO, emit, join_room, leave_room
import base64
from UserTableInfo import add_user

from flask_cors import CORS



CREATE_USERS_TABLE = ("CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, firstname TEXT, lastname TEXT, email text, password text);")

load_dotenv()

app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})
socketio = SocketIO(app, cors_allowed_origins='*')


dbname = os.getenv("DATABASE_NAME")
user = os.getenv("DATABASE_USER")
password = os.getenv("DATABASE_PASS")
port = os.getenv("DATABASE_PORT")
host = os.getenv("DATABASE_HOST")
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
    email = data["email"]
    password = data["password"]
    createUserTable()
    newUser = add_user(firstname, lastname, email, password)
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
@app.get("/users/signin", methods=["GET"])
def signin():
    return {"condition": "success"}, 200
    try:
        username = request.args.get("userName")
        password = request.args.get("password")
        encoded_password = base64.b64encode(password.encode("utf-8"))
        with connection:
            with connection.cursor() as cursor:
                cursor.execute("SELECT * FROM users WHERE email = %s AND password = %s", (username, encoded_password))
                users = cursor.fetchone()

                if len(users) == 0:
                    return {"error": "User not found"}, 404

        return {"condition": "success"}, 200

    except Exception as e:
        return {"error": str(e)}, 500

@app.get("/users/reset_password", methods=["GET"])
def reset_password():
    pass





if __name__ == "__main__":
    socketio.run(app, debug=True)
    