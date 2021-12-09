from flask import session
from flask.sessions import SecureCookieSessionInterface

# where `app` is your Flask Application name.
class CookieHeaderMiddleware(object):
    """
    Adds custom headers to every response
    Needed for connexion/frontend
    :param app: flask's wsgi app
    :return app
    """

    def __init__(self, app, flask_app):
        self.app = app
        self.session_cookie = SecureCookieSessionInterface().get_signing_serializer(flask_app)

    def __call__(self, environ, start_response):
        def custom_start_response(status, headers, exc_info=None):
            # no longer needed!!
            # headers.append(('Access-Control-Allow-Origin', 'http://localhost:3000'))
            # headers.append(('Access-Control-Allow-Credentials', 'true'))
            # headers.append(('Access-Control-Allow-Headers', 'authorization, Content-Type'))
            # headers.append(('Access-Control-Allow-Methods', 'DELETE, GET, HEAD, OPTIONS, PATCH, POST, PUT'))
            
            # this is needed for these fucking session cookies on chrome, still busted on safari who cares
            headers.append(("Set-Cookie", f"session={self.session_cookie}; Secure; HttpOnly; SameSite=None; Path=/;"))
            return start_response(status, headers, exc_info)

        return self.app(environ, custom_start_response)
