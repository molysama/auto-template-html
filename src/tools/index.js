import Core from '@auto.pro/core'

import Action, {useAction} from '@auto.pro/action'
import Seacth, {findImg, hasAnyColors, hasMulColors, noAnyColors} from '@auto.pro/search'

const core = Core({
    baseWidth: 1280,
    baseHeight: 720,
    needCap: true
})

core.use(Action)
core.use(Seacth)

const {click, swipe} = useAction()

const tap = click
const scale = core.scale
const getWidth = core.getWidth
const getHeight = core.getHeight
const width = core.width
const height = core.height

export {
    click,
    tap,
    swipe,
    findImg,
    scale,
    getWidth,
    getHeight,
    width,
    height
}