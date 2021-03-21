from flask import Blueprint, request
from flask_jwt_extended import create_access_token
from database import User
from api.routes.validators.users import valid_email, valid_password

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

    Desc: Registers a new user

    Returns:
        201: new user object
    """
    req = request.get_json()
    new_user = User(**req).save()
    return new_user.to_json(), 201
