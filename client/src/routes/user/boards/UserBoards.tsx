import React, { useState, useEffect } from 'react';
import {
  userBoards,
  getUserBoards,
  UserState,
} from 'redux/modules/user';
import BoardsList, {
  BoardsInterface,
} from 'components/BoardsList/BoardsList';
import { connect } from 'react-redux';
import { AppState } from 'redux/modules/rootReducer';
import FormAddBoard from 'components/FormAddBoard/FormAddBoard';

interface UserBoardsInterface {
  match: any;
  boards: BoardsInterface[];
  getUserBoards: Function;
}

const UserBoards = ({
  match,
  boards,
  getUserBoards,
}: UserBoardsInterface) => {
  const uid = match.params.uid;

  useEffect(() => {
    if (!isNaN(uid)) {
      // make the call, which is available in store
      getUserBoards(uid);
    }
  }, []);

  if (isNaN(uid)) {
    return <h1>NOT FOUND</h1>;
  } else {
    return (
      <>
        <FormAddBoard />
        <BoardsList boards={boards} />
      </>
    );
  }
};

function mapStateToProps({ user }: AppState): any {
  return {
    boards: user.boards,
  };
}

export default connect(
  mapStateToProps,
  { getUserBoards }
)(UserBoards);
