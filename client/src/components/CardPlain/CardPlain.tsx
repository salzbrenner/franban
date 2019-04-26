import React, { Component, FC } from 'react';
import './CardPlain.css';

type Props = {
  extraClassName: string;
};

const CardPlain: FC<Props> = props => (
  <div
    className={`card-plain ${
      props.extraClassName ? props.extraClassName : ''
    }`}
  >
    {props.children}
  </div>
);

export default CardPlain;
