const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig.json');

module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  testMatch: ['**/+(*.)+(spec).+(ts)?(x)'],
  transformIgnorePatterns: ['^.+\\.js$'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths || {}, {
    prefix: '<rootDir>/',
  }),
  collectCoverageFrom: [
    '<rootDir>/projects/**/**/*.ts',
    '!<rootDir>/projects/**/**/*.module.ts',
    '!<rootDir>/projects/**/**/public-api.ts',
    '!<rootDir>/projects/**/**/*.enum.ts',
    '!<rootDir>/projects/**/src/environments/**',
    '!<rootDir>/projects/**/src/main.ts',
    '!<rootDir>/projects/**/**/index.ts',
    '!<rootDir>/projects/**/src/polyfills.ts',
    '!<rootDir>/projects/**/src/app/app.routing.ts',
    '!<rootDir>/projects/**/src/app/injector.component.ts',
    '!<rootDir>/projects/**/src/app/transloco/**',
    '!<rootDir>/projects/**/src/lib/test/stubs.ts',
    '!**/node_modules/**',
  ],
  coverageThreshold: {
    global: {
      statements: 85,
      branches: 85,
      lines: 85,
      functions: 85,
    },
  },
  moduleFileExtensions: ['ts', 'html', 'js', 'json'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment',
  ],
};
