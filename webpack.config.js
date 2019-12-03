const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const JavascriptObfuscator = require('webpack-obfuscator')

module.exports = {
    entry: {
        app: './src/index.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'commonjs2'
    },
    target: 'node',

    mode: 'production',
    plugins: [
        new CleanWebpackPlugin(),
        new JavascriptObfuscator({
            compact: true
            // // 压缩
            // compact: true,
            // // 控制流扁平化（降低50%速度）
            // controlFlowFlattening: false,
            // // 扁平化使用概率
            // controlFlowFlatteningThreshold: 0.75,
            // // 插入死代码
            // deadCodeInjection: false,
            // // 死代码影响率
            // deadCodeInjectionThreshold: 0.4,
            // // 阻止调试
            // debugProtection: false,
            // // 进阶阻止调试
            // debugProtectionInterval: false,
            // // 禁用console
            // disableConsoleOutput: false,
            // // 锁定代码，使其只能在本域名执行（复制到其他地方难以使用）
            // domainLock: [],
            // // 标识符混淆方式，hexadecimal（十六进制）、mangled（短标识符）
            // identifierNamesGenerator: 'hexadecimal',
            // // 标识符添加特定前缀
            // identifiersPrefix: '',
            // // 允许将信息记录到控制台
            // inputFileName: '',
            // log: false,
            // // 启用全局变量和函数名你的混淆
            // renameGlobals: false,
            // // 禁用模糊处理和生成标识符
            // reservedNames: [],
            // // 禁用数组内字符串的转换
            // reservedStrings: [],
            // // 通过固定和随机的位置移动数组，使解密的位置难以匹配，大文件应重点开启
            // rotateStringArray: true,
            // seed: 0,
            // // 使混淆后的代码无法使用格式美化，需要保证compact为true
            // selfDefending: false,
            // // 生成指引文件
            // sourceMap: false,
            // sourceMapBaseUrl: '',
            // sourceMapFileName: '',
            // sourceMapMode: 'separate',
            // // 删除字符串，并将它们放在一个数组中使用
            // stringArray: true,
            // // 编码字符串
            // stringArrayEncoding: true,
            // // 编码率
            // stringArrayThreshold: 0.75,
            // // 生成的代码环境，可选Browser、Browser No Eval、Node
            // target: 'browser',
            // // 混淆对象键名
            // transformObjectKeys: false,
            // // 转义为Unicode，会大大增加体积，还原也比较容易，建议只对小文件使用
            // unicodeEscapeSequence: false
        })
    ],
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: {
                    loader: 'ts-loader'
                }       
            },
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
        extensions: ['.js', '.ts', '.json'],
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    }
}