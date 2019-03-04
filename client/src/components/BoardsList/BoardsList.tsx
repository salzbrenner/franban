import React from 'react';
import BoardCard from '../BoardCard/BoardCard';
import './BoardsList.css';
import { Link, Route } from 'react-router-dom';

export interface BoardsInterface {
  id: string;
  name: string;
}

const BoardsList: React.FC<any> = ({
  boards,
}: {
  boards: BoardsInterface[];
}) => (
  <div className={'boards-list container'}>
    <div className={'row'}>
      {boards.map(board => (
        <Link to={`/board/${board.id}`} key={board.id}>
          <div className={'col-2'}>
            <BoardCard name={board.name} />
          </div>
        </Link>
      ))}
    </div>
  </div>
);

export default BoardsList;
