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
          // multiline: true,
          // rows: 4,
          name: 'description',
          label: 'Short Description (optional, max. 300 characters)',
          placeholder:
            'You may choose to add a description, to the portfolio page generated. ',
          // inputProps: { maxLength: 300 },
          validation: yup.string().max(300),
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
