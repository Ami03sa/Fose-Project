from flask import Flask, request, jsonify
from flask_mysqldb import MySQL
from flask_cors import CORS
from .config import Config
from dotenv import load_dotenv
import os
import bcrypt  # Import bcrypt for password hashing
import MySQLdb.cursors


load_dotenv()

app = Flask(__name__)
app.config.from_object(Config)  # Load configurations

app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')  # Get secret key from environment
app.config['MYSQL_HOST'] = os.getenv('MYSQL_HOST')
app.config['MYSQL_USER'] = os.getenv('MYSQL_USER')
app.config['MYSQL_PASSWORD'] = os.getenv('MYSQL_PASSWORD')
app.config['MYSQL_DB'] = os.getenv('MYSQL_DB')


CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173", "methods": ["GET", "POST", "OPTIONS"]}}, supports_credentials=True)

mysql = MySQL(app)  # Use DictCursor

with app.app_context():
    mysql.connection.cursorclass = MySQLdb.cursors.DictCursor

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

@app.route('/api/login', methods=['POST', 'OPTIONS'])
def login():
    if request.method == 'OPTIONS':  # Handle preflight request
        return '', 200

    try:
        data = request.get_json()
        username = data['username']
        password = data['password']
        
        # Log to verify data
        print(f"Received username: {username}, password: {password}")

        if not username or not password:
            return jsonify({'error': 'Username and password are required'}), 400

        
        cur = mysql.connection.cursor(MySQLdb.cursors.DictCursor)  # Apply DictCursor here
        cur.execute("SELECT * FROM users WHERE username = %s", (username,))
        user = cur.fetchone()

        if not user:
            return jsonify({'error': 'User not found'}), 400

        stored_password_hash = user['password_hash']

        print(f"Stored password hash: {stored_password_hash}")

        
        if bcrypt.checkpw(password.encode('utf-8'), stored_password_hash.encode('utf-8')):
            return jsonify({'message': 'Login successful'}), 200
        else:
            return jsonify({'error': 'Invalid credentials'}), 400
        
    except Exception as e:
        print(f"Error during login: {str(e)}")
        return jsonify({'error': 'Something went wrong', 'details': str(e)}), 500



# Signup route
@app.route('/api/signup', methods=['POST', 'OPTIONS'])
def signup():
    if request.method == 'OPTIONS':  # Handle preflight request
        return '', 200

    try:
        data = request.get_json()
        username = data['username']
        password = data['password']

        password_hash = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

        if not username or not password:
            return jsonify({'error': 'Missing fields'}), 400

        cur = mysql.connection.cursor()
        cur.execute("SELECT * FROM users WHERE username = %s", (username,))
        existing_user = cur.fetchone()

        if existing_user:
            return jsonify({'error': 'Username already taken'}), 400

        cur.execute("INSERT INTO users (username, password_hash) VALUES (%s, %s)",
            (username, password_hash))

        mysql.connection.commit()
        cur.close()

        return jsonify({'message': 'User registered successfully'}), 201
    except Exception as e:
        print("Error:", str(e))
        return jsonify({'error': 'Something went wrong', 'details': str(e)}), 500

@app.route('/api/request-help', methods=['POST'])
def request_help():
    try:
        data = request.get_json()

        name = data['name']
        contact = data['contact']
        location = data['location']
        emergency_type = data['emergencyType']
        urgency_level = data['urgencyLevel']
        help_categories = ",".join(data['helpCategories'])  # Join list to comma string
        details = data.get('details', '')

        cur = mysql.connection.cursor()
        cur.execute("""
            INSERT INTO help_requests 
            (name, contact, location, emergency_type, urgency_level, help_categories, details)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
        """, (name, contact, location, emergency_type, urgency_level, help_categories, details))

        mysql.connection.commit()
        cur.close()
        return jsonify({"message": "Request submitted successfully"}), 201

    except Exception as e:
        print("Error submitting request:", str(e))
        return jsonify({"error": "Failed to submit request"}), 500


@app.route('/api/help-requests', methods=['GET'])
def get_help_requests():
    try:
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute("SELECT * FROM help_requests")
        requests = cursor.fetchall()
        return jsonify({'requests': requests}), 200
    except Exception as e:
        print("Error loading help requests:", str(e))
        return jsonify({'error': 'Failed to load requests'}), 500


@app.route('/api/reset-password', methods=['POST'])
def reset_password():
    try:
        data = request.get_json()
        email = data.get('email')
        new_password = data.get('newPassword')

        if not email or not new_password:
            return jsonify({'error': 'Email and new password are required'}), 400

        # Check if the user exists
        cur = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cur.execute("SELECT * FROM users WHERE email = %s", (email,))
        user = cur.fetchone()

        if not user:
            return jsonify({'error': 'No account associated with this email'}), 404

        # Hash the new password
        hashed_password = bcrypt.hashpw(new_password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

        # Update password in the database
        cur.execute("UPDATE users SET password_hash = %s WHERE email = %s", (hashed_password, email))
        mysql.connection.commit()
        cur.close()

        return jsonify({'message': 'Password reset successfully'}), 200

    except Exception as e:
        print(f"Error during password reset: {str(e)}")
        return jsonify({'error': 'Something went wrong', 'details': str(e)}), 500


@app.route('/api/pledge', methods=['POST', 'OPTIONS'])
def create_pledge():
    if request.method == 'OPTIONS':
        return '', 200

    try:
        data = request.get_json()
        name = data['name']
        contact = data['contact']
        assistance_type = data['assistanceType']
        quantity_or_details = data.get('additionalDetails', '')

        cur = mysql.connection.cursor()
        cur.execute("""
            INSERT INTO pledges (name, contact, assistance_type, quantity_or_details)
            VALUES (%s, %s, %s, %s)
        """, (name, contact, assistance_type, quantity_or_details))
        mysql.connection.commit()
        cur.close()

        return jsonify({'message': 'Pledge created successfully'}), 201
    except Exception as e:
        print("Error creating pledge:", str(e))
        return jsonify({'error': 'Failed to create pledge'}), 500


if __name__ == '__main__':
    app.run(debug=True, port=5000)






if __name__ == '__main__':
    app.run(debug=True, port=5000)
