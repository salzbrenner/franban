import React from 'react';
import BoardCard from '../BoardCard/BoardCard';
import './BoardsList.css';

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
        <div className={'col-2'} key={board.id}>
          <BoardCard name={board.name} />
        </div>
      ))}
    </div>
  </div>
);

export default BoardsList;
