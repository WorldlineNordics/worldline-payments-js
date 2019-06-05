const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    entry: './src/worldline-payments.ts',
    output: {
        filename: 'worldline-payments.js',
        path: __dirname,
        libraryTarget: 'var',
        library: 'Worldline'
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
    optimization: {
        concatenateModules: false,
        minimizer: [new TerserPlugin ({
                            terserOptions: {
                                keep_classnames: true,
                                keep_fnames: true
                            }
                     })]
    }
};
