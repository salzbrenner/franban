from .conftest import (register_user,
                       login_user)


class TestNewUser:

    def get_non_registered_data(self):
        return {
            'email': 'dude@dude.com',
            'password': 'none',
        }

    def test_registration(self, anon_client):
        """
        Test user registration
        :param anon_client:
        :return:
        """
        # data is form data, json_dumps not needed
        res = register_user(anon_client)
        assert 'You registered successfully' in res.json['message']
        assert res.status_code == 201

    def test_duplicate_registration(self, anon_client):
        """
        Makes sure same user cannot register again
        :param anon_client:
        :return:
        """
        # perform user registration
        register_user(anon_client)
        # perform duplicate registration
        second_res = register_user(anon_client)
        assert second_res.status_code == 422
        assert 'There is an existing user' in second_res.json['message']

    def test_user_login(self, anon_client):
        """
        Test registered user can login
        :param anon_client:
        :return:
        """
        # register user first
        register_user(anon_client)
        res = login_user(anon_client)
        assert res.status_code == 200
        assert 'successfully' in res.json['message']

    def test_non_registered_user_login(self, anon_client):
        """
        Test non registered users cannot login
        :param anon_client:
        :return:
        """
        res = anon_client.post('/api/login', data=self.get_non_registered_data())
        assert res.status_code == 401
        assert 'Invalid' in res.json['message']

    def test_user_logout(self, anon_client):
        register_user(anon_client)
        login_user(anon_client)
        res = anon_client.get('/api/logout')
        assert res.status_code == 204

