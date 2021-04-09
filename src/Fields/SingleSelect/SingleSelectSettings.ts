import { IFieldConfig } from '../../types';
import { FieldType } from '../../constants/fields';

export const SingleSelectSettings: IFieldConfig['settings'] = [
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
    defaultValue: undefined,
  },
  {
    type: FieldType.shortText,
    name: 'labelPlural',
    label: 'Plural Label (if searchable)',
    defaultValue: undefined,
    displayCondition: 'return values.searchable === true',
  },
  {
    type: FieldType.checkbox,
    name: 'freeText',
    label: 'User can add new options',
    defaultValue: undefined,
  },
  {
    type: FieldType.checkbox,
    name: 'clearable',
    label: 'User can clear selection',
    defaultValue: undefined,
  },
];

export default SingleSelectSettings;
