"""Tests for the users functionality of the API

This includes registration and login
"""

def test_register(client, mongodb):
    # Successful registration
    res = client.post('/users/register', json={
        "first_name": "FirstName",
        "last_name": "LastName",
        "email": "firstnamelastname@domain.com",
        "password": "P@ssw0rd!"
    })
    assert res.status_code == 201


def test_login(client, mongodb):
    # Successful login
    res = client.post('/users/login', json={
        "email": "testemail@domain.com",
        "password": "T3stP@ssword"
    })
    print(res.data)
    assert res.status_code == 200
