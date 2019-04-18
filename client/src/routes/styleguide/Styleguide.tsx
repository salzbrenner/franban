import React from 'react';
import CardsList from 'components/CardsList/CardsList';
import './Styleguide.css';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContextProvider } from 'react-dnd';

const Styleguide: React.FC<any> = () => (
  <div className={''}>
    <div className={`cards-list-wrapper`}>
      <DragDropContextProvider backend={HTML5Backend} />
      <CardsList />
      <CardsList />
      <CardsList />
    </div>
  </div>
);

export default Styleguide;
