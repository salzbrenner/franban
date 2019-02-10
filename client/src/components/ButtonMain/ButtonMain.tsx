import React from 'react';
import './ButtonMain.css';

const ButtonMain = (props: any) => {
  const { text, secondary, ...rest } = props;
  return (
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
};

export default ButtonMain;
