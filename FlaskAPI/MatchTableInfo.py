import os
import psycopg2
from dotenv import load_dotenv
from cryptography.fernet import Fernet
import binascii
import random



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

def generate_random_number_string(length):
  return ''.join(random.choice('0123456789') for _ in range(length))

def add_inital_match(menteeEmail, mentorEmail):
    print(menteeEmail, mentorEmail)
    matchID = generate_random_number_string(10)
    matchStatus = "Pending"
    coffeechatStatus = False
    add_match = ("""
                INSERT INTO match (menteeEmail, mentorEmail, matchID, matchStatus, coffeechatStatus)   
                VALUES(%s, %s, %s, %s, %s) 
                """)
    with connection.cursor() as cursor:
       cursor.execute(add_match, (menteeEmail, mentorEmail, matchID, matchStatus, coffeechatStatus,))
       return True
    return False

def update_match_status_accepted(menteeEmail, mentorEmail):
    print(menteeEmail, mentorEmail)
    update_to_accepted = ("""
                        UPDATE match
                        SET matchStatus = 'Accepted'
                        WHERE menteeEmail = %s AND mentorEmail = %s
                        """)
    get_mentor_mentee_info = ("""
                            SELECT matchID from match where menteeEmail = %s AND mentorEmail = %s
                              """)
    add_to_messages_table = ("""INSERT INTO messages (mentorEmail, menteeEmail, roomID)
                             VALUES(%s, %s, %s)
                             """)
    with connection.cursor() as cursor:
        cursor.execute(update_to_accepted, (menteeEmail, mentorEmail))
        cursor.execute(get_mentor_mentee_info, (menteeEmail, mentorEmail))
        roomID = cursor.fetchone()
        cursor.execute(add_to_messages_table, (mentorEmail, menteeEmail, roomID))
        return True
    return False

def update_match_status_rejected(menteeEmail, mentorEmail):
    print(menteeEmail, mentorEmail)
    update_to_rejected = ("""
                        UPDATE match
                        SET matchStatus = 'Rejected'
                        WHERE menteeEmail = %s AND mentorEmail = %s
                        """)
    with connection.cursor() as cursor:
        cursor.execute(update_to_rejected, (menteeEmail, mentorEmail))
        return True
    return False

def get_mentee_requests_from_database(mentorEmail):
    get_mentee_requests = (""" 
                            SELECT menteeEmail from match WHERE mentorEmail = %s AND matchStatus = 'Pending'""")
    with connection.cursor() as cursor:
        cursor.execute(get_mentee_requests, (mentorEmail,))
        mentees = cursor.fetchall()
        if mentees:
            return mentees
    return None