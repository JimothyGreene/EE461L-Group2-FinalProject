import pytest
import os
from api import create_app


class TestConfig:
    MONGODB_SETTINGS = {
        'host': 'mongomock://localhost',
    }
    JWT_SECRET_KEY = os.environ['JWT_SECRET_KEY']

@pytest.fixture
def app():
    app = create_app(TestConfig)
    return app
