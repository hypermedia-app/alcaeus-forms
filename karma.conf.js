/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-var-requires */
const { createDefaultConfig } = require('@open-wc/testing-karma')
const merge = require('deepmerge')

module.exports = config => {
  config.set(
    merge(createDefaultConfig(config), {
      files: [
        // runs all files ending with .test in the test folder,
        // can be overwritten by passing a --grep flag. examples:
        //
        // npm run test -- --grep test/foo/bar.test.js
        // npm run test -- --grep test/bar/*
        { pattern: config.grep ? config.grep : 'test/**/*.test.ts', type: 'module' },
      ],

      // see the karma-esm docs for all options
      esm: {
        babel: true,
        nodeResolve: true,
        fileExtensions: ['.ts'],
      },
    }),
  )
  return config
}
