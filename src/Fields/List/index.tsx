import React, { lazy } from 'react';
import { IFieldConfig } from '../../types';
import { FieldType } from '../../constants/fields';

import SvgIcon from '@material-ui/core/SvgIcon';
import { mdiFormatListNumbered } from '@mdi/js';

import Settings from './ListSettings';
const Component = lazy(
  () => import('./ListComponent') /* webpackChunkName: FormBuilder-List */
);

export const config: IFieldConfig = {
  type: FieldType.list,
  name: 'List',
  group: 'input',
  icon: (
    <SvgIcon>
      <path d={mdiFormatListNumbered} />
    </SvgIcon>
  ),
  defaultValue: [],
  component: Component,
  settings: Settings,
};
export default config;
