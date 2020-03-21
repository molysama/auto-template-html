const path = require("path")
const JavascriptObfuscator = require("webpack-obfuscator")

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
