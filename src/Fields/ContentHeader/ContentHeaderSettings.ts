import { IFieldConfig } from '../../types';
import { FieldType } from '../../constants/fields';

export const ContentHeaderSettings: IFieldConfig['settings'] = [
  {
    name: 'label',
    label: 'Header',
    type: FieldType.shortText,
    required: true,
    defaultValue: '',
  },
];

export default ContentHeaderSettings;
