// eslint.config.js
import love from 'eslint-config-love'
import jestPlugin from 'eslint-plugin-jest'
import prettierPlugin from 'eslint-plugin-prettier'

export default [
  // Preset do love aplicado a TS
  { ...love, files: ['**/*.ts'] },

  // Bloco com plugins e regras adicionais
  {
    files: ['**/*.ts'],
    plugins: {
      jest: jestPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': [
        'error',
        {
          tabWidth: 2,
          bracketSpacing: true,
          endOfLine: 'lf',
          parser: 'typescript',
          semi: true,
          singleQuote: false,
          useTabs: false,
          trailingComma: 'es5',
        },
      ],
      'no-console': 'off',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/non-nullable-type-assertion-style': 'off',
      '@typescript-eslint/unbound-method': ['error', { ignoreStatic: true }],
      '@typescript-eslint/prefer-nullish-coalescing': [
        'error',
        { ignoreConditionalTests: true },
      ],

      "@typescript-eslint/init-declarations": 'off',
      "@typescript-eslint/no-unsafe-call": 'off',
      "@typescript-eslint/no-unsafe-member-access": 'off',
      "@typescript-eslint/max-params": 'off',
      "@typescript-eslint/no-unsafe-assignment": 'off',
      "complexity": "off",
      "@typescript-eslint/no-magic-numbers": 'off',
      "@typescript-eslint/no-unsafe-type-assertion": 'off',
      "@typescript-eslint/no-ttion": 'off',
      "@typescript-eslint/naming-convention": 'off',
      "@typescript-eslint/prefer-destructuring": 'off',
      '@typescript-eslint/strict-boolean-expressions': [
        'error',
        {
          allowNullableString: true,
          allowNullableNumber: true,
          allowNullableBoolean: true,
        },
      ],
    },
  },

  // Override opcional para testes com jest
  {
    files: ['tests/**', 'test/**'],
    plugins: { jest: jestPlugin },
    rules: {
      '@typescript-eslint/unbound-method': 'off',
      'jest/unbound-method': 'error',
    },
  },
]
