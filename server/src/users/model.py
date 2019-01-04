from src import db
from flask import current_app
from flask_bcrypt import Bcrypt
import jwt
from datetime import datetime, timedelta


class User(db.Model):
    """This class defines the users table """
    __tablename__ = 'users'

    # Define the columns of the users table, starting with the primary key
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(256), nullable=False, unique=True)
    password = db.Column(db.String(256), nullable=False)
    todos = db.relationship(
        'Todo', order_by='Todo.id', cascade="all, delete-orphan")

    def __init__(self, email, password):
        """Initialize the user with an email and password"""
        self.email = email
        self.password = Bcrypt().generate_password_hash(password).decode()

    def password_is_valid(self, password):
        """Checks password against its hash to validate password"""
        return Bcrypt().check_password_hash(self.password, password)

    def save(self):
        """Save user to database
        Includes creating new user and editing existing
        """
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    @staticmethod
    def generate_token(user_id):
        """generates access token"""
        try:
            # create payload with expiration
            payload = {
                'iat': datetime.utcnow(),
                'exp': datetime.utcnow() + timedelta(minutes=50),
                'sub': str(user_id),
            }

            return jwt.encode(payload,
                              current_app.config.get('SECRET'),
                              algorithm='HS256')
        except Exception as e:
            return str(e)

    @staticmethod
    def decode_token(token):
        """Decodes access token from authorization header"""
        try:
            return jwt.decode(token, current_app.config.get('SECRET'), algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise Exception('Expired token')
        except jwt.InvalidTokenError:
            raise Exception('Invalid token')
