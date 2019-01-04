import connexion
from flask_sqlalchemy import SQLAlchemy
from flask_socketio import SocketIO, join_room, emit
from flask_cors import CORS

db = SQLAlchemy()
socketio = SocketIO()


def create_app(config_name):
    connexion_app = connexion.App(__name__, specification_dir='./')
    connexion_app.add_api('openapi.yml')
    app = connexion_app.app
    CORS(app)
    app.config.from_object(config_name)
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)
    socketio.init_app(app)

    from .todos.controller import todos
    from .users.controller import user
    from .boards.controller import boards

    app.register_blueprint(todos)
    app.register_blueprint(boards)
    app.register_blueprint(user)

    return connexion_app
