"""Tests for the hardware functionality of the API

This includes registration and login
"""
from database import HardwareSet, Projects, User
from flask_jwt_extended import create_access_token, get_jwt_identity
import pytest
import json

@pytest.fixture
def auth_token():
    user_data = {
        "first_name": "Test",
        "last_name": "User",
        "email": "testuser@test.com",
        "password": "T3stUser!"
    }
    new_user = User(**user_data).save()
    access_token = create_access_token(identity=new_user)
    return "Bearer " + access_token


def test_hardware_create_success(client, auth_token):
    hardware_data = {
        "name": "Hardware Set Test Success",
        "capacity": 4000,
        "available": 500
    }
    res = client.post('/hardware/', json=hardware_data, headers={
        "Authorization": auth_token
    })
    assert res.status_code == 201
    assert b"id" in res.data


def test_project_create_incorrect_input(client, auth_token):
    hardware_data = {
        "name": "Hardware Set Test Failure",
        "capacity": 4,
        "available": -500
    }
    res = client.post('/hardware/', json=hardware_data, headers={
        "Authorization": auth_token
    })
    assert res.status_code == 422
    assert b"too small" in res.data


def test_hardware_create_empty(client, auth_token):
    hardware_data = {
        "name": "",
        "capacity": -1,
        "available": -1
    }
    res = client.post('/hardware/', json=hardware_data, headers={
        "Authorization": auth_token
    })
    assert res.status_code == 422
    assert b"too short" in res.data
    assert b"too small" in res.data


def test_hardware_create_duplicate_name(client, auth_token):
    hardware_data = [
        {
            "name": "Same-Name",
            "capacity": 1000,
            "available": 100
        },
        {
            "name": "Same-Name",
            "capacity": 2000,
            "available": 200
        }
    ]
    res = client.post('/hardware/', json=hardware_data[0], headers={
        "Authorization": auth_token
    })
    assert res.status_code == 201
    assert b"id" in res.data
    res = client.post('/hardware/', json=hardware_data[1], headers={
        "Authorization": auth_token
    })
    assert res.status_code == 422
    assert b"unique" in res.data

def db_helper():
    user = User.objects.first()
    project_data = {
            "name": "Project 1",
            "description": "Project description here",
            "creator_id": user.pk,
            "project_id": "unique-id"
    }

    hardware_data = {
            "name": "Hardware Set 1",
            "capacity": 2000,
            "available": 200
    }

    Projects(**project_data).save()
    HardwareSet(**hardware_data).save()

    project_id = Projects.objects.first().pk
    hardware_id = HardwareSet.objects.first().pk

    return project_id, hardware_id

def test_hardware_checkout(client, auth_token):
    project_id, hardware_id = db_helper()

    checkout_data = {
        "project_id": str(project_id),
        "amount": 10
    }

    res = client.post(f'/hardware/check-out/{hardware_id}', json=checkout_data, headers={
        "Authorization": auth_token
    })

    assert res.status_code == 200
    assert b"190" in res.data

def test_hardware_checkout_error(client, auth_token):
    project_id, hardware_id = db_helper()

    checkout_data = {
        "project_id": str(project_id)[1:],
        "amount": 10
    }

    res = client.post(f'/hardware/check-out/{hardware_id}', json=checkout_data, headers={
        "Authorization": auth_token
    })

    assert res.status_code == 422
    assert b"not a valid ObjectId" in res.data

def test_hardware_checkout_proj_missing(client, auth_token):
    project_id, hardware_id = db_helper()

    checkout_data = {
        "project_id": str(project_id),
        "amount": 10
    }

    Projects.drop_collection()

    res = client.post(f'/hardware/check-out/{hardware_id}', json=checkout_data, headers={
        "Authorization": auth_token
    })

    assert res.status_code == 404
    assert b"Project not found" in res.data

def test_hardware_checkout_hw_missing(client, auth_token):
    project_id, hardware_id = db_helper()

    checkout_data = {
        "project_id": str(project_id)[1:],
        "amount": 10
    }

    HardwareSet.drop_collection()

    res = client.post(f'/hardware/check-out/{hardware_id}', json=checkout_data, headers={
        "Authorization": auth_token
    })

    assert res.status_code == 422

def test_hardware_checkin(client, auth_token):
    project_id, hardware_id = db_helper()

    checkout_data = {
        "project_id": str(project_id),
        "amount": 50
    }

    res = client.post(f'/hardware/check-out/{hardware_id}', json=checkout_data, headers={
        "Authorization": auth_token
    })

    checkin_data = {
        "project_id": str(project_id),
        "amount": 10
    }

    res = client.post(f'/hardware/check-in/{hardware_id}', json=checkin_data, headers={
        "Authorization": auth_token
    })

    assert res.status_code == 200
    assert b"160" in res.data


