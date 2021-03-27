"""Tests for the users functionality of the API

This includes registration and login
"""
from database import User
import json

def test_register_success(client):
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
    

def test_register_empty_data(client):
    user_data = {
        "first_name": "",
        "last_name": "",
        "email": "",
        "password": ""
    }
    res = client.post('/users/register', json=user_data)
    assert res.status_code == 401


def test_register_invalid_data(client):
    user_data = {
        "first_name": "TestFirstName",
        "last_name": "TestLastName",
        "email": "invalidemail",
        "password": "invalidpassword"
    }
    res = client.post('/users/register', json=user_data)
    assert res.status_code == 401
    user_data["email"] = "validemail@domain.com"
    user_data["password"] = "1nvalidpassword"
    res = client.post('/users/register', json=user_data)
    assert res.status_code == 401
    user_data["password"] = "1NVALIDPASSWORD"
    res = client.post('/users/register', json=user_data)
    assert res.status_code == 401


def test_register_duplicate(client):
    user_data = {
        "first_name": "TestFirstName",
        "last_name": "TestLastName",
        "email": "testemail@domain.com",
        "password": "T3stP@ssword"
    }
    User(**user_data).save()
    res = client.post('/users/register', json=user_data)
    assert res.status_code == 409


def test_login_success(client):
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


def test_login_incorrect_password(client):
    user_data = {
        "first_name": "TestFirstName",
        "last_name": "TestLastName",
        "email": "testemail@domain.com",
        "password": "T3stP@ssword"
    }
    User(**user_data).save()
    res = client.post('/users/login', json={
        "email": user_data["email"],
        "password": user_data["password"] + "!"
    })
    assert res.status_code == 401


def test_login_empty_data(client):
    user_data = {
        "first_name": "",
        "last_name": "",
        "email": "",
        "password": ""
    }
    res = client.post('/users/login', json={
        "email": user_data["email"],
        "password": user_data["password"]
    })
    assert res.status_code == 404


def test_login_no_account(client):
    user_data = {
        "first_name": "TestFirstName",
        "last_name": "TestLastName",
        "email": "testemail@domain.com",
        "password": "T3stP@ssword"
    }
    res = client.post('/users/login', json={
        "email": user_data["email"],
        "password": user_data["password"]
    })
    assert res.status_code == 404
