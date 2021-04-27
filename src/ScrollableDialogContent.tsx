import React from 'react';
import clsx from 'clsx';
import useScrollInfo from 'react-element-scroll-hook';

import { Divider, DialogContent, DialogContentProps } from '@material-ui/core';
import { ClassNameMap } from '@material-ui/styles';

const MemoizedDialogContent = React.memo(function MemoizedDialogContent({
  setRef,
  ...props
}: DialogContentProps & { setRef: any }) {
  return <DialogContent {...props} ref={setRef} />;
});

export interface IScrollableDialogContentProps extends DialogContentProps {
  dividersClasses?: Partial<ClassNameMap<'root' | 'top' | 'bottom'>>;
  disableTopDivider?: boolean;
  disableBottomDivider?: boolean;
}

export default function ScrollableDialogContent({
  dividersClasses = {},
  disableTopDivider = false,
  disableBottomDivider = false,
  ...props
}: IScrollableDialogContentProps) {
  const [scrollInfo, setRef] = useScrollInfo();

  return (
    <>
      {!disableTopDivider &&
        scrollInfo.y.percentage !== null &&
        scrollInfo.y.percentage > 0 && (
          <Divider
            className={clsx(dividersClasses.root, dividersClasses.top)}
          />
        )}

      <MemoizedDialogContent {...props} setRef={setRef} />

      {!disableBottomDivider &&
        scrollInfo.y.percentage !== null &&
        scrollInfo.y.percentage < 1 && (
          <Divider
            className={clsx(dividersClasses.root, dividersClasses.bottom)}
          />
        )}
    </>
  );
}
