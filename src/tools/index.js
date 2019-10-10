import Core from '@auto.pro/core'

import Action, {useAction} from '@auto.pro/action'

const core = Core()

core.use(Action)

const action = useAction()

export const cap = action.cap
export const click = action.click
export const tap = action.click
export const swipe = action.swipe

export default {
    action
}


threads.start(function () {

    log('device:' + device.width, device.height)
    let width = Math.max(device.width, device.height)
    let height = Math.min(device.width, device.height)

    if(!requestScreenCapture(width, height)){
        toast("请求截图失败");
        exit();
    }

    if (device.release >= '7') {

        if(auto.service == null) {
            app.startActivity({
                action: "android.settings.ACCESSIBILITY_SETTINGS"
            });
        }
    }
    
})

