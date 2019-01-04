from .conftest import register_user, login_user, get_access_token, register_second_user


class TestBoards(object):

    def user_setup(self, client):
        register_user(client)
        login_user(client)
        return get_access_token(client)

    def get_headers(self, client):
        return {
            'Authorization': 'Bearer ' + self.user_setup(client),
            'content-type': 'application/json'
        }

    def create_board(self, client, data):
        headers = self.get_headers(client)
        return client.post('/api/boards', json=data, headers=headers)

    def test_board_creation(self, client):
        data = {
            'name': 'Test Board',
            'user': 1,
        }
        res = self.create_board(client, data)
        assert res.content_type == 'application/json'
        assert 'Test Board' in str(res.data)
        assert res.status_code == 201

    def test_can_get_all_boards_for_user(self, client):
        headers = self.get_headers(client)

        self.create_board(client, {'name': 'Test One', 'user': 1})
        self.create_board(client, {'name': 'Test Two', 'user': 1})
        self.create_board(client, {'name': 'Test Three', 'user': 1})

        res = client.get('/api/boards?user=1', headers=headers)
        assert len(res.json) == 3
        assert res.status_code == 200

    def test_cannot_get_boards_of_other_users(self, client):
        headers = self.get_headers(client)
        register_second_user(client)

        self.create_board(client, {'name': 'Test One', 'user': 1})
        self.create_board(client, {'name': 'Test Three', 'user': 2})
        self.create_board(client, {'name': 'Test Three', 'user': 2})

        res = client.get('/api/boards?user=2', headers=headers)
        print(res.json)
        assert res.status_code == 200
