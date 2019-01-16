from src import db
from src.boards.model import Board

class List(db.Model):
    """
    This class represents the list table
    """

    id = db.Column(db.Integer, primary_key=True)
    name = db.column(db.String(255))
    board_id = db.Column(db.Integer, db.ForeignKey(Board.id))

    def __init__(self, name, board_id):
        self.name = name
        self.board_id = board_id

    def save(self):
        db.session.add(self)
        db.session.commit()

    def update(self, name):
        self.name = name
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def __repr__(self):
        return '<List: {}>'.format(self.name)

