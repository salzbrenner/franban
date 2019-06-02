import React, { FC, useEffect } from 'react';
import FormAddList from 'components/FormAddList/FormAddList';
import ListsContainer from 'components/ListsContainer/ListsContainer';
import {
  mapDispatchToProps,
  mapStateToProps,
} from 'routes/board/BoardOverview/BoardOverviewContainer';
import './BoardOverview.css';
import BoardCard from 'components/BoardsList/BoardsList';
import { Link } from 'react-router-dom';
import { subscribeToLists } from 'services/socket';

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

const BoardOverview: FC<Props> = props => {
  const {
    name,
    getBoard,
    resetBoard,
    boardId,
    resetLists,
  } = props;
  useEffect(() => {
    getBoard(boardId);
    // TODO: optimize subscriptions
    subscribeToLists.listAdded(() => getBoard(boardId));
    subscribeToLists.listDeleted(() => getBoard(boardId));
    return function cleanup() {
      resetBoard();
      resetLists();
      subscribeToLists.offAll();
    };
  }, [boardId]);
  return (
    <div className={`board-overview`}>
      <Link
        to={`/`}
        className={`link board-overview__back`}
      >
        <div className={`arrow`} />
        {`BACK`}
      </Link>

      <h1>{name}</h1>
      <div className={`d-inline-flex`}>
        {boardId}
        <ListsContainer />
        <div>
          <FormAddList initialValues={{ boardId }} />
        </div>
      </div>
    </div>
  );
};

export default BoardOverview;
