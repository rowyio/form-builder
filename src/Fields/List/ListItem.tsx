import React, { memo } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import {
  makeStyles,
  createStyles,
  Grid,
  TextField,
  IconButton,
} from '@material-ui/core';
import { fade } from '@material-ui/core/styles';
import DragHandleIcon from '@material-ui/icons/DragHandle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      margin: theme.spacing(0, 0, 2),
      '&:first-of-type': { marginTop: theme.spacing(1) },
    },

    dragHandle: {
      display: 'block',
      margin: theme.spacing((56 - 24) / 2 / 8, 0),
      marginRight: theme.spacing(3),
    },

    removeButton: {
      marginLeft: theme.spacing(1.5),
      marginRight: theme.spacing(-1.5),
      color: theme.palette.error.main,

      '&:hover': {
        backgroundColor: fade(
          theme.palette.error.main,
          theme.palette.action.hoverOpacity
        ),
      },
    },
  })
);

export interface IListItemProps {
  name: string;
  index: number;
  item: string;

  edit: (item: string) => void;
  swap: (fromIndex: number, toIndex: number) => void;
  remove: () => void;

  itemLabel?: string;
  placeholder?: string;
}

export const MemoizedListItem = memo(
  function ListItem({
    name,
    index,
    item,

    edit,
    swap,
    remove,

    itemLabel,
    placeholder,
  }: IListItemProps) {
    const classes = useStyles();

    const [, drag, dragPreview] = useDrag(() => ({
      type: name,
      item: { index },
      collect: monitor => ({
        isDragging: !!monitor.isDragging(),
      }),
    }));

    const [{ isOver }, drop] = useDrop(
      () => ({
        accept: name,
        drop: ({ index: fromIndex }: any) => swap(fromIndex, index),
        collect: monitor => ({
          isOver: !!monitor.isOver(),
        }),
      }),
      [index]
    );

    return (
      <div
        ref={drop}
        style={isOver ? { opacity: 0.1 } : undefined}
        className={classes.root}
      >
        <Grid container alignItems="center" wrap="nowrap" ref={dragPreview}>
          <Grid item ref={drag} style={{ cursor: 'grab' }}>
            <DragHandleIcon
              aria-label="Drag to reorder this field"
              className={classes.dragHandle}
            />
          </Grid>

          <Grid item xs>
            <TextField
              label={`${itemLabel} ${index + 1}`}
              placeholder={placeholder}
              autoFocus
              fullWidth
              value={item}
              onChange={e => edit(e.target.value)}
            />
          </Grid>

          <Grid item>
            <IconButton
              aria-label={`Remove item ${index}`}
              className={classes.removeButton}
              onClick={remove}
            >
              <RemoveCircleIcon />
            </IconButton>
          </Grid>
        </Grid>
      </div>
    );
  },
  ({ item: prevItem, index: prevIndex }, { item, index }) =>
    prevItem === item && prevIndex === index
);

export default MemoizedListItem;
