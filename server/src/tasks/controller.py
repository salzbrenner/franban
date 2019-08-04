from flask import Blueprint

from src.socket import TASK_ADDED, TASK_DELETED, TASK_UPDATED
import src.lists as lists
from src.users.controller import get_user_session_id
from .model import Task
from connexion import request, NoContent
from src import db, socketio

tasks = Blueprint('tasks', __name__)


def create(body):
    """
    Responds to a POST request for /api/tasks
    :return:
    """
    name = body['name']
    list_id = body['list_id']
    task = Task(name, list_id)
    task.save()
    board_id = lists.get_list(list_id).get('board_id')

    response = {
        'id': task.id,
        'name': task.name,
        'order': task.order
    }

    socketio.emit(
        TASK_ADDED,
        room=board_id,
        data=get_user_session_id(),
    )

    return response, 201


def get(id):
    """
    Responds to GET request for /api/tasks/<task_id>
    :param id:
    :return:
    """
    task = Task.query.filter_by(id=id).first()
    res = {
        'id': task.id,
        'name': task.name,
        'order': task.order,
        'list_id': task.list_id,
    }
    return res, 200


def get_all_in_list():
    """
    Responds to GET request for /api/tasks
    :param list_id:
    :return: all tasks for list
    """
    list_id = request.args.get('list')

    results = []
    tasks = Task.query\
        .filter_by(list_id=list_id)\
        .order_by(Task.order).all()

    for task in tasks:
        res = {
            'name': task.name,
            'order': task.order,
            'id': task.id,
            'list_id': task.list_id
        }
        results.append(res)

    return results, 200


def put(id, body):
    """
    Responds to PUT request for /api/tasks/<id>
    - Updates task name
    - Updates the order of task
    :param id:
    :param body: the request body needs key: 'name'
    :return:
    """
    task = Task.query.filter_by(id=id).first()
    name = body['name']
    position = int(body['order'])
    list_id = int(body['list_id'])
    if task:
        task.update(list_id, name, position)
        board_id = lists.get_list(list_id).get('board_id')

        socketio.emit(
            TASK_UPDATED,
            room=board_id,
            data=get_user_session_id(),
        )

        return 'Updated task name to: ' + task.name + ' and order to:' + str(task.order), 200
    else:
        return 'Task does not exist', 404


def delete(id):
    """
    :param id:
    Responds to DELETE request for /api/tasks/<id>
    :return:
    """
    task = Task.query.filter_by(id=id).first()

    if task:
        board_id = lists.get_list(task.list_id).get('board_id')

        socketio.emit(
            TASK_DELETED,
            room=board_id,
            data=get_user_session_id(),
        )

        task.delete()
        return NoContent, 204
    else:
        return 'Task does not exist', 404
