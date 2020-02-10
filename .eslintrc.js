module.exports = {
    'root': true,
    'env': {
        'node': true
    },
    'extends': [
        'plugin:vue/recommended',
        '@vue/standard',
        '@vue/typescript'
    ],
    'parserOptions': {
        'parser': 'typescript-eslint-parser'
    },
    'rules': {
        'comma-dangle': ['error', {
            'arrays': 'only-multiline',
            'objects': 'only-multiline',
            'imports': 'only-multiline',
            'exports': 'never',
            'functions': 'never'
        }],
        'space-before-function-paren': 0,
        'vue/no-v-html': 'warning',
        'indent': ['error', 4],
        'vue/script-indent': [
            'error', 4, { 'baseIndent': 1 }
        ],
        'vue/html-indent': [
            'error', 4
        ],
        'quotes': ['error', 'single'],
        'semi': ['error', 'always']
    },
    overrides: {
        files: ['*.vue'],
        rules: {
            'indent': 'off'
        }
    }
};
