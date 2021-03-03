from flask import Flask
from flask_mongoengine import MongoEngine
from api.config import Config

db = MongoEngine()


def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)

    from api.routes.main import main
    app.register_blueprint(main)

    return app
