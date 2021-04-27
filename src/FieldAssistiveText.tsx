import React from 'react';
import DOMPurify from 'dompurify';

import { FormHelperText, FormHelperTextProps } from '@material-ui/core';

export interface IFieldAssistiveTextProps
  extends Omit<FormHelperTextProps, 'error' | 'disabled'> {
  disabled: boolean;
}

export default function FieldAssistiveText({
  children,
  ...props
}: IFieldAssistiveTextProps) {
  if (!children) return null;

  return (
    <FormHelperText
      {...props}
      style={{ whiteSpace: 'pre-line', display: 'flex', ...props.style }}
      error={false}
      dangerouslySetInnerHTML={
        typeof children === 'string'
          ? { __html: DOMPurify.sanitize(children) }
          : undefined
      }
      children={typeof children !== 'string' ? children : undefined}
    />
  );
}
