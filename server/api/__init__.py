from flask import Flask
from database import db
from api.config import Config
from flask_jwt_extended import JWTManager
from flask_cors import CORS

jwt = JWTManager()
cors = CORS()


def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    jwt.init_app(app)
    cors.init_app(app)

    from api.routes.main import main
    from api.routes.users import users
    from api.routes.hardware import hardware
    app.register_blueprint(main)
    app.register_blueprint(users, url_prefix='/users')
    app.register_blueprint(hardware, url_prefix='/hardware')

    return app
