from flask import Blueprint, request
from database import Projects
from flask_jwt_extended import jwt_required
# from database import User
import json

projects = Blueprint('projects', __name__)

