import React, { lazy } from 'react';
import { IFieldConfig } from '../../types';
import { FieldType } from '../../constants/fields';

import FormTextarea from 'mdi-material-ui/FormTextarea';

import Settings from './ParagraphSettings';
const Component = lazy(
  () =>
    import('./ParagraphComponent') /* webpackChunkName: FormBuilder-Paragraph */
);

export const ParagraphConfig: IFieldConfig = {
  type: FieldType.paragraph,
  name: 'Paragraph',
  group: 'input',
  icon: <FormTextarea />,
  dataType: 'string',
  defaultValue: '',
  component: Component,
  settings: Settings,
  validation: (config) => {
    const validation: any[][] = [['string'], ['trim']];

    if (typeof config.maxCharacters === 'number')
      validation.push([
        'max',
        config.maxCharacters,
        'You have reached the character limit',
      ]);

    return validation;
  },
};
export default ParagraphConfig;
