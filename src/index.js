import { webview } from "@/system"
import { effect$ } from "@auto.pro/core"

webview.subscribe(wv => {

    // 监听html的prompt('submit', JSON.stringify(param))
    wv.on('submit').subscribe(([param, done]) => {

        // 使用done给html返回结果，这里返回undefined
        done()

        toastLog('点击了登录按钮')

        wv.runHtmlJS('document.title').subscribe(v => {
            toastLog(`title is ${v}`)
        })
    })
})

// effect$是作业线程，当core的权限全部到位后，effect$才开始运作
effect$.subscribe(() => {
    toastLog('权限已经到位')
})