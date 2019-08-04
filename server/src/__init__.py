import connexion
from flask_mail import Mail
from flask_sqlalchemy import SQLAlchemy
from flask_socketio import SocketIO, join_room, emit
from flask_cors import CORS
from .middleware.cors_header_middleware import CorsHeaderMiddleware

db = SQLAlchemy()
socketio = SocketIO()
mail = Mail()


def create_app(config_name):
    connexion_app = connexion.App(__name__, specification_dir='./')
    flask_app = connexion_app.app
    connexion_app.add_api('openapi.yml')
    # Middleware
    # flask_app.wsgi_app = CorsHeaderMiddleware(flask_app.wsgi_app)
    flask_app.config.from_object(config_name)
    flask_app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    CORS(
        flask_app,
        resources={r"/api/*": {"origins": "*"}},
        supports_credentials=True
    )

    db.init_app(flask_app)
    mail.init_app(flask_app)
    socketio.init_app(flask_app)

    # from .users.controller import user
    # from .boards.controller import boards
    # from .tasks.controller import tasks
    # from .lists.controller import lists
    #
    # flask_app.register_blueprint(boards)
    # flask_app.register_blueprint(user)
    # flask_app.register_blueprint(tasks)
    # flask_app.register_blueprint(lists)

    return connexion_app
