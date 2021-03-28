import React, { lazy } from 'react';
import { IFieldConfig } from '../../types';
import { FieldType } from '../../constants/fields';

import SvgIcon from '@material-ui/core/SvgIcon';
import { mdiCheckboxMarked } from '@mdi/js';

const Component = lazy(
  () =>
    import('./CheckboxComponent') /* webpackChunkName: FormBuilder-Checkbox */
);

export const CheckboxConfig: IFieldConfig = {
  type: FieldType.checkbox,
  name: 'Checkbox',
  group: 'input',
  icon: (
    <SvgIcon>
      <path d={mdiCheckboxMarked} />
    </SvgIcon>
  ),
  defaultValue: false,
  component: Component,
  settings: [],
};
export default CheckboxConfig;
