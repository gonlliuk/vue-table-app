module.exports = {
    root: true,

    env: {
        node: true,
    },

    extends: ['plugin:vue/essential'],

    rules: {
        'no-console': 'off',
        'no-debugger': 'off',
        'vue/html-indent': 4,
    },

    parserOptions: {
        parser: 'babel-eslint',
    },

    'extends': [
      'plugin:vue/recommended',
    ],
};
