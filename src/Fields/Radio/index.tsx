import React, { lazy } from 'react';
import { IFieldConfig } from '../../types';
import { FieldType } from '../../constants/fields';

import SvgIcon from '@material-ui/core/SvgIcon';
import { mdiRadioboxMarked } from '@mdi/js';

import Settings from './RadioSettings';
const Component = lazy(
  () => import('./RadioComponent') /* webpackChunkName: FormBuilder-Radio */
);

export const RadioConfig: IFieldConfig = {
  type: FieldType.radio,
  name: 'Radio',
  group: 'input',
  icon: (
    <SvgIcon>
      <path d={mdiRadioboxMarked} />
    </SvgIcon>
  ),
  defaultValue: '',
  component: Component as any,
  settings: Settings,
};
export default RadioConfig;
