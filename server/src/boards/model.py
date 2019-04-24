from src import db
from sqlalchemy.ext.orderinglist import ordering_list
from src.users.model import User


class Board(db.Model):
    """This class represents the board table."""

    __tablename__ = 'boards'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255))
    uid = db.Column(db.Integer, db.ForeignKey(User.id))
    lists = db.relationship('List',
                            order_by="List.board_order",
                            backref='board',
                            collection_class=ordering_list('order'))

    def __init__(self, name, uid):
        """Initialize with name"""
        self.name = name
        self.uid = uid

    def save(self):
        db.session.add(self)
        db.session.commit()

    def update(self, name):
        self.name = name
        db.session.commit()

    def getXXX(self):
        return self.name

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def __repr__(self):
        return '<Board: {}>'.format(self.name)
