from flask import Flask
from database import *
from api.config import Config


def create_app(config_class=Config):
    app = Flask(__name__)

    from api.routes.main import main
    app.register_blueprint(main)

    seed()

    return app
