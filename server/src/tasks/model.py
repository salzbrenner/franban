from src import db
from src.lists.model import List


class Task(db.Model):
    """
    This class represents the list table
    """

    id = db.Column(db.Integer, primary_key=True, unique=True)
    name = db.Column(db.String(255))
    order = db.Column(db.Integer)
    list_id = db.Column(db.Integer, db.ForeignKey(List.id))

    def __init__(self, name, list_id):
        self.name = name
        self.list_id = list_id
        self.order = self.set_order()

    @staticmethod
    def set_order():
        highest_order = Task.query.order_by(Task.order.desc()).first()
        if highest_order:
            return highest_order.order + 1
        else:
            return 0

    def save(self):
        db.session.add(self)
        db.session.commit()

    def update(self, name, order):
        self.order = order
        self.name = name

        # rows = db.session.query(Task).count()
        ordered = db.session\
            .query(List)\
            .order_by(List.order)\
            .all()

        # reorder all rows to be consecutive integers
        if ordered:
            for idx, row in enumerate(ordered):
                row.order = idx

        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def __repr__(self):
        return '<List: {}>'.format(self.name)

