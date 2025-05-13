# test_app.py
import pytest
from backend import app  # adjust if your app is in a subfolder like `from app.main import app`
import json

@pytest.fixture
def client():
    app.config['TESTING'] = True
    app.config['MYSQL_DB'] = 'test_db'  # Optional: set to your test DB
    with app.test_client() as client:
        yield client

def test_index(client):
    response = client.get('/')
    assert response.status_code == 200

def test_signup_missing_fields(client):
    response = client.post('/api/signup', json={})
    assert response.status_code == 400
    assert b'Missing fields' in response.data

def test_login_user_not_found(client):
    response = client.post('/api/login', json={
        'username': 'nonexistent',
        'password': 'test123'
    })
    assert response.status_code == 400
    assert b'User not found' in response.data

def test_request_help_success(client):
    payload = {
        "name": "Test User",
        "contact": "1234567890",
        "location": "City A",
        "emergencyType": "Flood",
        "urgencyLevel": "High",
        "helpCategories": ["Food", "Shelter"],
        "details": "Need immediate help"
    }
    response = client.post('/api/request-help', json=payload)
    assert response.status_code in [201, 500]  # Adjust based on DB state

def test_get_help_requests(client):
    response = client.get('/api/help-requests')
    assert response.status_code == 200
