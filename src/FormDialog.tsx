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
  DialogContentText,
  DialogActions,
  Grid,
  Button,
  ButtonProps,
} from '@material-ui/core';
import { fade } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';

import useFormSettings from './useFormSettings';
import FormFields from './FormFields';
import { Fields, CustomComponents } from './types';
import SubmitError, { ISubmitErrorProps } from './SubmitError';
import { SlideTransitionMui } from './SlideTransition';

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

      // https://codepen.io/evank/pen/wWbRNO
      background: `
        linear-gradient(
          var(--bg-paper) 50%,
          ${fade(theme.palette.background.paper, 0)}
        ),
        linear-gradient(
          ${fade(theme.palette.background.paper, 0)},
          var(--bg-paper) 50%
        ) 0 100%,
        linear-gradient(
          to top, ${theme.palette.divider} 1px,
          ${fade(theme.palette.divider, 0)}
        ),
        linear-gradient(to top,
          ${theme.palette.divider} 1px,
          ${fade(theme.palette.divider, 0)}
        ) 0 calc(100% - 0.5px)`,
      backgroundRepeat: 'no-repeat',
      backgroundColor: 'var(--bg-paper)',
      backgroundSize: '100% 2px, 100% 3px, 100% 1px, 100% 1px',
      backgroundAttachment: 'local, local, scroll, scroll',
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
  DialogProps?: Partial<MuiDialogProps>;
  hideSubmitError?: boolean;
  SubmitErrorProps?: Partial<ISubmitErrorProps>;
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
  DialogProps,
  hideSubmitError = false,
  SubmitErrorProps = {},
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

          <DialogContent className={classes.content}>
            {formHeader}
            <FormFields
              fields={fields}
              control={control}
              customComponents={customComponents}
              useFormMethods={methods}
              setOmittedFields={setOmittedFields}
            />
            {formFooter}
          </DialogContent>

          <Grid
            container
            spacing={2}
            justify="center"
            alignItems="center"
            className={classes.actions}
          >
            {customActions ?? (
              <>
                <Grid item>
                  <Button
                    color="primary"
                    onClick={confirmClose}
                    {...(CancelButtonProps ?? {})}
                    children={CancelButtonProps?.children || 'Cancel'}
                  />
                </Grid>
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
                style={{ marginTop: 0, ...SubmitErrorProps.style }}
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
        >
          <DialogTitle id="alert-dialog-title">Close form?</DialogTitle>

          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              You entered data in this form that will be lost.
            </DialogContentText>
          </DialogContent>

          <DialogActions>
            <Button onClick={() => setCloseConfirmation(false)} color="primary">
              Cancel
            </Button>
            <Button onClick={handleClose} color="primary" autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </form>
    </Portal>
  );
}
