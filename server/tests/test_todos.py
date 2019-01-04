from .conftest import register_user, login_user, get_access_token


class TestTodo(object):

    def user_setup(self, client):
        register_user(client)
        login_user(client)
        return get_access_token(client)

    def get_headers(self, client):
        return {
            'Authorization': 'Bearer ' + self.user_setup(client),
            'content-type': 'application/json'
        }

    def test_todo_creation(self, client):
        headers = self.get_headers(client)
        data = {
            'name': 'Eat a ham sandwich',
            # user instantiated on each test, so created_by is first user
            'created_by': 1
        }
        res = client.post('/api/todos', json=data, headers=headers)
        assert res.content_type == 'application/json'
        assert 'sandwich' in str(res.data)
        assert res.status_code == 201

    def test_can_get_all_todos(self, client):
        headers = self.get_headers(client)
        res = client.get('/api/todos?created_by=1', headers=headers)
        assert res.content_type == 'application/json'
        assert res.status_code == 200

    def test_can_get_single_todo(self, client):
        headers = self.get_headers(client)
        todo_id = '1'
        self.test_todo_creation(client)
        res = client.get('/api/todos/' + todo_id, headers=headers)
        assert res.status_code == 200
        assert res.json['id'] == int(todo_id)

    def test_can_delete_single_todo(self, client):
        headers = self.get_headers(client)
        todo_id = '1'
        self.test_todo_creation(client)
        res = client.delete('/api/todos/' + todo_id, headers=headers)
        assert res.status_code == 200
        assert 'deleted' in str(res.data)

