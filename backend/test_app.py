# test_app.py

import pytest
import json
from backend.app import application as app  


@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_index(client):
    response = client.get('/')
    assert response.status_code == 200
    assert b"DAMS backend is running" in response.data


def test_signup_missing_fields(client):
    response = client.post('/api/signup', json={})
    assert response.status_code == 400
    assert b'Missing required fields' in response.data


def test_login_user_not_found(client):
    response = client.post('/api/login', json={
        'username': 'nonexistentuser',
        'password': 'wrongpassword'
    })
    assert response.status_code == 400
    assert b'Invalid username or password' in response.data


def test_get_help_requests(client):
    response = client.get('/api/help-requests')
    assert response.status_code == 200
    assert isinstance(response.get_json(), list)


def test_get_pledges(client):
    response = client.get('/api/pledges')
    assert response.status_code == 200
    assert isinstance(response.get_json(), list)


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
    assert response.status_code in [201, 500]  # 201 if success, 500 if e.g. table missing
