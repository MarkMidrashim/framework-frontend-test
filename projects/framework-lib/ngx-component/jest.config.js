const baseConfig = require('../../../jest.base.config');

module.exports = {
  ...baseConfig,
  roots: ['<rootDir>/projects/framework-lib/ngx-component/src/'],
  coverageDirectory: '<rootDir>/coverage/framework-lib/ngx-component',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/projects/framework-lib/ngx-component/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.html$',
      astTransformers: [
        'jest-preset-angular/build/InlineFilesTransformer',
        'jest-preset-angular/build/StripStylesTransformer',
      ],
    },
  },
};
