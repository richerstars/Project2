const path = require( 'path' )
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const { CleanWebpackPlugin } = require( "clean-webpack-plugin" );
const ESLintPlugin = require( 'eslint-webpack-plugin' );
const ForkTsCheckerWebpackPlugin = require( 'fork-ts-checker-webpack-plugin' );

module.exports = {
    entry: {
        main: './src/scripts/index.ts',
    },
    output: {
        path: path.resolve( __dirname, 'dist' ),
        filename: '[name].js',
        clean: true,
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ],
    },
    devServer: {
        port: 4200,
    },
    mode: 'development',
    module: {

        rules: [
            {
                test: /\.css$/i,
                use: [ "style-loader", "css-loader" ],
            },
            {
                test: /\.(png|jpe?g|gif|svg|jpg)$/i,
                type: 'asset'
            },
            {
                test: /\.html$/i,
                loader: "html-loader",
            },
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            }
        ]
    },

    plugins: [

        new HtmlWebpackPlugin( {
            filename: "index.html",
            template: "./src/pages/mainScreen.html",
            chunks: [ 'main' ]
        } ),

        new CleanWebpackPlugin(),
        new ESLintPlugin( {
            extensions: [ 'ts' ],
        } ),
        new ForkTsCheckerWebpackPlugin( {
            typescript: {
                configFile: path.resolve( __dirname, './tsconfig.json' ),
            },
        } ),
    ],
}
