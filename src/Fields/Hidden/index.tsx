import React, { lazy } from 'react';
import { IFieldConfig } from '../../types';
import { FieldType } from '../../constants/fields';

import SvgIcon from '@mui/material/SvgIcon';
import { mdiEyeOff } from '@mdi/js';

import Settings from './HiddenSettings';
const Component = lazy(
  () => import('./HiddenComponent') /* webpackChunkName: FormBuilder-Hidden */
);

export const HiddenConfig: IFieldConfig = {
  type: FieldType.hidden,
  name: 'Hidden',
  group: 'input',
  icon: (
    <SvgIcon>
      <path d={mdiEyeOff} />
    </SvgIcon>
  ),
  dataType: 'string',
  defaultValue: '',
  component: Component,
  settings: Settings,
  validation: () => [],
};
export default HiddenConfig;
