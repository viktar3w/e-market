import { ReactNode } from "react";

export type CheckboxFilterType = {
  text: string;
  value: string;
  endAdornment?: ReactNode;
  onCheckedChange?: (checked: boolean) => void;
  checked?: boolean;
  name?: string;
}

export type ItemVariation<T> = {
  text: string
  value: T
}