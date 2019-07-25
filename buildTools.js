var glob = require('glob');

// 根据项目具体需求，输出正确的 js 和 html 路径
const getEntry = function (globPath) {
    var entries = {},
        pathname;

    glob.sync(globPath).forEach(function (entry) {
        // basename = path.basename(entry, path.extname(entry));
        pathname = entry.split('/').splice(-3, 2).join('/'); // 正确输出 js 和 html 的路径
        entries[pathname] = entry;
    });
    return entries;
}

// var a = getEntry('./source/**/index.{jsx, js}')
var a = getEntry('./source/**/index.?(jsx|js)')
// var a = getEntry('./source/**/index.*')
console.log(a)

module.exports = getEntry
