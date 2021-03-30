"""Tests the two routes in main

These tests mainly serve as a demonstration/test that the actual
testing framework is operating correctly.
"""

def test_hello(client):
    res = client.get('/')
    assert b"Hello, world" in res.data
