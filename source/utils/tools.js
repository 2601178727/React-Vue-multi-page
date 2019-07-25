const units = '个十百千万@#%亿^&~';
const chars = '零一二三四五六七八九';
const app = navigator.userAgent;
// iPhone X、iPhone XS
const isIPhoneX = /iphone/gi.test(window.navigator.userAgent) && window.devicePixelRatio && window.devicePixelRatio === 3 && window.screen.width === 375 && window.screen.height === 812;
// iPhone XS Max
const isIPhoneXSMax = /iphone/gi.test(window.navigator.userAgent) && window.devicePixelRatio && window.devicePixelRatio === 3 && window.screen.width === 414 && window.screen.height === 896;
// iPhone XR
const isIPhoneXR = /iphone/gi.test(window.navigator.userAgent) && window.devicePixelRatio && window.devicePixelRatio === 2 && window.screen.width === 414 && window.screen.height === 896;
export const isIOS = !!app.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
export const isAndroid = (/android/gi).test(navigator.appVersion);
export const dictionary = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'G',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z'
]

export const handleArrayView = function (arr, layout) {
    const result = []
    arr.reduce((prec, item, index) => {
        const inx = Math.ceil((index + 1) / layout)
        if (!result[inx - 1]) result[inx - 1] = []
        result[inx - 1].push(item)
    }, [])
    return result
}

function handleNavHeight() {
    if (isAndroid) return buildStyle(44)
    if (isIPhoneX || isIPhoneXSMax || isIPhoneXR) return buildStyle(88)
    return buildStyle(44)
}

export const buildStyle = function (number) {
    const regex = /[0-9]+/
    if (typeof number === 'number') return number / 16 + 'rem'
    if (typeof number === 'string') {
        return number.replace(regex, (result) => {
            return result / 16 + 'rem'
        })
    }
}

export const navHeight = handleNavHeight()

export const numberToChinese = function (number) { // 数字转汉字
    var a = (number + '').split(''),
        s = [];
    if (a.length > 12) {
        throw new Error('too big');
    } else {
        for (var i = 0, j = a.length - 1; i <= j; i++) {
            if (j == 1 || j == 5 || j == 9) { //两位数 处理特殊的 1*
                if (i == 0) {
                    if (a[i] != '1') s.push(chars.charAt(a[i]));
                } else {
                    s.push(chars.charAt(a[i]));
                }
            } else {
                s.push(chars.charAt(a[i]));
            }
            if (i != j) {
                s.push(units.charAt(j - i));
            }
        }
    }
    //return s;
    return s.join('').replace(/零([十百千万亿@#%^&~])/g, function (m, d, b) { //优先处理 零百 零千 等
        b = units.indexOf(d);
        if (b != -1) {
            if (d == '亿') return d;
            if (d == '万') return d;
            if (a[j - b] == '0') return '零'
        }
        return '';
    }).replace(/零+/g, '零').replace(/零([万亿])/g, function (m, b) { // 零百 零千处理后 可能出现 零零相连的 再处理结尾为零的
        return b;
    }).replace(/亿[万千百]/g, '亿').replace(/[零]$/, '').replace(/[@#%^&~]/g, function (m) {
        return {
            '@': '十',
            '#': '百',
            '%': '千',
            '^': '十',
            '&': '百',
            '~': '千'
        } [m];
    }).replace(/([亿万])([一-九])/g, function (m, d, b, c) {
        c = units.indexOf(d);
        if (c != -1) {
            if (a[j - c] == '0') return d + '零' + b
        }
        return m;
    });
}

export const getQueryVariable = function (variable) { // 获取URL参数
    const query = window.location.search.substring(1);
    const vars = query.split("&");
    for (const i = 0; i < vars.length; i++) {
        const pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1];
        }
    }
    return (false);
}

export const postmessage = function (name, message) { // 和ios进行交互
    console.log('调用了postmessage')
    if (isIOS) return window.webkit && window.webkit.messageHandlers[name].postMessage(message)
}

export const isWeiXin = function () { // 判断是否是微信
    const ua = app.toLowerCase();
    return ua.match(/MicroMessenger/i) == "micromessenger";
}

export const handleAlert = function (data) { // 原生弹窗
    const message = typeof data === 'object' ? data : {
        title: '提示',
        content: data
    }
    if (isIOS) return window.webkit && window.webkit.messageHandlers['handleAlert'].postMessage(message)
    if (isAndroid) return oemp && oemp.handleAlert(JSON.stringify(message))
}