def test_hardware_checkin_error(client, auth_token):
    project_id, hardware_id = db_helper()

    checkout_data = {
        "project_id": str(project_id),
        "amount": 50
    }

    res = client.post(f'/hardware/check-out/{hardware_id}', json=checkout_data, headers={
        "Authorization": auth_token
    })

    checkin_data = {
        "project_id": str(project_id)[1:],
        "amount": 10
    }

    res = client.post(f'/hardware/check-in/{hardware_id}', json=checkin_data, headers={
        "Authorization": auth_token
    })

    assert res.status_code == 422
    assert b"not a valid ObjectId" in res.data

def test_hardware_checkin_proj_not_found(client, auth_token):
    project_id, hardware_id = db_helper()

    checkout_data = {
        "project_id": str(project_id),
        "amount": 50
    }

    res = client.post(f'/hardware/check-out/{hardware_id}', json=checkout_data, headers={
        "Authorization": auth_token
    })

    Projects.drop_collection()

    checkin_data = {
        "project_id": str(project_id),
        "amount": 10
    }

    res = client.post(f'/hardware/check-in/{hardware_id}', json=checkin_data, headers={
        "Authorization": auth_token
    })

    assert res.status_code == 404
    assert b"Project not found" in res.data

def test_hardware_checkin_hw_not_found(client, auth_token):
    project_id, hardware_id = db_helper()

    checkout_data = {
        "project_id": str(project_id),
        "amount": 50
    }

    res = client.post(f'/hardware/check-out/{hardware_id}', json=checkout_data, headers={
        "Authorization": auth_token
    })

    checkin_data = {
        "project_id": str(project_id),
        "amount": 10
    }

    # rotate the hw id to maintain valid id format but a non existent id overall
    invalid_hw_id = str(hardware_id)[1:] + str(hardware_id)[0]

    res = client.post(f'/hardware/check-in/{invalid_hw_id}', json=checkin_data, headers={
        "Authorization": auth_token
    })

    assert res.status_code == 404
    assert b"Hardware Set not found for this project" in res.data

    HardwareSet.drop_collection()

    res = client.post(f'/hardware/check-in/{hardware_id}', json=checkin_data, headers={
        "Authorization": auth_token
    })

    assert res.status_code == 404
    assert b"Hardware Set not found for this project" in res.data


def test_hardware_read(client, auth_token):
    hardware_data = [
        {
            "name": "Read Hardware 1",
            "capacity": 2000,
            "available": 200
        },
        {
            "name": "Read Hardware 2",
            "capacity": 3000,
            "available": 300
        }
    ]
    for hardware in hardware_data:
        HardwareSet(**hardware).save()
    res = client.get('/hardware/', headers={
        "Authorization": auth_token
    })
    assert res.status_code == 200
    assert b"Read Hardware 1" in res.data
    assert b"Read Hardware 2" in res.data


def test_hardware_read_id_success(client, auth_token):
    user = User.objects.first()
    project_data = {
            "name": "New Project 1",
            "description": "Project description here",
            "creator_id": user.pk,
            "project_id": "unique-id-3"
    }

    hardware_data = [
        {
            "name": "Read Hardware ID 1",
            "capacity": 2000,
            "available": 200
        },
        {
            "name": "Read Hardware ID 2",
            "capacity": 2000,
            "available": 200
        }
    ]

    Projects(**project_data).save()
    HardwareSet(**hardware_data[0]).save()
    HardwareSet(**hardware_data[1]).save()

    project = Projects.objects.first()
    hardware1 = HardwareSet.objects(name="Read Hardware ID 1").first()
    hardware2 = HardwareSet.objects(name="Read Hardware ID 2").first()

    checkout_data = {
        "project_id": str(project.pk),
        "amount": 50
    }

    res = client.post(f'/hardware/check-out/{hardware1.pk}', json=checkout_data, headers={
        "Authorization": auth_token
    })

    res = client.get(f'/hardware/{project.pk}', headers={
        "Authorization": auth_token
    })

    hardware1_id = str(hardware1.pk)
    hardware2_id = str(hardware2.pk)

    assert res.status_code == 200
    assert hardware1_id in str(res.data)
    assert hardware2_id not in str(res.data)


