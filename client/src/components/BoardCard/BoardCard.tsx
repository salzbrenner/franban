import React from 'react';
import './BoardCard.css';
import CardPlain from '../CardPlain/CardPlain';

const BoardCard = ({
  id,
  name,
}: {
  id: string;
  name: string;
}) => (
  <div className={'board-card'} key={id}>
    {name}
  </div>
);

export default CardPlain(BoardCard);
