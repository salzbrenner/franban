import React from 'react';
import CardTask from 'components/CardTask/CardTask';
import './CardsList.css';

const CardsList: React.FC<any> = ({ children }) => (
  <div className={'cards-list'}>{children}</div>
);

export default CardsList;
