import json


class TestAuth:

    def get_headers(self):
        """ returns the request headers"""
        return {
            'content-type': 'application/x-www-form-urlencoded'
        }

    def get_registered_data(self):
        return {
            'email': 'howard@zen.com',
            'password': 'password',
        }

    def get_non_registered_data(self):
        return {
            'email': 'dude@dude.com',
            'password': 'none',
        }

    def test_registration(self, client):
        """Test user registration works"""
        # data is form data, json_dumps not needed
        res = client.post('/api/register', data=self.get_registered_data(), headers=self.get_headers())
        assert 'You registered successfully' in res.json['message']
        assert res.status_code == 201

    def test_duplicate_registration(self, client):
        """Make sure same user cannot register again"""
        # perform user registration
        self.test_registration(client)
        # perform duplicate registration
        second_res = client.post('/api/register', data=self.get_registered_data(), headers=self.get_headers())
        assert second_res.status_code == 202
        assert 'There is an existing user' in second_res.json['message']

    def test_user_login(self, client):
        """Test registered user can login."""
        # register user first
        self.test_registration(client)
        res = client.post('/api/login', data=self.get_registered_data())
        assert res.status_code == 200
        assert 'successfully' in res.json['message']

    def test_non_registered_user_login(self, client):
        """Test non registered users cannot login."""
        res = client.post('/api/login', data=self.get_non_registered_data())
        assert res.status_code == 401
        assert 'Invalid' in res.json['message']
