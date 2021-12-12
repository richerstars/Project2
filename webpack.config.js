const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require("clean-webpack-plugin");

module.exports = {
    entry: {
        main: './src/pages/mainPage/index.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        clean: true,
    },
    mode: 'development',
    module: {

        rules: [
            {
            test: /\.css$/i,
            use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(png|jpe?g|gif|svg|jpg)$/i,
                type: 'asset'
            },
            {
                test: /\.html$/i,
                loader: "html-loader",
            },
        ]
    },

    plugins: [

        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "./src/pages/mainPage/mainScreen.html",
            chunks: ['main']
        }),

        new CleanWebpackPlugin(),
    ],
}