import React from 'react';

import { FormHelperText, FormHelperTextProps } from '@mui/material';

export default function FieldErrorMessage(props: FormHelperTextProps) {
  if (!props.children) return null;

  return (
    <FormHelperText
      error
      {...props}
      style={{ whiteSpace: 'pre-line', ...props.style }}
    />
  );
}
