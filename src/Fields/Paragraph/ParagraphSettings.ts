import { IFieldConfig } from '../../types';
import { FieldType } from '../../constants/fields';

export const ParagraphSettings: IFieldConfig['settings'] = [
  {
    type: FieldType.paragraph,
    name: 'placeholder',
    label: 'Placeholder',
    defaultValue: '',
  },
  {
    type: FieldType.shortText,
    name: 'maxCharacters',
    label: 'Max characters',
    conditional: 'check',
    defaultValue: undefined,
    format: 'number',
  },
];

export default ParagraphSettings;
