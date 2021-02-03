/*
Form filler works with playwright to automatically fill in the data given the label name and data.
Below is an sample usage of this helper function. A runnable sample script is in the main.js.
To run the script, make sure node>14 and main /example project is running, and run: node main.js

Below are the sample data that can be used.
formFiller function accepts two params. The first is the page object from playwright, and must be active,
and the second param is the form data to be filled, it is an array of object, each object should have
a label and a value. Label should be the unique identifier of the input and value is the value to be filled.
Label is case insensitive andcan ignore some leading or trailing text however must be unique. 
For example, if the label in the DOM is "Unique page header (max. 100 characters)", a shortened "page header"
is accepted. Each type of input has a different value type, for example, rich text should have a value type 
of string and multiple selector should have a type of array of strings.

const formData = [
  {
    // rich text
    label: 'description',
    value: 'a random description',
  },
  {
    // text
    label: 'Unique page header (max. 100 characters)',
    value: 'a random page header',
  },
  {
    // text field (long text)
    label: 'Tell me more',
    value: 'bla bla blablabla',
  },
  {
    // single selector
    label: 'Who is the CEO of Antler?',
    value: 'Option 2',
  },
  {
    // multiple selector
    label: 'Who are Antler Engineering team members?',
    value: ['Option 2', 'Option 3'],
  },
  {
    // single selector with MultiSelect component
    label: 'ceo of facebook',
    value: 'Option 2',
  },
  {
    // checkbox
    label: 'I am not a robot',
    value: true,
  },
  {
    // radio
    label: 'Highest education level?',
    value: 'Option 4',
  },
  {
    // slider
    label: 'Your age',
    value: 5,
  },
  {
    // multiple text
    label: 'Previous employers',
    value: ['Antler', 'Antler Sydney', 'Antler Australia'],
  },
  {
    // color picker
    label: 'Preferred color for your Antler shirt?',
    value: '#ff00ff',
  },
  {
    // date selector
    type: 'date',
    label: 'Your birthday',
    value: '19701025', // format: "YYYYMMDD"
  },
  {
    // datetime selector
    label: "book a time",
    value: "199010201050a", // format: "YYYYMMDDHHMM[a/p]"
  },
];

await formFiller(page, formData);
*/

async function formFiller(page, data) {
  for (const { label, value } of data) {
    // if the acutual label on the page is 'Unique page header (max. 100 characters)'
    // then passing 'unique page header' will work
    const xPathContainsFragment = xPathContainsIgnoreCase('data-label', label);
    const dataPath = `//*[${xPathContainsFragment}]`;
    const pathExists = await page.$(dataPath);

    if (!pathExists) {
      console.error(
        `Label does not exist. Make sure label exists and is unique:`,
        label
      );
      continue;
    }

    const type = await page.$eval(dataPath, el => el.getAttribute('data-type'));

    switch (type) {
      case 'text':
      case 'textarea':
        await page.fill(dataPath, value);
        break;
      case 'rich-text':
        // triple click to select all current text then overwrite using keyboard
        await page.click(`${dataPath}//iframe`, {
          clickCount: 3,
          delay: 50,
        });
        await page.keyboard.type(value);
        break;
      case 'radio':
        await page.check(
          `${dataPath}[${xPathContainsIgnoreCase('data-label-option', value)}]`
        );
        break;
      case 'checkbox':
        value ? await page.check(dataPath) : await page.uncheck(dataPath);
        break;
      case 'single-select':
        // open dropdown
        await page.click(dataPath);
        // select dropdown with value
        await page.click(
          `//li[${xPathContainsIgnoreCase('data-value', value)}]`
        );
        break;
      case 'multi-select-single':
        // this is the case of MultiSelect with a multiple=false prop
        const isSelected = await page.$(
          `${dataPath}/..//div[normalize-space(.)='${value}']`
        );
        if (!isSelected) {
          // open dropdown
          await page.click(dataPath);
          // select option
          await page.click(`//li[normalize-space(.)='${value}']`);
        }
        break;
      case 'multi-select':
        // open dropdown
        await page.click(dataPath);
        // select options
        await page.$$eval(
          '.MuiAutocomplete-listbox li',
          (options, value) => {
            const valueSet = new Set(value);
            for (const option of options) {
              // toggle the options that should be toggled
              const shouldBeChecked = valueSet.has(option.innerText);
              const isChecked = option.getAttribute('aria-selected') === 'true';
              shouldBeChecked !== isChecked && option.click();
            }
          },
          value
        );
        const doneButton = `//button[normalize-space(.)='Done']`;
        if (await page.$(doneButton)) {
          await page.click(doneButton);
          await page.waitForTimeout(50);
        }
        break;
      case 'text-multi':
        // remove all current values
        const removeButtonSelector = `${dataPath}//button[@aria-label="Remove"]`;
        while (await page.$(removeButtonSelector)) {
          await page.click(removeButtonSelector);
        }
        // fill in new values
        for (const text of value) {
          await page.fill(`${dataPath}//input`, text);
          await page.click(`${dataPath}//button[@aria-label="Add item"]`);
        }
        break;
      case 'slider':
        // focus on slider and get current selected value
        await page.click(`${dataPath}//span[@role="slider"]`);
        const currentValue = await page.$eval(
          `${dataPath}//input[@type="hidden"]`,
          el => parseInt(el.value)
        );
        // calculate difference and simulate keyboard event to move slider
        let operation;
        let count = 0;
        if (currentValue > value) {
          count = currentValue - value;
          operation = 'ArrowLeft';
        } else if (currentValue < value) {
          count = value - currentValue;
          operation = 'ArrowRight';
        }
        for (let i = 0; i < count; ++i) {
          await page.press('span[role="slider"]', operation);
        }
        break;
      case 'color':
        // triple click to select current text then type to overwrite
        await page.click(dataPath);
        // wait for color picker open animation
        await page.waitForTimeout(300);
        await page.click(`//*[@data-type="color-picker"]//input`, {
          clickCount: 3,
          delay: 50,
        });
        await page.keyboard.type(value);
        await page.keyboard.press('Enter');
        await page.click(dataPath);
        break;
      case 'date':
        // triple click to select current text then type to overwrite
        await page.click(dataPath);
        await page.keyboard.type(value);
        break;
      case 'datetime':
        // triple click to select current text then type to overwrite
        await page.click(dataPath);
        await page.keyboard.type(value);
        break;
      default:
        console.error(`formFiller: type ${type} is not supported`);
    }
  }
}

// case insensitive substring match the data-label
// source: https://stackoverflow.com/a/8474109
const xPathContainsIgnoreCase = (attribute, label) =>
  `contains(translate(@${attribute}, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'),'${label
    .toLowerCase()
    .trim()}')`;

module.exports = formFiller;
