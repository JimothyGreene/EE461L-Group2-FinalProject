import pytest
import os
from api import create_app
from database import User, Projects


class TestConfig:
    MONGODB_SETTINGS = {
        'host': 'mongomock://localhost',
    }
    JWT_SECRET_KEY = os.environ['JWT_SECRET_KEY']
    TESTING = True

@pytest.fixture
def app():
    app = create_app(TestConfig)
    return app


@pytest.fixture(autouse=True)
def clean_db():
    User.drop_collection()
    Projects.drop_collection()
