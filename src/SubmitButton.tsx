import React from 'react';
import clsx from 'clsx';

import { makeStyles, createStyles } from '@mui/styles';
import { Button, ButtonProps } from '@mui/material';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: 'flex',
      margin: theme.spacing(3, 'auto', 0),
      minWidth: 120,
    },
  })
);

export interface ISubmitButtonProps extends ButtonProps {
  label?: React.ReactNode;
}

export default function SubmitButton({
  label,
  ...buttonProps
}: ISubmitButtonProps) {
  const classes = useStyles();

  return (
    <Button
      variant="contained"
      color="primary"
      type="submit"
      {...buttonProps}
      classes={{
        ...buttonProps?.classes,
        root: clsx(classes.root, buttonProps?.classes?.root),
      }}
    >
      {label || 'Submit'}
    </Button>
  );
}
