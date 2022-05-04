import React, { lazy } from 'react';
import { IFieldConfig } from '../../types';
import { FieldType } from '../../constants/fields';

import RadioboxMarked from 'mdi-material-ui/RadioboxMarked';

import Settings from './RadioSettings';
const Component = lazy(
  () => import('./RadioComponent') /* webpackChunkName: FormBuilder-Radio */
);

export const RadioConfig: IFieldConfig = {
  type: FieldType.radio,
  name: 'Radio',
  group: 'input',
  icon: <RadioboxMarked />,
  dataType: 'string',
  defaultValue: '',
  component: Component as any,
  settings: Settings,
  validation: () => [['string'], ['trim']],
};
export default RadioConfig;
