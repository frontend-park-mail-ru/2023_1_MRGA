module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": ["eslint:recommended",
    ],
    'parserOptions': {
        'ecmaFeatures': {
            'jsx': true
        }
    },
    "parser": "babel-eslint",
    "rules": {
        'no-unused-vars': 0,
        "no-debugger": 1,
        "no-undef": "warn",
        "quotes": ["error", "double"],
        "semi": ["error", "always"],
        "eol-last": ["error", "always"],
        "linebreak-style": ["error", "unix"],
        // "no-console": "warn",
        "eqeqeq": "error",
        "curly": "error",
        "prefer-const": "error",
        "no-trailing-spaces": "error",
        "comma-dangle": ["error", "always-multiline"],
        "prefer-template": "error",
        "no-var": "error",
        "array-callback-return": "error",
        "prefer-arrow-callback": "error",
        "no-multi-spaces": "error",
        "no-duplicate-imports": "error",
        "no-return-await": "error",
        "no-async-promise-executor": "error",
        "require-atomic-updates": "error",
        "no-template-curly-in-string": "error"
    },
}
