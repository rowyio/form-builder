import { IFieldConfig } from '../../types';
import { FieldType } from '../../constants/fields';

export const ListSettings: IFieldConfig['settings'] = [
  {
    type: FieldType.shortText,
    name: 'placeholder',
    label: 'Placeholder',
    defaultValue: '',
  },
  {
    type: FieldType.shortText,
    name: 'itemLabel',
    label: 'Item Label',
    defaultValue: '',
  },
];

export default ListSettings;
