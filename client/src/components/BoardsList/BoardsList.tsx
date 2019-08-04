import React from 'react';
import BoardCard from '../BoardCard/BoardCard';
import './BoardsList.css';
import { Link } from 'react-router-dom';

type Props = {
  boards: BoardsInterface[];
  deleteHandler: (id: string) => {};
};

export interface BoardsInterface {
  id: string;
  name: string;
}

const BoardsList: React.FC<Props> = ({
  boards,
  deleteHandler,
}) => (
  <div className={'container boards-list'}>
    <div className={'row'}>
      {boards.map(board => (
        <Link
          to={`/board/${board.id}`}
          key={board.id}
          className={`col col-3 boards-list__link`}
        >
          <div className={`boards-list__link-inner`}>
            <BoardCard
              name={board.name}
              id={board.id}
              deleteHandler={deleteHandler}
            />
          </div>
        </Link>
      ))}
    </div>
  </div>
);

export default BoardsList;
