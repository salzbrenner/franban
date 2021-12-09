`python manage.py db init`

`python manage.py db migrate`

`python manage.py db upgrade`

`python -m pytest tests/`

Local testing

`docker build -t franban:latest .`

`docker run --env-file=.env -d -p 5000:5000 franban`

Heroku Deploys

using Heroku container workflow

Netlfiy Deploys

manual deploys via CLI

12-9-2021

Flask's session cookie not being set properly in Chrome, needed samesite and secure attributes. Had to add specific headers (see HeadersMiddleware).

Adding Flask-Session for server session, but still relies on cookie.

If able to login, but not able to access boards (403 errors), likely indicates something
off with session cookie

Fixed the versions in Pipfile.

Updated client to have a loader when logging in b/c of Heroku cold start.

<!-- eb local setenv `cat .env | sed '/^#/ d' | sed '/^$/ d'` -->