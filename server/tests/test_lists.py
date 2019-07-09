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

        res = authenticated_client.post('/api/lists', data=data, headers=headers)
        assert res.content_type == 'application/json'
        assert 'Test List' in str(res.data)
        assert res.status_code == 201

    def test_list_update(self, authenticated_client):
        """
        Test a user can update the board name and order
        :param authenticated_client:
        :return:
        """
        headers = {
            'Authorization': 'Bearer ' + authenticated_client.access_token,
            'content-type': 'application/x-www-form-urlencoded'
        }
        data = {
            'name': 'Updated List',
            'order': 1,
        }
        # Create additional list, will have an order of 1
        new_list_data = {
            'name': 'Second List',
            'board_id': 1,
        }
        authenticated_client.post('/api/lists', data=new_list_data, headers=headers)

        # Since only two lists exist, the max order possible is 1 i.e. [0,1].
        # The list is being updated to order of 100 - so it should get the max order value - 1
        res = authenticated_client.put('/api/lists/1', data=data, headers=headers)
        assert res.status_code == 200
        assert 'Updated List' in str(res.data)
        assert '1' in str(res.data)

    def test_list_get(self, authenticated_client):
        """
        Tests that user can get list
        :param authenticated_client:
        :return:
        """
        headers = get_auth_headers(authenticated_client)
        res = authenticated_client.get('/api/lists/1', headers=headers)
        assert res.status_code == 200
        assert res.json.get('id') == 1
        assert res.json.get('board_id') == 1
        assert res.json.get('name') == 'Updated List'

    def test_list_deletion(self, authenticated_client):
        """
        Test a user can delete a list by id
        :param authenticated_client:
        :return:
        """
        # first board has id of 1
        res = authenticated_client.delete('/api/lists/1', headers=get_auth_headers(authenticated_client))
        assert res.status_code == 204
