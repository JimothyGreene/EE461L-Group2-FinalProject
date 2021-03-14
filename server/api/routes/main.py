from flask import Blueprint
from database import User
import json

main = Blueprint('main', __name__)


@main.route('/')
def home():
    return "Hello, world"
