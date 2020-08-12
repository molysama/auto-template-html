// 由于开启了混淆，为防止找不到对应的函数名，将函数挂载到window上
import uuidjs from 'uuid-js'

function test() {
    return uuidjs.create(4).toString()
}

window["run"] = function () {
    // 执行prompt前，务必要用JSON.stringify转一次，无论任何变量类型!!!
    prompt("run", JSON.stringify("hello,world"))
    // prompt("run", JSON.stringify({ abc: 123 }))
}

window["test"] = test
