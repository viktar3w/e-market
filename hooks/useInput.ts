'use client';
import { ChangeEvent, useState } from 'react';

type InputBindHook = {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};
type InputHook = {
  bind: InputBindHook;
  setValue: (value: string) => void;
};
export const useInput = (initialValue = ''): InputHook => {
  const [value, setValue] = useState(initialValue);
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  return {
    bind: {
      value,
      onChange,
    },
    setValue,
  };
};
