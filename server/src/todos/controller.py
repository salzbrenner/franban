from flask import Blueprint
from src.todos.model import Todo
from connexion import request

todos = Blueprint('todo', __name__)


def create():
    """create new todo"""
    todo = Todo(**request.json)
    todo.save()
    # don't have to jsonify b/c connexion returns json
    response = {
        'id': todo.id,
        'name': todo.name,
        'date_created': todo.date_created,
        'date_modified': todo.date_modified,
    }
    return response, 201


def get_all():
    """get all todos"""
    created_by = request.args.get('created_by')

    if created_by:
        todos = Todo.query.filter_by(created_by=created_by)
    else:
        todos = Todo.get_all()

    results = []
    for todo in todos:
        obj = {
            'id': todo.id,
            'name': todo.name,
            'date_created': todo.date_created,
            'date_modified': todo.date_modified,
        }
        results.append(obj)
    return results, 200


def get(id):
    """get single todo by id"""
    todo = Todo.query.filter_by(id=id).first()
    if todo:
        response = {
            'id': todo.id,
            'name': todo.name,
            'date_created': todo.date_created,
            'date_modified': todo.date_modified,
            'created_by': todo.created_by
        }
        return response, 200
    else:
        return 'Todo not found', 404


def delete(id):
    todo = Todo.query.filter_by(id=id).first()
    if todo:
        todo.delete()
        return 'Todo deleted', 200
    else:
        return 'Todo not found', 404
