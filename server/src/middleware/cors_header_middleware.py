class CorsHeaderMiddleware(object):
    """
    Adds custom headers to every response
    Needed for connexion/frontend
    :param app: flask's wsgi app
    :return app
    """

    def __init__(self, app):
        self.app = app

    def __call__(self, environ, start_response):
        def custom_start_response(status, headers, exc_info=None):
            headers.append(('Access-Control-Allow-Origin', 'http://localhost:3000'))
            headers.append(('Access-Control-Allow-Credentials', 'true'))
            headers.append(('Access-Control-Allow-Headers', 'authorization, Content-Type'))
            headers.append(('Access-Control-Allow-Methods', 'DELETE, GET, HEAD, OPTIONS, PATCH, POST, PUT'))
            return start_response(status, headers, exc_info)

        return self.app(environ, custom_start_response)
