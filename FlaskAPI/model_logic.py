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
    #load the model to fetch relaated mentors 

    model = joblib.load('./model/model.joblib')
    index = faiss.read_index('./model/faiss_index.faiss')
    df = pd.read_pickle('./model/df.pkl')

    # query_model = "I want to me a software engineer"
    query_vector = model.encode(career_interest).reshape(1, -1)
    D, I = index.search(query_vector, 4)

    print("D: ", D)
    indices = I[0]

    job_titles = set()
    

    for index in indices:
        job_titles.add(df.iloc[index]['Job_Title'])

    return job_titles
    
