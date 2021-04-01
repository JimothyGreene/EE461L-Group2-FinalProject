from flask import Blueprint, request
from flask_jwt_extended import jwt_required
from database.models import HardwareSet

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
