from flask import Blueprint, jsonify, current_app, session, Response
from src.users.model import User
from connexion import request, NoContent

from src.users.utils import send_reset_email

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
                'access_token': access_token.decode(),
                'uid': User.get_user_session_id(),
            })
            response.status_code = 201
            return response

        except Exception as e:
            response = jsonify({
                'message': str(e)
            })
            return response, 401

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
                    'access_token': access_token.decode(),
                    'uid': User.get_user_session_id(),
                }

                return response, 200
        else:
            # User does not exist, return error message
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
    """
    Clears user session
    TODO: invalidate JWT?
    :return:
    """
    User.clear_user_session_id()
    return NoContent, 204


def get_profile():
    """
    TODO: user profile
    :return:
    """
    return 'got it', 200


def get_user(id):
    """
    Returns specific user
    :param id:
    :return:
    """
    user = User.query.filter_by(id=id).first()
    return {
        'id': user.id,
        'email': user.email,
    }


def get_user_by_email(email):
    """
    Returns specific user from email
    :param email:
    :return:
    """
    user = User.query.filter_by(email=email).first()
    return user


def get_boards(uid):
    """
    Responds to a GET request for /api/{uid}/boards
    :param uid: integer
    :return: {'id': number, 'name': string}
    """
    results = []
    if uid != User.get_user_session_id():
        return results, 403

    user = User.query.filter_by(id=str(uid)).first()

    for board in user.boards:
        obj = {
            'id': board.id,
            'name': board.name,
        }
        results.append(obj)

    return results, 200


def reset_password_request(body):
    """
    Sends an email to reset password
    :param email:
    :return:
    """
    email = body['email']

    try:
        user = User.query.filter_by(email=email).first()
        send_reset_email(user)
        return 'An email has been sent with instructions to reset your password', 200

    except Exception as e:
        response = jsonify({
            'message': str(e)
        })
        return response, 401


def reset_password_verifier(token):
    """
    Verifies token from url path (client side) is valid
    :param token: jwt token
    :return:
    """
    try:
        decoded = User.decode_token(token)
        uid = decoded.get('sub')
        user = User.query.filter_by(id=uid).first()
        results = {
            'uid': uid,
            'message': 'Token verified',
        }
        return results, 200
    except Exception as e:
        response = jsonify({
            'message': str(e)
        })
        return response, 401


def change_user_password(token, body):
    """
    Verifies token is valid, and updates user password
    :param token: jwt token
    :return:
    """
    try:
        decoded = User.decode_token(token)
        uid = decoded.get('sub')
        password = body['password']
        user = User.query.filter_by(id=uid).first()
        user.update_password(password)

        return 'Password updated', 200
    except Exception as e:
        response = jsonify({
            'message': str(e)
        })
        return response, 401


