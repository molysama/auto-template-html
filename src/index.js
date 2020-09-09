import { webview } from "@/system"
import { effect$ } from "@auto.pro/core"


// effect$是作业线程，当core的权限全部到位后，effect$才开始运作
effect$.subscribe(() => {
    toastLog('权限已经到位')

    // 监听html的prompt('submit', JSON.stringify(param))
    webview.on('submit').subscribe(([param, done]) => {


        toastLog(`点击了登录按钮，获得参数${param}`)

        // 使用done给html返回结果，这里返回获得的参数
        done(param)

        webview.runHtmlJS('document.title').subscribe(v => {
            toastLog(`title is ${v}`)
        })
    })
})