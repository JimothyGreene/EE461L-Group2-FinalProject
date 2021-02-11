import os
import datetime

from flask import Flask, Response, request
from flask_mongoengine import MongoEngine


app = Flask(__name__)
app.config['MONGODB_SETTINGS'] = {
    'db': 'ee461l_DB',
    'host': os.environ['MONGODB_HOST'],
    'username': os.environ['MONGODB_USERNAME'],
    'password': os.environ['MONGODB_PASSWORD']
}

db = MongoEngine()
db.init_app(app)


@app.route("/")
def hello_world():
    return "Hello, World!"
