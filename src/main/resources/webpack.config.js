module.exports = {
   entry: {app: ['./src/worldline-payments.ts']},
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
		minimize: false
	}
};