// 选择日期
export const handleDatePicker = function (data, isFirst, params) { // 原生弹窗
    return new Promise(function (resolve, reject) {
        if (!isFirst) return resolve(data)
        let list = { // 接受
            name: data,
            type: params.type,
            section: params.section, // 是否是区间
            start: params.start, // 是否是区间开头
            result: '@'
        }
        let cb = `window.app.handleDatePicker(${JSON.stringify(list)})`
        if (params && params.type === 'date') cb = `window.app.handleSetData(${JSON.stringify(list)})`
        const message = { // 发送
            cb
        }
        console.log('message', message)
        if (isIOS) return window.webkit && window.webkit.messageHandlers['handleDatePicker'].postMessage(message)
        if (isAndroid) return oemp && oemp.handleDatePicker(JSON.stringify(message))
    })
}

// 选择时间
export const handleFullDatePicker = function (data, option, isFirst) { // 原生弹窗
    return new Promise(function (resolve, reject) {
        if (!isFirst) return resolve(data)
        let list = {
            result: '@',
            name: data
        }
        const message = {
            title: option.title,
            cb: `window.app.handleFullDatePicker(${JSON.stringify(list)})`
        }
        if (isIOS) return window.webkit && window.webkit.messageHandlers['handleFullDatePicker'].postMessage(message)
        if (isAndroid) return oemp && oemp.handleFullDatePicker(JSON.stringify(message))
    })
}

/**
 *
 * @param {*} data 回调或name
 * @param {*} list 参数传递
 * @param {*} option 配置项 title / content
 * @param {*} isFirst 是否首次调用
 */
export const handleAlertConfirm = function (data, list, option, isFirst) { // 原生弹窗
    return new Promise(function (resolve, reject) {
        if (typeof data === 'object') return resolve(data)
        if (isFirst) {
            list.name = data
            const message = {
                title: option.title,
                content: option.content,
                cb: `window.app.handleAlertConfirm(${JSON.stringify(list)})`
            }
            if (isIOS) return window.webkit && window.webkit.messageHandlers['handleAlertConfirm'].postMessage(message)
            if (isAndroid) return oemp && oemp.handleAlertConfirm(JSON.stringify(message))
        }
    })
}

/**
 *
 * @param {*} data 回调或name
 * @param {*} list 参数传递
 * @param {*} option 配置项 title / content
 * @param {*} isFirst 是否首次调用
 */
export const handleAlertPrompt = function (data, list, option, isFirst) { // 原生弹窗
    return new Promise(function (resolve, reject) {
        if (typeof data === 'object') return resolve(data)
        if (isFirst) {
            list.name = data
            list.result = '@'
            const message = {
                title: option.title,
                placeholder: option.placeholder || '请输入',
                isRequire: typeof option.isRequire === 'undefined' || option.isRequire,
                cb: `window.app.handleAlertPrompt(${JSON.stringify(list)})`
            }
            if (isIOS) return window.webkit && window.webkit.messageHandlers['handleAlertPrompt'].postMessage(message)
            if (isAndroid) return oemp && oemp.handleAlertPrompt(JSON.stringify(message))
        }
    })
}



export const formMakingDatePicker = function (data, title) {
    let list = {
        name: data,
        result: '@'
    }
    const message = {
        title: title,
        cb: `window.app.handleSetData(${JSON.stringify(list)})`
    }
    if (isIOS) return window.webkit && window.webkit.messageHandlers['handleDatePicker'].postMessage(message)
    if (isAndroid) return oemp && oemp.handleDatePicker(JSON.stringify(message))
}
export const formMakingPicker = function (data, option) {
    let list = {
        name: data,
        result: '@'
    }
    const message = {
        title: option.title,
        data: option.data || [],
        cb: `window.app.handleSetData(${JSON.stringify(list)})`
    }
    if (isIOS) return window.webkit && window.webkit.messageHandlers['handlePickerView'].postMessage(message)
    if (isAndroid) return oemp && oemp.handlePickerView(JSON.stringify(message))
}

