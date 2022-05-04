import React, { lazy } from 'react';
import { IFieldConfig } from '../../types';
import { FieldType } from '../../constants/fields';
import * as yup from 'yup';

import OrderBoolAscendingVariant from 'mdi-material-ui/OrderBoolAscendingVariant';

import Settings from './MultiSelectSettings';
const Component = lazy(
  () =>
    import(
      './MultiSelectComponent'
    ) /* webpackChunkName: FormBuilder-MultiSelect */
);

export const MultiSelectConfig: IFieldConfig = {
  type: FieldType.multiSelect,
  name: 'Multi Select',
  group: 'input',
  icon: <OrderBoolAscendingVariant />,
  dataType: 'string[]',
  defaultValue: [],
  component: Component as any,
  settings: Settings,
  validation: (config: Record<string, any>) => {
    const validation: any[][] = [
      ['array'],
      ['of', yup.string().trim()],
      ['ensure'],
      ['compact'],
    ];

    if (config.required === true)
      validation.push(['min', 1, 'Please make at least one selection']);

    if (typeof config.max === 'number')
      validation.push([
        'max',
        config.max,
        `Please make at most ${config.max} selections`,
      ]);

    return validation;
  },
};
export default MultiSelectConfig;
