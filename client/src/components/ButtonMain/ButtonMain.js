import React from 'react';
import './ButtonMain.css';

const ButtonMain = ({ text, secondary, ...rest }) => (
  <button
    className={
      secondary
        ? 'button-main button-main--secondary'
        : 'button-main'
    }
    {...rest}
  >
    {text}
  </button>
);

export default ButtonMain;
