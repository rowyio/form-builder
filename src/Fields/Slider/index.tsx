import React, { lazy } from 'react';
import { IFieldConfig } from '../../types';
import { FieldType } from '../../constants/fields';

import SvgIcon from '@material-ui/core/SvgIcon';
import { mdiGestureSwipeHorizontal } from '@mdi/js';

import Settings from './SliderSettings';
const Component = lazy(
  () => import('./SliderComponent') /* webpackChunkName: FormBuilder-Slider */
);

export const config: IFieldConfig = {
  type: FieldType.slider,
  name: 'Slider',
  group: 'input',
  icon: (
    <SvgIcon>
      <path d={mdiGestureSwipeHorizontal} />
    </SvgIcon>
  ),
  defaultValue: 0,
  component: Component,
  settings: Settings,
};
export default config;
