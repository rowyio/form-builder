import React from 'react';

import { FormHelperText, FormHelperTextProps } from '@material-ui/core';

export interface IFieldAssistiveTextProps
  extends Omit<FormHelperTextProps, 'error' | 'disabled'> {
  disabled: boolean;
}

export default function FieldAssistiveText(props: IFieldAssistiveTextProps) {
  if (!props.children) return null;

  return (
    <FormHelperText
      {...props}
      style={{ whiteSpace: 'pre-line', ...props.style }}
      error={false}
    />
  );
}
