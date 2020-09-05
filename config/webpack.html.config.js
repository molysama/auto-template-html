const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const JavascriptObfuscator = require("webpack-obfuscator")

const dictionary = []
for (let i = 128; i < 200; i++) {
    dictionary.push(i.toString(2).replace(/1/g, "ν").replace(/0/g, "v"))
}

const config = {
    entry: {
        bundle: path.resolve(__dirname, "../src/html/index.js"),
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "../dist"),
        libraryTarget: "umd",
    },
    target: "web",
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: {
                    loader: "ts-loader",
                },
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|svg|jpe?g|gif|svg)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            // 100k以下的图片使用base64嵌入到html中
                            limit: 1024 * 100
                        }
                    }
                ],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                loader: 'file-loader',
            },
        ],
    },
    resolve: {
        extensions: [".js", ".ts", ".json"],
        alias: {
            "@": path.resolve(__dirname, "../src"),
        },
    },


}

module.exports = (env, argv) => {
    if (argv.mode === 'development') {
        config.devtool = 'source-map'
        config.plugins = [
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, "../src/html/index.html"),
            })
        ]
        config.devServer = {
            contentBase: path.join(__dirname, '../dist'),
            port: 9000
        }
    } else {
        config.plugins = [
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, "../src/html/index.html"),
            }),
            new JavascriptObfuscator({
                compact: true,
                identifierNamesGenerator: "dictionary",
                identifiersDictionary: dictionary,
                // 生成的代码环境，可选browser、browser-no-eval、node
                target: "browser",
                // 转义为Unicode，会大大增加体积，还原也非常容易，建议只对小文件使用
                unicodeEscapeSequence: false,
            })
        ]
    }

    return config
}
