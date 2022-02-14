import React, { InputHTMLAttributes } from 'react';
import useEnsuredForwardedRef from '../helpers/useEnsuredForwardedRef';

export const Slider = React.forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement> & Props
>((props, forwardedRef) => {
  const { children, style, label, min, max, defaultValue, ...rest } = props;

  const ref = useEnsuredForwardedRef<HTMLInputElement>(forwardedRef);
  const value = ref.current?.value || defaultValue;

  return (
    <>
      <input
        type="range"
        id={label}
        name={label}
        min={min}
        max={max}
        defaultValue={defaultValue}
        {...rest}
        ref={ref}
      />
      <label htmlFor={label} style={{ marginLeft: '0.5rem' }}>
        {`${label} = ${value}`}
      </label>
    </>
  );
});

export type SliderProps = InputHTMLAttributes<HTMLInputElement> & Props;

type Props = {
  min: number;
  max: number;
  label: string;
  ref: React.RefObject<HTMLInputElement>;
};
