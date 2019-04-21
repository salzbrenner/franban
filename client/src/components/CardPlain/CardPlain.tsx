import React, { Component } from 'react';
import './CardPlain.css';

const CardPlain = (props: any) => (
  <div
    className={`card-plain ${
      props.extraClassName ? props.extraClassName : ''
    }`}
  >
    {props.children}
  </div>
);

export default CardPlain;
