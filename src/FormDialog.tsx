import React, { useState } from 'react';
import { useForm, UseFormProps } from 'react-hook-form';
import type { FieldValues, Control, UseFormReturn } from 'react-hook-form';
import _isEmpty from 'lodash-es/isEmpty';
import _isFunction from 'lodash-es/isFunction';

import {
  useTheme,
  useMediaQuery,
  Dialog,
  DialogProps as MuiDialogProps,
  Stack,
  DialogTitle,
  IconButton,
  DialogContent,
  DialogActions,
  Button,
  ButtonProps,
} from '@mui/material';
import Portal from '@mui/material/Portal';
import CloseIcon from '@mui/icons-material/Close';

import useFormSettings from './useFormSettings';
import FormFields from './FormFields';
import { Fields, CustomComponents } from './types';
import SubmitError, { ISubmitErrorProps } from './SubmitError';
import ScrollableDialogContent from './ScrollableDialogContent';

export interface IFormDialogProps {
  fields: Fields;
  values?: FieldValues;
  onSubmit: (
    values: FieldValues,
    event?: React.BaseSyntheticEvent<object, any, any>
  ) => void;
  customComponents?: CustomComponents;
  UseFormProps?: UseFormProps;

  onClose: (reason: 'submit' | 'cancel') => void;
  title: React.ReactNode;
  formHeader?: React.ReactNode;
  formFooter?: React.ReactNode;

  customBody?: (props: {
    control: Control<FieldValues>;
    useFormMethods: UseFormReturn<FieldValues>;
    setOmittedFields: ReturnType<typeof useFormSettings>['setOmittedFields'];
  }) => React.ReactNode;
  customActions?: React.ReactNode;
  SubmitButtonProps?: Partial<ButtonProps>;
  CancelButtonProps?: Partial<ButtonProps>;
  hideCancelButton?: boolean;
  DialogProps?: Partial<MuiDialogProps>;
  hideSubmitError?: boolean;
  SubmitErrorProps?: Partial<ISubmitErrorProps>;
  CloseConfirmProps?: Partial<{
    title: React.ReactNode;
    body: React.ReactNode;
    confirmButtonProps: Partial<ButtonProps>;
    cancelButtonProps: Partial<ButtonProps>;
  }>;
}

export default function FormDialog({
  fields,
  values,
  onSubmit,
  customComponents,
  UseFormProps = {},

  onClose,
  title,
  formHeader,
  formFooter,

  customBody,
  customActions,
  SubmitButtonProps,
  CancelButtonProps,
  hideCancelButton = false,
  DialogProps,
  hideSubmitError = false,
  SubmitErrorProps = {},
  CloseConfirmProps = {},
}: IFormDialogProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const { defaultValues, resolver, setOmittedFields } = useFormSettings({
    fields,
    values,
    customComponents,
  });

  const methods = useForm({
    mode: 'onBlur',
    defaultValues,
    resolver,
    shouldUnregister: true,
    ...UseFormProps,
  });
  const {
    handleSubmit,
    control,
    formState: { isDirty, errors },
    reset,
  } = methods;

  const hasErrors = errors
    ? (Object.values(errors).reduce(
        (a, c) => !!(a || !_isEmpty(c)),
        false
      ) as boolean)
    : false;

  const [open, setOpen] = useState(true);
  const [closeConfirmation, setCloseConfirmation] = useState(false);
  const handleClose = (reason: 'submit' | 'cancel') => {
    setCloseConfirmation(false);
    setOpen(false);
    setTimeout(() => {
      onClose(reason);
      reset();
    }, 300);
  };
  const confirmClose = () => {
    if (isDirty) setCloseConfirmation(true);
    else handleClose('cancel');
  };

  return (
    <Portal>
      <form
        onSubmit={handleSubmit((values, event) => {
          onSubmit(values, event);
          handleClose('submit');
        })}
      >
        <Dialog
          open={open}
          data-open={open}
          onClose={confirmClose}
          fullWidth
          fullScreen={isMobile}
          // Must disablePortal so the dialog can be wrapped in FormikForm
          disablePortal
          aria-labelledby="form-dialog-title"
          {...DialogProps}
        >
          <Stack direction="row" alignItems="flex-start">
            <DialogTitle
              id="form-dialog-title"
              style={{ flexGrow: 1, userSelect: 'none' }}
            >
              {title}
            </DialogTitle>

            <IconButton
              onClick={confirmClose}
              aria-label="Close"
              className="dialog-close"
              sx={{
                m: { xs: 1, sm: 1.5 },
                ml: { xs: -1, sm: -1 },
              }}
            >
              <CloseIcon />
            </IconButton>
          </Stack>

          <ScrollableDialogContent>
            {formHeader}
            {_isFunction(customBody) ? (
              customBody({
                control,
                useFormMethods: methods,
                setOmittedFields,
              })
            ) : (
              <FormFields
                fields={fields}
                control={control}
                customComponents={customComponents}
                useFormMethods={methods}
                setOmittedFields={setOmittedFields}
              />
            )}
            {formFooter}
          </ScrollableDialogContent>

          <DialogActions style={{ flexWrap: 'wrap' }}>
            {customActions ?? (
              <>
                {!hideCancelButton && (
                  <Button
                    onClick={confirmClose}
                    {...(CancelButtonProps ?? {})}
                    children={CancelButtonProps?.children || 'Cancel'}
                  />
                )}

                <Button
                  color="primary"
                  variant="contained"
                  type="submit"
                  {...(SubmitButtonProps ?? {})}
                  children={SubmitButtonProps?.children || 'Submit'}
                />
              </>
            )}

            {!hideSubmitError && hasErrors && (
              <SubmitError {...SubmitErrorProps} />
            )}
          </DialogActions>
        </Dialog>

        <Dialog
          open={open && closeConfirmation}
          onClose={() => {}}
          disableEscapeKeyDown
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {CloseConfirmProps.title}
          </DialogTitle>

          <DialogContent id="alert-dialog-description">
            {CloseConfirmProps.body || 'Discard changes?'}
          </DialogContent>

          <DialogActions>
            <Button
              onClick={() => setCloseConfirmation(false)}
              {...(CloseConfirmProps.cancelButtonProps ?? {})}
              children={
                CloseConfirmProps.cancelButtonProps?.children || 'Cancel'
              }
            />

            <Button
              onClick={() => handleClose('cancel')}
              color="primary"
              variant="contained"
              autoFocus
              {...(CloseConfirmProps.confirmButtonProps ?? {})}
              children={
                CloseConfirmProps.confirmButtonProps?.children || 'Discard'
              }
            />
          </DialogActions>
        </Dialog>
      </form>
    </Portal>
  );
}
