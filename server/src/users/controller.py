from flask import Blueprint, jsonify, current_app
from src.users.model import User
from src.boards.model import Board
from connexion import request, NoContent
import jwt

user = Blueprint('user', __name__)


def register(body):
    """
        Responds to a request for /api/register
        :param body:   dict containing keys email, password
        :return:            JWT token, message
    """
    email = body['email']
    password = body['password']

    # query to see if user already exists
    user = User.query.filter_by(email=email).first()
    if not user:
        try:
            user = User(email=email, password=password)
            user.save()

            # save user id in session for authorization purposes
            User.save_user_session_id(user.id)
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
    """
        Responds to a request for /api/login
        :param body: dict containing keys email, password
        :return: JWT token, message
    """

    email = body['email']
    password = body['password']

    try:
        # Get the user object using their email (unique to every user)
        user = User.query.filter_by(email=email).first()

        # Try to authenticate the found user using their password
        if user and user.password_is_valid(password):
            # save user id in session for authorization purposes
            User.save_user_session_id(user.id)
            # Generate the access token.
            # This will be used as the authorization header
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


def logout():
    User.clear_user_session_id()
    return NoContent, 204


def get_profile():
    return 'got it', 200


def get_boards(uid):
    """
        Responds to a GET request for /api/{uid}/boards
        :param uid: integer
        :return: {'id': number, 'name': string}
    """
    results = []
    if uid != User.get_user_session_id():
        return results, 403

    boards = Board.query.filter_by(uid=str(uid))

    for board in boards:
        obj = {
            'id': board.id,
            'name': board.name,
        }
        results.append(obj)
    return results, 200


# def authenticate(access_token):
#     uid = User.decode_token(access_token)
#     if isinstance(uid, str):
#         return None
#     return {'uid': uid, 'scope': ['uid']}

# try:
#     return jwt.decode(access_token,
#                       current_app.config.get('SECRET'),
#                       algorithm='HS256')
# except:
#     return None
