import React from 'react';
import clsx from 'clsx';

import { makeStyles, createStyles } from '@material-ui/styles';
import { FormLabel, FormLabelProps } from '@material-ui/core';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      display: 'block',

      ...theme.typography.overline,
      color: theme.palette.text.secondary,

      marginBottom: theme.spacing(1),
      whiteSpace: 'pre-line',
    },
  })
);

export interface IFieldLabelProps
  extends Omit<FormLabelProps, 'error' | 'disabled'> {
  error: boolean;
  disabled: boolean;
  required: boolean;
}

export default function FieldLabel(props: IFieldLabelProps) {
  const classes = useStyles();

  return (
    <FormLabel {...props} className={clsx(classes.root, props.className)} />
  );
}
