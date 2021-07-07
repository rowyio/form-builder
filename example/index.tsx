import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { createTheme, ThemeProvider } from '@material-ui/core/styles';
// import { ThemeProvider, CssBaseline, Button } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import Form from '../src/Form';
import { FieldType } from '../src';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const theme = createTheme({
  typography: { fontFamily: 'system-ui' },
  props: { MuiTextField: { variant: 'filled' } },
});

const fields = [
  {
    type: FieldType.contentHeader,
    label: 'Header',
    name: '_contentHeader_1',
  },
  {
    type: FieldType.contentParagraph,
    label: '<a href="#">This is a link!</a>',
    name: '_contentParagraph_0',
  },
  // {
  //   type: FieldType.richText,
  //   name: 'desc',
  //   label: 'Description',
  //   required: true,
  //   maxCharacters: 20,
  // },
  {
    type: FieldType.shortText,
    format: 'url',
    name: 'meetingLink',
    label: 'Meeting Link',
    assistiveText: `<div class="MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-1" style="white-space: normal">
    <div class="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-true">
        What is my meeting link?
    </div>
    <div class="MuiGrid-root MuiGrid-item"><a href="https://help.calendly.com/hc/en-us/articles/223193448-Sharing-your-scheduling-link">
        Calendly
    </a></div>
    <div class="MuiGrid-root MuiGrid-item"><a href="https://knowledge.hubspot.com/meetings-tool/create-a-meetings-link">
        Hubspot
    </a></div>
    </div>
        `,
  },
  {
    type: FieldType.shortText,
    format: 'url',
    name: 'link',
    label: 'Link',
    displayCondition: 'return values.email.length > 0',
    required: true,
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
    name: 'linkedin.text',
    label: 'LinkedIn',
  },
  {
    type: FieldType.shortText,
    name: 'linkedin.number',
    format: 'number',
    label: 'Number',
    conditional: 'check',
    defaultValue: 1,
  },
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
    type: FieldType.contentSubHeader,
    label: 'Sub-Header',
    name: '_contentSubHeader_1',
  },
  {
    type: FieldType.singleSelect,
    name: 'singleSelect',
    label: 'Who is the CEO of Antler?',
    options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
    required: true,
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
    type: FieldType.contentSubHeader,
    label: 'Sub-Header 2',
    name: '_contentSubHeader_2',
  },
  {
    type: FieldType.contentParagraph,
    label: 'Paragraph text',
    name: '_contentParagraph_1',
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
  {
    type: FieldType.hidden,
    name: 'hidden',
    defaultValue: 'PERSISTENT VALUE',
    disablePadding: true,
  },
];

const additionalFields = [
  {
    type: FieldType.shortText,
    name: 'shortTextWithDefaultValue',
    label: 'Short Text with Default Value',
    defaultValue: 'DEFAULT VALUE',
  },
  {
    type: FieldType.checkbox,
    name: 'checkboxWithDefaultValue',
    label: 'Checkbox with Default Value',
    defaultValue: true,
    required: true,
  },
];

const App = () => {
  const [values, setValues] = React.useState<any>({
    number: 123,
    multiSelect: ['Option 2'],
  });
  const [showAdditionalFields, setShowAdditionalFields] = React.useState(false);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <DndProvider backend={HTML5Backend} context={window}>
        <Form
          open
          onClose={() => {}}
          title="Form Dialog"
          fields={
            showAdditionalFields ? [...additionalFields, ...fields] : fields
          }
          values={values}
          onSubmit={(data) => {
            console.log(data);
            setValues(data);
          }}
          // customActions={
          //   <>
          //     <button type="submit">SUBMIT</button>
          //   </>
          // }
          formHeader={
            <Button
              onClick={() => setShowAdditionalFields((x) => !x)}
              color="primary"
              variant="outlined"
              style={{ marginBottom: 24 }}
            >
              {showAdditionalFields ? 'Hide' : 'Show'} Additional Fields
            </Button>
          }
          UseFormProps={{ mode: 'onTouched' }}
        />
      </DndProvider>
    </ThemeProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
