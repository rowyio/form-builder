import React, { lazy } from 'react';
import { IFieldConfig } from '../../types';
import { FieldType } from '../../constants/fields';

import SvgIcon from '@material-ui/core/SvgIcon';
import { mdiPalette } from '@mdi/js';

import Settings from './ColorSettings';
const Component = lazy(
  () => import('./ColorComponent') /* webpackChunkName: FormBuilder-Color */
);

export const ColorConfig: IFieldConfig = {
  type: FieldType.color,
  name: 'Color',
  group: 'input',
  icon: (
    <SvgIcon>
      <path d={mdiPalette} />
    </SvgIcon>
  ),
  dataType: 'Record<string, any>',
  defaultValue: null,
  component: Component,
  settings: Settings,
  validation: () => [['object'], ['nullable']],
};
export default ColorConfig;
