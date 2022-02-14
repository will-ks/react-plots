import React, { useRef, useState } from 'react';
import { Slider, SliderProps } from '../components/Slider';

export const useSlider = (
  min: number,
  max: number,
  label: string,
  defaultValue?: number
) => {
  const initial = defaultValue || min;
  const [value, setValue] = useState(initial);
  const ref = useRef<HTMLInputElement>(null);

  const sliderProps: SliderProps = {
    min,
    max,
    label,
    defaultValue: initial,
    onInput: (e) => {
      setValue(Number(e.currentTarget.value));
    },
    ref,
  };
  return { value, slider: <Slider {...sliderProps} /> };
};
