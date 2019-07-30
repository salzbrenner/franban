from flask import Blueprint, jsonify

from src.users.controller import get_user, get_user_by_email
from .model import Board
from connexion import request, NoContent
from src import socketio
from ..socket import BOARD_ADDED

boards = Blueprint('boards', __name__)


def create(body):
    """
        Responds to a POST request for /api/boards
        :return:
    """
    name = body['name']
    uid = body['uid']
    board = Board(name, uid)
    board.save()
    response = {
        'id': board.id,
        'name': board.name,
    }
    socketio.emit(BOARD_ADDED)
    return response, 201


def get(id):
    """
    Responds to GET request for /api/boards/<board_id>
    :param id:
    :return:
    """
    board = Board.query.filter_by(id=id).first()
    lists = board.lists
    list_ids = [l.id for l in lists]
    users = []

    for uid in board.users:
        users.append(get_user(uid))

    users.append(get_user(board.owner))

    if board:
        result = {
            'id': board.id,
            'name': board.name,
            'lists': list_ids,
            'users': users,
        }
        return result, 200
    else:
        return 'Board does not exist', 404


def put(id, body):
    """
    Responds to PUT request for /api/boards/<board_id>
    :param id:
    :param body: the request body needs key: 'name'
    :return:
    """
    board = Board.query.filter_by(id=id).first()
    if board:
        board.update_name(body['name'])
        return 'Updated board to ' + board.name, 200
    else:
        return 'Board does not exist', 404


def delete(id):
    """
    :param id:
    Responds to DELETE request for /api/boards/<board_id>
    :return:
    """
    board = Board.query.filter_by(id=id).first()

    if board:
        board.delete()
        return NoContent, 204
    else:
        return 'Board does not exist', 404


def invite_user(body, id):
    """
    Sends an email notifying recipient that they have been granted access to a board
    :param body: requestBody
    :return:
    """
    email = body.get('email')
    user = get_user_by_email(email)
    board = Board.query.filter_by(id=id).first()

    if user and user:
        board.append_user(user.id)
        result = {
            'email': email,
            'id': user.id,
        }
        return result, 200
    else:
        return f'''{email} is not a registered user''', 406


