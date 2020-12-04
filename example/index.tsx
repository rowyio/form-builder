import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as yup from 'yup';

import FormDialog from '../src/FormDialog';

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
