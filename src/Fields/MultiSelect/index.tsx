import React, { lazy } from 'react';
import { IFieldConfig } from '../../types';
import { FieldType } from '../../constants/fields';

import SvgIcon from '@material-ui/core/SvgIcon';
import { mdiOrderBoolAscendingVariant } from '@mdi/js';

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
  icon: (
    <SvgIcon>
      <path d={mdiOrderBoolAscendingVariant} />
    </SvgIcon>
  ),
  defaultValue: [],
  component: Component as any,
  settings: Settings,
};
export default MultiSelectConfig;
