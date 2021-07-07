import React, { lazy } from 'react';
import { IFieldConfig } from '../../types';
import { FieldType } from '../../constants/fields';

import SvgIcon from '@material-ui/core/SvgIcon';
import { mdiCalendarClock } from '@mdi/js';

const Component = lazy(
  () =>
    import('./DateTimeComponent') /* webpackChunkName: FormBuilder-DateTime */
);

export const DateTimeConfig: IFieldConfig = {
  type: FieldType.dateTime,
  name: 'Time & Date',
  group: 'input',
  icon: (
    <SvgIcon>
      <path d={mdiCalendarClock} />
    </SvgIcon>
  ),
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
export default DateTimeConfig;
