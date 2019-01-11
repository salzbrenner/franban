from .conftest import (register_user,
                       get_auth_headers)


class TestBoards(object):

    def create_board(self, client, data):
        headers = get_auth_headers(client)
        return client.post('/api/boards', json=data, headers=headers)

    def test_board_creation(self, client):
        data = {
            'name': 'Test Board',
            'uid': 1,
        }
        res = self.create_board(client, data)
        assert res.content_type == 'application/json'
        assert 'Test Board' in str(res.data)
        assert res.status_code == 201
