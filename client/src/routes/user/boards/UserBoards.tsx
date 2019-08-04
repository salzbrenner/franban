import React, { useEffect, FunctionComponent } from 'react';
import {
  deleteBoard,
  getUserBoards,
  userBoards,
} from 'redux/modules/user';
import BoardsList from 'components/BoardsList/BoardsList';
import { connect } from 'react-redux';
import { AppState } from 'redux/modules/rootReducer';
import FormAddBoard from 'components/FormAddBoard/FormAddBoard';
import './UserBoards.css';

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

type OwnProps = {
  uid: string;
};

const UserBoards: FunctionComponent<Props> = props => {
  const { uid, boards, getUserBoards, deleteBoard } = props;
  useEffect(() => {
    getUserBoards(uid); // initial load
  }, [uid]);

  return (
    <>
      <BoardsList
        boards={boards}
        deleteHandler={deleteBoard}
      />
      <div className="container">
        <FormAddBoard />
      </div>
    </>
  );
};

function mapStateToProps(
  { user }: AppState,
  ownProps: OwnProps
) {
  return {
    boards: userBoards(user),
    ...ownProps,
  };
}

const mapDispatchToProps: any = {
  getUserBoards,
  deleteBoard,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserBoards);
