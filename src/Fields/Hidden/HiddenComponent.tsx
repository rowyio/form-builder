import React from 'react';
import { IFieldComponentProps } from '../../types';

export default function HiddenComponent({
  field: { value, ref },
  name,
}: IFieldComponentProps) {
  return <input type="hidden" name={name} value={value} ref={ref} />;
}
