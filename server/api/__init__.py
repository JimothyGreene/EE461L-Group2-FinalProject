from flask import Flask
from database import db
from api.config import Config
from flask_jwt_extended import JWTManager

jwt = JWTManager()


def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    jwt.init_app(app)

    from api.routes.main import main
    from api.routes.users import users
    from api.routes.projects import projects
    app.register_blueprint(main)
    app.register_blueprint(users, url_prefix='/users')
    app.register_blueprint(projects, url_prefix='/projects')

    return app
