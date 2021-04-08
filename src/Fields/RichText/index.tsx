import React, { lazy } from 'react';
import { IFieldConfig } from '../../types';
import { FieldType } from '../../constants/fields';
import { stripHtml } from 'string-strip-html';

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
  validation: config => {
    const validation: any[][] = [['string']];

    if (typeof config.maxCharacters === 'number')
      validation.push([
        'test',
        {
          name: 'max-chars-strip-html',
          exclusive: true,
          test: (value: string) =>
            stripHtml(value).result.length <= config.maxCharacters,
          message: 'You have reached the character limit',
        },
      ]);

    return validation;
  },
};
export default RichTextConfig;
