import WebView from '@/webview'

// 建议使用http、https协议，如 let path = 'https://www.baidu.com'
let path = 'file:' + files.path('dist/index.html')

let testValue = 1
const wv = WebView(path, (fnName, value) => {

    // 接受html里的prompt事件，并执行一些auto操作
    log(fnName, value)
    if (fnName === 'toast') {
        toast(`obj: ${JSON.stringify(value)}`)
    }
    // 将值返回给html的函数
    return testValue++
})

setTimeout(() => {
    // 执行html内的alert方法，参数是window.innerWidth
    wv.runHtmlFunction('alert', 'window.innerWidth').then(async result => {
        // alert没有返回值，因此result为null
        log('alert', result)

        // 执行html内的方法，并将auto的变量testValue作为参数的一部分
        // 使用async/await处理异步
        await wv.runHtmlFunction('console.log', `"testValue is: ${testValue}"`)
        // 获取html的某个属性值，并输出
        let title = await wv.runHtmlJS('document.title')
        log('title', title)

    })
}, 3000);