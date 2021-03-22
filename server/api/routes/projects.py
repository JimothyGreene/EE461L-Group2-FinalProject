from flask import Blueprint, request
from database import Projects
from flask_jwt_extended import jwt_required
# from database import User
import json

projects = Blueprint('projects', __name__)


@projects.route('/create_projects', methods=['POST'])
def create_projects():
    req = request.get_json()
    new_proj = Projects(**req).save()
    return new_proj.to_json(), 200

@projects.route('/read_projects')
def read_projects():

    return
@projects.route('/update_projects')
def update_projects():

    return
@projects.route('/delete_projects')
def delete_projects():

    return
