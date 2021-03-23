from flask import Blueprint
from database.models import HardwareSet

hardware = Blueprint('hardware', __name__)


@hardware.route('/test', methods=['POST'])
def hardware_test():
    new_set = HardwareSet(capacity=200, available=100).save()
    return new_set.to_json(), 201
