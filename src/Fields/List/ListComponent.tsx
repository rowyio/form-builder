import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import arrayMove from 'array-move';
import { IFieldComponentProps } from '../../types';

import {
  makeStyles,
  createStyles,
  FormControl,
  Button,
} from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import ListItem from './ListItem';

import FieldLabel from '../../FieldLabel';
import FieldErrorMessage from '../../FieldErrorMessage';
import FieldAssistiveText from '../../FieldAssistiveText';

const useStyles = makeStyles(theme =>
  createStyles({
    root: { display: 'flex' },

    addButton: { margin: theme.spacing(0, 0, 0, -0.5) },
    addIcon: {
      marginRight: theme.spacing(2),
      '&:first-child': { fontSize: '1.5rem' },
    },
  })
);

export interface IListComponentProps extends IFieldComponentProps {
  itemLabel?: string;
  placeholder?: string;
}

export default function ListComponent({
  field: { onChange, onBlur, value: valueProp, ref },
  fieldState,
  formState,

  name,
  useFormMethods,

  label,
  errorMessage,
  assistiveText,

  required,
  disabled,

  itemLabel = 'Item',
  placeholder,
}: IListComponentProps) {
  const classes = useStyles();

  const value: string[] = valueProp ?? [];
  const add = () => onChange([...value, '']);

  const edit = (index: number) => (item: string) => {
    const newValue = [...useFormMethods.getValues(name)];
    newValue[index] = item;
    onChange(newValue);
  };

  const swap = (fromIndex: number, toIndex: number) => {
    const newValue = arrayMove(
      useFormMethods.getValues(name),
      fromIndex,
      toIndex
    );
    onChange(newValue);
  };

  const remove = (index: number) => () => {
    const newValue = [...useFormMethods.getValues(name)];
    newValue.splice(index, 1);
    onChange(newValue);
  };

  return (
    <FormControl
      component="fieldset"
      className={classes.root}
      data-type="text-list"
      data-label={label ?? ''}
      error={!!errorMessage}
      disabled={disabled}
    >
      <FieldLabel
        error={!!errorMessage}
        disabled={!!disabled}
        required={!!required}
      >
        {label}
      </FieldLabel>

      <DndProvider backend={HTML5Backend}>
        {value.map((item, index) => (
          <ListItem
            key={index}
            name={name}
            index={index}
            item={item}
            edit={edit(index)}
            swap={swap}
            remove={remove(index)}
            itemLabel={itemLabel}
            placeholder={placeholder}
          />
        ))}
      </DndProvider>

      <div>
        <Button
          startIcon={<AddCircleIcon className={classes.addIcon} />}
          color="secondary"
          onClick={add}
          className={classes.addButton}
          ref={ref as any}
        >
          Add {itemLabel}
        </Button>
      </div>

      <FieldErrorMessage>{errorMessage}</FieldErrorMessage>
      <FieldAssistiveText disabled={!!disabled}>
        {assistiveText}
      </FieldAssistiveText>
    </FormControl>
  );
}
