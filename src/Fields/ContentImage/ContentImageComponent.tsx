import React from 'react';
import { IFieldComponentProps } from '../../types';

export interface IContentImageComponentProps
  extends IFieldComponentProps,
    React.ImgHTMLAttributes<HTMLImageElement> {}

export default function ContentImageComponent({
  field,
  fieldState,
  formState,

  index,
  label,
  children,

  disabled,
  errorMessage,
  name,
  useFormMethods,
  ...props
}: IContentImageComponentProps) {
  if (!props.src) return null;

  return (
    <img
      {...props}
      style={{
        maxWidth: '100%',
        height: 'auto',
        ...props.style,
      }}
    />
  );
}
