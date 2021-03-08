from flask import Blueprint
from database import User
import json

main = Blueprint('main', __name__)


@main.route('/')
def home():
    return "Hello, world"


@main.route('/users')
def users():
    out = ""
    for user in User.objects():
        out += "Email: {0}, Password: {1} <br/>".format(
            user['email'], user['password'])
    return out
