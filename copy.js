//数组
var arr = [];
var newarr = [].concat(arr);

//对象
function deepcopy(obj, newobj) {
    var newobj = newobj || {};
    for (var i in obj) {
        if (obj[i].instanceOf(object)){
            newobj[i] = (obj[i].constructor === 'Array') ? [] : {};
            deepcopy(obj[i], newobj[i]);
        } else {
            newobj[i] = obj[i];
        }
    }
    return newobj;
}

function lowcopy (o, c) {
    var c = c || {};
    for (var i in o) {
        c[i] = o[i];
    }
    return c;
}

Object.defineProperty(Object, 'is', {
    value: function (x, y) {
        if (x === y) {
            return x !== 0 || 1 / x === 1 / y;
        }
        return x !== x && y !== y;
    }
})

console.log({}.a);
var a = {};
console.log([] == ![]);