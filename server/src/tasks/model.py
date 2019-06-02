from src import db
from src.lists.model import List


class Task(db.Model):
    """
    This class represents the task table
    """
    id = db.Column(db.Integer, primary_key=True, unique=True)
    name = db.Column(db.String(255))
    order = db.Column(db.Integer)
    list_id = db.Column(db.Integer, db.ForeignKey(List.id))
    list_order = db.deferred(db.select([order]).where(List.id == list_id))

    def __init__(self, name, list_id):
        self.name = name
        self.list_id = list_id
        self.order = self.set_order(self.list_id)

    @staticmethod
    def set_order(list_id):
        highest_order = Task.query.filter_by(list_id=list_id).order_by(Task.order.desc()).first()
        if highest_order:
            return highest_order.order + 1
        else:
            return 0

    def save(self):
        """
        Save task to db
        :return:
        """
        db.session.add(self)
        db.session.commit()

    def update(self, list_id, name, position):
        # self.order = order
        self.name = name
        self.list_id = list_id

        list_tasks = self.list.tasks  # backref relationship
        list_tasks.remove(self)
        list_tasks.insert(position, self)

        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def __repr__(self):
        return '<List: {}>'.format(self.name)

