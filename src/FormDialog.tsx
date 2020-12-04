import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import _isEmpty from 'lodash/isEmpty';

import {
  useTheme,
  useMediaQuery,
  Grow,
  Dialog,
  DialogProps as MuiDialogProps,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  ButtonProps,
} from '@material-ui/core';
import { TransitionProps } from '@material-ui/core/transitions';

import FormFields from './FormFields';
import {
  Values,
  Fields,
  CustomComponents,
  getDefaultValues,
  getValidationSchema,
} from './utils';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Grow ref={ref} {...props} />;
});

export interface IFormDialogProps {
  fields: Fields;
  values?: Values;
  onSubmit: (values: Values) => void;
  customComponents?: CustomComponents;

  open: boolean;
  onClose: () => void;
  title: React.ReactNode;
  formHeader?: React.ReactNode;
  formFooter?: React.ReactNode;

  customActions?: React.ReactNode;
  SubmitButtonProps?: Partial<ButtonProps>;
  DialogProps?: Partial<MuiDialogProps>;
}

export default function FormDialog({
  fields,
  values,
  onSubmit,
  customComponents,

  open,
  onClose,
  title,
  formHeader,
  formFooter,

  customActions,
  SubmitButtonProps,
  DialogProps,
}: IFormDialogProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  const defaultValues = {
    ...getDefaultValues(fields, customComponents),
    ...(values ?? {}),
  };

  const methods = useForm({
    mode: 'onBlur',
    defaultValues,
    resolver: yupResolver(getValidationSchema(fields)),
  });
  const { register, handleSubmit, control, errors } = methods;

  return (
    <form
      onSubmit={handleSubmit(values => {
        onSubmit(values);
        onClose();
      })}
    >
      <Dialog
        open={open}
        onClose={onClose}
        fullScreen={isMobile}
        fullWidth
        TransitionComponent={Transition as any}
        // Must disablePortal so the dialog can be wrapped in FormikForm
        disablePortal
        {...DialogProps}
      >
        <DialogTitle>{title}</DialogTitle>

        <DialogContent>
          {formHeader}
          <FormFields
            fields={fields}
            register={register}
            control={control}
            errors={errors}
            customComponents={customComponents}
            useFormMethods={methods}
          />
          {formFooter}
        </DialogContent>

        <DialogActions>
          {customActions ?? (
            <>
              <Button color="primary" onClick={onClose}>
                Cancel
              </Button>
              <Button
                color="primary"
                type="submit"
                {...(SubmitButtonProps ?? {})}
              >
                {SubmitButtonProps?.children ?? 'Submit'}
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </form>
  );
}
