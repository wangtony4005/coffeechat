import os
import psycopg2
from dotenv import load_dotenv

load_dotenv()

dbname = os.getenv("DATABASE_NAME")
user = os.getenv("DATABASE_USER")
password = os.getenv("DATABASE_PASS")
port = os.getenv("DATABASE_PORT")
host = os.getenv("DATABASE_HOST")
connection = psycopg2.connect(
    dbname=dbname, user=user, password=password, host=host, port=port
)

def add_user(firstname, lastname, email, password):
    addUser = ("""
            INSERT INTO users (firstname, lastname, email, password)
            VALUES (%s, %s, %s, %s)
        """)
    with connection:
        with connection.cursor() as cursor:
            cursor.execute(addUser, (firstname, lastname, email, password))
            return True
    return False


def get_user(username, password):
    print(username, password)
    with connection:
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM users WHERE firstname = %s AND password = %s", (username, password))
            users = cursor.fetchone()
            return users
    return False