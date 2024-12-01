from flask import Blueprint, jsonify, request
import os
import psycopg2
from dotenv import load_dotenv
from cryptography.fernet import Fernet
import binascii
import joblib
import faiss
import pandas as pd 

model_route = Blueprint("model_route", __name__)


load_dotenv()

dbname = os.getenv("DATABASE_NAME")
user = os.getenv("DATABASE_USER")
password = os.getenv("DATABASE_PASS")
port = os.getenv("DATABASE_PORT")
host = os.getenv("DATABASE_HOST")
connection = psycopg2.connect(
    dbname=dbname, user=user, password=password, host=host, port=port
)

def fetch_mentors(career_interest):
    results = []
    db_query = (""" SELECT * FROM users
        WHERE career_interest = %s  AND userType = 'mentor' """)

    #load the model to fetch relaated mentors 

    model = joblib.load('./model/model.joblib')
    index = faiss.read_index('./model/faiss_index.faiss')
    df = pd.read_pickle('./model/df.pkl')
    print("Mode type: ", type(model))
    print("Index type: ", type(index))
    print("df type: ", type(df))

    
    query_vector = model.encode(career_interest).reshape(1, -1)
    D, I = index.search(query_vector, 10)

    print("D: ", D)
    indices = I[0]

    matched_careers = []

    for index in indices:
        matched_careers.append(df.iloc[index]['Job_Title'])
    
    matched_careers = list(set(matched_careers))
    with connection.cursor() as cursor:
        for interest in matched_careers:
            cursor.execute(db_query, (interest,))
            mentors = cursor.fetchall()
            
            # Append mentors to results
            for mentor in mentors:
                results.append(mentor)
    return results
