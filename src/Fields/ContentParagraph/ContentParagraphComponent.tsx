import React from 'react';
import { IFieldComponentProps } from '../../types';
import DOMPurify from 'dompurify';

import { Typography, TypographyProps } from '@mui/material';

const rootStyles = { mb: -1.5, whiteSpace: 'pre-line', cursor: 'default' };

export interface IContentParagraphComponentProps
  extends IFieldComponentProps,
    Partial<Omit<TypographyProps, 'title' | 'onChange' | 'onBlur' | 'ref'>> {}

export default function ContentParagraphComponent({
  field,
  fieldState,
  formState,

  index,
  label,
  children,
  className,

  disabled,
  errorMessage,
  name,
  useFormMethods,
  ...props
}: IContentParagraphComponentProps) {
  if (children)
    return (
      <Typography
        className={className}
        {...({ component: 'div' } as any)}
        {...props}
        sx={[
          rootStyles,
          ...(Array.isArray(props.sx) ? props.sx : props.sx ? [props.sx] : []),
        ]}
      >
        {children}
      </Typography>
    );

  const renderedLabel =
    typeof label === 'string' ? DOMPurify.sanitize(label) : null;

  if (renderedLabel)
    return (
      <Typography
        className={className}
        {...({ component: 'div' } as any)}
        {...props}
        sx={[
          rootStyles,
          ...(Array.isArray(props.sx) ? props.sx : props.sx ? [props.sx] : []),
        ]}
        dangerouslySetInnerHTML={{ __html: renderedLabel }}
      />
    );

  return (
    <Typography
      className={className}
      {...({ component: 'div' } as any)}
      {...props}
      sx={[
        rootStyles,
        ...(Array.isArray(props.sx) ? props.sx : props.sx ? [props.sx] : []),
      ]}
    >
      {label}
    </Typography>
  );
}
