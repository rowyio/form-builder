import React from 'react';
import clsx from 'clsx';

import {
  makeStyles,
  createStyles,
  FormHelperText,
  FormHelperTextProps,
} from '@material-ui/core';

const useStyles = makeStyles(theme =>
  createStyles({
    root: { marginTop: theme.spacing(0.5) },
  })
);

export default function ErrorMessage({
  children,
  className,
  ...props
}: FormHelperTextProps) {
  const classes = useStyles();

  if (!children) return null;
  return (
    <FormHelperText error className={clsx(classes.root, className)}>
      {children}
    </FormHelperText>
  );
}
