import React, { Suspense } from 'react';
import { UseFormMethods, useWatch } from 'react-hook-form';
import _isFunction from 'lodash/isFunction';

import { Grid } from '@material-ui/core';

import {
  Fields,
  FieldType,
  Values,
  CustomComponents,
  CustomComponent,
} from './utils';
import { FIELDS, FIELD_COMPONENTS } from './Fields';

import Heading from './Heading';
import Description from './Description';
import FieldSkeleton from './FieldSkeleton';

interface ICommonProps {
  register: UseFormMethods['register'];
  control: UseFormMethods['control'];
  errors: UseFormMethods['errors'];
  customComponents?: CustomComponents;
  useFormMethods: UseFormMethods;
}

export interface IFormFieldsProps extends ICommonProps {
  fields: Fields;
}
export default function FormFields({ fields, ...props }: IFormFieldsProps) {
  return (
    <Grid
      container
      spacing={3}
      direction="column"
      wrap="nowrap"
      style={{ marginBottom: 0 }}
    >
      {fields.map((field, i) => {
        // Call the field function with values if necessary
        if (_isFunction(field))
          return <DependentField key={i} fieldFunction={field} {...props} />;

        // Otherwise, just use the field object
        // If we intentionally hide this field due to form values, don’t render
        if (!field) return null;

        return <FieldComponent key={field.name ?? i} {...field} {...props} />;
      })}
    </Grid>
  );
}

interface IFieldComponentProps extends FieldType, ICommonProps {}
function FieldComponent({
  register,
  control,
  errors,
  type,
  customComponents,
  ...fieldProps
}: IFieldComponentProps) {
  let renderedField: React.ReactNode = null;

  switch (type) {
    case FIELDS.heading:
      renderedField = <Heading {...fieldProps} />;
      break;

    case FIELDS.description:
      renderedField = <Description {...fieldProps} />;
      break;

    case undefined:
      console.error('undefined field type');
      return null;

    default:
      let fieldComponent: CustomComponent;

      // Try to get fieldComponent from customComponents list
      if (
        !!customComponents &&
        Object.keys(customComponents).length > 0 &&
        type in customComponents
      ) {
        fieldComponent = customComponents[type].component;
      }
      // If not found in customComponents, try to get it from the built-in components
      else if (type in FIELD_COMPONENTS) {
        fieldComponent = FIELD_COMPONENTS[type as FIELDS];
      }
      // If not found in either, don’t display anything
      else {
        console.error(`No matching field component for \`${type}\``);
        return null;
      }

      if (!fieldProps.name) return null;

      renderedField = React.createElement(fieldComponent, {
        ...fieldProps,
        name: fieldProps.name!,
        label: fieldProps.label!,
        register,
        control,
        errorMessage: errors[fieldProps.name!]?.message,
      });
  }

  return (
    <Grid item key={fieldProps.name!} xs={12}>
      <Suspense fallback={<FieldSkeleton />}>{renderedField}</Suspense>
    </Grid>
  );
}

interface IDependentField extends ICommonProps {
  fieldFunction: (values: Values) => FieldType | null;
}
function DependentField({ fieldFunction, ...props }: IDependentField) {
  const values = useWatch({ control: props.control });

  const field = fieldFunction(values);

  // If we intentionally hide this field due to form values, don’t render
  if (!field) return null;

  return <FieldComponent {...field} {...props} />;
}
