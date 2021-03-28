import React, { lazy } from 'react';
import { IFieldConfig } from '../../types';
import { FieldType } from '../../constants/fields';

import SvgIcon from '@material-ui/core/SvgIcon';
import { mdiFormatPageBreak } from '@mdi/js';

import Settings from './ContentSectionSettings';
const Component = lazy(
  () =>
    import(
      './ContentSectionComponent'
    ) /* webpackChunkName: FormBuilder-ContentSection */
);

export const ContentSectionConfig: IFieldConfig = {
  type: FieldType.contentSection,
  name: 'Section',
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
export default ContentSectionConfig;
