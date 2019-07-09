from .conftest import create_board, get_auth_headers


class TestTasks(object):

    def test_task_creation(self, authenticated_client):
        """
        Test user can create a new tasks
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

        list = {
            'name': 'Test List',
            'board_id': 1,
        }

        task = {
            'name': 'My special task',
            'list_id': 1,
        }

        authenticated_client.post('/api/lists', data=list, headers=headers)
        res = authenticated_client.post('/api/tasks', data=task, headers=headers)
        assert res.content_type == 'application/json'
        assert 'special' in str(res.data)
        assert res.status_code == 201

    def test_task_get_single(self, authenticated_client):
        res = authenticated_client.get('/api/tasks/1',
                                       headers=get_auth_headers(authenticated_client))
        assert res.status_code == 200
        assert res.json.get('id') == 1
        assert res.json.get('list_id') == 1

    def test_task_update(self, authenticated_client):
        """
        Test a user can update the task name, order, and parent list
        :param authenticated_client:
        :return:
        """
        headers = {
            'Authorization': 'Bearer ' + authenticated_client.access_token,
            'content-type': 'application/x-www-form-urlencoded'
        }

        # create another list
        second_list = {
            'name': 'Another List',
            'board_id': 1,
        }
        authenticated_client.post('/api/lists', data=second_list, headers=headers)

        # add task to new list
        # id 2
        second_list_task_1 = {
            'name': 'Second List task 1',
            'list_id': 2,
        }
        authenticated_client.post('/api/tasks', data=second_list_task_1, headers=headers)

        # add another task to new list
        # id 3
        second_list_task_2 = {
            'name': 'Second List task 2',
            'list_id': 2,
        }
        authenticated_client.post('/api/tasks', data=second_list_task_2, headers=headers)

        # Insert as second task in second list
        # orders are 0 based
        # has id of 1
        updated_task = {
            'name': 'Beers are cool',
            'order': 1,
            'list_id': 2,
        }
        res = authenticated_client.put('/api/tasks/1', data=updated_task, headers=headers)
        assert res.status_code == 200
        assert 'Beers' in str(res.data)

        # Previous tasks in list 2 with order of 1, should now have order of 2
        task_3 = authenticated_client.get('/api/tasks/3',
                                          headers=get_auth_headers(authenticated_client))
        assert task_3.json.get('id') == 3
        assert task_3.json.get('order') == 2

    def test_task_delete(self, authenticated_client):
        """
        Test a user can delete a task by id
        :param authenticated_client:
        :return:
        """
        res = authenticated_client.delete('/api/tasks/1', headers=get_auth_headers(authenticated_client))
        assert res.status_code == 204
