import os
import psycopg2
from dotenv import load_dotenv
from cryptography.fernet import Fernet
import binascii




load_dotenv()

dbname = os.getenv("DATABASE_NAME")
user = os.getenv("DATABASE_USER")
password = os.getenv("DATABASE_PASS")
port = os.getenv("DATABASE_PORT")
host = os.getenv("DATABASE_HOST")
connection = psycopg2.connect(
    dbname=dbname, user=user, password=password, host=host, port=port
)


encrypt_key = os.getenv("ENCRYPT_KEY")

cipher_suite = Fernet(encrypt_key)

def add_user(firstname, lastname, username,  email, password, role):
    print("users info: "  , firstname, lastname, username, email, password, role)
    addUser = ("""
            INSERT INTO users (firstname, lastname, username, password, email, userrole)
            VALUES (%s, %s, %s, %s, %s, %s)
        """)
    with connection:
        with connection.cursor() as cursor:
            cursor.execute(addUser, (firstname, lastname, username, password,  email, role))
            return True
    return False

def add_mentee(email, major, school, gradelevel, career_interests):
    print("mentee's info: "  , email, major, school, gradelevel, career_interests)
    addMentee = ("""
            INSERT INTO users (email, major, school, gradelevel, career_interests)
            VALUES (%s, %s, %s, %s, %s)
        """)
    with connection:
        with connection.cursor() as cursor:
            cursor.execute(addMentee, (email, major, school, gradelevel, career_interests))
            return True
    return False


def add_mentor(email, companyname, jobtitle, industry, yearsofexperience):
    print("mentor's info: "  , email, companyname, jobtitle, industry, yearsofexperience)
    addMentor = ("""
            INSERT INTO users (email, companyname, jobtitle, industry, yearsofexperience)
            VALUES (%s, %s, %s, %s, %s, %s)
        """)
    with connection:
        with connection.cursor() as cursor:
            cursor.execute(addMentor, (email, companyname, jobtitle, industry, yearsofexperience))
            return True
    return False

def get_user(username, password):
    print("users info:", username, password)
    with connection:
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM users WHERE username = %s", (username,))
            users = cursor.fetchone()
            if users:
                encrypt_password_hex = users[4]
                
                encrypt_password_bytes = binascii.unhexlify(encrypt_password_hex[2:])
                
                decrypted_password = cipher_suite.decrypt(encrypt_password_bytes).decode()
                
                if password == decrypted_password:
                    print("passwords are the same", "user info: ", users)
                    return users
    
    return None