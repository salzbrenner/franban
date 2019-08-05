`python manage.py db init`

`python manage.py db migrate`

`python manage.py db upgrade`

`python -m pytest tests/`

`docker build -t franban:latest .`

`docker run --env-file=.env -d -p 5000:5000 franban`

eb local setenv `cat .env | sed '/^#/ d' | sed '/^$/ d'`