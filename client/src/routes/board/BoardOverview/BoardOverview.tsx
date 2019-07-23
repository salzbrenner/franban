import React, { FC, useEffect } from 'react';
import FormAddList from 'components/FormAddList/FormAddList';
import ListsContainer from 'components/ListsContainer/ListsContainer';
import {
  mapDispatchToProps,
  mapStateToProps,
} from 'routes/board/BoardOverview/BoardOverviewContainer';
import './BoardOverview.css';
import { Link } from 'react-router-dom';
import { subscribeToLists } from 'services/socket';
import UserList from 'components/UserList/UserList';

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

const BoardOverview: FC<Props> = props => {
  const {
    name,
    getBoard,
    resetBoard,
    boardId,
    resetLists,
    users,
  } = props;
  useEffect(() => {
    getBoard(boardId);
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

      <div className={`board-overview__heading`}>
        <h1>{name}</h1>
        <UserList users={users} />
      </div>
      <div className={`d-inline-flex`}>
        <ListsContainer boardId={boardId} />
        <div>
          <FormAddList initialValues={{ boardId }} />
        </div>
      </div>
    </div>
  );
};

export default BoardOverview;
