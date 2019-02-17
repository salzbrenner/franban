from .conftest import (
    create_board,
    get_auth_headers
)


class TestLists(object):

    def test_list_creation(self, authenticated_client):
        """
        Test user can create a new list
        :param authenticated_client:
        :return:
        """
        create_board(authenticated_client, {
            'name': 'Test Board',
            'uid': 1,
        })

        headers = {
            'Authorization': 'Bearer ' + authenticated_client.access_token,
            'content-type': 'application/x-www-form-urlencoded'
        }
        data = {
            'name': 'Test List',
            'board_id': 1,
        }

        res = authenticated_client.post('/api/lists', json=data, headers=headers)
        assert res.content_type == 'application/json'
        assert 'Test List' in str(res.data)
        assert res.status_code == 201

    # def test_list_update(self, authenticated_client):
    #     """
    #     Test a user can update the board name and order
    #     :param authenticated_client:
    #     :return:
    #     """
    #     headers = {
    #         'Authorization': 'Bearer ' + authenticated_client.access_token,
    #         'content-type': 'application/x-www-form-urlencoded'
    #     }
    #     data = {
    #         'name': 'Another List',
    #         'order': 1,
    #     }
    #     # 'api/lists/<board_id>/<id>
    #     res = authenticated_client.put('/api/lists/1/1')
    #     assert res.status_code == 200
    #     print(res.data.get('order'))
    #     assert 'Another List' in str(res.data)
