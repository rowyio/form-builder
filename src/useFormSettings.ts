import { useReducer, useMemo } from 'react';
import { FieldValues } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Fields, CustomComponents } from './types';
import { getDefaultValues, getValidationSchema } from './utils';

const reducer = (
  state: string[],
  action: { name: string; type: 'omit' | 'unOmit' }
) => {
  switch (action.type) {
    case 'omit':
      if (state.indexOf(action.name) === -1) {
        const newState = [...state];
        newState.push(action.name);
        return newState;
      }
      break;

    case 'unOmit':
      if (state.indexOf(action.name) > -1) {
        const newState = new Set(state);
        newState.delete(action.name);
        return Array.from(newState);
      }
      break;

    default:
      break;
  }

  return state;
};

export interface IUseFormSettingsProps {
  fields: Fields;
  values?: FieldValues;

  customComponents?: CustomComponents;
}

export default function useFormSettings({
  fields,
  values,
  customComponents,
}: IUseFormSettingsProps) {
  const defaultValues = getDefaultValues(fields, customComponents, values);

  const [omittedFields, setOmittedFields] = useReducer(reducer, []);

  const fieldsWithOmissions = useMemo(
    () => fields.filter(({ name }) => omittedFields.indexOf(name ?? '') === -1),
    [omittedFields, fields]
  );

  const resolver = yupResolver(
    getValidationSchema(fieldsWithOmissions, customComponents)
  );

  return { defaultValues, resolver, setOmittedFields };
}
