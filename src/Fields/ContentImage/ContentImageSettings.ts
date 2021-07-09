import { IFieldConfig } from '../../types';
import { FieldType } from '../../constants/fields';

export const ContentImageSettings: IFieldConfig['settings'] = [
  {
    name: 'src',
    label: 'Image Source',
    type: 'image',
    required: true,
    defaultValue: '',
  },
  {
    name: 'alt',
    label: 'Alt Text',
    type: FieldType.shortText,
    required: true,
    defaultValue: '',
    assistiveText:
      '<a href="https://supercooldesign.co.uk/blog/how-to-write-good-alt-text" target="_blank" rel="noopener">Learn more about alt text</a>',
  },
];

export default ContentImageSettings;
