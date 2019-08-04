import React, { FC, useEffect, useState } from 'react';
import FormAddList from 'components/FormAddList/FormAddList';
import ListsContainer from 'components/ListsContainer/ListsContainer';
import {
  mapDispatchToProps,
  mapStateToProps,
} from 'routes/board/BoardOverview/BoardOverviewContainer';
import './BoardOverview.css';
import { Link } from 'react-router-dom';
import {
  roomHandler,
  socketListHandlers,
} from 'services/socket';
import UserList from 'components/UserList/UserList';
import FormInviteUser from 'components/FormInviteUser/FormInviteUser';
import Modal from 'react-modal';

const modalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

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

  const [modalIsOpen, openModal] = useState(false);

  useEffect(() => {
    getBoard(boardId);
    roomHandler.joinRoom(boardId);
    socketListHandlers.subscribeAll(() =>
      getBoard(boardId)
    );
    return function cleanup() {
      roomHandler.leaveRoom(boardId);
      resetBoard();
      resetLists();
      socketListHandlers.offAll();
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
        <button
          className={'board-overview__invite'}
          onClick={() => openModal(true)}
        >
          invite user to board
        </button>

        <UserList users={users} />

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => openModal(false)}
          style={modalStyles}
        >
          <FormInviteUser initialValues={{ boardId }} />
        </Modal>
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
