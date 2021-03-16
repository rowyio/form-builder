import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import { IFieldComponentProps } from '../utils';

import 'tinymce/tinymce.min.js';
import 'tinymce/icons/default';
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
  init,
  ...props
}: IRichTextProps) {
  const classes = useStyles();
  const [focus, setFocus] = useState(false);

  return (
    <Controller
      control={control}
      name={name}
      render={({ onChange, onBlur, value }) => (
        <FormControl
          className={clsx(classes.root, focus && classes.focus)}
          data-type="rich-text"
          data-label={label ?? ''}
        >
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
                // base64 encode tinymce_content.css
                'data:text/css;base64,OnJvb3QgewogIGZvbnQtc2l6ZTogMTZweDsKfQoKaHRtbCB7CiAgLXdlYmtpdC1mb250LXNtb290aGluZzogYW50aWFsaWFzZWQ7CiAgLW1vei1vc3gtZm9udC1zbW9vdGhpbmc6IGdyYXlzY2FsZTsKICBib3gtc2l6aW5nOiBib3JkZXItYm94OwoKICBwYWRkaW5nOiAxcmVtOwp9CgoqLAoqOjpiZWZvcmUsCio6OmFmdGVyIHsKICBib3gtc2l6aW5nOiBpbmhlcml0Owp9Cgpib2R5IHsKICBtYXJnaW46IDAgYXV0byAwIDA7CiAgbWF4LXdpZHRoOiAzM2VtOwogIG1heC13aWR0aDogNjBjaDsKCiAgZm9udC1zaXplOiAxMy44cHg7CiAgZm9udC1mYW1pbHk6ICdPcGVuIFNhbnMnLCBzYW5zLXNlcmlmOwogIGxpbmUtaGVpZ2h0OiAxLjQ1OwogIGxldHRlci1zcGFjaW5nOiAwLjI1cHg7Cn0KCmgxLApoMiwKaDMsCmg0LApoNSwKaDYgewogIGZvbnQtZmFtaWx5OiAnRXVyb3BhJywgJ09wZW4gU2FucycsIHNhbnMtc2VyaWY7CiAgbWFyZ2luOiAwOwogIGxpbmUtaGVpZ2h0OiAxLjI7CiAgZm9udC13ZWlnaHQ6IGJvbGQ7Cn0KcCB7CiAgbWFyZ2luOiAwOwp9CgphIHsKICBmb250LXdlaWdodDogYm9sZDsKICBjb2xvcjogI2UyMjcyOTsKfQoKdWwsCm9sIHsKICBtYXJnaW46IDA7CiAgcGFkZGluZy1sZWZ0OiAxLjVlbTsKfQpsaSArIGxpIHsKICBtYXJnaW4tdG9wOiAwLjVlbTsKfQoKYm9keSAqICsgKiB7CiAgbWFyZ2luLXRvcDogMWVtOwp9Cgp0YWJsZSB7CiAgYm9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTsKfQp0YWJsZSB0aCwKdGFibGUgdGQgewogIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoMCwgMCwgMCwgMC4xMik7CiAgcGFkZGluZzogMC40cmVtOwp9CmZpZ3VyZSB7CiAgZGlzcGxheTogdGFibGU7CiAgbWFyZ2luOiAxcmVtIGF1dG87Cn0KZmlndXJlIGZpZ2NhcHRpb24gewogIGNvbG9yOiAjOTk5OwogIGRpc3BsYXk6IGJsb2NrOwogIG1hcmdpbi10b3A6IDAuMjVyZW07CiAgdGV4dC1hbGlnbjogY2VudGVyOwp9CmhyIHsKICBib3JkZXItY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4xMik7CiAgYm9yZGVyLXN0eWxlOiBzb2xpZDsKICBib3JkZXItd2lkdGg6IDFweCAwIDAgMDsKfQpjb2RlIHsKICBiYWNrZ3JvdW5kLWNvbG9yOiAjZThlOGU4OwogIGJvcmRlci1yYWRpdXM6IDRweDsKICBwYWRkaW5nOiAwLjFyZW0gMC4ycmVtOwogIGZvbnQtZmFtaWx5OiBTRk1vbm8tUmVndWxhciwgQ29uc29sYXMsIExpYmVyYXRpb24gTW9ubywgTWVubG8sIG1vbm9zcGFjZTsKfQpwcmUgewogIGZvbnQtZmFtaWx5OiBTRk1vbm8tUmVndWxhciwgQ29uc29sYXMsIExpYmVyYXRpb24gTW9ubywgTWVubG8sIG1vbm9zcGFjZTsKfQoubWNlLWNvbnRlbnQtYm9keTpub3QoW2Rpcj0ncnRsJ10pIGJsb2NrcXVvdGUgewogIGJvcmRlci1sZWZ0OiAycHggc29saWQgcmdiYSgwLCAwLCAwLCAwLjEyKTsKICBtYXJnaW4tbGVmdDogMS41cmVtOwogIHBhZGRpbmctbGVmdDogMXJlbTsKfQoubWNlLWNvbnRlbnQtYm9keVtkaXI9J3J0bCddIGJsb2NrcXVvdGUgewogIGJvcmRlci1yaWdodDogMnB4IHNvbGlkIHJnYmEoMCwgMCwgMCwgMC4xMik7CiAgbWFyZ2luLXJpZ2h0OiAxLjVyZW07CiAgcGFkZGluZy1yaWdodDogMXJlbTsKfQ==',
              ],
              ...init,
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
