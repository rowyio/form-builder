import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import { IFieldComponentProps } from '../utils';

import 'tinymce/tinymce.min.js';
import 'tinymce/themes/silver';
import 'tinymce/skins/ui/oxide/skin.min.css';
import 'tinymce/skins/ui/oxide/content.min.css';
import 'tinymce/plugins/autoresize';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/link';
import 'tinymce/plugins/image';
import 'tinymce/plugins/paste';
import 'tinymce/plugins/help';
import 'tinymce/plugins/code';
import { Editor, IAllProps } from '@tinymce/tinymce-react';

import { makeStyles, createStyles, FormControl } from '@material-ui/core';
import clsx from 'clsx';

import Label from '../Label';
import ErrorMessage from '../ErrorMessage';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      display: 'flex',

      '& .tox': {
        '&.tox-tinymce': {
          borderRadius: theme.shape.borderRadius,
          border: 'none',
          backgroundColor:
            theme.palette.type === 'light'
              ? 'rgba(0, 0, 0, 0.09)'
              : 'rgba(255, 255, 255, 0.09)',

          transition: theme.transitions.create('background-color', {
            duration: theme.transitions.duration.shorter,
            easing: theme.transitions.easing.easeOut,
          }),

          '&:hover': {
            backgroundColor:
              theme.palette.type === 'light'
                ? 'rgba(0, 0, 0, 0.13)'
                : 'rgba(255, 255, 255, 0.13)',
          },
        },

        '& .tox-toolbar-overlord, & .tox-edit-area__iframe, & .tox-toolbar__primary': {
          background: 'transparent',
        },

        '& .tox-toolbar__primary': { padding: theme.spacing(0.5, 0) },
        '& .tox-toolbar__group': {
          padding: theme.spacing(0, 1),
          border: 'none !important',
        },

        '& .tox-tbtn': {
          borderRadius: theme.shape.borderRadius,
          color: theme.palette.text.secondary,
          cursor: 'pointer',
          margin: 0,

          transition: theme.transitions.create(['color', 'background-color'], {
            duration: theme.transitions.duration.shortest,
          }),

          '&:hover': {
            color: theme.palette.text.primary,
            backgroundColor: 'transparent',
          },

          '& svg': { fill: 'currentColor' },
        },

        '& .tox-tbtn--enabled, & .tox-tbtn--enabled:hover': {
          backgroundColor: theme.palette.action.selected + ' !important',
          color: theme.palette.text.primary,
        },
      },
    },

    focus: {
      '& .tox.tox-tinymce': {
        backgroundColor:
          (theme.palette.type === 'light'
            ? 'rgba(0, 0, 0, 0.09)'
            : 'rgba(255, 255, 255, 0.09)') + '!important',
      },
    },
  })
);

export interface IRichTextProps
  extends IFieldComponentProps,
    Partial<IAllProps> {}

export default function RichText({
  control,
  register,
  name,
  errorMessage,
  label,
  ...props
}: IRichTextProps) {
  const classes = useStyles();
  const [focus, setFocus] = useState(false);

  return (
    <Controller
      control={control}
      name={name}
      render={({ onChange, onBlur, value }) => (
        <FormControl className={clsx(classes.root, focus && classes.focus)}>
          <Label error={!!errorMessage}>{label}</Label>

          <Editor
            {...props}
            init={{
              minHeight: 300,
              menubar: false,
              plugins: ['autoresize', 'lists link image', 'paste help', 'code'],
              statusbar: false,
              toolbar:
                'formatselect | bold italic forecolor | link | bullist numlist outdent indent | removeformat code | help',
              skin: false,
              content_css: [
                'https://use.typekit.net/ngg8buf.css',
                'https://fonts.googleapis.com/css?family=Open+Sans:400,400i,700,700i&display=swap',
                'https://raw.githubusercontent.com/AntlerVC/form-builder/master/src/Fields/tinymce_content.css',
              ],
            }}
            value={value}
            onEditorChange={onChange}
            onFocus={() => setFocus(true)}
            onBlur={() => {
              setFocus(false);
              onBlur();
            }}
          />

          <ErrorMessage>{errorMessage}</ErrorMessage>
        </FormControl>
      )}
    />
  );
}
