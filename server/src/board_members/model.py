from src import db


class BoardMember(db.Model):
    """This class represents a table for storing user
        ids with board ids that they are members of
    """
    __tablename__ = 'board_members'

    id = db.Column(db.Integer, primary_key=True)
    uid = db.Column(db.Integer, db.ForeignKey('users.id'))
    board_id = db.Column(db.Integer, db.ForeignKey('boards.id'))

    def __init__(self, uid, board_id):
        self.uid = uid
        self.board_id = board_id

    def save(self):
        db.session.add(self)
        db.session.commit()