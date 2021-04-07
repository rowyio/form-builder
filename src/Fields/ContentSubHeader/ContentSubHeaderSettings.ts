import { IFieldConfig } from '../../types';
import { FieldType } from '../../constants/fields';

export const ContentSubHeaderSettings: IFieldConfig['settings'] = [
  {
    name: 'label',
    label: 'Sub-Header',
    type: FieldType.shortText,
    required: true,
    defaultValue: '',
  },
];

export default ContentSubHeaderSettings;
