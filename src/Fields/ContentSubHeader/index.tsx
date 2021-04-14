import React, { lazy } from 'react';
import { IFieldConfig } from '../../types';
import { FieldType } from '../../constants/fields';

import SvgIcon from '@material-ui/core/SvgIcon';
import { mdiFormatHeader2 } from '@mdi/js';

import Settings from './ContentSubHeaderSettings';
const Component = lazy(
  () =>
    import(
      './ContentSubHeaderComponent'
    ) /* webpackChunkName: FormBuilder-ContentSubHeader */
);

export const ContentSubHeaderConfig: IFieldConfig = {
  type: FieldType.contentSubHeader,
  name: 'Sub-Header',
  group: 'content',
  icon: (
    <SvgIcon>
      <path d={mdiFormatHeader2} />
    </SvgIcon>
  ),
  dataType: 'undefined',
  defaultValue: undefined,
  component: Component,
  settings: Settings,
  validation: () => [],
};
export default ContentSubHeaderConfig;
