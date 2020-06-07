import { fromEvent, race, timer } from "rxjs"
import { share, exhaustMap, tap } from "rxjs/operators"

import Core, { use } from "@auto.pro/core"
import WebViewPlugin, { run } from "@auto.pro/webview"

Core({
    // 是否需要无障碍服务
    needService: true,
    // 是否需要截图服务
    needCap: true,
})

use(WebViewPlugin)

const htmlPath = "file:" + files.path("dist/index.html")
// const htmlPath = 'http://www.baidu.com'

export const wv = run(htmlPath)

// 监听返回键
const back$ = fromEvent(ui.emitter, "back_pressed").pipe(share())
back$
    .pipe(
        exhaustMap((e) => {
            toast("再次返回可退出")
            e.consumed = true
            return race(
                back$.pipe(tap(() => (e.consumed = false))),
                timer(2000)
            )
        })
    )
    .subscribe()
