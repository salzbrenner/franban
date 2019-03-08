import pytest
import json
import connexion
from src import db
import os

from src import create_app

app = create_app(config_name=os.environ['TEST_SETTINGS']).app


@pytest.fixture()
def anon_client():
    c = app.test_client()
    with app.app_context():
        db.create_all()
        yield c
        db.session.close()
        db.drop_all()


@pytest.fixture(scope="class")
def authenticated_client():
    c = app.test_client()
    with app.app_context():
        db.create_all()
        res = c.post(
            '/api/register',
            data={
                'email': 'dude@dude.com',
                'password': 'password',
            },
            headers={
                'content-type': 'application/x-www-form-urlencoded'
            })
        c.access_token = json.loads(res.data.decode()).get('access_token')
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


def register_user(instance):
    return instance.post(
        '/api/register',
        data=user_registration,
        headers={
            'content-type': 'application/x-www-form-urlencoded'
        }
    )


def register_second_user(instance):
    return instance.post(
        '/api/register',
        data=second_user,
        headers={
            'content-type': 'application/x-www-form-urlencoded'
        }
    )


def login_user(instance):
    return instance.post(
        '/api/login',
        data=user_registration,
        headers={
            'content-type': 'application/x-www-form-urlencoded'
        }
    )


def get_access_token(instance):
    return json.loads(login_user(instance).data.decode())['access_token']


def get_auth_headers(instance):
    return {
        'Authorization': 'Bearer ' + instance.access_token,
        'content-type': 'application/json'
    }


def create_board(instance, data):
    headers = {
        'Authorization': 'Bearer ' + instance.access_token,
        'content-type': 'application/x-www-form-urlencoded'
    }
    return instance.post('/api/boards', data=data, headers=headers)
