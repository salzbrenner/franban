import React, { Component } from 'react';
import './CardPlain.css';

const CardPlain = (Component: Function) => (props: any) => (
  <div className={'card-plain'}>
    <Component {...props} />
  </div>
);

export default CardPlain;
