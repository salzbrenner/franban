import React from 'react';
import { ListObjectInterface } from 'redux/modules/lists';
import './TaskList.css';
import CardPlain from 'components/CardPlain/CardPlain';

const TaskList = ({
  id,
  board_id,
  name,
  order,
}: ListObjectInterface) => (
  <div className={'task-list'}>
    <div className="task-list__name">{name}</div>
    <div>{/*card wrapper component*/}</div>
  </div>
);

export default CardPlain(TaskList, 'card-plain--task-list');
