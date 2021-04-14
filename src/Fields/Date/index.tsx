import React, { lazy } from 'react';
import { IFieldConfig } from '../../types';
import { FieldType } from '../../constants/fields';

import SvgIcon from '@material-ui/core/SvgIcon';
import { mdiCalendar } from '@mdi/js';

const Component = lazy(
  () => import('./DateComponent') /* webpackChunkName: FormBuilder-Date */
);

export const DateConfig: IFieldConfig = {
  type: FieldType.date,
  name: 'Date',
  group: 'input',
  icon: (
    <SvgIcon>
      <path d={mdiCalendar} />
    </SvgIcon>
  ),
  dataType: 'Date | null',
  defaultValue: null,
  component: Component,
  settings: [],
  validation: () => [
    ['date'],
    ['typeError', 'Please enter a valid date'],
    ['nullable'],
  ],
};
export default DateConfig;
