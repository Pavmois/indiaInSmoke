const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    entry: {
        main: path.resolve(__dirname, './airquality/src/index.js')
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
        contentBase: './dist',
        open: true
    },
    plugins: [new HtmlWebpackPlugin({
        template: './airquality/src/index.html'
    })],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node-modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],

            },
            {
                test: /\.(gif|png|jpg|jpeg|svg)/i,
                type: 'asset/resource'
            }
        ]
    }
};