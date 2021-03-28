import React from 'react';

import { FormHelperText, FormHelperTextProps } from '@material-ui/core';

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
