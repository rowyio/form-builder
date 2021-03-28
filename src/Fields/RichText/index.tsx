import React, { lazy } from 'react';
import { IFieldConfig } from '../../types';
import { FieldType } from '../../constants/fields';

import SvgIcon from '@material-ui/core/SvgIcon';
import { mdiFormatColorText } from '@mdi/js';

import Settings from './RichTextSettings';
const Component = lazy(
  () =>
    import('./RichTextComponent') /* webpackChunkName: FormBuilder-RichText */
);

export const RichTextConfig: IFieldConfig = {
  type: FieldType.richText,
  name: 'Rich Text',
  group: 'input',
  icon: (
    <SvgIcon>
      <path d={mdiFormatColorText} />
    </SvgIcon>
  ),
  defaultValue: '',
  component: Component,
  settings: Settings,
};
export default RichTextConfig;
