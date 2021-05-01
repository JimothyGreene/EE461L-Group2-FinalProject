"""Tests for the project functionality of the API

This includes project CRUD
"""
from database import Projects, User
from flask_jwt_extended import create_access_token, get_jwt_identity
import pytest

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


def test_project_create_success(client, auth_token):
    project_data = {
        "name": "New Project",
        "description": "Project description here",
        "project_id": "unique-id"
    }
    res = client.post('/projects/', json=project_data, headers={
        "Authorization": auth_token
    })
    assert res.status_code == 201
    assert b"id" in res.data


def test_project_create_incorrect_input(client, auth_token):
    project_data = {
        "name": "A"*50,
        "description": 4,
        "project_id": "unique-id"
    }
    res = client.post('/projects/', json=project_data, headers={
        "Authorization": auth_token
    })
    assert res.status_code == 422
    assert b"string values" in res.data
    assert b"too long" in res.data


def test_project_create_empty(client, auth_token):
    project_data = {
        "name": "",
        "description": "",
        "project_id": ""
    }
    res = client.post('/projects/', json=project_data, headers={
        "Authorization": auth_token
    })
    assert res.status_code == 422
    assert b"too short" in res.data


def test_project_create_duplicate_id(client, auth_token):
    user = User.objects.first()
    project_data = [
        {
            "name": "New Project 1",
            "description": "Project description here",
            "project_id": "unique-id"
        },
        {
            "name": "New Project 2",
            "description": "Project description here",
            "project_id": "unique-id"
        }
    ]
    res = client.post('/projects/', json=project_data[0], headers={
        "Authorization": auth_token
    })
    assert res.status_code == 201
    assert b"id" in res.data
    res = client.post('/projects/', json=project_data[1], headers={
        "Authorization": auth_token
    })
    assert res.status_code == 422
    assert b"unique" in res.data


def test_project_read(client, auth_token):
    user = User.objects.first()
    project_data = [
        {
            "name": "New Project 1",
            "description": "Project description here",
            "creator_id": user.pk,
            "project_id": "unique-id"
        },
        {
            "name": "New Project 2",
            "description": "Project description here",
            "creator_id": user.pk,
            "project_id": "unique-id-2"
        }
    ]
    for project in project_data:
        Projects(**project).save()
    res = client.get('/projects/', headers={
        "Authorization": auth_token
    })
    assert res.status_code == 200
    assert b"New Project 1" in res.data
    assert b"New Project 2" in res.data


def test_project_read_id_success(client, auth_token):
    user = User.objects.first()
    project_data = [
        {
            "name": "New Project 1",
            "description": "Project description here",
            "creator_id": user.pk,
            "project_id": "unique-id"
        },
        {
            "name": "New Project 2",
            "description": "Project description here",
            "creator_id": user.pk,
            "project_id": "unique-id-2"
        }
    ]
    for project in project_data:
        Projects(**project).save()
    project = Projects.objects.first()
    res = client.get(f'/projects/{project.project_id}', headers={
        "Authorization": auth_token
    })
    assert res.status_code == 200
    assert b"New Project 1" in res.data
    assert not b"New Project 2" in res.data


def test_project_read_id_not_found(client, auth_token):
    user = User.objects.first()
    project_data = [
        {
            "name": "New Project 1",
            "description": "Project description here",
            "creator_id": user.pk,
            "project_id": "unique-id"
        },
        {
            "name": "New Project 2",
            "description": "Project description here",
            "creator_id": user.pk,
            "project_id": "unique-id-2"
        }
    ]
    for project in project_data:
        Projects(**project).save()
    project = Projects.objects.first()
    Projects.objects(id=project.pk).delete()
    res = client.get(f'/projects/{project.project_id}', headers={
        "Authorization": auth_token
    })
    assert res.status_code == 404
    assert b"not found" in res.data


def test_project_update_success(client, auth_token):
    user = User.objects.first()
    project_data = {
        "name": "New Project",
        "description": "Project description here",
        "creator_id": user.pk,
        "project_id": "unique-id"
    }
    Projects(**project_data).save()
    project_id = Projects.objects.first().pk
    project_data["name"] = "Updated Project"
    del project_data["creator_id"]
    res = client.put(f'/projects/{project_id}', json=project_data, headers={
        "Authorization": auth_token
    })
    assert res.status_code == 200
    assert b"Updated Project" in res.data


def test_project_update_not_found(client, auth_token):
    user = User.objects.first()
    project_data = {
        "name": "New Project",
        "description": "Project description here",
        "creator_id": user.pk,
        "project_id": "unique-id"
    }
    Projects(**project_data).save()
    project_id = Projects.objects.first().pk
    Projects.drop_collection()
    del project_data["creator_id"]
    res = client.put(f'/projects/{project_id}', json=project_data, headers={
        "Authorization": auth_token
    })
    assert res.status_code == 404
    assert b"not found" in res.data


def test_project_update_incorrect_input(client, auth_token):
    user = User.objects.first()
    project_data = {
        "name": "New Project",
        "description": "Project description here",
        "creator_id": user.pk,
        "project_id": "unique-id"
    }
    Projects(**project_data).save()
    project_id = Projects.objects.first().pk
    project_data["name"] = 4
    del project_data["creator_id"]
    res = client.put(f'/projects/{project_id}', json=project_data, headers={
        "Authorization": auth_token
    })
    assert res.status_code == 422
    assert b"string values" in res.data


def test_project_update_empty(client, auth_token):
    user = User.objects.first()
    project_data = {
        "name": "New Project",
        "description": "Project description here",
        "creator_id": user.pk,
        "project_id": "unique-id"
    }
    Projects(**project_data).save()
    project_id = Projects.objects.first().pk
    del project_data["name"]
    del project_data["creator_id"]
    res = client.put(f'/projects/{project_id}', json=project_data, headers={
        "Authorization": auth_token
    })
    assert res.status_code == 200


def test_project_delete_success(client, auth_token):
    user = User.objects.first()
    project_data = {
        "name": "New Project",
        "description": "Project description here",
        "creator_id": user.pk,
        "project_id": "unique-id"
    }
    Projects(**project_data).save()
    project_id = Projects.objects.first().pk
    res = client.delete(f'/projects/{project_id}', headers={
        "Authorization": auth_token
    })
    assert res.status_code == 200
    assert b"deleted" in res.data


def test_project_delete_not_found(client, auth_token):
    user = User.objects.first()
    project_data = {
        "name": "New Project",
        "description": "Project description here",
        "creator_id": user.pk,
        "project_id": "unique-id"
    }
    Projects(**project_data).save()
    project_id = Projects.objects.first().pk
    Projects.drop_collection()
    res = client.delete(f'/projects/{project_id}', headers={
        "Authorization": auth_token
    })
    assert res.status_code == 404
    assert b"not found" in res.data


def test_project_delete_invalid_input(client, auth_token):
    user = User.objects.first()
    project_data = {
        "name": "New Project",
        "description": "Project description here",
        "creator_id": user.pk,
        "project_id": "unique-id"
    }
    Projects(**project_data).save()
    project_id = str(Projects.objects.first().pk)[:-1]
    res = client.delete(f'/projects/{project_id}', headers={
        "Authorization": auth_token
    })
    assert res.status_code == 422
    assert b"not a valid ObjectId" in res.data
