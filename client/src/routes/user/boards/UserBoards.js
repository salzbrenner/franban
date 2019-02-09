import React, { useState, useEffect } from 'react';
import {
  userBoards,
  getBoardsXXX,
} from 'redux/modules/user';
import BoardsList from 'components/BoardsList/BoardsList';
import { connect } from 'react-redux';

const UserBoards = ({
  match,
  boards,
  getBoardsXXX,
  children,
}) => {
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

function mapStateToProps(state) {
  return {
    boards: userBoards(state),
  };
}

export default connect(
  mapStateToProps,
  { getBoardsXXX }
)(UserBoards);
