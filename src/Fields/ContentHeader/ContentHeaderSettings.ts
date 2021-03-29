import { IFieldConfig } from '../../types';
import { FieldType } from '../../constants/fields';

export const ContentHeaderSettings: IFieldConfig['settings'] = [
  {
    name: 'label',
    label: 'Header',
    type: FieldType.shortText,
    defaultValue: 'Header',
  },
];

export default ContentHeaderSettings;
