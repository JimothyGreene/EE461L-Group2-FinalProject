import os


class Config:
    MONGODB_SETTINGS = {
        'username': os.environ['MONGODB_USERNAME'],
        'password': os.environ['MONGODB_PASSWORD'],
        'db': os.environ['MONGODB_DATABASE'],
        'host': os.environ['MONGODB_HOST'],
        'authentication_source': 'admin'
    }
