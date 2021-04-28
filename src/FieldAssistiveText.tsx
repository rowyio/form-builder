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

  const sanitizedChildren =
    typeof children === 'string' ? DOMPurify.sanitize(children) : null;

  if (sanitizedChildren)
    return (
      <FormHelperText
        {...props}
        style={{ whiteSpace: 'pre-line', ...props.style }}
        error={false}
        dangerouslySetInnerHTML={{ __html: sanitizedChildren }}
      />
    );

  return (
    <FormHelperText
      {...props}
      style={{ whiteSpace: 'pre-line', ...props.style }}
      error={false}
      children={children}
    />
  );
}
