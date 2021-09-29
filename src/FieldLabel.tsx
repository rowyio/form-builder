import React from 'react';

import { InputLabel, InputLabelProps } from '@mui/material';

export interface IFieldLabelProps
  extends Omit<InputLabelProps, 'error' | 'disabled'> {
  error: boolean;
  disabled: boolean;
  required: boolean;
}

export default function FieldLabel(props: IFieldLabelProps) {
  return (
    <InputLabel
      {...props}
      sx={{ display: 'block', mb: 1, whiteSpace: 'pre-line', ...props.sx }}
    />
  );
}
