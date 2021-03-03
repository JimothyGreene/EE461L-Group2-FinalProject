import os


class Config:
    MONGODB_SETTINGS = {
        'db': 'ee461l_DB',
        'host': os.environ['MONGODB_HOST'],
        'username': os.environ['MONGODB_USERNAME'],
        'password': os.environ['MONGODB_PASSWORD']
    }
