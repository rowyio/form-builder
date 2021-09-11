import React, { lazy } from 'react';
import { IFieldConfig } from '../../types';
import { FieldType } from '../../constants/fields';

import SvgIcon from '@mui/material/SvgIcon';
import { mdiImage } from '@mdi/js';

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
  icon: (
    <SvgIcon>
      <path d={mdiImage} />
    </SvgIcon>
  ),
  dataType: 'undefined',
  defaultValue: undefined,
  component: Component as any,
  settings: Settings,
  validation: () => [],
};
export default ContentImageConfig;
