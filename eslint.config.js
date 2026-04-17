const js = require('@eslint/js');
const prettier = require('eslint-plugin-prettier');
const configPrettier = require('eslint-config-prettier');
const globals = require('globals');

module.exports = [
  {
    // Esto reemplaza al .eslintignore
    ignores: ['node_modules/**', 'dist/**', '.env'],
  },
  js.configs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'commonjs',
      globals: {
        ...globals.node,
        ...globals.es2021,
      },
    },
    plugins: {
      prettier: prettier,
    },
    rules: {
      ...configPrettier.rules,
      'prettier/prettier': 'error',
      'no-console': 'warn',
      eqeqeq: 'error',
    },
  },
];
