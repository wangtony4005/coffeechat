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
connection.autocommit = True


encrypt_key = os.getenv("ENCRYPT_KEY")

cipher_suite = Fernet(encrypt_key)

def add_user(firstname, lastname, username,  email, password, role):
    print("users info: "  , firstname, lastname, username, email, password, role)
    addUser = ("""
            INSERT INTO users (firstname, lastname, username, password, email, userType)
            VALUES (%s, %s, %s, %s, %s, %s)
        """)

    #create a table for them in mocha points table
    mochaTable = ("""
        INSERT INTO mochapoints (email, points) VALUES (%s, %s)
     """)
    with connection:
        with connection.cursor() as cursor:
            cursor.execute(addUser, (firstname, lastname, username, password,  email, role))
            cursor.execute(mochaTable, (email,0))
            return True
    return False

def update_user(email, bio, jobTitle, career_interest):
    updateUser = ("""UPDATE users
        SET bio = COALESCE(%s, bio),
            jobTitle = COALESCE(%s, jobTitle),
            career_interest = COALESCE(%s, career_interest)
        WHERE email = %s;
        """)
    with connection:
        with connection.cursor() as cursor:
            cursor.execute(updateUser, (bio, jobTitle, career_interest, email))
            return True
    return False

def get_user(username, password):
    print("users info:", username, password)
    with connection:
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM users WHERE username = %s", (username,))
            users = cursor.fetchone()
            print("user info fetched from db: ", users)
            
            if users:
                encrypt_password_hex = users[4]
                
                encrypt_password_bytes = binascii.unhexlify(encrypt_password_hex[2:])
                
                decrypted_password = cipher_suite.decrypt(encrypt_password_bytes).decode()
                
                if password == decrypted_password:
                    print("passwords are the same", "user info: ", users)
                    return users
    
    return None
def get_user_preferences(email):
    userPreferences = ("""
                    SELECT bio, jobTitle, career_interest from users where email = %s
                       """)
    with connection:
        with connection.cursor() as cursor:
            cursor.execute(userPreferences, (email,))
            user_info = cursor.fetchone()
            if user_info:
                return user_info
    return None
    
def get_user_with_email(email):
    with connection.cursor() as cursor:
        cursor.execute("""SELECT * FROM users WHERE email = %s""", (email,))
        user_info = cursor.fetchone()
        if user_info:
            return user_info
    return None

def get_mentees(menteeEmails):
    listOfMentees = []
    for menteeEmail in menteeEmails:
        mentee = get_user_with_email(menteeEmail)
        listOfMentees.append(mentee)
        print(listOfMentees)
    return listOfMentees