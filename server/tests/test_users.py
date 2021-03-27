"""Tests for the users functionality of the API

This includes registration and login
"""
from database import User
import json

def test_register(client):
    # Successful registration
    user_data = {
        "first_name": "TestFirstName",
        "last_name": "TestLastName",
        "email": "testemail@domain.com",
        "password": "T3stP@ssword"
    }
    res = client.post('/users/register', json=user_data)
    assert res.status_code == 201
    new_user = json.loads(res.data)
    for key in user_data:
        assert user_data[key] == new_user[key]


def test_login(client):
    # Successful login
    user_data = {
        "first_name": "TestFirstName",
        "last_name": "TestLastName",
        "email": "testemail@domain.com",
        "password": "T3stP@ssword"
    }
    User(**user_data).save()
    res = client.post('/users/login', json={
        "email": user_data["email"],
        "password": user_data["password"]
    })
    assert res.status_code == 200
