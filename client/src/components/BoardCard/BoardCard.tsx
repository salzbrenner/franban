import React from 'react';
import './BoardCard.css';
import CardPlain from '../CardPlain/CardPlain';

const BoardCard = ({ name }: { name: string }) => (
  <div className={'board-card'}>
    <div className={`board-card__inner`}>{name}</div>
  </div>
);

export default BoardCard;
