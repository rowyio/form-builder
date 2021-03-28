import React, { lazy } from 'react';
import { IFieldConfig } from '../../types';
import { FieldType } from '../../constants/fields';

import SvgIcon from '@material-ui/core/SvgIcon';
import { mdiPalette } from '@mdi/js';

import Settings from './ColorSettings';
const Component = lazy(
  () => import('./ColorComponent') /* webpackChunkName: FormBuilder-Color */
);

export const config: IFieldConfig = {
  type: FieldType.color,
  name: 'Color',
  group: 'input',
  icon: (
    <SvgIcon>
      <path d={mdiPalette} />
    </SvgIcon>
  ),
  defaultValue: null,
  component: Component,
  settings: Settings,
};
export default config;
