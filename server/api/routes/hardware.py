from flask import Blueprint, request
from flask_jwt_extended import jwt_required
from database.models import HardwareSet, Projects
from mongoengine import ValidationError
from api.routes.validators import parse_error

hardware = Blueprint('hardware', __name__)


@hardware.route('/', methods=['POST'])
@jwt_required()
def hardware_create():
    """POST hardware/

    Desc: Creates a new hardware set

    Returns:
        201: newly created hardware set
    """
    req = request.get_json()
    new_hardware_set = HardwareSet(**req).save()
    return new_hardware_set.to_json(), 201


@hardware.route('/', methods=['GET'])
@jwt_required()
def hardware_read():
    """GET hardware/

    Desc: Gets all available hardware sets

    Returns:
        200: all hardware sets in the database
    """
    return HardwareSet.objects.to_json(), 200


@hardware.route('/<id>', methods=['PUT'])
@jwt_required()
def hardware_update(id):
    """PUT hardware/<id>

    Desc: Updates a specific hardware set

    Returns:
        200: updated hardware set object
    """
    req = request.get_json()
    hardware_set = HardwareSet.objects(id=id).first()
    hardware_set.update(**req)
    hardware_set.reload()
    return hardware_set.to_json(), 200


@hardware.route('/<id>', methods=['DELETE'])
@jwt_required()
def hardware_delete(id):
    """DELETE hardware/<id>

    Desc: Deletes a specific hardware set from the database

    Returns:
        200: success message
    """
    HardwareSet.objects(id=id).delete()
    return {'msg': 'Hardware set successfully deleted'}, 200


@hardware.route('/check-out/<id>', methods=['POST'])
@jwt_required()
def hardware_checkout(id):
    req = request.get_json()
    try:
        project = Projects.objects(id=req["project_id"]).first()
        if project:
            hardware_set = HardwareSet.objects(id=id).first()
            hardware_set.update(dec__available=req["amount"])
            hardware_set.reload()
            return hardware_set.to_json(), 200
        else:
            return {'msg': 'Project not found'}, 404
    except ValidationError as e:
        return parse_error(e), 422


@hardware.route('/check-in/<id>', methods=['POST'])
@jwt_required()
def hardware_checkin(id):
    req = request.get_json()
    try:
        project = Projects.objects(id=req["project_id"]).first()
        if project:
            hardware_set = HardwareSet.objects(id=id).first()
            hardware_set.update(inc__available=req["amount"])
            hardware_set.reload()
            return hardware_set.to_json(), 200
        else:
            return {'msg': 'Project not found'}, 404
    except ValidationError as e:
        return parse_error(e), 422

