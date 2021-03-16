const path = require('path');

// Not transpiled with TypeScript or Babel, so use plain Es6/Node.js!
module.exports = {
  // This function will run for each entry/format/env combination
  rollup(config, options) {
    const { output, ...restConfig } = config;
    const { file, ...restOutput } = output;
    // Remove file ref and insert dir to support React.lazy();
    return {
      ...restConfig,
      output: {
        ...restOutput,
        dir: path.join(__dirname, 'dist'),
      },
    }; // always return a config.
  },
};
