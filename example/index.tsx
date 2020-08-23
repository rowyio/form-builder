import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Form from '../src/Form';

const App = () => {
  return (
    <Form
      fields={[
        {
          type: 'richText',
          name: 'desc',
          label: 'Description',
          // disabled: true,
          defaultValue: 'something',
        },
      ]}
      onSubmit={data => console.log(data)}
    />
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
