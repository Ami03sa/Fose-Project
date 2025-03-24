# config.py

import os

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') #or 'secret'  # Secret key for session management
    MYSQL_HOST = os.environ.get('MYSQL_HOST') #or 'localhost'
    MYSQL_USER = os.environ.get('MYSQL_USER') #or 'root'
    MYSQL_PASSWORD = os.environ.get('MYSQL_PASSWORD')# or 'password'
    MYSQL_DB = os.environ.get('MYSQL_DB')# or 'db'
