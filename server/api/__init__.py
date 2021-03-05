from flask import Flask
from database import db, seed
from api.config import Config
import os


def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)

    seed()

    from api.routes.main import main
    app.register_blueprint(main)

    return app
