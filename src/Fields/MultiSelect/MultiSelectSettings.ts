import { IFieldConfig } from '../../types';
import { FieldType } from '../../constants/fields';

export const MultiSelectSettings: IFieldConfig['settings'] = [
  {
    type: FieldType.list,
    name: 'options',
    label: 'Options',
    defaultValue: [],
    required: true,
  },
  {
    type: FieldType.checkbox,
    name: 'searchable',
    label: 'User can search options',
    defaultValue: true,
  },
  {
    type: FieldType.shortText,
    name: 'labelPlural',
    label: 'Plural Label (if searchable)',
    defaultValue: undefined,
    // TODO: MAKE CONDITIONAL
  },
  {
    type: FieldType.checkbox,
    name: 'freeText',
    label: 'User can add new options',
    defaultValue: false,
  },
  {
    type: FieldType.checkbox,
    name: 'clearable',
    label: 'User can clear selection',
    defaultValue: true,
  },
];

export default MultiSelectSettings;
