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
  const boardId = +props.match.params.boardId;
  return (
    <BoardOverview
      name={props.board.name}
      boardId={boardId}
      {...props}
    />
  );
};

export function mapStateToProps({ board }: AppState) {
  return {
    board,
  };
}

export const mapDispatchToProps: any = {
  getBoard,
  resetBoard,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BoardOverviewContainer);
