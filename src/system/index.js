import { fromEvent, race, timer, of } from "rxjs"
import { share, exhaustMap, tap, map } from "rxjs/operators"

import Core, { use } from "@auto.pro/core"
import WebViewPlugin, { run } from "@auto.pro/webview"

Core({
    // 是否需要无障碍服务
    needService: true,
    // 是否需要截图服务
    needCap: true,
})

use(WebViewPlugin)

// const htmlPath = "file:" + files.path("dist/index.html")
// const htmlPath = 'http://www.baidu.com'
const htmlPath = 'https://core-ui-example-1253839166.cos-website.ap-guangzhou.myqcloud.com/#/dashboard'

export const wv = run(htmlPath)

// 监听返回键
const back$ = fromEvent(ui.emitter, "back_pressed").pipe(share())
back$.pipe(
    tap(e => {
        e.consumed = true
        wv.runHtmlJS('document.location.hash').then(result => {
            console.log('result', result)
            if (JSON.parse(result) === '#/dashboard') {
                exit()
            } else {
                wv.runHtmlJS('history.back(-1)')
            }
        })
    })
).subscribe()
// back$
//     .pipe(
//         exhaustMap((e) => {
//             toast("再次返回可退出")
//             e.consumed = true
//             return race(
//                 back$.pipe(tap(() => (e.consumed = false))),
//                 timer(2000)
//             )
//         })
//     )
//     .subscribe()
