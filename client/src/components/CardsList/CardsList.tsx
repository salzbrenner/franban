import React from 'react';
import './CardsList.css';

const CardsList: React.FC<any> = ({ children }) => (
  <div className={'cards-list'}>{children}</div>
);

export default CardsList;
