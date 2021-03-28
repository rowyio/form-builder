import { IFieldConfig } from '../../types';
import { FieldType } from '../../constants/fields';

export const RichTextSettings: IFieldConfig['settings'] = [
  {
    type: FieldType.shortText,
    name: 'maxCharacters',
    label: 'Max Characters',
    defaultValue: undefined,
    format: 'number',
  },
];

export default RichTextSettings;
