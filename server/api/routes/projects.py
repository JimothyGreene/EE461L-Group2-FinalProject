from flask import Blueprint, request, jsonify
from database import Projects
from flask_jwt_extended import get_jwt_identity, jwt_required
from mongoengine import ValidationError
import json

projects = Blueprint('projects', __name__)


@projects.route('/', methods=['POST'])
@jwt_required()
def projects_create():
    """POST projects/
    Desc: Creates a new project
    Returns:
        201: newly created project
        422: 
    """
    req = request.get_json()
    req["creator_id"] = get_jwt_identity()["_id"]["$oid"]
    try:
        new_project = Projects(**req).save()
        return new_project.to_json(), 201
    except ValidationError as e:
        return jsonify(str(e.errors)), 422


@projects.route('/', methods=['GET'])
@jwt_required()
def projects_read():
    """GET projects/
    Desc: Gets all available projects associated with the current user
    Returns:
        200: all projects in the database
    """
    return Projects.objects(creator_id=get_jwt_identity()["_id"]["$oid"]).to_json(), 200


@projects.route('/<id>', methods=['PUT'])
@jwt_required()
def projects_update(id):
    """PUT projects/<id>
    Desc: Updates a specific projects
    Returns:
        200: updated projects object
    """
    req = request.get_json()
    curr_project = Projects.objects(id=id).first()
    curr_project.update(**req)
    curr_project.reload()
    return curr_project.to_json(), 200


@projects.route('/<id>', methods=['DELETE'])
@jwt_required()
def projects_delete(id):
    """DELETE projects/<id>
    Desc: Deletes a specific project from the database
    Returns:
        200: success message
    """
    Projects.objects(id=id).delete()
    return {'msg': 'Projects set successfully deleted'}, 200
