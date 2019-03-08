import json
from .conftest import (login_user,
                       create_board,
                       register_second_user,
                       get_auth_headers)


class TestAuthUser:

    def test_can_get_all_boards_for_user(self, authenticated_client):
        """
        Test a user can get all boards they're a part of
        :param authenticated_client:
        :return:
        """
        headers = get_auth_headers(authenticated_client)

        create_board(authenticated_client, {'name': 'Test One', 'uid': 1})
        create_board(authenticated_client, {'name': 'Test Two', 'uid': 1})
        create_board(authenticated_client, {'name': 'Test Three', 'uid': 1})

        res = authenticated_client.get('/api/1/boards', headers=headers)
        assert len(res.json) == 3
        assert res.status_code == 200

    def test_cannot_get_boards_of_other_users(self, authenticated_client):
        """
        Test a user cannot access the boards of another user
        :param authenticated_client:
        :return:
        """
        # Register a second user and add create a board for them
        second_user = register_second_user(authenticated_client)
        second_user_token = json.loads(second_user.data.decode()).get('access_token')
        authenticated_client.post(
            '/api/boards',
            data={'name': 'Test Two', 'uid': 2},
            headers={
                'Authorization': 'Bearer ' + second_user_token,
                'content-type': 'application/json'
            }
        )
        # logout second user
        authenticated_client.get('/api/logout')

        # login with original user
        login_user(authenticated_client)

        # og user with uid of 1 should not be able to get boards of uid 2
        res = authenticated_client.get('/api/2/boards', headers=get_auth_headers(authenticated_client))
        assert len(res.json) == 0
        assert res.status_code == 403
