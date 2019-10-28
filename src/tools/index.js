import Core, {use, cap, scale, getWidth, getHeight, width, height} from '@auto.pro/core'

import Action, {click, swipe} from '@auto.pro/action'
import Search, {findImg, hasAnyColors, hasMulColors, noAnyColors} from '@auto.pro/search'

Core({
    baseWidth: 1280,
    baseHeight: 720,
    needCap: true
})

use(Action)
use(Search)

const tap = click

export {
    cap,

    tap,
    click,
    swipe,

    findImg,
    hasAnyColors,
    hasMulColors,
    scale,
    getWidth,
    getHeight,
    width,
    height
}