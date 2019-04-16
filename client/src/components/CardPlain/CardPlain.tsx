import React, { Component } from 'react';
import './CardPlain.css';

const CardPlain = (
  Component: Function,
  extraClassName?: string
) => (props: any) => (
  <div
    className={`card-plain ${
      extraClassName ? extraClassName : ''
    }`}
  >
    <Component {...props} />
  </div>
);

export default CardPlain;
