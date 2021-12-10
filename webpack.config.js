const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
 // const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: {
        main: './src/pages/mainPage/index.js',
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].js',
        publicPath: '/',
        clean: true,
    },
    mode: 'development',
    module: {

        rules: [{test: /\.css$/i, use: [MiniCssExtractPlugin.loader, {loader: "css-loader", options: {url: true}},],},
            {
                test: /\.(png|jpe?g|gif|svg|jpg)$/i,
                use: [{loader: 'file-loader', options: {name: './img/[name].[ext]',},},],

            },
            {
                test: /\.(png|jpg|gif|svg)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                        },
                    },
                ],
            },
        ]
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css'
        }),
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "./src/pages/mainPage/mainScreen.html",
            chunks: ['main']
        }),
        // new CopyWebpackPlugin({
        //     patterns: [
        //         {
        //             from: path.resolve(__dirname, './src/img'),
        //             to: path.resolve(__dirname, 'dist/img')
        //         }
        //     ]
        // }),
    ],
}