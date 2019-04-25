from flask import Blueprint, jsonify
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

    if board:
        result = {
            'id': board.id,
            'name': board.name,
            'lists': list_ids
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
        board.update(body['name'])
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
