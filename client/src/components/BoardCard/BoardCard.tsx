import React from 'react';
import './BoardCard.css';
import CardPlain from '../CardPlain/CardPlain';

const BoardCard = ({ name }: { name: string }) => (
  <div className={'board-card'}>{name}</div>
);

export default BoardCard;
