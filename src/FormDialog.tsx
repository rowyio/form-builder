import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import {
  makeStyles,
  createStyles,
  useTheme,
  useMediaQuery,
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
import CloseIcon from '@material-ui/icons/Close';

import FormFields from './FormFields';
import {
  Values,
  Fields,
  CustomComponents,
  getDefaultValues,
  getValidationSchema,
} from './utils';
import { TransitionGrow, TransitionSlide } from './Transition';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      '--spacing-modal': theme.spacing(3) + 'px',
      '--spacing-modal-contents': theme.spacing(3) + 'px',

      [theme.breakpoints.down('xs')]: {
        '--spacing-modal': theme.spacing(2) + 'px',
      },
    },

    paper: {
      userSelect: 'none',
      overflowX: 'hidden',

      padding: 'var(--spacing-modal)',
      paddingBottom: 'var(--spacing-modal-contents)',
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
      padding: 0,
      overflowX: 'hidden',
    },

    actions: {
      paddingTop: 'var(--spacing-modal-contents)',
      '& button': { minWidth: 100 },
    },
  })
);

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
  CancelButtonProps?: Partial<ButtonProps>;
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
  CancelButtonProps,
  DialogProps,
}: IFormDialogProps) {
  const classes = useStyles();
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
  const { register, handleSubmit, control, errors, formState, reset } = methods;

  const [closeConfirmation, setCloseConfirmation] = useState(false);
  const handleClose = () => {
    onClose();
    setCloseConfirmation(false);
    reset();
  };
  const confirmClose = () => {
    if (formState.isDirty) setCloseConfirmation(true);
    else handleClose();
  };

  return (
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
        TransitionComponent={isMobile ? TransitionSlide : TransitionGrow}
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
            register={register}
            control={control}
            errors={errors}
            customComponents={customComponents}
            useFormMethods={methods}
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
                  {...(SubmitButtonProps ?? {})}
                  children={SubmitButtonProps?.children || 'Submit'}
                />
              </Grid>
            </>
          )}
        </Grid>
      </Dialog>

      <Dialog
        open={open && closeConfirmation}
        disableBackdropClick
        disableEscapeKeyDown
        TransitionComponent={TransitionGrow}
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
  );
}
