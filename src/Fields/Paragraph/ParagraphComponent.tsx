import React from 'react';
import { IFieldComponentProps } from '../../types';

import {
  TextField,
  FilledTextFieldProps,
  Grid,
  FormHelperText,
} from '@material-ui/core';

export interface IParagraphComponentProps
  extends IFieldComponentProps,
    Omit<
      FilledTextFieldProps,
      'variant' | 'name' | 'label' | 'onChange' | 'onBlur' | 'value' | 'ref'
    > {
  maxCharacters?: number;
}

export const ParagraphComponent = React.forwardRef(function ParagraphComponent(
  {
    onChange,
    onBlur,
    value,

    name,
    useFormMethods,

    errorMessage,
    assistiveText,

    hiddenLabel = false,
    maxCharacters,
    ...props
  }: IParagraphComponentProps,
  ref
) {
  return (
    <TextField
      onChange={onChange}
      onBlur={onBlur}
      value={value}
      fullWidth
      error={!!errorMessage}
      FormHelperTextProps={{ component: 'div' } as any}
      helperText={
        (errorMessage || assistiveText || maxCharacters) && (
          <Grid container spacing={1} wrap="nowrap" alignItems="baseline">
            <Grid item xs>
              {errorMessage}

              <FormHelperText
                style={{ margin: 0, whiteSpace: 'pre-line' }}
                error={false}
              >
                {assistiveText}
              </FormHelperText>
            </Grid>

            {maxCharacters && (
              <Grid item>
                <FormHelperText
                  style={{ margin: 0 }}
                  error={
                    (typeof value === 'string' ? value.length : 0) >
                    maxCharacters
                  }
                >
                  {typeof value === 'string' ? value.length : 0}
                  &nbsp;/&nbsp;
                  {maxCharacters}
                </FormHelperText>
              </Grid>
            )}
          </Grid>
        )
      }
      name={name}
      id={`field-${name}`}
      multiline
      {...props}
      inputProps={{
        rowsMin: 5,
        maxLength: maxCharacters ?? undefined,
        // Required for form-filler
        'data-type': 'textarea',
        'data-label': props.label ?? '',
      }}
      InputLabelProps={props.placeholder ? { shrink: true } : undefined}
      inputRef={ref}
    />
  );
});

export default ParagraphComponent;
