import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as yup from 'yup';

import FormDialog from '../src/FormDialog';
import { FIELDS } from '../src';

const App = () => {
  return (
    <FormDialog
      open
      onClose={() => alert('CLOSE')}
      title="Form Dialog"
      fields={[
        {
          type: 'richText',
          name: 'desc',
          label: 'Description',
          // disabled: true,
          defaultValue: 'something',
        },
        (values: any) =>
          values.desc !== 'something'
            ? {
                type: 'text',
                fieldVariant: 'url',
                name: 'link',
                label: 'Link',
                defaultValue: 'https://',
                validation: yup
                  .string()
                  .url('Must be a valid URL')
                  .matches(/^https?:\/\/.*/, 'Must begin with https://')
                  .required('Required'),
              }
            : null,

        {
          type: FIELDS.text,
          name: 'header',
          label: 'Unique page header (max. 100 characters)',
          placeholder: 'Selected startups for...',
          // inputProps: { maxLength: 100 },
          validation: yup
            .string()
            .max(100)
            .required('Required'),
        },
        {
          type: FIELDS.text,
          name: 'textarea',
          fieldVariant: 'long',
          label: 'Tell me more',
        },
        {
          type: FIELDS.singleSelect,
          name: 'singleSelect',
          label: 'Who is the CEO of Antler?',
          options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
        },
        {
          type: FIELDS.multiSelect,
          name: 'multiSelect',
          label: 'Who are Antler Engineering team members?',
          options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
        },
        {
          type: FIELDS.multiSelect,
          name: 'multiSelect single',
          label: 'Who is CEO of Facebook?',
          options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
          multiple: false,
        },
        {
          type: FIELDS.checkbox,
          name: 'checkbox',
          label: 'I am not a robot',
        },
        {
          type: FIELDS.radio,
          name: 'radio',
          label: 'Highest education level?',
          options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
        },
        {
          type: FIELDS.slider,
          name: 'slider',
          label: 'Your age',
        },
        {
          type: FIELDS.textMulti,
          name: 'textMulti',
          label: 'Previous employers',
        },
        {
          type: FIELDS.color,
          name: 'color',
          label: 'Preferred color for your Antler shirt?',
        },
        {
          type: FIELDS.date,
          name: 'date',
          label: 'Your birthday',
        },
        {
          type: FIELDS.dateTime,
          name: 'dateTime',
          label: 'Book a time',
        },
      ]}
      onSubmit={data => console.log(data)}
      // customActions={
      //   <>
      //     <button type="submit">SUBMIT</button>
      //   </>
      // }
    />
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
