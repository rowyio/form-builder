import React from 'react';
import { IFieldComponentProps } from '../../types';

export interface IContentImageComponentProps
  extends IFieldComponentProps,
    Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src: string | { downloadURL: string }[];
}

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

  src,
  alt,
  ...props
}: IContentImageComponentProps) {
  if (!src || (Array.isArray(src) && (src.length === 0 || !src[0].downloadURL)))
    return null;

  return (
    <img
      {...props}
      src={typeof src === 'string' ? src : src?.[0]?.downloadURL}
      alt={alt}
      style={{
        maxWidth: '100%',
        height: 'auto',
        ...props.style,
      }}
    />
  );
}
