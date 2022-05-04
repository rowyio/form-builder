import React, { lazy } from 'react';
import { IFieldConfig } from '../../types';
import { FieldType } from '../../constants/fields';

import Numeric10Box from 'mdi-material-ui/Numeric10Box';

import Settings from './ScoreSettings';
const Component = lazy(
  () => import('./ScoreComponent') /* webpackChunkName: FormBuilder-Score */
);

export const ScoreConfig: IFieldConfig = {
  type: FieldType.score,
  name: 'Score',
  group: 'input',
  icon: <Numeric10Box />,
  dataType: 'number',
  defaultValue: undefined,
  component: Component,
  settings: Settings,
  validation: () => [['number']],
};
export default ScoreConfig;
