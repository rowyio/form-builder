import React, { lazy } from 'react';
import { IFieldConfig } from '../../types';
import { FieldType } from '../../constants/fields';

import SvgIcon from '@material-ui/core/SvgIcon';
import { mdiFormTextbox } from '@mdi/js';

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
  icon: (
    <SvgIcon>
      <path d={mdiFormTextbox} />
    </SvgIcon>
  ),
  defaultValue: '',
  component: Component,
  settings: Settings,
  validation,
};
export default ShortTextConfig;
