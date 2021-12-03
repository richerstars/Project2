const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
    entry: {
        // main: path.resolve(__dirname, './src/pages/mainPage/index.js'),
        main: path.resolve(__dirname, './src/pages/Registration/signUp.js'),
        //main: path.resolve(__dirname, './src/pages/Authorization/signIn.js'),
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
        // new HtmlWebpackPlugin({ template: './src/pages/mainPage/mainScreen.html' }),
        new HtmlWebpackPlugin({ template: './src/pages/Registration/signUp.html' }),
        //new HtmlWebpackPlugin({ template: './src/pages/Authorization/signIn.html' }),
    ],
}