import WebView from '@/webview'

// let path = 'https://www.baidu.com'
let path = 'file:' + files.path('assets/index.html')

const wv = WebView(path, (fnName, value) => {
    // 接受html里的prompt事件，并执行一些auto操作
    log(fnName, value)
    if (fnName === 'toast') {
        toast('' + value)
    }
})

// 由auto执行html里的函数，返回一个Promise，注意方法的参数不同
setTimeout(() => {
    // 执行html内的fromAuto函数，参数是html里的example变量
    wv.runHtmlFunction('fromAuto', 'example').then(result => {
        console.log('fn1', result)
    })
}, 3000);
setTimeout(() => {
    // 执行html内的fromAuto函数，参数是一个"example"字符串
    wv.runHtmlFunction('fromAuto', '"example"').then(result => {
        console.log('fn2', result)
    })
}, 6000);

// 使用async/await处理Promise，会增大约16K打包体积
// 使用的参数是auto的变量
setTimeout(async () => {
    let param = 'async'
    let res = await wv.runHtmlFunction('fromAuto', `"${param}"`)
    // 用JSON.parse处理返回值
    console.log('fn3', res && JSON.parse(res))
}, 9000);