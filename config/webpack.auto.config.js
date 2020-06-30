const path = require("path")
const JavascriptObfuscator = require("webpack-obfuscator")
const AutoProWebpackPlugin = require('@auto.pro/webpack-plugin')

const dictionary = []
for (let i = 128; i < 200; i++) {
    dictionary.push(
        i
            .toString(2)
            .replace(/1/g, "ν")
            .replace(/0/g, "v")
    )
}

module.exports = {
    entry: {
        app: path.resolve(__dirname, "../src/index.js")
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "../dist"),
        libraryTarget: "commonjs2"
    },
    target: "node",
    mode: "production",
    plugins: [
        new JavascriptObfuscator({
            compact: true,
            identifierNamesGenerator: "dictionary",
            identifiersDictionary: dictionary,
            target: "browser-no-eval",
            unicodeEscapeSequence: false,
            transformObjectKeys: true
        }),
        new AutoProWebpackPlugin({
            // 数组内是需要ui的文件名，与上面的entry对应
            // ui: ['app'],

            // key，加密密钥，需要注意密钥长度，算法有要求，建议与示例一个长度
            // type: 'pkcs7'(默认) | 'pkcs5'，加密方式
            // encode: {
            //     key: 'Secret Passphrase',
            // }
        })
    ],
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: {
                    loader: "ts-loader"
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: {
                    loader: "url-loader"
                }
            }
        ]
    },
    resolve: {
        extensions: [".js", ".ts", ".json"],
        alias: {
            "@": path.resolve(__dirname, "../src")
        }
    }
}
