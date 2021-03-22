from flask import Flask
from database import db
from api.config import Config
from flask_jwt_extended import JWTManager
from flask_bcrypt import Bcrypt

jwt = JWTManager()
bcrypt = Bcrypt()

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    jwt.init_app(app)
    bcrypt.init_app(app)

    from api.routes.main import main
    from api.routes.users import users
    app.register_blueprint(main)
    app.register_blueprint(users, url_prefix='/users')

    return app
