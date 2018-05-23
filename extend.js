// Object.defineProperty(ob, 'a', {})

function queryurl() {
    var qs = location.search.length > 0 && location.search.split('#')[0].substring(1) || '';
    var args = {};
    var items = qs.length > 0 && qs.split('&') || [];
    for (var i = 0; i < items.length; i++) {
        var item = items.split('=');
        if (item[0]) {
            args[item[0]] = decodeURIComponent(item[1]);
        }
    }
}

function extend () {
    var src, target, copy, option;
    var i = 0;
    var len = arguments.length;
    target = arguments[i];
    i++;
    for (; i < len; i++) {
        option = arguments[i];
        for (var name in option) {
            scr = target[name];
            copy = option[name];
            if (copy && typeof copy === 'Object') {
                target[name] = extend(src, copy)
            } else if (copy !== undefined) {
                target[name] = copy
            }
        }
    }
    return target
}
var a = {
    c: 'sasasa',
    d: {
        e: 121
    }
}
var b = {
    c: 'dsds',
    d: 1212
}
console.log(extend(a, b))