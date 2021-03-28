import React, { lazy } from 'react';
import { IFieldConfig } from '../../types';
import { FieldType } from '../../constants/fields';

import SvgIcon from '@material-ui/core/SvgIcon';
import { mdiFormTextarea } from '@mdi/js';

import Settings from './ParagraphSettings';
const Component = lazy(
  () =>
    import('./ParagraphComponent') /* webpackChunkName: FormBuilder-Paragraph */
);

export const ParagraphConfig: IFieldConfig = {
  type: FieldType.paragraph,
  name: 'Paragraph',
  group: 'input',
  icon: (
    <SvgIcon>
      <path d={mdiFormTextarea} />
    </SvgIcon>
  ),
  defaultValue: '',
  component: Component,
  settings: Settings,
};
export default ParagraphConfig;
