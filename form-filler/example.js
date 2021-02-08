const { chromium } = require('playwright');
const formFiller = require('.');

const formData = {
  // rich text
  description: 'a random description',

  // text
  'Unique page header (max. 100 characters)': 'a random page header',

  // text field (long text)
  'Tell me more': 'bla bla blablabla',

  // single selector
  'Who is the CEO of Antler?': 'Option 2',

  // multiple selector
  'Who are Antler Engineering team members?': ['Option 2', 'Option 3'],

  // single selector with MultiSelect component
  'ceo of facebook': 'Option 2',

  // checkbox
  'I am not a robot': true,

  // radio
  'Highest education level?': 'Option 4',

  // slider
  'Your age': 5,

  // multiple text
  'Previous employers': ['Antler', 'Antler Sydney', 'Antler Australia'],

  // color picker
  'Preferred color for your Antler shirt?': '#ff00ff',

  // date selector
  'Your birthday': '19701025', // format: "YYYYMMDD"

  // datetime selector
  'book a time': '199010201050a', // format: "YYYYMMDDHHMM[a/p]"

  // error
  'None existing label': '',
};

async function main() {
  const browser = await chromium.launch({
    headless: false,
    slowMo: 0,
  });
  const page = await browser.newPage();
  await page.goto('http://localhost:1234');

  await formFiller(page, formData);
  await page.waitForTimeout(10000);
  await browser.close();
}

main();
