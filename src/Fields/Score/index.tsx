import React, { lazy } from 'react';
import { IFieldConfig } from '../../types';
import { FieldType } from '../../constants/fields';

import SvgIcon from '@mui/material/SvgIcon';
import { mdiNumeric10Box } from '@mdi/js';

import Settings from './ScoreSettings';
const Component = lazy(
  () => import('./ScoreComponent') /* webpackChunkName: FormBuilder-Score */
);

export const ScoreConfig: IFieldConfig = {
  type: FieldType.score,
  name: 'Score',
  group: 'input',
  icon: (
    <SvgIcon>
      <path d={mdiNumeric10Box} />
    </SvgIcon>
  ),
  dataType: 'number',
  defaultValue: undefined,
  component: Component,
  settings: Settings,
  validation: () => [['number']],
};
export default ScoreConfig;
