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
        "no-undef": "warn"
    },
}
