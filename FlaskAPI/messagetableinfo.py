import os
import psycopg2
from dotenv import load_dotenv
import datetime
import time

load_dotenv()

dbname = os.getenv("DATABASE_NAME")
user = os.getenv("DATABASE_USER")
password = os.getenv("DATABASE_PASS")
port = os.getenv("DATABASE_PORT")
host = os.getenv("DATABASE_HOST")
connection = psycopg2.connect(
    dbname=dbname, user=user, password=password, host=host, port=port
)

def get_user(email):
    with connection:
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM messages WHERE username = %s", (email,))
            users = cursor.fetchone()
            if users:
                return True
    return False

def add_message_to_table(message, email):
    ts = time.time()
    ts = datetime.datetime.fromtimestamp(ts).strftime('%Y-%m-%d %H:%M:%S')
    addMessage = ("""
                    UPDATE messages
                SET messages = array_append(messages, %s),
                    timestamps = array_append(timestamps, %s)
                WHERE user_email = %s;
            """)
    with connection:
        with connection.cursor() as cursor:
            cursor.execute(addMessage, (message, ts, email))
            return True
    return False


def add_user_to_table(email):
    addUser = ("""
               INSERT INTO messages (user_email)
               VALUES(%s)
               """)
    with connection:
        with connection.cursor() as cursor:
            cursor.execute(addUser, (email,))
            return True
    return False

def add_message(email, message):
    print("user info and message: ", email, message)
    if get_user(email) == True:
        add_message_to_table(email, message)
    else:
        add_user_to_table(email)
        add_message_to_table(email, message)