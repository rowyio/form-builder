import { IFieldConfig } from '../../types';
import { FieldType } from '../../constants/fields';

export const SliderSettings: IFieldConfig['settings'] = [
  {
    type: FieldType.shortText,
    name: 'min',
    label: 'Minimum value',
    required: true,
    defaultValue: 0,
    gridCols: 6,
    format: 'number',
  },
  {
    type: FieldType.shortText,
    name: 'minLabel',
    label: 'Minimum label',
    defaultValue: '',
    gridCols: 6,
  },
  {
    type: FieldType.shortText,
    name: 'max',
    label: 'Maximum value',
    required: true,
    defaultValue: 0,
    gridCols: 6,
    format: 'number',
  },
  {
    type: FieldType.shortText,
    name: 'maxLabel',
    label: 'Maximum label',
    defaultValue: '',
    gridCols: 6,
  },
  {
    type: FieldType.shortText,
    name: 'units',
    label: 'Units',
    defaultValue: '',
    gridCols: 6,
    placeholder: 'year',
  },
  {
    type: FieldType.shortText,
    name: 'unitsPlural',
    label: 'Plural Units',
    defaultValue: '',
    gridCols: 6,
    placeholder: 'years',
  },
  {
    type: FieldType.shortText,
    name: 'step',
    label: 'Step Size',
    required: true,
    defaultValue: 1,
    gridCols: 6,
    format: 'number',
  },
];

export default SliderSettings;
