import React, { lazy } from 'react';
import { IFieldConfig } from '../../types';
import { FieldType } from '../../constants/fields';

import SvgIcon from '@material-ui/core/SvgIcon';
import { mdiOrderBoolDescending } from '@mdi/js';

import Settings from './SingleSelectSettings';
const Component = lazy(
  () =>
    import(
      './SingleSelectComponent'
    ) /* webpackChunkName: FormBuilder-SingleSelect */
);

export const SingleSelectConfig: IFieldConfig = {
  type: FieldType.singleSelect,
  name: 'Single Select',
  group: 'input',
  icon: (
    <SvgIcon>
      <path d={mdiOrderBoolDescending} />
    </SvgIcon>
  ),
  defaultValue: '',
  component: Component as any,
  settings: Settings,
};
export default SingleSelectConfig;
