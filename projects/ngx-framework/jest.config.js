const baseConfig = require('../../jest.base.config');

module.exports = {
  ...baseConfig,
  roots: ['<rootDir>/projects/ngx-framework/src/'],
  coverageDirectory: '<rootDir>/coverage/ngx-framework',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/projects/ngx-framework/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.html$',
      astTransformers: [
        'jest-preset-angular/build/InlineFilesTransformer',
        'jest-preset-angular/build/StripStylesTransformer',
      ],
    },
  },
};
