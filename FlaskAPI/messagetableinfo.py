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
connection.autocommit = True

def get_user(email):
    with connection:
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM messages WHERE username = %s", (email,))
            users = cursor.fetchone()
            if users:
                return True
    return False

def add_message_to_table(email, message, room):
    ts = time.time()
    ts = datetime.datetime.fromtimestamp(ts).strftime('%Y-%m-%d %H:%M:%S')
    role = determine_mentor_or_mentee(email)
    role = role[0]
    addMessageMentee = ("""
                    UPDATE messages
                SET menteemessages = array_append(menteemessages, %s),
                    timestamps = array_append(timestamps, %s)
                WHERE menteeEmail = %s AND roomID = %s;
            """)
    addMessageMentor = ("""
                    UPDATE messages
                SET mentormessages = array_append(mentormessages, %s),
                    timestamps = array_append(timestamps, %s)
                WHERE mentorEmail = %s AND roomID = %s;
            """)
    with connection:
        with connection.cursor() as cursor:
            if role == 'mentee':
                cursor.execute(addMessageMentee, (message, ts, email, room))
            else:
                cursor.execute(addMessageMentor, (message, ts, email, room))
            return True
    return False

def fetch_rooms(email):
    fetch_message_rooms = ("""
                            SELECT * FROM messages WHERE menteeEmail = %s OR mentorEmail = %s
                           """)
    print("email in fetch_rooms function : ",email)
    with connection:
        with connection.cursor() as cursor:
            cursor.execute(fetch_message_rooms, (email, email,))
            rooms = cursor.fetchall()
            if rooms:
                return rooms
    return None

def determine_mentor_or_mentee(email):
    determine_role = ("""
                    SELECT userType from users WHERE email = %s
                      """)
    with connection:
        with connection.cursor() as cursor:
            cursor.execute(determine_role, (email,))
            role = cursor.fetchone()
    return role

