import React from 'react';
import { Skeleton, SkeletonProps } from '@mui/material';

export default function FieldSkeleton(props: SkeletonProps) {
  return (
    <Skeleton
      variant="rectangular"
      width="100%"
      height={56}
      style={{ transform: 'none' }}
      {...props}
    />
  );
}
