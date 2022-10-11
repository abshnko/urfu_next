import React from 'react';
import s from './CheckBox.module.scss';

export interface InputProps
  extends React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >,
    React.AriaAttributes {
  className?: string;
  text?: string;
}

const CheckBox = (props: InputProps) => {
  const { checked, disabled, text } = props;
  return (
    <label className={`${s.form_control} `}>
      <input
        checked={checked}
        disabled={disabled}
        type={'checkbox'}
        className={`${s.check_box} `}
      />
      {text}
    </label>
  );
};

export default CheckBox;
