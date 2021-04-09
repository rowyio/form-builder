const fs = require('fs');

process.chdir('./src');

const output = [];

function scanDir(dir) {
  const items = fs.readdirSync(dir);

  for (const item of items) {
    // This is the generated file
    if (item === 'index.ts' && dir === '.') continue;

    // Recursively scan this directory
    if (!item.includes('.')) scanDir(dir + '/' + item);

    // Export the file’s contents
    if (!item.includes('.ts')) continue;

    // Get component/file name
    let component = item.split('.')[0];
    const path = component === 'index' ? dir : `${dir}/${component}`;
    if (component === 'index') component = dir.split('/').pop();

    // Check if file has default export
    const file = fs.readFileSync(dir + '/' + item);
    // Check if not field index file
    if (file.indexOf('export default') > -1 && item.split('.')[0] !== 'index')
      output.push(`export { default as ${component} } from '${path}';`);

    output.push(`export * from '${path}';\n`);
  }
}

scanDir('.');
fs.writeFileSync('index.ts', output.join('\n'));