def test_hardware_read_id_not_found(client, auth_token):
    user = User.objects.first()
    project_data = {
            "name": "New Project 1",
            "description": "Project description here",
            "creator_id": user.pk,
            "project_id": "unique-id-3"
    }

    hardware_data = {
            "name": "Read Hardware ID 1",
            "capacity": 2000,
            "available": 200
    }

    Projects(**project_data).save()
    HardwareSet(**hardware_data).save()

    project = Projects.objects.first()
    hardware = HardwareSet.objects.first()

    checkout_data = {
        "project_id": str(project.pk),
        "amount": 50
    }

    invalid_proj_id = str(project.pk)[1:] + str(project.pk)[0]

    res = client.post(f'/hardware/check-out/{hardware.pk}', json=checkout_data, headers={
        "Authorization": auth_token
    })

    res = client.get(f'/hardware/{invalid_proj_id}', headers={
        "Authorization": auth_token
    })

    assert res.status_code == 404
    assert b'Project not found' in res.data


def test_hardware_update_success(client, auth_token):
    hardware_data = {
        "name": "New Hardware",
        "capacity": 2000,
        "available": 200
    }

    update_data = {
        "name": "Updated Hardware",
        "capacity": 4000,
        "available": 500
    }
    HardwareSet(**hardware_data).save()
    hardware_id = HardwareSet.objects.first().pk
    res = client.put(f'/hardware/{hardware_id}', json=update_data, headers={
        "Authorization": auth_token
    })
    assert res.status_code == 200
    assert b"Updated Hardware" in res.data
    assert b"4000" in res.data
    assert b"500" in res.data


def test_hardware_update_not_found(client, auth_token):
    hardware_data = {
        "name": "New Hardware",
        "capacity": 2000,
        "available": 200
    }

    update_data = {
        "name": "Updated Hardware",
        "capacity": 4000,
        "available": 500
    }
    HardwareSet(**hardware_data).save()
    hardware_id = HardwareSet.objects.first().pk
    HardwareSet.drop_collection()
    res = client.put(f'/hardware/{hardware_id}', json=update_data, headers={
        "Authorization": auth_token
    })
    assert res.status_code == 404
    assert b"Hardware set not found" in res.data


def test_hardware_update_incorrect_input(client, auth_token):
    hardware_data = {
        "name": "New Hardware",
        "capacity": 2000,
        "available": 200
    }

    update_data = {
        "name": 1000,
        "capacity": True,
        "available": False
    }
    HardwareSet(**hardware_data).save()
    hardware_id = HardwareSet.objects.first().pk
    res = client.put(f'/hardware/{hardware_id}', json=update_data, headers={
        "Authorization": auth_token
    })
    assert res.status_code == 422
    assert b"string values" in res.data


def test_hardware_update_empty(client, auth_token):
    hardware_data = {
        "name": "New Hardware",
        "capacity": 2000,
        "available": 200
    }

    update_data = {        
        "name": "Updated Hardware"
    }
    HardwareSet(**hardware_data).save()
    hardware_id = HardwareSet.objects.first().pk
    res = client.put(f'/hardware/{hardware_id}', json=update_data, headers={
        "Authorization": auth_token
    })
    assert res.status_code == 200


def test_hardware_delete_success(client, auth_token):
    hardware_data = {
        "name": "New Hardware",
        "capacity": 2000,
        "available": 200
    }
    HardwareSet(**hardware_data).save()
    hardware_id = HardwareSet.objects.first().pk

    res = client.delete(f'/hardware/{hardware_id}', headers={
        "Authorization": auth_token
    })
    assert res.status_code == 200
    assert b"deleted" in res.data


def test_project_delete_not_found(client, auth_token):
    hardware_data = {
        "name": "New Hardware",
        "capacity": 2000,
        "available": 200
    }
    HardwareSet(**hardware_data).save()
    hardware_id = HardwareSet.objects.first().pk
    HardwareSet.drop_collection()
    res = client.delete(f'/hardware/{hardware_id}', headers={
        "Authorization": auth_token
    })
    assert res.status_code == 404
    assert b"not found" in res.data


def test_project_delete_invalid_input(client, auth_token):
    hardware_data = {
        "name": "New Hardware",
        "capacity": 2000,
        "available": 200
    }
    HardwareSet(**hardware_data).save()
    hardware_id = HardwareSet.objects.first().pk
    invalid_hardware_id = str(hardware_id)[1:]
    HardwareSet.drop_collection()
    res = client.delete(f'/hardware/{invalid_hardware_id}', headers={
        "Authorization": auth_token
    })
    assert res.status_code == 422
    assert b"not a valid ObjectId" in res.data
