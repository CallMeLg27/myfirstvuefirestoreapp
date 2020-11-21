module.exports = {
    "env": {
        "node": true,
        "es6": true
    },
    "extends": "plugin:vue/base",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "parser": "babel-eslint",
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "vue"
    ],
    "rules": {
    }
};