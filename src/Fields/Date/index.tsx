import React, { lazy } from 'react';
import { IFieldConfig } from '../../types';
import { FieldType } from '../../constants/fields';

import Calendar from 'mdi-material-ui/Calendar';

const Component = lazy(
  () => import('./DateComponent') /* webpackChunkName: FormBuilder-Date */
);

export const DateConfig: IFieldConfig = {
  type: FieldType.date,
  name: 'Date',
  group: 'input',
  icon: <Calendar />,
  dataType: 'Date | null',
  defaultValue: null,
  component: Component as any,
  settings: [],
  validation: () => [
    ['date'],
    ['typeError', 'Please enter a valid date'],
    ['nullable'],
  ],
};
export default DateConfig;
