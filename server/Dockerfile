FROM python:3

MAINTAINER daniel@federschmidt.xyz

COPY . /app
WORKDIR /app

RUN pip install pipenv

RUN pipenv install --system --deploy

CMD ["python", "run.py"]