import { HREF } from '../config/config'
const isAndroid = (/android/gi).test(navigator.appVersion);

/**
 * 调用手机原生弹窗
 * @param msg 弹窗需要展示内容
 */
export function nativeToast(msg) {
    if (isAndroid) return oemp.handleToast(msg)
    window.webkit.messageHandlers['handleToast'].postMessage(msg)
}

/**
 * 调用手机原生 时间选择控件
 * @param cb 回调函数 参数示例: { time: 2019-06-16 13:20 }
 */
export function nativeTime(cb) {
    let message = {
        cb: `window.app.${cb}({time:'@'})`
    };
    if (isAndroid) return oemp.handleFullDatePicker(JSON.stringify(message))
    window.webkit.messageHandlers['handleFullDatePicker'].postMessage(message)
}

/**
 * 调用手机原生 抄送人控件
 * @param type checkBox => 多选, radio => 单选
 * @param data 初次调用传[], 之后每次调用传之前的数据
 * @param cb 回调函数 参数示例 {result: [{}, {}], name: 'success'}
 */
export function nativeCopier(type, data, cb) {
    let message = {
        title: '请选择',
        type,
        data, // 默认选中
        cb: `window.app.${cb}({"result": "@", "name": "success"})`
    };
    if (isAndroid) return oemp.handlePersonList(JSON.stringify(message))
    window.webkit.messageHandlers['handlePersonList'].postMessage(message)
}

/**
 * 调用手机原生 路由跳转
 * @param optionList
 * @param navbarColor 顶栏背景颜色
 * @param path 路由跳转地址
 * @param title 顶栏title
 */
export function nativeRoute(optionList, navbarColor, path, title) {
    let message = {
        optionList,
        navbarColor,
        path: `${HREF}${path}`,
        title
    };
    if (isAndroid) return oemp.handleRoute(JSON.stringify(message))
    window.webkit.messageHandlers['handleRoute'].postMessage(message)
}

export function nativeBack(optionList, navbarColor, path, title) {
    let message = {
        optionList,
        navbarColor,
        path: `${HREF}${path}`,
        title
    };
    if (isAndroid) return oemp.handleRoute(JSON.stringify(message))
    window.webkit.messageHandlers['handleRoute'].postMessage(message)
}
