import React, { lazy } from 'react';
import { IFieldConfig } from '../../types';
import { FieldType } from '../../constants/fields';

import FormatHeader2 from 'mdi-material-ui/FormatHeader2';

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
  icon: <FormatHeader2 />,
  dataType: 'undefined',
  defaultValue: undefined,
  component: Component,
  settings: Settings,
  validation: () => [],
};
export default ContentSubHeaderConfig;
