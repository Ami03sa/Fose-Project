# app.py or your main Flask application file
from flask import Flask
from flask_mysqldb import MySQL
from config import Config
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
app.config.from_object(Config)  # Load configurations

app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')  # Get secret key from environment
app.config['MYSQL_HOST'] = os.getenv('MYSQL_HOST')
app.config['MYSQL_USER'] = os.getenv('MYSQL_USER')
app.config['MYSQL_PASSWORD'] = os.getenv('MYSQL_PASSWORD')
app.config['MYSQL_DB'] = os.getenv('MYSQL_DB')

mysql = MySQL(app)  # Initialize MySQL extension


@app.route('/')
def index():
    return "Flask app with MySQL is running!"

@app.route('/users')
def get_users():
    cursor = mysql.connection.cursor()  # Create cursor to interact with MySQL
    cursor.execute('SELECT * FROM users')  # Example query
    users = cursor.fetchall()  # Fetch all records
    return {'users': users}  # Return users as JSON (just an example)


if __name__ == '__main__':
    app.run(debug=True)
