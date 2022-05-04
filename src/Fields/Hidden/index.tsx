import React, { lazy } from 'react';
import { IFieldConfig } from '../../types';
import { FieldType } from '../../constants/fields';

import EyeOff from 'mdi-material-ui/EyeOff';

import Settings from './HiddenSettings';
const Component = lazy(
  () => import('./HiddenComponent') /* webpackChunkName: FormBuilder-Hidden */
);

export const HiddenConfig: IFieldConfig = {
  type: FieldType.hidden,
  name: 'Hidden',
  group: 'input',
  icon: <EyeOff />,
  dataType: 'string',
  defaultValue: '',
  component: Component,
  settings: Settings,
  validation: () => [],
};
export default HiddenConfig;
