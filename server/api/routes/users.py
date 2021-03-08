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
