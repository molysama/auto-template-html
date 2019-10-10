import webview from '@/webview'
import {click} from '@/tools'

webview('http://www.baidu.com', (fnName, value) => {
    this[fnName]
})

function hello () {
    log('hello, world')
    click(100, 200)
}