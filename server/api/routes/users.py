from flask import Blueprint, request
from database import User

users = Blueprint('users', __name__)


@users.route('/login', methods=['POST'])
def login():
    """POST users/login

    Desc: Logs in a user

    Returns:
        bool: True if user exists; False otherwise
    """
    req = request.get_json()
    user = User.objects(email=req['email'], password=req['password'])
    return str(bool(user))


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
