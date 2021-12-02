const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
    entry: {
        main: path.resolve(__dirname, './src/index.js'),
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js',
        clean: true,
    },
    stats: {
        children: true,
    },
    mode: 'development',
    module: {

        rules: [{ test: /\.css$/, use: [MiniCssExtractPlugin.loader, "css-loader"] },
        {
            test: /\.(png|jpe?g|gif|svg|jpg)$/i, use: [{ loader: 'file-loader', options: { name: '/img/[name].[ext]', } },],

        },

        ]
    },

    plugins: [
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({ template: './src/mainScreen.html' }),
    ],
}