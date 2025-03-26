from flask import Flask, request, jsonify
from flask_mysqldb import MySQL
from flask_cors import CORS
from .config import Config
from dotenv import load_dotenv
from werkzeug.security import generate_password_hash
import os
import bcrypt  # Import bcrypt for password hashing

load_dotenv()

app = Flask(__name__)
app.config.from_object(Config)  # Load configurations

app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')  # Get secret key from environment
app.config['MYSQL_HOST'] = os.getenv('MYSQL_HOST')
app.config['MYSQL_USER'] = os.getenv('MYSQL_USER')
app.config['MYSQL_PASSWORD'] = os.getenv('MYSQL_PASSWORD')
app.config['MYSQL_DB'] = os.getenv('MYSQL_DB')

mysql = MySQL(app)  # Initialize MySQL extension

CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}}, supports_credentials=True)

@app.route('/')
def index():
    cur = mysql.connection.cursor()
    cur.execute('SELECT * FROM users')  
    results = cur.fetchall()
    return str(results)

@app.route('/users')
def get_users():
    cursor = mysql.connection.cursor()
    cursor.execute('SELECT * FROM users')  
    users = cursor.fetchall()
    return {'users': users}  

# Signup route
@app.route('/api/signup', methods=['POST', 'OPTIONS'])
def signup():
    if request.method == 'OPTIONS':  # Handle preflight request
        return '', 200

    try:
        data = request.get_json()
        username = data['username']
        password = data['password']
        account_type = data['accountType']

        password_hash = generate_password_hash(password)

        if not username or not password or not account_type:
            return jsonify({'error': 'Missing fields'}), 400

        cur = mysql.connection.cursor()
        cur.execute("SELECT * FROM users WHERE username = %s", (username,))
        existing_user = cur.fetchone()

        if existing_user:
            return jsonify({'error': 'Username already taken'}), 400

        cur.execute("INSERT INTO users (username, password_hash, account_type) VALUES (%s, %s, %s)",
                    (username, password, account_type))
        mysql.connection.commit()
        cur.close()

        return jsonify({'message': 'User registered successfully'}), 201
    except Exception as e:
        print("Error:", str(e))
        return jsonify({'error': 'Something went wrong', 'details': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
