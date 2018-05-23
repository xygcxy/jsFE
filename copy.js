//数组
var arr = [];
var newarr = [].concat(arr);

//对象
function deepcopy(obj, newobj) {
    var newobj = newobj || {};
    for (var i in obj) {
        if (obj[i] instanceof Object){
            newobj[i] = (obj[i].constructor === 'Array') ? [] : {};
            deepcopy(obj[i], newobj[i]);
        } else {
            newobj[i] = obj[i];
        }
    }
    return newobj;
}

function deepcopy(obj) {
    if (typeof obj !== 'Object') return;
    var newobj = obj instanceof Array ? [] : {};
    for (var i in obj) {
        if (obj.hasOwnProperty(i)) {
            newobj[i] = typeof obj[i] === 'Object' ? deepcopy(obj[i]) : obj[i];
        }
    }
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

function shuffle(arr) {
    let newarr = [];
    while(arr.length > 0) {
        let i = Math.floor(Math.random() * arr.length);
        newarr.push(arr[i]);
        arr.splice(i, 1);
    }


    //function 2
    let k = arr.length, temp;
    while (k > 1) {
        let j = Math.floor(Math.random() * k);
        k--;
        if (k !== j) {
            temp = arr[k];
            arr[k] = arr[j];
            arr[j] = temp;
        }
    }
}

console.log({}.a);
var a = {};
console.log([] == ![]);
console.log('1231321321.321321'.replace(/\B(?=(\d{3})+\.)/g, ','));
var c = {a:1,b:2};
console.log(Object.keys(c).map((item) => {
    return (item + '=' + c[item])
}).join('&'))