// 上拉菜单
export const handlePickerView = function (data, option, isFirst) {
    return new Promise(function (resolve, reject) {
        if (typeof data === 'object') return resolve(data)
        if (isFirst) {
            let list = {
                name: data,
                result: '@',
                params: option.params || ''
            }
            const message = {
                title: option.title,
                data: option.data || [],
                cb: `window.app.handlePickerView(${JSON.stringify(list)})`
            }
            console.log(`当前是${isIOS ? 'iOS' : 'Android'} 设备，调用了 handlePickerView`)
            if (isIOS) return window.webkit && window.webkit.messageHandlers['handlePickerView'].postMessage(message)
            if (isAndroid) return oemp && oemp.handlePickerView(JSON.stringify(message))
        }
    })
}

// 上传附件
export const handleUploadFile = function (data, isFirst) {
    return new Promise(function (resolve, reject) {
        if (typeof data === 'object') return resolve(data)
        if (isFirst) {
            let list = {
                name: data,
                result: '@'
            }
            const message = {
                cb: `window.app.handleUploadFile(${JSON.stringify(list)})`
            }
            if (isIOS) return window.webkit && window.webkit.messageHandlers['handleUploadFile'].postMessage(message)
            if (isAndroid) return oemp && oemp.handleUploadFile(JSON.stringify(message))
        }
    })
}

// 选择图片
export const handlePicture = function (data, option, isFirst, params) {
    return new Promise(function (resolve, reject) {
        if (typeof data === 'object') return resolve(data)
        if (isFirst) {
            let list = {
                name: data,
                type: 'picture',
                result: '@'
            }
            if (typeof params !== 'undefined') {
                Object.keys(params).map(item => {
                    list[item] = params[item]
                })
            }
            let cb = `window.app.handlePicture(${JSON.stringify(list)})`
            if (params.isFormMaking) cb = `window.app.handleSetData(${JSON.stringify(list)})` // 如果是表单设计器，改变调用方式
            const message = {
                title: option.title,
                type: option.type,
                cb
            }
            if (isIOS) return window.webkit && window.webkit.messageHandlers['handlePicture'].postMessage(message)
            if (isAndroid) return oemp && oemp.handlePicture(JSON.stringify(message))
        }
    })
}

// 选择人员
export const handlePersonList = function (data, option, isFirst, params) {
    return new Promise(function (resolve, reject) {
        if (typeof data === 'object') return resolve(data)
        if (isFirst) {
            let list = {
                name: data,
                result: '@'
            }
            const type = params && params.type
            let cb = `window.app.handlePersonList(${JSON.stringify(list)})`
            if (type === 'formMaking') cb = `window.app.handleSetData(${JSON.stringify(list)})`
            const message = {
                title: option.title,
                data: option.data || [],
                defaultData: option.defaultData || [],
                type: option.type || 'checkBox',
                cb
            }
            if (isIOS) return window.webkit && window.webkit.messageHandlers['handlePersonList'].postMessage(message)
            if (isAndroid) return oemp && oemp.handlePersonList(JSON.stringify(message))
        }
    })
}

// 下载
export const handleDownload = function (data, option, isFirst) {
    return new Promise(function (resolve, reject) {
        if (typeof data === 'object') return resolve(data)
        if (isFirst) {
            let list = {
                name: data,
                result: '@'
            }
            const message = {
                name: option.name,
                fileList: option.fileList,
                cb: `window.app.handleDownload(${JSON.stringify(list)})`
            }
            if (isIOS) return window.webkit && window.webkit.messageHandlers['handleDownload'].postMessage(message)
            if (isAndroid) return oemp && oemp.handleDownload(JSON.stringify(message))
        }
    })
}

// 预览文件
export const handleViewFile = function (data, option, isFirst) {
    return new Promise(function (resolve, reject) {
        if (typeof data === 'object') return resolve(data)
        if (isFirst) {
            const list = {
                type: '@' // RESOLVE REJECT
            }
            const message = {
                url: option.url,
                cb: `window.app.handleViewFile(${JSON.stringify(list)})`
            }
            if (isIOS) return window.webkit && window.webkit.messageHandlers['handleViewFile'].postMessage(message)
            if (isAndroid) return oemp && oemp.handleViewFile(JSON.stringify(message))
        }
    })
}


// 预览文件
export const handleViewPicture = function (data, option, isFirst) {
    return new Promise(function (resolve, reject) {
        if (typeof data === 'object') return resolve(data)
        if (isFirst) {
            const list = {
                type: '@' // RESOLVE REJECT
            }
            const message = {
                urlList: option.urlList,
                select: option.select,
                cb: `window.app.handleViewPicture(${JSON.stringify(list)})`
            }
            if (isIOS) return window.webkit && window.webkit.messageHandlers['handleViewPicture'].postMessage(message)
            if (isAndroid) return oemp && oemp.handleViewPicture(JSON.stringify(message))
        }
    })
}

