from flask import Blueprint, request
from flask_jwt_extended import create_access_token
from database import User
from api.routes.validators.users import valid_email, valid_password

users = Blueprint('users', __name__)

@users.route('/login', methods=['POST'])
def login():
    """POST users/login

    Desc: Logs in a user
          Ensures fields are not blank
          Validates email used to log in
          Checks if an account exists at all
          Checks if an account exists and the password was incorrect

    Returns:
        200: success - true
        401: password was incorrect, unauthorized access
        404: no account was found
    """
    req = request.get_json()
    if req['email'] == '' or req['password'] == '':
        return {
            'error': 'Fields must not be empty.'
        }, 404
    
    user = User.objects(email=req['email']).first()
    if not user:
        return {
            'error': 'No account with this email exists.'
        }, 404

    user = User.objects(email=req['email'], password=req['password']).first()
    if not user:
        return {
            'error': 'An account was found but the password is incorrect.'
        }, 401
    
    access_token = create_access_token(identity=user)
    return {
        'token': access_token
    }, 200


@users.route('/register', methods=['POST'])
def register():
    """POST users/register

    Desc: Registers a new user
          Validates email and password used to register
          Ensures new accounts are not duplicates

    Returns:
        201: new user object
        401: validation error, unauthorized access
        409: duplicate account, conflict with database
    """
    req = request.get_json()
    check_email = valid_email(req['email'])
    check_password = valid_password(req['password'])

    if not check_email[0]:
        return {
            'error': check_email[1]
        }, 401
    if not check_password[0]:
        return {
            'error': check_password[1]
        }, 401
    
    user = User.objects(email=check_email[1]).first()
    if user:
        return {
            'error': 'Account could not be created. User already exists.'
        }, 409

    new_user = User(**req).save()
    return new_user.to_json(), 201
