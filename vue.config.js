const path = require('path');

module.exports = {
    lintOnSave: true,
    pwa: {
        name: 'VCalculator',
        themeColor: '#33CCFF',
        workboxOptions: {
            navigateFallback: '/index.html',
        },
    },
    transpileDependencies: [
        /\bvue-awesome\b/
    ],
    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'scss',
            patterns: [path.resolve(__dirname, 'scss/lib.scss')]
        }
    }
};
