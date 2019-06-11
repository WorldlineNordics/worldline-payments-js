
module.exports = {
    entry: './src/Payments.ts',
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
};
