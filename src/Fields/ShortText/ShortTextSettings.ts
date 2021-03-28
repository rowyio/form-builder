import { IFieldConfig } from '../../types';
import { FieldType } from '../../constants/fields';

export const ShortTextSettings: IFieldConfig['settings'] = [
  {
    type: FieldType.shortText,
    name: 'placeholder',
    label: 'Placeholder',
    defaultValue: '',
  },
  {
    type: FieldType.shortText,
    name: 'maxCharacters',
    label: 'Max characters',
    defaultValue: undefined,
    format: 'number',
  },
  {
    type: FieldType.singleSelect,
    name: 'format',
    label: 'Format',
    defaultValue: '',
    options: [
      { value: 'email', label: 'Email' },
      { value: 'phone', label: 'Phone' },
      { value: 'number', label: 'Number' },
      { value: 'url', label: 'URL' },
      { value: 'twitter', label: 'Twitter handle' },
      { value: 'linkedin', label: 'LinkedIn URL' },
    ],
  },
];

export default ShortTextSettings;
