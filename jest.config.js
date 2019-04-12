const configs = require('@bluebase/code-standards/jest.config');

const esModules = ['react-native', 'react-router-native'].join('|');

module.exports = Object.assign(configs, {
  transformIgnorePatterns: [`/node_modules/(?!${esModules})`],
  setupFilesAfterEnv: ["<rootDir>/tests/setup.ts"]  ,
  testPathIgnorePatterns: [
    ...configs.testPathIgnorePatterns,
    '<rootDir>/src/demo/',
  ],
  coveragePathIgnorePatterns: [
    ...configs.coveragePathIgnorePatterns,
    '<rootDir>/src/demo/',
  ],
});