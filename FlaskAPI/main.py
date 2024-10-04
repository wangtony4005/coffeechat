import os
import psycopg2
from dotenv import load_dotenv
from flask import Flask, request
import base64
from UserTableInfo import add_user, get_user
# from flask_jwt_extended import create_access_token


from flask_cors import CORS



CREATE_USERS_TABLE = ("CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, firstname TEXT, lastname TEXT, email text, password text);")

load_dotenv()

app = Flask(__name__)

CORS(app, resources={r"/users/*": {"origins": "*"}},
     methods=["GET", "POST"],
     allow_headers=["Content-Type"])

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

@app.post("/users/signin")
def signin():
    try:
        data = request.get_json()
        username = data['username']
        password = data['password']

        user = get_user(username, password)
        if user is None:
            return {"error": "Invalid username or password"}, 401

        return {"condition": "success"}, 200

    except Exception as e:
        return {"error": str(e)}, 500

@app.route("/users/reset_password", methods=["GET"])
def reset_password():
    pass





if __name__ == "__main__":
    app.run()
   