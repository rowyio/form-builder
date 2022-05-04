import React, { lazy } from 'react';
import { IFieldConfig } from '../../types';
import { FieldType } from '../../constants/fields';

import Image from 'mdi-material-ui/Image';

import Settings from './ContentImageSettings';
const Component = lazy(
  () =>
    import(
      './ContentImageComponent'
    ) /* webpackChunkName: FormBuilder-ContentImage */
);

export const ContentImageConfig: IFieldConfig = {
  type: FieldType.contentImage,
  name: 'Image',
  group: 'content',
  icon: <Image />,
  dataType: 'undefined',
  defaultValue: undefined,
  component: Component as any,
  settings: Settings,
  validation: () => [],
};
export default ContentImageConfig;
