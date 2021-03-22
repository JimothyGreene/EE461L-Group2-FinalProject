from flask_mongoengine import MongoEngine
from api.config import Config

db = MongoEngine()


class User(db.Document):
    """User for our site. Data used to log into and manage
    resources for the site

    Fields:
        first_name: user's first name
        last_name: user's last name
        email: user's email (unique identifier)
        password: user's hashed password
    """
    first_name = db.StringField(required=True)
    last_name = db.StringField(required=True)
    email = db.EmailField(required=True, unique=True)
    password = db.StringField(required=True)

class Projects(db.Document):
    """Projects for our site. The Data that is associated with the 
    projects

    Field:
        name: the name of the project
        description: description of the project
    """
    name = db.StringField(required=True)
    description = db.StringField(required=True)
    creator_id = db.ObjectIdField(required=True)