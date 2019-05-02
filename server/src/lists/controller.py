from flask import Blueprint, json
from .model import List
from connexion import request, NoContent

lists = Blueprint('lists', __name__)


def create(body):
    """
    Responds to a POST request for /api/lists
    :return:
    """
    name = body['name']
    board_id = body['board_id']
    list = List(name, board_id)
    list.save()
    response = {
        'id': list.id,
        'name': list.name,
        'order': list.order
    }
    return response, 201


def get_all_in_board(**kwargs):
    """
    Responds to GET request for /api/lists
    :param board_id:
    :return:
    """
    board_id = request.args.get('board')

    results = []
    lists = List.query.filter_by(board_id=board_id).all()

    for list in lists:
        res = {
            'name': list.name,
            'order': list.order,
            'id': list.id,
            'board_id': list.board_id
        }
        results.append(res)

    return results, 200


def get(id):
    """
    Responds to a GET request for /api/lists/<list_id>
    :param list_id:
    :return:
    """
    list = List.query.filter_by(id=id).first()
    res = {
        'name': list.name,
        'order': list.order,
        'id': list.id,
        'board_id': list.board_id
    }
    return res, 200


# def get_all(board_id):
#     """
#     Responds to GET request for /api/lists/<board_id>
#     :param board_id:
#     :return:
#     """
#     results = []
#     lists = List.query.filter_by(board_id=board_id).order_by(List.order)
#
#     for list in lists:
#         res = {
#             'name': list.name,
#             'order': list.order,
#             'id': list.id,
#             'board_id': list.board_id
#         }
#         results.append(res)
#
#     return results, 200


def put(id, body):
    """
    Responds to PUT request for /api/lists/<id>
    - Updates board name
    - Updates the order of a single list in a board
    - Other list orders in same board are updated automatically
    via the relationship definition in Board
    :param id:
    :param body: the request body needs key: 'name'
    :return:
    """
    list = List.query.filter_by(id=id).first()
    name = body['name']
    position = int(body['order'])
    if list:
        list.update(name, position)
        return 'Updated list name to: ' + list.name + ' and order to:' + str(list.order), 200
    else:
        return 'List does not exist', 404


def delete(id):
    """
    :param id:
    Responds to DELETE request for /api/lists/<board_id>/<id>
    :return:
    """
    list = List.query.filter_by(id=id).first()

    if list:
        list.delete()
        return NoContent, 204
    else:
        return 'List does not exist', 404
