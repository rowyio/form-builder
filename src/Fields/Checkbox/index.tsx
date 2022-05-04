import React, { lazy } from 'react';
import { IFieldConfig } from '../../types';
import { FieldType } from '../../constants/fields';

import CheckboxMarked from 'mdi-material-ui/CheckboxMarked';

const Component = lazy(
  () =>
    import('./CheckboxComponent') /* webpackChunkName: FormBuilder-Checkbox */
);

export const CheckboxConfig: IFieldConfig = {
  type: FieldType.checkbox,
  name: 'Checkbox',
  group: 'input',
  icon: <CheckboxMarked />,
  dataType: 'boolean',
  defaultValue: false,
  component: Component,
  settings: [],
  validation: (config: Record<string, any>) => {
    const validation: any[][] = [['boolean']];

    if (config.required === true)
      validation.push(['oneOf', [true], `Please tick the box`]);

    return validation;
  },
};
export default CheckboxConfig;
