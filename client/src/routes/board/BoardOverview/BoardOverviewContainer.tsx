import React, { FunctionComponent, useEffect } from 'react';
import { AppState } from 'redux/modules/rootReducer';
import { connect } from 'react-redux';
import { getBoard, resetBoard } from 'redux/modules/boards';
import BoardOverview from 'routes/board/BoardOverview/BoardOverview';

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps & {
    match: any;
  };

const BoardOverviewContainer: FunctionComponent<
  Props
> = props => {
  // TODO: move this to BoardOverviewComponent
  const boardId = +props.match.params.boardId;
  useEffect(() => {
    props.getBoard(boardId);
    return function cleanup() {
      props.resetBoard();
    };
  }, []);
  return (
    <BoardOverview
      boardId={boardId}
      name={props.board.name}
      listIds={props.board.lists}
    />
  );
};

function mapStateToProps({ board }: AppState) {
  return {
    board,
  };
}

const mapDispatchToProps = {
  getBoard,
  resetBoard,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BoardOverviewContainer);
