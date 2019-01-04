from src import db
from src.users.model import User

class Board(db.Model):
    """This class represents the board table."""

    __tablename__ = 'boards'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255))
    user = db.Column(db.Integer, db.ForeignKey(User.id))

    def __init__(self, name, user):
        """Initialize with name"""
        self.name = name
        self.user = user

    def save(self):
        db.session.add(self)
        db.session.commit()

    # @staticmethod
    # def get_all():

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def __repr__(self):
        return '<Board: {}>'.format(self.name)
