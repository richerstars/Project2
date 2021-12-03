const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
    // entry: {
    //     main: path.resolve(__dirname, './src/pages/mainPage/index.js'),
    //     main: path.resolve(__dirname, './src/pages/Registration/signUp.js'),
    //     main: path.resolve(__dirname, './src/pages/Authorization/signIn.js'),
    // },
    // entry: ['./src/pages/Registration/signUp.js', './src/pages/Authorization/signIn.js','./src/pages/mainPage/index.js','./src/styles/mainScreen.css'],
    entry: {
        main: './src/pages/mainPage/index.js',
        signUp: './src/pages/Registration/signUp.js',
        signIn: './src/pages/Authorization/signIn.js'
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].js',
        clean: true,
    },
    stats: {
        children: true,
    },
    mode: 'development',
    module: {

        rules: [{test: /\.css$/, use: [MiniCssExtractPlugin.loader, {loader: "css-loader", options: {url: true}},],},
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
        new HtmlWebpackPlugin({
            filename: "signIn.html",
            template: './src/pages/Authorization/signIn.html',
            chunks: ['signIn']
        }),
        new HtmlWebpackPlugin({
            filename: "signUp.html",
            template: './src/pages/Registration/signUp.html',
            chunks: ['signUp']
        })
    ],
}