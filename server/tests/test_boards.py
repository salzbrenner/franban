from .conftest import (create_board,
                        user_setup,
                       get_auth_headers)


class TestBoards(object):
    @staticmethod
    def get_board_data():
        return {
            'name': 'Test Board',
            'uid': 1,
        }

    def test_board_creation(self, client):
        data = self.get_board_data()
        res = create_board(client, data)
        assert res.content_type == 'application/json'
        assert 'Test Board' in str(res.data)
        assert res.status_code == 201

    def test_board_update(self, client):
        headers = {
            'Authorization': 'Bearer ' + user_setup(client),
            'content-type': 'application/x-www-form-urlencoded'
        }
        board = self.get_board_data()
        create_board(client, board)

        res = client.put('/api/boards/1', data={'name': 'Another Board'}, headers=headers)
        assert res.status_code == 200
        assert 'Another Board' in str(res.data)

    def test_board_deletion(self, client):
        new_board = self.get_board_data()
        create_board(client, new_board)

        # first board has id of 1
        res = client.delete('/api/boards/1', headers=get_auth_headers(client))
        assert res.status_code == 204
