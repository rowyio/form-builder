import React from 'react';

import { useTheme, Typography, TypographyProps } from '@material-ui/core';

export interface ISubmitErrorProps extends TypographyProps {}

export default function SubmitError(props: ISubmitErrorProps) {
  const theme = useTheme();

  return (
    <Typography
      variant="body2"
      color="error"
      align="center"
      {...props}
      children={
        props.children ||
        'Cannot continue. Make sure all the required fields are in the correct format.'
      }
      style={{ marginTop: theme.spacing(1), ...props.style }}
    />
  );
}
