# Mocha Mentors

A platform to connect mentors with a mentee to help propell them forward in their career.

## Setup : How to run locally

### Frontend(React + Tailwind)

1. Naviate to the frontend folder

```bash
cd frontend
```

2. Install dependencies

```bash
npm install
```

3. Run the platform

```bash
npm run dev
```

### Backend(Flask + Postgresql)

1. If you haven't already download psql

```bash
https://www.postgresql.org/download/
```

1.5. [Download the model needed and insert in backend folder labeled model](https://drive.google.com/uc?export=download&id=1izlE5m5GkFMuVRm-a4BKKgg8i1Vh9gX6)

2. Navigate to the backend folder

```bash
cd FlaskAPI
```

3. Create an env file to store enviormental variables

```bash
cat .env
```

4. Login to you postgres terminal

```bash
psql -U {insert user name you want for your database}
```

5. source the createdb file

```bash
\i schema.sql
```

6. Run the mockdata.sql file to generate data for the database

```bash
\i mockdata.sql
```

7. To ensure Flask is connected to your created database, create a .env file in the flaskAPI directory and make sure to include the following:

- DATABASE_USER=yourdbuser
- DATABASE_PASS=yourdbpassword
- DATABASE_HOST=yourdbhost
- DATABASE_PORT=5432
- DATABASE_NAME=yourdbname
- ENCRYPT_KEY='your encrypt key for Fernet Library'
- TOKEN_KEY='your token key for jwt encoding'

8. If running locally from an IDE create a virtual environment and run it

```bash
python -m venv /path/to/new/virtual/environment
```

Windows Command:

```bash
PS C:\> <venv>\Scripts\Activate.ps1
```

POSIX Command:

```bash
$ <venv>/bin/Activate.ps1
```
Mac:
```bash
source venv/bin/activate
```

9. Install dependencies from requirements.txt file

```bash
pip install -r requirements.txt
```
or
```bash
pip3 install -r requirements.txt
```

10. Run the server

```bash
flask run
```

[Download the model needed and insert in backend folder labeled model](https://drive.google.com/uc?export=download&id=1izlE5m5GkFMuVRm-a4BKKgg8i1Vh9gX6)
