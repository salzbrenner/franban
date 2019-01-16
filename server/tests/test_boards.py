from .conftest import (create_board,
                    get_access_token,
                       get_auth_headers)


class TestBoards(object):
    @staticmethod
    def get_board_data():
        return {
            'name': 'Test Board',
            'uid': 1,
        }

    def test_board_creation(self, authenticated_client):
        """
        Test a user can create a new board
        :param authenticated_client:
        :return:
        """
        data = self.get_board_data()
        res = create_board(authenticated_client, data)
        assert res.content_type == 'application/json'
        assert 'Test Board' in str(res.data)
        assert res.status_code == 201

    def test_board_update(self, authenticated_client):
        """
        Test a user can update the board to a new name
        :param authenticated_client:
        :return:
        """
        headers = {
            'Authorization': 'Bearer ' + get_access_token(authenticated_client),
            'content-type': 'application/x-www-form-urlencoded'
        }
        board = self.get_board_data()
        create_board(authenticated_client, board)

        res = authenticated_client.put('/api/boards/1', data={'name': 'Another Board'}, headers=headers)
        assert res.status_code == 200
        assert 'Another Board' in str(res.data)

    def test_board_deletion(self, authenticated_client):
        """
        Test a user can delete a board by board id
        :param authenticated_client:
        :return:
        """
        new_board = self.get_board_data()
        create_board(authenticated_client, new_board)

        # first board has id of 1
        res = authenticated_client.delete('/api/boards/1', headers=get_auth_headers(authenticated_client))
        assert res.status_code == 204
