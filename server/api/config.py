import os


class Config:
    MONGODB_SETTINGS = {
        'username': os.environ['MONGODB_USERNAME'] or None,
        'password': os.environ['MONGODB_PASSWORD'] or None,
        'db': os.environ['MONGODB_DATABASE'] or None,
        'host': os.environ['MONGODB_HOST'] or None,
        'authentication_source': 'admin'
    }
    JWT_SECRET_KEY = os.environ['JWT_SECRET_KEY']
