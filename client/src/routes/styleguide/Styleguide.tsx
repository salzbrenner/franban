import React from 'react';
import CardsList from 'components/CardsList/CardsList';
import './Styleguide.css';

const Styleguide: React.FC<any> = () => (
  <div className={''}>
    <div className={`cards-list-wrapper`}>
      <CardsList />
      <CardsList />
      <CardsList />
    </div>
  </div>
);

export default Styleguide;
