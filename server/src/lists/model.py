from sqlalchemy.ext.orderinglist import ordering_list
from src import db
from src.boards.model import Board


class List(db.Model):
    """
    This class represents the list table
    """
    id = db.Column(db.Integer, primary_key=True, unique=True)
    name = db.Column(db.String(255))
    order = db.Column(db.Integer)
    board_id = db.Column(db.Integer, db.ForeignKey(Board.id))
    board_order = db.deferred(db.select([order]).where(Board.id == board_id))
    lists = db.relationship('Task',
                            order_by="Task.list_order",
                            backref='list',
                            collection_class=ordering_list('order'))

    def __init__(self, name, board_id):
        self.name = name
        self.board_id = board_id
        self.order = self.set_order()

    @staticmethod
    def set_order():
        highest_order = List.query.order_by(List.order.desc()).first()
        if highest_order:
            return highest_order.order + 1
        else:
            return 0

    def save(self):
        db.session.add(self)
        db.session.commit()

    def update(self, name, position):
        self.name = name
        # update order
        # ordering is handled via the relationship on Board,
        # with the ordering_list
        # https://docs.sqlalchemy.org/en/13/orm/extensions/orderinglist.html
        board_lists = self.board.lists
        board_lists.remove(self)
        board_lists.insert(position, self)

        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def __repr__(self):
        return '<List: {}>'.format(self.name)

