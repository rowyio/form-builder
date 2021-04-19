import { IFieldConfig } from '../../types';
import { FieldType } from '../../constants/fields';

export const HiddenSettings: IFieldConfig['settings'] = [
  {
    type: FieldType.shortText,
    name: 'defaultValue',
    label: 'Persistent Value',
    defaultValue: '',
    assistiveText:
      'This value cannot be edited by the user and will always be submitted as part of the form.',
  },
  {
    type: FieldType.checkbox,
    name: 'disablePadding',
    label: 'Disable padding',
    defaultValue: true,
    disabled: true,
  },
];

export default HiddenSettings;
