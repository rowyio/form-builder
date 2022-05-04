import React, { memo } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import { Grid, TextField, IconButton } from '@mui/material';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

export interface IListItemProps {
  name: string;
  index: number;
  item: string;

  edit: (item: string) => void;
  swap: (fromIndex: number, toIndex: number) => void;
  remove: () => void;

  itemLabel?: string;
  placeholder?: string;
  disabled?: boolean;
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
    disabled,
  }: IListItemProps) {
    const [, drag, dragPreview] = useDrag(() => ({
      type: name,
      item: { index },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }));

    const [{ isOver }, drop] = useDrop(
      () => ({
        accept: name,
        drop: ({ index: fromIndex }: any) => swap(fromIndex, index),
        collect: (monitor) => ({
          isOver: !!monitor.isOver(),
        }),
      }),
      [index]
    );

    return (
      <div ref={drop} style={isOver ? { opacity: 0.1 } : undefined}>
        <Grid container alignItems="center" wrap="nowrap" ref={dragPreview}>
          <Grid
            item
            ref={disabled ? null : drag}
            style={disabled ? {} : { cursor: 'grab' }}
            sx={{
              '.drag-handle': {
                display: 'block',
                my: (56 - 24) / 2 / 8,
                mr: 3,
                color: disabled ? 'text.disabled' : undefined,
              },
            }}
          >
            <DragHandleIcon
              aria-label="Drag to reorder this field"
              className="drag-handle"
            />
          </Grid>

          <Grid item xs>
            <TextField
              label={`${itemLabel} ${index + 1}`}
              placeholder={placeholder}
              autoFocus
              fullWidth
              value={item}
              onChange={(e) => edit(e.target.value)}
              disabled={disabled}
              helperText=" "
            />
          </Grid>

          <Grid item>
            <IconButton
              aria-label={`Remove item ${index}`}
              sx={{ ml: 1.5, mr: -1.5 }}
              onClick={remove}
              disabled={disabled}
              color="error"
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
