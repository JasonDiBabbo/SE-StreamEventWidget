const path = require('path');
const tsConfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: './src/widget.ts',
    output: {
        filename: 'widget.js',
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        plugins: [new tsConfigPathsPlugin()],
        extensions: ['.ts'],
    },
    module: {
        rules: [
            {
                test: /\.tsx?/,
                use: 'ts-loader',
                exclude: /node_modules/,
            }
        ]
    },
};