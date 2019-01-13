from .conftest import (register_user,
                       login_user,
                       create_board,
                       register_second_user,
                       get_auth_headers)


class TestUsers:

    def get_non_registered_data(self):
        return {
            'email': 'dude@dude.com',
            'password': 'none',
        }

    def test_registration(self, client):
        """Test user registration works"""
        # data is form data, json_dumps not needed
        res = register_user(client)
        assert 'You registered successfully' in res.json['message']
        assert res.status_code == 201

    def test_duplicate_registration(self, client):
        """Make sure same user cannot register again"""
        # perform user registration
        register_user(client)
        # perform duplicate registration
        second_res = register_user(client)
        assert second_res.status_code == 422
        assert 'There is an existing user' in second_res.json['message']

    def test_user_login(self, client):
        """Test registered user can login."""
        # register user first
        register_user(client)
        res = login_user(client)
        assert res.status_code == 200
        assert 'successfully' in res.json['message']

    def test_non_registered_user_login(self, client):
        """Test non registered users cannot login."""
        res = client.post('/api/login', data=self.get_non_registered_data())
        assert res.status_code == 401
        assert 'Invalid' in res.json['message']

    def test_can_get_all_boards_for_user(self, client):
        headers = get_auth_headers(client)

        create_board(client, {'name': 'Test One', 'uid': 1})
        create_board(client, {'name': 'Test Two', 'uid': 1})
        create_board(client, {'name': 'Test Three', 'uid': 1})

        res = client.get('/api/1/boards', headers=headers)
        assert len(res.json) == 3
        assert res.status_code == 200

    def test_cannot_get_boards_of_other_users(self, client):
        headers = get_auth_headers(client)
        register_second_user(client)

        create_board(client, {'name': 'Test One', 'uid': 1})
        create_board(client, {'name': 'Test Two', 'uid': 2})
        create_board(client, {'name': 'Test Three', 'uid': 2})

        # session id set to 1 when first user is created and logged in
        res = client.get('/api/2/boards', headers=headers)
        assert len(res.json) == 0
        assert res.status_code == 403
