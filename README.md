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

7. If running locally from an IDE create a virtual environment and run it

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

8. Install dependencies from requirements.txt file

```bash
pip install -r requirements.txt
```

9. Run the server

```bash
flask run
```
