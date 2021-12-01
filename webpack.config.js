const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: {
        main: path.resolve(__dirname, './src/index.js'),
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js',
    },
    stats: {
        children: true,
    },
    mode: 'development',
    module: {

        rules: [{ test: /\.css$/, use: ["style-loader", "css-loader"] },
        { test: /\.svg$/, loader: 'svg-inline-loader' },
        {
            test: /\.(png|jpe?g|gif|svg)$/i, use: [{
                loader: 'file-loader',
                options: '[name].[ext]',

            },

            ],

        },
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({ template: './src/mainScreen.html' }),
    ],
}