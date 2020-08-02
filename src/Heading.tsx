import React from 'react';
import clsx from 'clsx';

import {
  makeStyles,
  createStyles,
  Typography,
  Divider,
} from '@material-ui/core';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      marginTop: theme.spacing(2),
      marginBottom: -theme.spacing(2),
      width: '100%',

      textTransform: 'uppercase',
      letterSpacing: 1,

      whiteSpace: 'pre-line',
      cursor: 'default',
    },
  })
);

export interface IHeadingProps {
  children?: React.ReactNode;
  heading?: React.ReactNode;
  title?: React.ReactNode;
  label?: React.ReactNode;
  text?: React.ReactNode;

  className?: string;
}

export default function Heading({
  children,
  heading,
  title,
  label,
  text,
  className,
}: IHeadingProps) {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)}>
      <Typography variant="h6" color="textSecondary">
        {children ?? heading ?? title ?? label ?? text}
      </Typography>
      <Divider />
    </div>
  );
}
