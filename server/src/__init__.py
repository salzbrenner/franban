import connexion
from flask_mail import Mail
from flask_sqlalchemy import SQLAlchemy
from flask_socketio import SocketIO, join_room, emit
from flask_cors import CORS
from .middleware.cors_header_middleware import CookieHeaderMiddleware
import os
from flask_session import Session

sess = Session()
db = SQLAlchemy()
socketio = SocketIO()
mail = Mail()

template_dir = os.path.dirname(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))
template_dir = os.path.join(template_dir, 'templates')


def create_app(config_name):
    connexion_app = connexion.App(__name__, specification_dir='./')
    flask_app = connexion_app.app
    connexion_app.add_api('openapi.yml')
    # Middleware
    flask_app.config.from_object(config_name)
    # have to set this so that the session cookie is secure
    # for user tracking
    flask_app.wsgi_app = CookieHeaderMiddleware(flask_app.wsgi_app, flask_app)
    flask_app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    CORS(
        flask_app,
        resources={r"/api/*": {"origins": ["http://localhost:3000", "https://franban.aboutevan.com", "*"]}},
        supports_credentials=True
    )

    db.init_app(flask_app)
    mail.init_app(flask_app)
    socketio.init_app(flask_app, cors_allowed_origins="*", template_directory=template_dir)
    sess.init_app(flask_app)

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
