module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
        sourceType: 'module', // Allows for the use of imports
    },
    extends: ['airbnb-typescript/base', 'prettier/@typescript-eslint', 'plugin:prettier/recommended'],
    plugins: ['@typescript-eslint', 'prettier'],
    env: {
        node: true,
    },
    rules: {
        '@typescript-eslint/ban-ts-ignore': 'off',
        'import/prefer-default-export': 'off',
        'no-console': 'off',
        'no-underscore-dangle': 'off',
        'no-unused-expressions': 'off',
        '@typescript-eslint/no-unused-expressions': 'off',
        'no-prototype-builtins': 'off',
        'no-continue': 'off',
        'no-await-in-loop': 'off',
        'no-param-reassign': 'off',
        'import/no-cycle': 'off',
    },
}
