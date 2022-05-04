import React, { lazy } from 'react';
import { IFieldConfig } from '../../types';
import { FieldType } from '../../constants/fields';

import Text from 'mdi-material-ui/Text';

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
  icon: <Text />,
  dataType: 'undefined',
  defaultValue: undefined,
  component: Component,
  settings: Settings,
  validation: () => [],
};
export default ContentParagraphConfig;
