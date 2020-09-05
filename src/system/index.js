
import core, { closeForeground, setSystemUiVisibility, effect$ } from '@auto.pro/core'
import { run } from '@auto.pro/webview'
import { fromEvent } from 'rxjs'

core({
    baseWidth: 960,
    baseHeight: 540,
    needCap: true,
    needFloaty: true
    // needService: true,
    // needForeground: true,
})

export const webview = run('file://' + files.path('assets/index.html'), {
    afterLayout() {
        setSystemUiVisibility('有状态栏的沉浸式界面')
    }
})

// 监听退出事件，关闭前台服务
events.on('exit', () => {
    closeForeground()
})

// 监听返回键并共享事件
const back$ = fromEvent(ui.emitter, "back_pressed").pipe(share())
back$.pipe(
    exhaustMap((e) => {
        toast("再次返回可退出")
        e.consumed = true
        return race(
            back$.pipe(tap(() => (e.consumed = false))),
            timer(2000)
        )
    })
).subscribe()
