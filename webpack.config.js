const path = require("path");

module.exports = {
    mode: "development",
    devtool: 'inline-source-map',
    entry: {
        server: './src/server.ts',
        client: './src/front/main.ts'
    },
    output: {
        path: path.resolve(__dirname, 'webpack_dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            { test: /\.css$/, use: 'css-loader' },
            { test: /\.tsx?$/, use: 'ts-loader', exclude: /node_modules/ }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
};