import { IFieldConfig } from '../../types';
import { FieldType } from '../../constants/fields';

export const ContentSectionSettings: IFieldConfig['settings'] = [
  {
    name: 'label',
    label: 'Section Header',
    type: FieldType.shortText,
    defaultValue: 'Section',
  },
];

export default ContentSectionSettings;
