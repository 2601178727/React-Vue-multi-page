// import { isIOS} from '@/utils/tools'
import moment from 'moment'
class MyDate{
    constructor() {
        this.date = new Date()
        this.minute = 1000
        this.hour = 1000 * 3600
        this.day = 1000 * 3600 * 24
    }
    string2date(str) { // str 转时间格式
        return new Date(str)
    }
    getTime(date) { // 获取毫秒数
        if(!date instanceof Date) return
        return date.getTime()
    }
    handleSpacing(start, end, type = 'day') {
        /* const first = this.getTime(this.string2date(start))
        const second = this.getTime(this.string2date(end))
        return (second - first) / this[type] */
        const first = moment(start)
        const second = moment(end)
        return second.diff(first, type)
        
        // return this.string2date(start)
        // return second
        // return this[type]
    }
    setDate(time) { // 设置时间
        this.date = new Date(time)
    }
    format(format = 'yyyy-MM-dd hh:mm') { // yyyy-MM-dd hh:mm:ss
        var date = {
            "M+": this.date.getMonth() + 1,
            "d+": this.date.getDate(),
            "h+": this.date.getHours(),
            "m+": this.date.getMinutes(),
            "s+": this.date.getSeconds(),
            "q+": Math.floor((this.date.getMonth() + 3) / 3),
            "S+": this.date.getMilliseconds()
        };
        if (/(y+)/i.test(format)) {
            format = format.replace(RegExp.$1, (this.date.getFullYear() + '').substr(4 - RegExp.$1.length));
        }
        for (var k in date) {
            if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length == 1 ?
                    date[k] : ("00" + date[k]).substr(("" + date[k]).length));
            }
        }
        return format;
    }
}

const myDate = new MyDate()
export default myDate