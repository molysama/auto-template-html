const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
    entry: ['./src/index.js'],
    output: {
        filename: 'build.js',
        path: path.resolve(__dirname, 'dist')
    },
    target: 'node',

    // devtool: 'inline-source-map',
    // mode: 'development',
    mode: 'production',
    plugins: [
        // new JavaScriptObfuscator(),
        new CleanWebpackPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: {
                    loader: 'url-loader'
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js'],
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    }
}