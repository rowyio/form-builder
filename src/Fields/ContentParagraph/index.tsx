import React, { lazy } from 'react';
import { IFieldConfig } from '../../types';
import { FieldType } from '../../constants/fields';

import SvgIcon from '@material-ui/core/SvgIcon';
import { mdiText } from '@mdi/js';

import Settings from './ContentParagraphSettings';
const Component = lazy(
  () =>
    import(
      './ContentParagraphComponent'
    ) /* webpackChunkName: FormBuilder-ContentParagraph */
);

export const ContentParagraphConfig: IFieldConfig = {
  type: FieldType.contentParagraph,
  name: 'Paragraph',
  group: 'content',
  icon: (
    <SvgIcon>
      <path d={mdiText} />
    </SvgIcon>
  ),
  defaultValue: undefined,
  component: Component,
  settings: Settings,
  validation: () => [],
};
export default ContentParagraphConfig;
