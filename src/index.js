import { wv } from "@/system"

// 监听html的run事件
wv.on("run", (value) => {
    toastLog("这是一个auto的方法，得到了run的结果：" + value)

    setTimeout(() => {
        wv.runHtmlFunction("test").then((val) =>
            toastLog(`执行了html的test方法，结果是：${val}`)
        )
    }, 2000)
})
