import React from 'react';
import clsx from 'clsx';
import { IFieldComponentProps } from '../../types';
import DOMPurify from 'dompurify';

import { makeStyles, createStyles } from '@material-ui/styles';
import { Typography, TypographyProps } from '@material-ui/core';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      marginBottom: -theme.spacing(1.5),

      whiteSpace: 'pre-line',
      cursor: 'default',
    },

    firstField: { marginTop: 0 },
  })
);

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
  const classes = useStyles();

  if (children)
    return (
      <Typography
        variant="body1"
        color="textSecondary"
        className={clsx(classes.root, className)}
        {...({ component: 'div' } as any)}
        {...props}
      >
        {children}
      </Typography>
    );

  const renderedLabel =
    typeof label === 'string' ? DOMPurify.sanitize(label) : null;

  if (renderedLabel)
    return (
      <Typography
        variant="body1"
        color="textSecondary"
        className={clsx(classes.root, className)}
        {...({ component: 'div' } as any)}
        {...props}
        dangerouslySetInnerHTML={{ __html: renderedLabel }}
      />
    );

  return (
    <Typography
      variant="body1"
      color="textSecondary"
      className={clsx(classes.root, className)}
      {...({ component: 'div' } as any)}
      {...props}
    >
      {label}
    </Typography>
  );
}
