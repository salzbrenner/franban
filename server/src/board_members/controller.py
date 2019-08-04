from src.board_members.model import BoardMember


def add_board_member(uid, board_id):
    exists = BoardMember.query.filter_by(uid=uid, board_id=board_id).first()

    if not exists:
        board_member = BoardMember(uid, board_id)
        board_member.save()


def get_boards_as_member(uid):
    return BoardMember.query.filter_by(uid=uid).all()


def get_board_members(board_id):
    return BoardMember.query.filter_by(board_id=board_id).all()
