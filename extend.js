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