import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import { IFieldComponentProps } from '../utils';

import {
  makeStyles,
  createStyles,
  FormControl,
  Grid,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Cancel';

import Label from '../Label';
import ErrorMessage from '../ErrorMessage';

const useStyles = makeStyles(theme =>
  createStyles({
    root: { display: 'flex' },
    list: { marginBottom: theme.spacing(2) },
  })
);

interface IControlledTextMultiProps extends Omit<ITextMultiProps, 'control'> {
  onChange: (...event: any[]) => void;
  onBlur: () => void;
  value: any;
}

export function ControlledTextMulti({
  name,
  onChange,
  onBlur,
  value,
  errorMessage,
  label,
  addItemLabel,
  addItemPlaceholder,
}: IControlledTextMultiProps) {
  const classes = useStyles();
  const [itemToAdd, setItemToAdd] = useState('');

  const handleAddToList = () => {
    if (!itemToAdd) return;
    if (Array.isArray(value)) onChange([...value, itemToAdd]);
    else onChange([itemToAdd]);
    setItemToAdd('');
  };
  const handleDeleteFromList = (i: number) => {
    if (!Array.isArray(value)) onChange([]);
    const newValues = [...value];
    newValues.splice(i, 1);
    onChange(newValues);
  };

  return (
    <FormControl
      className={classes.root}
      data-type="text-multi"
      data-label={label ?? ''}
    >
      <Label error={!!errorMessage}>{label}</Label>

      <List className={classes.list} disablePadding>
        {Array.isArray(value) &&
          value.map((item: string, i: number) => (
            <React.Fragment key={i}>
              <ListItem>
                <ListItemText primary={item} />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="Remove"
                    onClick={() => {
                      handleDeleteFromList(i);
                      onBlur();
                    }}
                    size="small"
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
      </List>

      <Grid container alignItems="center" spacing={1}>
        <Grid item>
          <IconButton
            onClick={() => {
              handleAddToList();
              onBlur();
            }}
            aria-label="Add item"
            disabled={!itemToAdd}
          >
            <AddIcon fontSize="small" />
          </IconButton>
        </Grid>

        <Grid item xs>
          <TextField
            id={`${name}-temp`}
            type="text"
            onChange={e => setItemToAdd(e.target.value)}
            variant="filled"
            fullWidth
            value={itemToAdd}
            label={addItemLabel || `Add ${label}`}
            placeholder={addItemPlaceholder}
            onKeyPress={e => {
              if (e.key === 'Enter') handleAddToList();
            }}
            // NOTE: Field is not automatically touched, has to be set here
            onBlur={onBlur}
          />
        </Grid>
      </Grid>

      <ErrorMessage>{errorMessage}</ErrorMessage>
    </FormControl>
  );
}

export interface ITextMultiProps extends IFieldComponentProps {
  addItemLabel?: string;
  addItemPlaceholder?: string;
}

export default function TextMulti({
  control,
  name,
  ...props
}: ITextMultiProps) {
  return (
    <Controller
      control={control}
      name={name}
      render={renderProps => {
        const { ref, ...otherRenderProps } = renderProps;
        return <ControlledTextMulti {...props} {...otherRenderProps} />;
      }}
    />
  );
}
