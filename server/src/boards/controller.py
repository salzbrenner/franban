from flask import Blueprint, session
from src.users.model import User
from .model import Board
from connexion import request

boards = Blueprint('boards', __name__)


def create():
    """create new board"""
    board = Board(**request.json)
    board.save()
    response = {
        'id': board.id,
        'name': board.name,
    }
    return response, 201


def get_all_related_to_user():
    """get all boards that a user is a member of"""
    request_id = request.args.get('user')

    if request_id != User.get_user_session_id():
        return 403

    boards = Board.query.filter_by(user=request_id)

    results = []

    for board in boards:
        obj = {
            'id': board.id,
            'name': board.name,
        }
        results.append(obj)
    return results, 200
