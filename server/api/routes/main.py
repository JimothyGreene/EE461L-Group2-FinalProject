from flask import Blueprint
from database import db
import json

main = Blueprint('main', __name__)


@main.route('/')
def home():
    return "Hello, world"


@main.route('/users')
def users():
    out = ""
    users = db.users.find({})
    for user in users:
        out += "Email: {0}, Password: {1} <br/>".format(
            user['email'], user['password'])
    return out
