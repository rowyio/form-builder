import React, { lazy } from 'react';
import { IFieldConfig } from '../../types';
import { FieldType } from '../../constants/fields';

import SvgIcon from '@material-ui/core/SvgIcon';
import { mdiFormatPageBreak } from '@mdi/js';

import Settings from './ContentHeaderSettings';
const Component = lazy(
  () =>
    import(
      './ContentHeaderComponent'
    ) /* webpackChunkName: FormBuilder-ContentHeader */
);

export const ContentHeaderConfig: IFieldConfig = {
  type: FieldType.contentHeader,
  name: 'Header',
  group: 'content',
  icon: (
    <SvgIcon>
      <path d={mdiFormatPageBreak} />
    </SvgIcon>
  ),
  defaultValue: undefined,
  component: Component,
  settings: Settings,
};
export default ContentHeaderConfig;
