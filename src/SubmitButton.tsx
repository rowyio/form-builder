import React from 'react';
import clsx from 'clsx';

import { makeStyles, Button, ButtonProps } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(6, 0),
    padding: theme.spacing(1, 5),
  },
  endIcon: { marginRight: -theme.spacing(3) },
}));

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
      size="large"
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
