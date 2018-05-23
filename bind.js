function bind(context) {
    var self = this;
    var args = [].slice.call(arguments, 1);
    var fnull = function () {};
    var fBond = function () {
        return self.apply(this instanceof fnull ? this : context, args.concat(Array.from(arguments)));
    }
    fnull.prototype = this.prototype;
    fBond.prototype = new fnull();
    return fBond;
}

function call(o) {
    o.self = this;
    var args = [];
    for (var i = 1; i < arguments.length; i++) {
        args.push('arguments[' + i +']');
    }
    eval('o.self('+ args + ')');
    delete o[self];
}

function reduce(a, f, inital) {
    var i = 0, len = a.length, accum;
    if (arguments.length > 2) {
        accum = inital;
    } else {
        if (len == 0) throw TypeError();
        while (i < len) {
            if (i in a) {
                accum = a[i++];
                break;
            } else { 
                i++;
            }
        }
        if (i == len) throw TypeError();
    }
    while (i < len) {
        if (i in a) {
            accum = f.call(null, accum, a[i], i, a);
        }
        i++;
    }
    return accum;
}

function trim(str) {
    return str.replace(/^\s+|\s+$/, '');
}

reduce([1,2], function(a,b) {return a+b})