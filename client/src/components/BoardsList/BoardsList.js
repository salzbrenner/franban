import React from 'react';
import BoardCard from '../BoardCard/BoardCard';
import './BoardsList.css';

const BoardsList = ({ boards }) => (
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
