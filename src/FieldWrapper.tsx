import React, { Suspense } from 'react';
import { Controller } from 'react-hook-form';

import { Grid } from '@material-ui/core';
import FieldSkeleton from './FieldSkeleton';

import { getFieldProp } from './fields';

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
  disabledConditional,
  ...props
}: IFieldWrapperProps) {
  if (!type) {
    console.error(`Invalid field type: ${type}`, props);
    return null;
  }

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
  else {
    fieldComponent = getFieldProp('component', type);

    // If not found in either, don’t display anything
    if (!fieldComponent) {
      console.error(`No matching field component for \`${type}\``);
      return null;
    }
  }

  if (!name) return null;

  // If it’s a content field, don’t wrap with Controller
  if (getFieldProp('group', type) === 'content')
    return (
      <Grid item key={name!} id={`fieldWrapper-${name}`} xs={gridCols}>
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
      <Grid item key={name!} id={`fieldWrapper-${name}`} xs={gridCols}>
        <Suspense fallback={<FieldSkeleton />}>
          {React.createElement(fieldComponent, {
            ...props,
            // Stub Controller render props
            ...controllerRenderPropsStub,
            disabled: true,
            name: name!, // Fix TypeScript error
            label: label!, // Fix TypeScript error
            defaultValue: undefined, // Prevent field being both controlled and uncontrolled
          })}
        </Suspense>
      </Grid>
    );

  return (
    <Grid item key={name!} id={`fieldWrapper-${name}`} xs={gridCols}>
      <Suspense fallback={<FieldSkeleton />}>
        <Controller
          control={control}
          name={name!}
          render={renderProps =>
            React.createElement(fieldComponent, {
              ...props,
              ...renderProps,
              name: name!, // Fix TypeScript error
              label: label!, // Fix TypeScript error
              errorMessage: renderProps.fieldState.error?.message,
              defaultValue: undefined, // Prevent field being both controlled and uncontrolled
            })
          }
          // onFocus={() => {
          //   if (ref.current) {
          //     ref.current.scrollIntoView({ behavior: 'smooth' });
          //     ref.current.focus();
          //   }
          // }}
        />
      </Suspense>
    </Grid>
  );
}
