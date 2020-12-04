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
  Grid,
  IconButton,
  DialogTitle,
  Divider,
  DialogContent,
  DialogContentText,
  DialogActions,
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
    paperFullScreen: {
      marginTop: theme.spacing(2),
      height: `calc(100% - ${theme.spacing(2)}px)`,
      borderTopLeftRadius: theme.shape.borderRadius * 2,
      borderTopRightRadius: theme.shape.borderRadius * 2,
    },

    closeButton: {
      margin: theme.spacing(0.5),
      marginLeft: 'auto',
      marginBottom: 0,
      display: 'flex',
    },

    title: {
      paddingTop: theme.spacing(8),
      paddingLeft: theme.spacing(8),
      color: theme.palette.text.secondary,

      [theme.breakpoints.down('xs')]: {
        paddingTop: theme.spacing(2),
        paddingLeft: theme.spacing(2),
      },
    },
    divider: {
      margin: theme.spacing(0, 8),
      [theme.breakpoints.down('xs')]: { margin: theme.spacing(0, 2) },
    },

    content: {
      padding: theme.spacing(3, 8, 0),
      [theme.breakpoints.down('xs')]: { padding: theme.spacing(3, 2, 0) },
    },
    actions: {
      padding: theme.spacing(2, 8, 4),
      [theme.breakpoints.down('xs')]: { padding: theme.spacing(2) },
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
  const { register, handleSubmit, control, errors, formState } = methods;

  const [closeConfirmation, setCloseConfirmation] = useState(false);
  const handleClose = () => {
    if (formState.isDirty) setCloseConfirmation(true);
    else {
      onClose();
      setCloseConfirmation(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(values => {
        onSubmit(values);
        onClose();
        setCloseConfirmation(false);
      })}
    >
      <Dialog
        open={open}
        onClose={handleClose}
        fullScreen={isMobile}
        fullWidth
        TransitionComponent={isMobile ? TransitionSlide : TransitionGrow}
        // Must disablePortal so the dialog can be wrapped in FormikForm
        disablePortal
        aria-labelledby="form-dialog-title"
        classes={{
          paperFullScreen: classes.paperFullScreen,
          ...DialogProps?.classes,
        }}
        {...DialogProps}
      >
        <Grid container>
          <Grid item xs>
            <DialogTitle id="sub-modal-title" className={classes.title}>
              {title}
            </DialogTitle>
          </Grid>
          <Grid item>
            <IconButton
              onClick={handleClose}
              className={classes.closeButton}
              aria-label="Close Form"
            >
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>

        <Divider className={classes.divider} />

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

        <DialogActions className={classes.actions}>
          {customActions ?? (
            <>
              <Button color="primary" size="large" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                color="primary"
                size="large"
                variant="contained"
                type="submit"
                {...(SubmitButtonProps ?? {})}
              >
                {SubmitButtonProps?.children ?? 'Submit'}
              </Button>
            </>
          )}
        </DialogActions>
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
          <Button
            onClick={() => {
              onClose();
              setCloseConfirmation(false);
            }}
            color="primary"
            autoFocus
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </form>
  );
}
