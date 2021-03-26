"""Tests for the users functionality of the API

This includes registration and login
"""

def test_register(client):
    # Successful registration
    res = client.post('/users/register', json={
        "first_name": "FirstName",
        "last_name": "LastName",
        "email": "firstnamelastname@domain.com",
        "password": "P@ssw0rd!"
    })
    assert res.status_code == 201
