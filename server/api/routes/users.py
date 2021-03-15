from flask import Blueprint, request
from flask_jwt_extended import create_access_token
from database import User

users = Blueprint('users', __name__)


@users.route('/login', methods=['POST'])
def login():
    """POST users/login

    Desc: Logs in a user

    Returns:
        success: true if user exists else false

    Status:
        200: user found
        401: user not found (unauthorized)
    """
    req = request.get_json()
    user = User.objects(email=req['email'], password=req['password']).first()
    if user:
        access_token = create_access_token(identity=user)
        return {
            'token': access_token
        }, 200
    else:
        return {
            'error': 'SPECIFIC ERRORS HERE'
        }, 401


@users.route('/register', methods=['POST'])
def register():
    """POST users/register

    Returns:
        email: email of created user
        password: password of created user

    Status:
        201: new user successfully created
    """
    req = request.get_json()
    new_user = User(email=req['email'], password=req['password']).save()
    return {
        'email': new_user.email,
        'password': new_user.password
    }, 201
