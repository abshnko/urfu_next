import React from 'react';
import s from './Button.module.scss';

export interface ButtonProps
  extends React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    React.AriaAttributes {
  className?: string;
}

const Button = (props: ButtonProps) => {
  const { children, disabled, className, ...rest } = props;

  return (
    <button
      className={`${s.button}  ${disabled ? s.disabled : ''}  ${
        className ? className : ''
      }`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
