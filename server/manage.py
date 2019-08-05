# manage.py
# A migration script will conveniently help us make and apply migrations everytime we edit our models.
# It's good practice to separate migration tasks and not mix them with the code in our app.

import os
import instance.config
from flask_script import Manager
from flask_migrate import Migrate, MigrateCommand
from src import db, create_app
import pytest

app_settings = os.getenv('APP_SETTINGS')
app = create_app(config_name=getattr(instance.config, app_settings)).app
migrate = Migrate(app, db)
# create instance of class to handle commands
manager = Manager(app)

# migration command will always be preceeded by "db"
manager.add_command('db', MigrateCommand)


# define testing command
# usage: python manage.py test
@manager.command
def test():
    pytest.main(['-sx', '--durations=3', 'tests'])


if __name__ == '__main__':
    manager.run()


