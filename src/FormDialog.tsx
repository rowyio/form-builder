import React, { useState } from 'react';
import { useForm, UseFormProps, FieldValues } from 'react-hook-form';
import _isEmpty from 'lodash/isEmpty';

import {
  makeStyles,
  createStyles,
  useTheme,
  useMediaQuery,
  Portal,
  Dialog,
  DialogProps as MuiDialogProps,
  DialogTitle,
  Typography,
  IconButton,
  DialogContent,
  Grid,
  Button,
  ButtonProps,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import useFormSettings from './useFormSettings';
import FormFields from './FormFields';
import { Fields, CustomComponents } from './types';
import SubmitError, { ISubmitErrorProps } from './SubmitError';
import { SlideTransitionMui } from './SlideTransition';
import ScrollableDialogContent from './ScrollableDialogContent';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      '--spacing-modal': theme.spacing(3) + 'px',
      '--spacing-modal-contents': theme.spacing(3) + 'px',
      '--spacing-card': 'var(--spacing-modal-contents)',
      '--bg-paper': theme.palette.background.paper,

      [theme.breakpoints.down('sm')]: {
        '--spacing-modal': theme.spacing(2) + 'px',
      },
    },

    paper: {
      userSelect: 'none',
      overflowX: 'hidden',

      padding: 'var(--spacing-modal)',
      paddingBottom: 'var(--spacing-modal-contents)',

      backgroundColor: 'var(--bg-paper)',
    },

    titleRow: {
      padding: 0,
      paddingBottom: 'var(--spacing-modal)',

      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
    },
    title: {
      ...theme.typography.h5,
      [theme.breakpoints.down('sm')]: theme.typography.h6,
    },
    closeButton: {
      margin: theme.spacing(-1.5),
      marginLeft: 'var(--spacing-modal)',
    },

    content: {
      overflowX: 'hidden',

      padding: '0 var(--spacing-modal)',
      margin: '0 calc(var(--spacing-modal) * -1)',

      ...theme.typography.body1,
    },
    contentDividers: {
      margin: '0 calc(var(--spacing-modal) * -1)',
    },

    actions: {
      paddingTop: 'var(--spacing-modal-contents)',
      '& button': { minWidth: 100 },
    },
  })
);

export interface IFormDialogProps {
  fields: Fields;
  values?: FieldValues;
  onSubmit: (values: FieldValues) => void;
  customComponents?: CustomComponents;
  UseFormProps?: UseFormProps;

  open: boolean;
  onClose: () => void;
  title: React.ReactNode;
  formHeader?: React.ReactNode;
  formFooter?: React.ReactNode;

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

  open,
  onClose,
  title,
  formHeader,
  formFooter,

  customActions,
  SubmitButtonProps,
  CancelButtonProps,
  hideCancelButton = false,
  DialogProps,
  hideSubmitError = false,
  SubmitErrorProps = {},
  CloseConfirmProps = {},
}: IFormDialogProps) {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

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

  const [closeConfirmation, setCloseConfirmation] = useState(false);
  const handleClose = () => {
    setCloseConfirmation(false);
    onClose();
    reset();
  };
  const confirmClose = () => {
    if (isDirty) setCloseConfirmation(true);
    else handleClose();
  };

  return (
    <Portal>
      <form
        onSubmit={handleSubmit(values => {
          onSubmit(values);
          handleClose();
        })}
      >
        <Dialog
          open={open}
          onClose={confirmClose}
          fullScreen={isMobile}
          fullWidth
          TransitionComponent={SlideTransitionMui}
          // Must disablePortal so the dialog can be wrapped in FormikForm
          disablePortal
          aria-labelledby="form-dialog-title"
          {...DialogProps}
          classes={{
            root: classes.root,
            paper: classes.paper,
            ...DialogProps?.classes,
          }}
        >
          <DialogTitle
            id="modal-title"
            className={classes.titleRow}
            disableTypography
          >
            <Typography
              className={classes.title}
              component="h2"
              color="textPrimary"
            >
              {title}
            </Typography>

            <IconButton
              onClick={confirmClose}
              className={classes.closeButton}
              aria-label="Close"
              color="secondary"
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>

          <ScrollableDialogContent
            className={classes.content}
            dividersClasses={{ root: classes.contentDividers }}
          >
            {formHeader}
            <FormFields
              fields={fields}
              control={control}
              customComponents={customComponents}
              useFormMethods={methods}
              setOmittedFields={setOmittedFields}
            />
            {formFooter}
          </ScrollableDialogContent>

          <Grid
            container
            spacing={2}
            justify="center"
            alignItems="center"
            className={classes.actions}
          >
            {customActions ?? (
              <>
                {!hideCancelButton && (
                  <Grid item>
                    <Button
                      color="primary"
                      onClick={confirmClose}
                      {...(CancelButtonProps ?? {})}
                      children={CancelButtonProps?.children || 'Cancel'}
                    />
                  </Grid>
                )}
                <Grid item>
                  <Button
                    color="primary"
                    variant="contained"
                    type="submit"
                    disabled={hasErrors}
                    {...(SubmitButtonProps ?? {})}
                    children={SubmitButtonProps?.children || 'Submit'}
                  />
                </Grid>
              </>
            )}

            {!hideSubmitError && hasErrors && (
              <SubmitError
                {...SubmitErrorProps}
                style={{ marginTop: 0, ...SubmitErrorProps?.style }}
              />
            )}
          </Grid>
        </Dialog>

        <Dialog
          open={open && closeConfirmation}
          disableBackdropClick
          disableEscapeKeyDown
          TransitionComponent={SlideTransitionMui}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          classes={{
            root: classes.root,
            paper: classes.paper,
          }}
        >
          <DialogTitle
            id="alert-dialog-title"
            className={classes.titleRow}
            disableTypography
          >
            <Typography
              className={classes.title}
              component="h2"
              color="textPrimary"
            >
              {CloseConfirmProps.title || 'Close form?'}
            </Typography>
          </DialogTitle>

          <DialogContent
            id="alert-dialog-description"
            className={classes.content}
          >
            {CloseConfirmProps.body ||
              'You will lose all the data you entered in this form.'}
          </DialogContent>

          <Grid
            container
            spacing={2}
            justify="center"
            alignItems="center"
            className={classes.actions}
          >
            <Grid item>
              <Button
                onClick={() => setCloseConfirmation(false)}
                color="primary"
                {...(CloseConfirmProps.cancelButtonProps ?? {})}
                children={
                  CloseConfirmProps.cancelButtonProps?.children || 'Cancel'
                }
              />
            </Grid>
            <Grid item>
              <Button
                onClick={handleClose}
                color="primary"
                variant="contained"
                autoFocus
                {...(CloseConfirmProps.confirmButtonProps ?? {})}
                children={
                  CloseConfirmProps.confirmButtonProps?.children || 'Close'
                }
              />
            </Grid>
          </Grid>
        </Dialog>
      </form>
    </Portal>
  );
}
