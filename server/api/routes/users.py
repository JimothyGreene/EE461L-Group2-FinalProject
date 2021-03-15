from flask import Blueprint, request
from database import User

users = Blueprint('users', __name__)


@users.route('/login', methods=['POST'])
def login():
    """POST users/login

    Desc: Logs in a user

    Returns:
        200: success - true
        401: success - false
    """
    req = request.get_json()
    user = User.objects(email=req['email'], password=req['password'])
    return {
        'success': bool(user)
    }, 200 if bool(user) else 401


@users.route('/register', methods=['POST'])
def register():
    """POST users/register

    Desc: Registers a new user

    Returns:
        201: new user object
    """
    req = request.get_json()
    new_user = User(**req).save()
    return new_user.to_json(), 201
