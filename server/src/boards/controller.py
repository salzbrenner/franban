from flask import Blueprint
from src.users.model import User
from .model import Board
from connexion import request

boards = Blueprint('boards', __name__)


def create():
    """
        Responds to a POST request for /api/boards
        :return:
    """
    board = Board(**request.json)
    board.save()
    response = {
        'id': board.id,
        'name': board.name,
    }
    return response, 201


# def get_all_boards_for_user(uid):
#     """
#         Responds to a GET request for /api/boards?uid={id}
#         :param uid: integer
#         :return: {'id': number, 'name': string}
#     """
#     results = []
#
#     if uid != User.get_user_session_id():
#         return results, 403
#
#     boards = Board.query.filter_by(uid=str(uid))
#
#     for board in boards:
#         obj = {
#             'id': board.id,
#             'name': board.name,
#         }
#         results.append(obj)
#     return results, 200
