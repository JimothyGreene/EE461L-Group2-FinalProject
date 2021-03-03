import os


class Config:
    MONGODB_SETTINGS = {
        'db': os.environ['MONGODB_DATABASE'],
        'host': os.environ['MONGODB_HOST'],
        'username': os.environ['MONGODB_USERNAME'],
        'password': os.environ['MONGODB_PASSWORD']
    }
