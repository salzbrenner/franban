import pytest
import json
import connexion
from src import db
import os

from src import create_app

app = create_app(config_name=os.environ['TEST_SETTINGS']).app


@pytest.fixture()
def client():
    c = app.test_client()
    with app.app_context():
        db.create_all()
        yield c
        db.session.close()
        db.drop_all()


user_registration = {
    'email': 'dude@dude.com',
    'password': 'password',
}

second_user = {
    'email': 'stupididiot@moron.com',
    'password': 'password',
}

headers = {
    'content-type': 'application/x-www-form-urlencoded'
}


def register_user(client):
    return client.post('/api/register', data=user_registration,
                       headers=headers)


def register_second_user(client):
    return client.post('/api/register', data=second_user,
                       headers=headers)


def login_user(client):
    return client.post('/api/login', data=user_registration,
                       headers=headers)


def get_access_token(client):
    return json.loads(login_user(client).data.decode())['access_token']


def user_setup(client):
    register_user(client)
    return get_access_token(client)


def get_auth_headers(client):
    return {
        'Authorization': 'Bearer ' + user_setup(client),
        'content-type': 'application/json'
    }


def create_board(client, data):
    return client.post('/api/boards', json=data, headers=get_auth_headers(client))
