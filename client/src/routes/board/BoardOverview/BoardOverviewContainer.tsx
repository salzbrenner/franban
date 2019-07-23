import React, { FunctionComponent, useEffect } from 'react';
import { AppState } from 'redux/modules/rootReducer';
import { connect } from 'react-redux';
import { getBoard, resetBoard } from 'redux/modules/boards';
import BoardOverview from 'routes/board/BoardOverview/BoardOverview';
import { resetLists } from 'redux/modules/lists';

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps & {
    match: any;
  };

const BoardOverviewContainer: FunctionComponent<
  Props
> = props => {
  const boardId = +props.match.params.boardId;
  const { name, users } = props.board;
  return (
    <BoardOverview
      name={name}
      users={users}
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
  resetLists,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BoardOverviewContainer);
