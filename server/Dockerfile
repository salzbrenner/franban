FROM python:3

MAINTAINER evan.salzbrenner@gmail.com

COPY . /app
WORKDIR /app

RUN pip install pipenv

RUN pipenv install --system --deploy

CMD ["python", "run.py"]