from src import db
from flask import current_app, session
from flask_bcrypt import Bcrypt
import jwt
from datetime import datetime, timedelta

from src.users.utils import send_reset_email


class User(db.Model):
    """
    This class defines the users table
    """
    __tablename__ = 'users'

    # Define the columns of the users table, starting with the primary key
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(256), nullable=False, unique=True)
    password = db.Column(db.String(256), nullable=False)
    boards = db.relationship(
        'Board', order_by='Board.id', backref='user')

    def __init__(self, email, password):
        """
        Initialize the user with an email and password
        :param email: string
        :param password: string
        """
        self.email = email
        self.password = Bcrypt().generate_password_hash(password).decode()

    def password_is_valid(self, password):
        """
        Checks password against its hash to validate password.
        :param password: string
        :return:
        """
        return Bcrypt().check_password_hash(self.password, password)

    def save(self):
        """
        Save user to DB (creation and updating).
        :return:
        """
        db.session.add(self)
        db.session.commit()

    def delete(self):
        """
        Delete user from DB.
        :return:
        """
        db.session.delete(self)
        db.session.commit()

    @staticmethod
    def save_user_session_id(uid):
        """
        Sets the 'current_user' session id
        :param uid: string
        :return:
        """
        try:
            session['current_user'] = uid
            session.permanent = True
        except Exception as e:
            return e

    @staticmethod
    def get_user_session_id():
        """
        Gets session user id
        :return: id, string
        """
        try:
            return session['current_user']
        except Exception as e:
            return e

    @staticmethod
    def clear_user_session_id():
        """
        Removes user id from session
        :return:
        """
        session.pop('current_user', None)

    @staticmethod
    def generate_token(user_id, minutes=50):
        """
        Creates access token
        :param user_id: number
        :param minutes: number
        :return: string, encoded jwt
        """
        try:
            # create payload with expiration
            payload = {
                'iat': datetime.utcnow(),
                'exp': datetime.utcnow() + timedelta(minutes=minutes),
                'sub': str(user_id),
            }

            return jwt.encode(payload,
                              current_app.config.get('SECRET_API_KEY'),
                              algorithm='HS256')
        except Exception as e:
            return str(e)

    @staticmethod
    def decode_token(token):
        """
        Decodes access token from authorization header
        :param token: string
        :return:
        """
        try:
            return jwt.decode(token, current_app.config.get('SECRET_API_KEY'), algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise Exception('Expired token')
        except jwt.InvalidTokenError:
            raise Exception('Invalid token')




