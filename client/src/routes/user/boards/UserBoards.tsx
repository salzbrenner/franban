import React, { useState, useEffect } from 'react';
import {
  userBoards,
  getBoardsXXX,
  UserState,
} from 'redux/modules/user';
import BoardsList, {
  BoardsInterface,
} from 'components/BoardsList/BoardsList';
import { connect } from 'react-redux';
import { AppState } from 'redux/modules/rootReducer';
import App from 'components/App';

interface UserBoardsInterface {
  match: any;
  boards: BoardsInterface[];
  getBoardsXXX: Function;
}

const UserBoards = ({
  match,
  boards,
  getBoardsXXX,
}: UserBoardsInterface) => {
  const uid = match.params.uid;

  useEffect(() => {
    if (!isNaN(uid)) {
      // make the call, which is available in store
      getBoardsXXX(uid);
    }
  }, []);

  if (isNaN(uid)) {
    return <h1>NOT FOUND</h1>;
  } else {
    return <BoardsList boards={boards} />;
  }
};

function mapStateToProps({ user }: AppState): any {
  return {
    boards: user.boards,
  };
}

export default connect(
  mapStateToProps,
  { getBoardsXXX }
)(UserBoards);
