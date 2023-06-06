import React, { Suspense } from 'react';
import { Controller } from 'react-hook-form';

import { Grid } from '@mui/material';
import FieldSkeleton from './FieldSkeleton';

import { getFieldProp } from './Fields';

import { IFormFieldsProps } from './FormFields';
import { Field, CustomComponent } from './types';
import { controllerRenderPropsStub } from './utils';

export interface IFieldWrapperProps
  extends Field,
    Omit<IFormFieldsProps, 'fields'> {
  index: number;
  disabledConditional?: boolean;
}

/**
 * Finds the corresponding component for the field type and wraps it with
 * Controller.
 */
export default function FieldWrapper({
  control,
  name,
  label,
  type,
  customComponents,
  gridCols = 12,
  disablePadding,
  disablePaddingTop,
  disabledConditional,
  defaultValue: defaultValueProp,
  setOmittedFields,
  ...props
}: IFieldWrapperProps) {
  if (!type) {
    console.error(`Invalid field type: ${type}`, props);
    return null;
  }

  let fieldComponent: CustomComponent;
  // Pass defaultValue into the Controller for conditionally displayed fields
  let defaultValue: any = defaultValueProp;

  // Try to get fieldComponent from customComponents list
  if (
    !!customComponents &&
    Object.keys(customComponents).length > 0 &&
    type in customComponents
  ) {
    fieldComponent = customComponents[type].component;

    if (defaultValue === undefined)
      defaultValue = customComponents[type].defaultValue;
  }
  // If not found in customComponents, try to get it from the built-in components
  else {
    fieldComponent = getFieldProp('component', type);

    if (defaultValue === undefined)
      defaultValue = getFieldProp('defaultValue', type);

    // If not found in either, don’t display anything
    if (!fieldComponent) {
      console.error(`No matching field component for \`${type}\``);
      return null;
    }
  }

  if (!name) return null;

  const gridProps =
    typeof gridCols === 'number' ||
    typeof gridCols === 'string' ||
    typeof gridCols === 'boolean'
      ? { xs: gridCols }
      : gridCols;

  const styleOverrides = disablePadding
    ? { padding: 0 }
    : disablePaddingTop
    ? { paddingTop: 0 }
    : {};

  // If it’s a content field, don’t wrap with Controller
  if (getFieldProp('group', type) === 'content')
    return (
      <Grid
        item
        key={name!}
        id={`fieldWrapper-${name}`}
        {...gridProps}
        style={styleOverrides}
      >
        <Suspense fallback={<FieldSkeleton />}>
          {React.createElement(fieldComponent, {
            ...props,
            // Stub Controller render props
            ...controllerRenderPropsStub,
            disabled: true,
            name: name!, // Fix TypeScript error
            label: label!, // Fix TypeScript error
          })}
        </Suspense>
      </Grid>
    );

  // If it’s a conditional field and the user hasn’t ticked, make sure the
  // Controller doesn’t register the field and there is no value for this field
  if (disabledConditional)
    return (
      <Grid
        item
        key={name!}
        id={`fieldWrapper-${name}`}
        {...gridProps}
        style={styleOverrides}
      >
        <Suspense fallback={<FieldSkeleton />}>
          {React.createElement(fieldComponent, {
            ...props,
            // Stub Controller render props
            ...controllerRenderPropsStub,
            disabled: true,
            name: name!, // Fix TypeScript error
            label: label!, // Fix TypeScript error
          })}
        </Suspense>
      </Grid>
    );

  return (
    <Grid
      item
      key={name!}
      id={`fieldWrapper-${name}`}
      {...gridProps}
      style={styleOverrides}
    >
      <Suspense fallback={<FieldSkeleton />}>
        <Controller
          control={control}
          name={name!}
          render={(renderProps) =>
            React.createElement(fieldComponent, {
              ...props,
              ...renderProps,
              name: name!, // Fix TypeScript error
              label: label!, // Fix TypeScript error
              errorMessage: renderProps.fieldState.error?.message,
            })
          }
          defaultValue={defaultValue}
        />
      </Suspense>
    </Grid>
  );
}
