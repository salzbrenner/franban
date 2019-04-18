from flask import Blueprint
from .model import Task
from connexion import request, NoContent
from src import db

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
    response = {
        'id': task.id,
        'name': task.name,
        'order': task.order
    }
    return response, 201


def get_all(list_id):
    """
    Responds to GET request for /api/tasks/<list_id>
    :param list_id:
    :return:
    """
    results = []
    tasks = Task.query.filter_by(list_id=list_id)

    for task in tasks:
        res = {
            'name': task.name,
            'order': task.order,
            'id': task.id,
            'list_id': task.list_id
        }
        results.append(res)

    return results, 200


def put(task_id, id, body):
    """
    Responds to PUT request for /api/tasks/<task_id>/<id>
    :param task_id:
    :param id:
    :param body: the request body needs key: 'name'
    :return:
    """
    task = Task.query.filter_by(task_id=task_id, id=id).first()
    name = body['name']
    order = int(body['order'])
    if task:
        task.update(name, order)
        return 'Updated task name to: ' + task.name + ' and order to:' + str(task.order), 200
    else:
        return 'Task does not exist', 404

def delete(task_id, id):
    """
    :param id:
    Responds to DELETE request for /api/tasks/<task_id>/<id>
    :return:
    """
    task = Task.query.filter_by(task_id=task_id, id=id).first()

    if task:
        task.delete()
        return NoContent, 204
    else:
        return 'Task does not exist', 404
