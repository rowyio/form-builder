import React, { lazy } from 'react';
import { IFieldConfig } from '../../types';
import { FieldType } from '../../constants/fields';

import SvgIcon from '@material-ui/core/SvgIcon';
import { mdiCalendarClock } from '@mdi/js';

const Component = lazy(
  () =>
    import('./DateTimeComponent') /* webpackChunkName: FormBuilder-DateTime */
);

export const config: IFieldConfig = {
  type: FieldType.dateTime,
  name: 'Time & Date',
  group: 'input',
  icon: (
    <SvgIcon>
      <path d={mdiCalendarClock} />
    </SvgIcon>
  ),
  defaultValue: null,
  component: Component,
  settings: [],
};
export default config;
