import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as yup from 'yup';

import { createMuiTheme } from '@material-ui/core/styles';
import { MuiThemeProvider, CssBaseline } from '@material-ui/core';
import FormDialog from '../src/FormDialog';
import { FieldType } from '../src';

import 'tinymce/skins/ui/oxide/skin.min.css';
import 'tinymce/skins/ui/oxide/content.min.css';

const theme = createMuiTheme({
  typography: { fontFamily: 'system-ui' },
  props: { MuiTextField: { variant: 'filled' } },
});

const fields = [
  {
    type: FieldType.richText,
    name: 'desc',
    label: 'Description',
    required: true,
    maxCharacters: 20,
  },
  {
    type: FieldType.shortText,
    format: 'url',
    name: 'link',
    label: 'Link',
    defaultValue: 'https://',
    required: true,
    displayCondition: 'return values.desc.length > 0',
  },
  {
    type: FieldType.shortText,
    format: 'email',
    name: 'email',
    label: 'Email',
    gridCols: 6,
  },
  {
    type: FieldType.shortText,
    format: 'emailWithName',
    name: 'emailWithName',
    label: 'Email with Name',
    gridCols: 6,
  },
  {
    type: FieldType.shortText,
    format: 'phone',
    name: 'phone',
    label: 'Phone Number',
    gridCols: 6,
  },
  {
    type: FieldType.shortText,
    format: 'twitter',
    name: 'twitter',
    label: 'Twitter',
    gridCols: 6,
  },
  {
    type: FieldType.shortText,
    format: 'linkedin',
    name: 'linkedin',
    label: 'LinkedIn',
  },
  {
    type: FieldType.shortText,
    format: 'number',
    name: 'number',
    label: 'Number',
  },
  // : null,
  {
    type: FieldType.shortText,
    name: 'header',
    label: 'Unique page header',
    placeholder: 'Selected startups for...',
    maxCharacters: 100,
    required: true,
  },
  {
    type: FieldType.paragraph,
    name: 'textarea',
    label: 'Tell me more',
  },
  {
    type: FieldType.singleSelect,
    name: 'singleSelect',
    label: 'Who is the CEO of Antler?',
    options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
  },
  {
    type: FieldType.multiSelect,
    name: 'multiSelect',
    label: 'Who are Antler Engineering team members?',
    options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
  },
  {
    type: FieldType.multiSelect,
    name: 'multiSelect single',
    label: 'Who is CEO of Facebook?',
    options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
    multiple: false,
  },
  {
    type: FieldType.checkbox,
    name: 'checkbox',
    label: 'I am not a robot',
  },
  {
    type: FieldType.radio,
    name: 'radio',
    label: 'Highest education level?',
    options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
  },
  {
    type: FieldType.slider,
    name: 'slider',
    label: 'Your age',
  },
  {
    type: FieldType.list,
    name: 'textMulti',
    label: 'Previous employers',
  },
  {
    type: FieldType.color,
    name: 'color',
    label: 'Preferred color for your Antler shirt?',
  },
  {
    type: FieldType.date,
    name: 'date',
    label: 'Your birthday',
  },
  {
    type: FieldType.dateTime,
    name: 'dateTime',
    label: 'Book a time',
  },
];

const App = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <FormDialog
        open
        onClose={() => alert('Check console for values')}
        title="Form Dialog"
        fields={fields}
        onSubmit={data => console.log(data)}
        // customActions={
        //   <>
        //     <button type="submit">SUBMIT</button>
        //   </>
        // }
      />
    </MuiThemeProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
