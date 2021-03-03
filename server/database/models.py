from pymongo import MongoClient
from api.config import Config

client = MongoClient(
    host=Config.MONGODB_SETTINGS['host'], username=Config.MONGODB_SETTINGS['username'], password=Config.MONGODB_SETTINGS['password'])
db = client.ee461L_mongodb


class User:
    def __init__(self, email='null', password='null'):
        self.email = email
        self.password = password

    def toDoc(self):
        return {
            'email': self.email,
            'password': self.password
        }
