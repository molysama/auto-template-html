import WebView from '@/webview'
import {click} from '@/tools'

WebView('http://www.baidu.com', (fnName, value, webview) => {
    log(fnName)
    log(value)
    hello()
})

function hello () {
    log('hello, world')
    click(100, 200)
}