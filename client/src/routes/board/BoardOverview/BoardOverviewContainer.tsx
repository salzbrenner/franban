import React, { FunctionComponent, useEffect } from 'react';
import { AppState } from 'redux/modules/rootReducer';
import { connect } from 'react-redux';
import { getBoard } from 'redux/modules/boards';
import BoardOverview from 'routes/board/BoardOverview/BoardOverview';

const BoardOverviewContainer: FunctionComponent<
  any
> = props => {
  const boardId = +props.match.params.boardId;
  useEffect(() => {
    props.getBoard(boardId);
  }, []);
  return (
    <BoardOverview
      boardId={boardId}
      listIds={props.board.lists}
    />
  );
};

function mapStateToProps({ board }: AppState) {
  return {
    board, // TODO: finish hooking up
  };
}

export default connect(
  mapStateToProps,
  { getBoard }
)(BoardOverviewContainer);
