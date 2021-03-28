import { IFieldConfig } from '../../types';
import { FieldType } from '../../constants/fields';

export const ColorSettings: IFieldConfig['settings'] = [
  {
    type: FieldType.checkbox,
    name: 'enableAlpha',
    label: 'Enable alpha channel (user can add semi-transparent colors)',
    defaultValue: false,
  },
];

export default ColorSettings;
