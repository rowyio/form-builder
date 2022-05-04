import React, { lazy } from 'react';
import { IFieldConfig } from '../../types';
import { FieldType } from '../../constants/fields';

import FormatHeader1 from 'mdi-material-ui/FormatHeader1';

import Settings from './ContentHeaderSettings';
const Component = lazy(
  () =>
    import(
      './ContentHeaderComponent'
    ) /* webpackChunkName: FormBuilder-ContentHeader */
);

export const ContentHeaderConfig: IFieldConfig = {
  type: FieldType.contentHeader,
  name: 'Header',
  group: 'content',
  icon: <FormatHeader1 />,
  dataType: 'undefined',
  defaultValue: undefined,
  component: Component,
  settings: Settings,
  validation: () => [],
};
export default ContentHeaderConfig;
