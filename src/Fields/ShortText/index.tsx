import React, { lazy } from 'react';
import { IFieldConfig } from '../../types';
import { FieldType } from '../../constants/fields';

import FormTextbox from 'mdi-material-ui/FormTextbox';

import Settings from './ShortTextSettings';
import validation from './ShortTextValidation';
const Component = lazy(
  () =>
    import('./ShortTextComponent') /* webpackChunkName: FormBuilder-ShortText */
);

export const ShortTextConfig: IFieldConfig = {
  type: FieldType.shortText,
  name: 'Short Text',
  group: 'input',
  icon: <FormTextbox />,
  dataType: 'string',
  defaultValue: '',
  component: Component,
  settings: Settings,
  validation,
};
export default ShortTextConfig;
