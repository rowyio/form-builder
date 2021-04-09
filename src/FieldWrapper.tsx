import React, { Suspense, useState } from 'react';

import { useTheme, Grid, Checkbox } from '@material-ui/core';
import FieldSkeleton from './FieldSkeleton';

import { getFieldProp } from './fields';

import { IFormFieldsProps } from './FormFields';
import { Field, CustomComponent } from './types';

export interface IFieldWrapperProps
  extends Field,
    Omit<IFormFieldsProps, 'fields'> {
  index: number;
}

export default function FieldWrapper({
  control,
  errors,
  type,
  customComponents,
  conditional,
  gridCols = 12,
  ...props
}: IFieldWrapperProps) {
  const theme = useTheme();
  const [conditionalState, setConditionalState] = useState(false);

  if (!type) {
    console.error(`Invalid field type: ${type}`, props);
    return null;
  }

  let renderedField: React.ReactNode = null;
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

  if (!props.name) return null;

  renderedField = React.createElement(fieldComponent, {
    ...props,
    name: props.name!,
    label: props.label!,
    control,
    errorMessage: errors[props.name!]?.message,
    disabled: conditional ? !conditionalState : props.disabled,
    defaultValue: undefined, // Prevent field being both controlled and uncontrolled
  });

  if (conditional === 'check')
    return (
      <Grid item key={props.name!} id={`fieldWrapper-${props.name}`} xs={12}>
        <Grid container wrap="nowrap" alignItems="flex-start">
          <Grid item>
            <Checkbox
              checked={conditionalState}
              onChange={e => {
                setConditionalState(e.target.checked);
                props.useFormMethods.setValue(props.name!, undefined);
              }}
              inputProps={{ 'aria-label': `Enable field ${props.label}` }}
              style={{ margin: theme.spacing(1, 2, 1, -1.5) }}
            />
          </Grid>
          <Grid item xs key={`${props.name}-${conditionalState}`}>
            <Suspense fallback={<FieldSkeleton />}>{renderedField}</Suspense>
          </Grid>
        </Grid>
      </Grid>
    );

  return (
    <Grid
      item
      key={props.name!}
      id={`fieldWrapper-${props.name}`}
      xs={gridCols}
    >
      <Suspense fallback={<FieldSkeleton />}>{renderedField}</Suspense>
    </Grid>
  );
}
