import React from 'react'

import { makeStyles, Button, ButtonProps } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(6, 0),
    padding: theme.spacing(1, 5),
  },
  endIcon: { marginRight: -theme.spacing(3) },
}))

export interface ISubmitButtonProps extends ButtonProps {
  label?: React.ReactNode
}

export default function SubmitButton({
  label,
  ...buttonProps
}: ISubmitButtonProps) {
  const classes = useStyles()

  return (
    <Button
      variant="contained"
      color="primary"
      size="large"
      classes={{ root: classes.root }}
      type="submit"
      {...buttonProps}
    >
      {label || 'Submit'}
    </Button>
  )
}
