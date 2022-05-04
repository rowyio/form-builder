import * as React from 'react';
import * as ReactDOM from 'react-dom';

import createTheme from '@mui/material/styles/createTheme';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';
import FormDialog from '../src/FormDialog';
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
    required: true,
  },
  {
    type: FieldType.shortText,
    format: 'url',
    name: 'link',
    label: 'Link',
    displayCondition: 'return values.email.length > 0',
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

    // disable past date time
    minDateTime: new Date(),
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
    maxCharacters: 15,
    validation: {
      '0': { 0: 'notOneOf', 1: ['admin'], 2: 'Reserved username' },
      1: ['min', 3, 'Must be at least 3 characters'],
    },
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
    label: 'Who is the CEO?',
    options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
  },
  {
    type: FieldType.multiSelect,
    name: 'multiSelect',
    label: 'Who are team members?',
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
    label: 'Preferred color for your shirt?',
  },
  {
    type: FieldType.score,
    name: 'score',
    label: 'How likely are you to recommend us to a friend or a colleague?',
    minLabel: 'Not at all likely',
    maxLabel: 'Likely',
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
  },
];

const App = () => {
  const [values, setValues] = React.useState<any>({
    number: 123,
    multiSelect: ['Option 2'],
    meetingLink: 'https://example.com',
  });
  const [showAdditionalFields, setShowAdditionalFields] = React.useState(false);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <DndProvider backend={HTML5Backend} context={window}>
        <FormDialog
          open
          onClose={() => {}}
          title="Form Dialog"
          fields={
            showAdditionalFields ? [...additionalFields, ...fields] : fields
          }
          values={values}
          onSubmit={(data) => {
            console.log('data', data);
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
