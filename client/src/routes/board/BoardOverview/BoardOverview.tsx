import React, { FC, useEffect } from 'react';
import FormAddList from 'components/FormAddList/FormAddList';
import ListsContainer from 'components/ListsContainer/ListsContainer';
import {
  mapDispatchToProps,
  mapStateToProps,
} from 'routes/board/BoardOverview/BoardOverviewContainer';

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

const BoardOverview: FC<Props> = ({
  name,
  getBoard,
  resetBoard,
  boardId,
  resetLists,
}) => {
  useEffect(() => {
    getBoard(boardId);
    return function cleanup() {
      resetBoard();
      resetLists();
    };
  }, []);
  return (
    <>
      <h1>{name}</h1>
      <div className={`d-inline-flex`}>
        <ListsContainer />
        <FormAddList />
      </div>
    </>
  );
};

export default BoardOverview;
