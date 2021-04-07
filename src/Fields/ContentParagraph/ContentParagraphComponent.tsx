import React from 'react';
import clsx from 'clsx';
import { IFieldComponentProps } from '../../types';

import {
  makeStyles,
  createStyles,
  Typography,
  TypographyProps,
} from '@material-ui/core';

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
    Partial<Omit<TypographyProps, 'title'>> {}

export default function ContentParagraphComponent({
  index,
  label,
  children,
  className,

  control,
  disabled,
  errorMessage,
  name,
  useFormMethods,
  ...props
}: IContentParagraphComponentProps) {
  const classes = useStyles();

  return (
    <Typography
      variant="body1"
      color="textSecondary"
      className={clsx(classes.root, className)}
      {...({ component: children ? 'div' : 'p' } as any)}
      {...props}
    >
      {children ?? label}
    </Typography>
  );
}
