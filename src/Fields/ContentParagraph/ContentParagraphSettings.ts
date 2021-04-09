import { IFieldConfig } from '../../types';
import { FieldType } from '../../constants/fields';

export const ContentParagraphSettings: IFieldConfig['settings'] = [
  {
    name: 'label',
    label: 'Paragraph',
    type: FieldType.paragraph,
    required: true,
    defaultValue: '',
  },
];

export default ContentParagraphSettings;
