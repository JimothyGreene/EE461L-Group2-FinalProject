from flask import Blueprint, request
from flask_jwt_extended import jwt_required
from database.models import HardwareSet
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
        422: validation errors
    """
    req = request.get_json()
    try:
        new_hardware_set = HardwareSet(**req).save()
        return new_hardware_set.to_json(), 201
    except ValidationError as e:
        return parse_error(e), 422


@hardware.route('/', methods=['GET'])
@jwt_required()
def hardware_read():
    """GET hardware/

    Desc: Gets all available hardware sets

    Returns:
        200: all hardware sets in the database
    """
    return HardwareSet.objects.to_json(), 200

@hardware.route('/<id>', methods=['GET'])
@jwt_required()
def hardware_read():
    """GET hardware/<id>

    Desc: Gets hardware set associated with a project ID

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
        404: hardware set not found
        422: validation errors
    """
    req = request.get_json()
    try:
        hardware_set = HardwareSet.objects(id=id).first()
        if hardware_set:
            hardware_set.update(**req)
            hardware_set.reload()
            return hardware_set.to_json(), 200
        else:
            return {'msg': 'Hardware set not found'}, 404
    except ValidationError as e:
        return parse_error(e), 422




@hardware.route('/<id>', methods=['DELETE'])
@jwt_required()
def hardware_delete(id):
    """DELETE hardware/<id>

    Desc: Deletes a specific hardware set from the database

    Returns:
        200: success message
        404: hardware set not found
        422: validation errors
    """

    try:
        if HardwareSet.objects(id=id).delete() > 0:
            return {'msg': 'Hardware set successfully deleted'}, 200
        else:
            return {'msg': 'Hardware set not found'}, 404
    except ValidationError as e:
        return parse_error(e), 422
