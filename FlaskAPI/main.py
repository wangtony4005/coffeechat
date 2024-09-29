import os
import psycopg2
from dotenv import load_dotenv
from flask import Flask, request
from UserTableInfo import add_user

CREATE_USERS_TABLE = ("CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, firstname TEXT, lastname TEXT, email text, password text);")

load_dotenv()

app = Flask(__name__)

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


if __name__ == "__main__":
    app.run()