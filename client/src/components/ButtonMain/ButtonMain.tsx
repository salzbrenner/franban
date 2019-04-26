import React, {
  ButtonHTMLAttributes,
  FC,
  HTMLAttributes,
} from 'react';
import './ButtonMain.css';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  text: string;
  secondary: boolean;
};

const ButtonMain: FC<Props> = props => {
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
