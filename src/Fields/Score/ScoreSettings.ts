import { IFieldConfig } from '../../types';
import { FieldType } from '../../constants/fields';

export const ScoreSettings: IFieldConfig['settings'] = [
  {
    type: FieldType.shortText,
    name: 'min',
    label: 'Minimum Value',
    defaultValue: 0,
    format: 'number',
    gridCols: 6,
  },
  {
    type: FieldType.shortText,
    name: 'max',
    label: 'Maximum Value',
    defaultValue: 10,
    format: 'number',
    gridCols: 6,
  },
  {
    type: FieldType.shortText,
    name: 'minLabel',
    label: 'Minimum Label',
    defaultValue: '',
    gridCols: 6,
  },
  {
    type: FieldType.shortText,
    name: 'maxLabel',
    label: 'Maximum Label',
    defaultValue: '',
    gridCols: 6,
  },
  {
    type: FieldType.shortText,
    name: 'step',
    label: 'Step Size',
    defaultValue: 1,
    format: 'number',
    gridCols: 6,
  },
];

export default ScoreSettings;
