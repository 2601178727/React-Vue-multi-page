import {
  isAndroid,
  isIOS
} from '../utils/tools'
import {
  HREF
} from '@/config/config'

class Router {
  constructor() {
    this.path = ''
    this.title = ''
    this.optionList = []
    this.navbarColor = '#ffffff'
    this.params = {}
    this.hiddenNavBar = false
  }
  init() {
    this.path = ''
    this.title = ''
    this.optionList = []
    this.params = {}
  }
  buildPath(path) {
    return `${HREF}${path}`
  }
  /**
   * 
   * @param {*} data path and title is require
   * @param {*} route Boolean true => 自执行route
   */
  setData(data, route = true) {
    if (!data) throw new Error('can not find arguments')
    if (!data instanceof Object) throw new Error('params should be Object')
    if (!data.path) throw new Error('path is require')
    if (!data.title) throw new Error('title is require')
    this.path = this.buildPath(data.path)
    console.log(this.path, 'path')
    this.title = data.title
    this.hiddenNavBar = data.hiddenNavBar
    data.navbarColor && (this.navbarColor = data.navbarColor);
    data.optionList && (this.optionList = data.optionList);
    data.params && (this.params = data.params);
    if (route) this.route()
  }
  route() {
    if (!this.path) throw new Error('path is undefined')
    if (!this.title) throw new Error('title is undefined')
    const config = {
      path: this.path,
      title: this.title,
      navbarColor: this.navbarColor,
      optionList: this.optionList,
      params: this.params,
      hiddenNavBar: this.hiddenNavBar
    }
    console.log(config, 123)
    if (isAndroid) return onemptied.handleRoute(JSON.stringify(config))
    if (isIOS) return window.webkit.messageHandlers['handleRoute'].postMessage(config)
  }
}

const router = new Router()
export default router
