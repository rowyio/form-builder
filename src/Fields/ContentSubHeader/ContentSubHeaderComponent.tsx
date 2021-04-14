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
      marginTop: theme.spacing(2),
      marginBottom: -theme.spacing(1.5),

      whiteSpace: 'pre-line',
      cursor: 'default',
    },

    firstField: { marginTop: 0 },
  })
);

export interface IContentSubHeaderComponentProps
  extends IFieldComponentProps,
    Partial<Omit<TypographyProps, 'title' | 'onChange' | 'onBlur' | 'ref'>> {}

export default function ContentSubHeaderComponent({
  index,
  label,
  children,
  className,

  disabled,
  errorMessage,
  name,
  useFormMethods,
  ...props
}: IContentSubHeaderComponentProps) {
  const classes = useStyles();

  return (
    <Typography
      variant="overline"
      className={clsx(
        classes.root,
        index === 0 && classes.firstField,
        className
      )}
      {...({ component: 'h4' } as any)}
      {...props}
    >
      {children ?? label}
    </Typography>
  );
}
