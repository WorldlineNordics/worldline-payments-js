const path = require('path');

module.exports = {
    entry: path.join(__dirname, '/src/worldline-payments.ts'),
    output: {
        filename: 'worldline-payments.js',
        path: __dirname
    },
    module: {
        rules: [
            {
                loader: 'ts-loader',
                exclude: /node_modules/,
            },
        ]
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
};
