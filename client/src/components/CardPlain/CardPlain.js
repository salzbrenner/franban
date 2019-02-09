import React from 'react';
import './CardPlain.css';

const CardPlain = Component => props => (
  <div className={'card-plain'}>
    <Component {...props} />
  </div>
);

export default CardPlain;
