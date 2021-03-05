from flask_mongoengine import MongoEngine
from api.config import Config

db = MongoEngine()


class User(db.Document):
    # Once seeding issues figured out, add unique=True
    email = db.EmailField(required=True)
    password = db.StringField(require=True)