// 关联审批
export const handleDictionary = function (data, option, isFirst) {
    return new Promise(function (resolve, reject) {
        if (typeof data === 'object') return resolve(data)
        if (isFirst) {
            const list = {
                name: data,
                result: '@'
            }
            const message = {
                type: option.type, // 类型 接口
                data: option.data, // 默认选择
                cb: `window.app.handleDictionary(${JSON.stringify(list)})`
            }
            if (isIOS) return window.webkit && window.webkit.messageHandlers['handleDictionary'].postMessage(message)
            if (isAndroid) return oemp && oemp.handleDictionary(JSON.stringify(message))
        }
    })
}


// 路由跳转
export const handleRoute = function (option) {
    !option.navbarColor && (option.navbarColor = '#ffffff');
    !option.optionList && (option.optionList = []);
    if (isIOS) return window.webkit && window.webkit.messageHandlers['handleRoute'].postMessage(option)
    if (isAndroid) return oemp && oemp.handleRoute(JSON.stringify(option))
}

// 路由配置
export const handleOption = function (option) {
    if (isIOS) return window.webkit && window.webkit.messageHandlers['handleOption'].postMessage(option)
    if (isAndroid) return oemp && oemp.handleOption(JSON.stringify(option))
}

// 返回
export const handleBack = function (name, option) {
    if (!name) return
    let list = {}
    if(!option) {
        list = {
            number: name + ''
        }
    } else {
        const data = {
            name: name,
            data: option && option.data
        }
        list = {
            number: option && option.number,
            cb: `window.app.getToken(${JSON.stringify(data)})`
        }
    }

    if (isIOS) return window.webkit && window.webkit.messageHandlers['handleBack'].postMessage(list)
    if (isAndroid) return oemp && oemp.handleBack(JSON.stringify(list))
}

export const hiddenNaviBar = function () {
    handleNaviBar({
        hiddenNavBar: true
    })
}

// 编辑navbar
export const handleNaviBar = function (option) {
    if(!option.title) return console.log('缺少标题')
    !option.navbarColor && (option.navbarColor = '#ffffff');
    !option.tintColor && (option.tintColor = '#333333');
    if (isIOS) return window.webkit && window.webkit.messageHandlers['handleNaviBar'].postMessage(option)
    if (isAndroid) return oemp && oemp.handleNaviBar(JSON.stringify(option))
}

// 出栈
export const handleRemoveController = function (option) {
    if (isIOS) return window.webkit && window.webkit.messageHandlers['handleRemoveController'].postMessage(option)
    if (isAndroid) return oemp && oemp.handleRemoveController(JSON.stringify(option))
}
// toast
export const handleToast = function (option) {
    if (isIOS) return window.webkit && window.webkit.messageHandlers['handleToast'].postMessage(option)
    if (isAndroid) return oemp && oemp.handleToast(option)
}

// toast
export const handleNotification = function (option) {
    const list = {
        name: option.name || 'ApprovalNotification',
        perform: option.perform || 'recommit',
        messageModel: option.messageModel || ''
    }
    if (isIOS) return window.webkit && window.webkit.messageHandlers['handleNotification'].postMessage(list)
    if (isAndroid) return oemp && oemp.handleNotification(JSON.stringify(list))
}
// 显示加载框
export const showLoading = function () {
    if (isIOS) return window.webkit && window.webkit.messageHandlers['showLoading'].postMessage('123')
    if (isAndroid) return oemp && oemp.showLoading()
}
// 隐藏加载框
export const dismissLoading = function () {
    if (isIOS) return window.webkit && window.webkit.messageHandlers['dismissLoading'].postMessage('123')
    if (isAndroid) return oemp && oemp.dismissLoading()
}
// 更改小红点状态
export const handleApproved = function () {
    if (isIOS) return window.webkit && window.webkit.messageHandlers['handleApproved'].postMessage('123')
}


/* const tools = {
    isIOS,
    isAndroid,
    dictionary,
    numberToChinese,
    getQueryVariable,
    postmessage,
    isWeiXin,
    handleAlert,
    handleDatePicker,
    handleFullDatePicker,
    handleAlertConfirm,
    handleAlertPrompt,
    handlePickerView,
    handleUploadFile,
    handlePicture,
    handleDownload,
}

export default tools */