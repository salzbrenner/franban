import React from 'react';
import BoardCard from '../BoardCard/BoardCard';
import './BoardsList.css';
import { Link, Route } from 'react-router-dom';

type Props = {
  boards: BoardsInterface[];
};

export interface BoardsInterface {
  id: string;
  name: string;
}

const BoardsList: React.FC<Props> = ({ boards }) => (
  <div className={'container'}>
    <div className={'row'}>
      {boards.map(board => (
        <Link
          to={`/board/${board.id}`}
          key={board.id}
          className={`col col-3`}
        >
          <div>
            <BoardCard name={board.name} />
          </div>
        </Link>
      ))}
    </div>
  </div>
);

export default BoardsList;
