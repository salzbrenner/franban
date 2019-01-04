from flask import Blueprint, jsonify, current_app
from src.users.model import User
from connexion import request
import jwt
auth = Blueprint('auth', __name__)


def register(body):
    email = body['email']
    password = body['password']

    # query to see if user already exists
    user = User.query.filter_by(email=email).first()
    if not user:
        try:
            user = User(email=email, password=password)
            user.save()

            # Generate the access token. This will be used as the authorization header
            access_token = user.generate_token(user.id)
            response = jsonify({
                'message': 'You registered successfully. Please log in',
                'access_token': access_token.decode()
            })
            response.status_code = 201
            return response

        except Exception as e:
            response = jsonify({
                'message': str(e)
            })
            response.status_code = 401
            return response

    else:
        response = jsonify({
            'message': 'There is an existing user. Please login.'
        })

        response.status_code = 422
        return response


def login(body):
    """user login and access token generation."""
    email = body['email']
    password = body['password']

    try:
        # Get the user object using their email (unique to every user)
        user = User.query.filter_by(email=email).first()

        # Try to authenticate the found user using their password
        if user and user.password_is_valid(password):
            # Generate the access token. This will be used as the authorization header
            access_token = user.generate_token(user.id)
            if access_token:
                response = {
                    'message': 'You logged in successfully.',
                    'access_token': access_token.decode()
                }
                return response, 200
        else:
            # User does not exist. Therefore, we return an error message
            response = {
                'message': 'Invalid email or password, Please try again'
            }
            return response, 401

    except Exception as e:
        # Create a response containing an string error message
        response = {
            'message': str(e)
        }
        # Return a server error using the HTTP Error Code 500 (Internal Server Error)
        return response, 500


def authenticate(access_token):
    uid = User.decode_token(access_token)
    if isinstance(uid, str):
        return None
    return {'uid': uid, 'scope': ['uid']}

    # try:
    #     return jwt.decode(access_token,
    #                       current_app.config.get('SECRET'),
    #                       algorithm='HS256')
    # except:
    #     return None


