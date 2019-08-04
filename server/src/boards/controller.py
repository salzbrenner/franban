from flask import Blueprint, jsonify

from src.board_members.controller import add_board_member, get_board_members, get_boards_as_member
from src.users.controller import get_user, get_user_by_email, get_user_session_id
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
    all_users = []

    for board_member in get_board_members(board.id):
        user = get_user(board_member.uid)
        all_users.append({'id': user.id, 'email': user.email})

    board_owner = get_user(board.owner)
    all_users.append({'id': board_owner.id, 'email': board_owner.email})

    # deny access if not a member of board
    if not any(d['id'] == get_user_session_id() for d in all_users):
        return 'Access Denied', 403

    if board:
        result = {
            'id': board.id,
            'name': board.name,
            'lists': list_ids,
            'users': all_users,
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

        board_members = get_board_members(id)

        for bm in board_members:
            bm.delete()

        for l in board.lists:
            for t in l.tasks:
                t.delete()
            l.delete()

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

    if user and board:
        add_board_member(user.id, board.id)
        result = {
            'email': email,
            'id': user.id,
        }
        return result, 200
    else:
        return f'''{email} is not a registered user''', 406


def get_user_boards(uid):
    """
    Responds to a GET request for /api/{uid}/boards
    :param uid: integer
    :return: {'id': number, 'name': string}
    """
    results = []
    if uid != get_user_session_id():
        return results, 403

    user = get_user(uid)

    # get all boards user is member of
    as_member_boards = get_boards_as_member(uid)
    for board_member in as_member_boards:
        board = Board.query.filter_by(id=board_member.board_id).first()
        obj = {
            'id': board.id,
            'name': board.name,
        }
        results.append(obj)

    # get all boards user is owner of
    for board in user.boards:
        obj = {
            'id': board.id,
            'name': board.name,
        }
        results.append(obj)

    return results, 200