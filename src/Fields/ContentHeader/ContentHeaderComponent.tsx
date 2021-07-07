import React from 'react';
import clsx from 'clsx';
import { IFieldComponentProps } from '../../types';

import { makeStyles, createStyles } from '@material-ui/styles';
import { Typography, TypographyProps, Divider } from '@material-ui/core';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      marginTop: theme.spacing(3),
      marginBottom: -theme.spacing(1),
      width: '100%',

      whiteSpace: 'pre-line',
      cursor: 'default',
    },

    firstField: { marginTop: 0 },

    divider: { marginTop: theme.spacing(0.5) },
  })
);

export interface IContentHeaderComponentProps
  extends IFieldComponentProps,
    Partial<Omit<TypographyProps, 'title' | 'onChange' | 'onBlur' | 'ref'>> {}

export default function ContentHeaderComponent({
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
}: IContentHeaderComponentProps) {
  const classes = useStyles();

  return (
    <div
      className={clsx(
        classes.root,
        index === 0 && classes.firstField,
        className
      )}
    >
      <Typography
        variant="h6"
        color="textSecondary"
        {...({ component: 'h3' } as any)}
        {...props}
      >
        {children ?? label}
      </Typography>

      <Divider className={classes.divider} />
    </div>
  );
}
