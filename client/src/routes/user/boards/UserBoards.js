import React, {Component} from 'react';
import {userBoards, getBoardsXXX} from 'redux/modules/user';
import {connect} from 'react-redux';

const UserBoards = ({match, boards, getBoardsXXX}) => {
  const uid = match.params.uid;

  if (isNaN(uid)) {
    return <h1>NOT FOUND</h1>
  }
  else {
    return (
        <div>This is boards page for {uid} and you should render Board List here
          <button onClick={() => getBoardsXXX(uid)}>CLICK ME</button>
        </div>
    );
  }

};

function mapStateToProps(state) {
  return {
    boards: userBoards(state)
  }
}

export default connect(mapStateToProps, {getBoardsXXX})(UserBoards);
