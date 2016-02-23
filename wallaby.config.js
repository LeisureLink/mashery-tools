'use strict';

const testingConfig = require('./testing.config');
const parsedEnv = `API_KEY=${testingConfig.apiKey};SECRET=${testingConfig.secret}`;

module.exports = (wallaby) => {
  return {
    files: [
      'testing.config.json',
      'src/**/*',
      'test/**/*',
      { pattern: 'test/**/*.tests.js', ignore: true }
    ],
    tests: [
      'test/**/*.tests.js'
    ],
    env: {
      type: 'node',
      params: {
        env: parsedEnv
      }
    },
    bootstrap: () => {
      require('./test/helper');
    },
    compilers: {
      '**/*.js': wallaby.compilers.babel()
    }
  }
};
