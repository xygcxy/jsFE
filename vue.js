var Vue = function () {}
vm._events = Object.create(null);
Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
        for (let i = 0; i < event.length; i++) {
            this.$on(event[i], fn);
        }
    } else {
        (vm._events[event] || (vm._events[event] = [])).push(fn)
    }
    return vm;
}
Vue.prototype.$once = function(event, fn) {
    var vm = this;
    function on() {
        vm.$off(event, on);
        fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm;
}
Vue.prototype.$off = function (event, fn) {
    const vm = this;
    if (!arguments.length) {
        vm._events = Object.create(null);
        return vm;
    }
    if (Array.isArray(event)) {
        for (var i = 0; i < event.length; i++) {
            this.$off(event[i], fn);
        }
        return vm;
    }
    const cbs = vm._events[event];
    if (!cbs) return vm;
    if (arguments.length == 1) {
        vm._events[event] = null;
        return vm;
    }
    let cb;
    let i = cbs.length;
    while(i--) {
        cb = cbs[i];
        if (cb === fn || cb.fn === fn) {
            cbs.splice(i, 1);
            break;
        }
    }
    return vm;
}
Vue.prototype.$emit = function (event) {
    const vm = this;
    let cbs = vm._events[event];
    if (cbs) {
        cbs = cbs.length > 1 && toArray(cbs) || cbs;
        const args = [].slice(arguments, 1);
        for(let i = 0, j = cbs.length; i < j; i++) {
            cbs[i].apply(vm, args);
        }
    }
    return vm;
}

function observer(value, cb) {
    Object.keys(value).forEach(key => {
        defineReactive(value, key, value[key], cb)
    })
}
function defineReactive(obj, key, val, cb) {
    Object.defineProperties(obj, key, {
        get: () => {

        },
        set: newVal => {
            cb();
        }
    })
}

class Dep {
    constructor () {
        this.deps = []
    }
    depend () {
        if (Dep.target && this.deps.indexOf(Dep.target) === -1) {
            this.deps.push(Dep.target);
        }
    }
    notify () {
        this.deps.forEach((dep) => {
            dep()
        })
    }
}
Dep.target = null;

class Observable {
    constructor (obj) {
        return this.walk(obj)
    }
    walk(obj) {
        Object.keys(obj).forEach((key) => {
            this.defineReactive(obj, key, obj[key])
        })
        return obj;
    }
    defineReactive(obj, key, val) {
        const dep = new Dep();
        Object.defineProperty(obj, key, {
            get () {
                dep.depend();
                return val;
            },
            set (newVal) {
                val = newVal;
                dep.notify();
            }
        })
    }
}

class Watcher {
    constructor(obj, key, cb, onComputedUpdate) {
        this.obj = obj;
        this.key = key;
        this.cb = cb;
        this.onComputedUpdate = onComputedUpdate;
        return this.defineComputed();
    }
    defineComputed () {
        const self = this;
        const onDepUpdated = () => {
            const val = self.cb();
            this.onComputedUpdate(val);
        }
        Object.defineProperty(obj, key, {
            get () {
                Dep.target = onDepUpdated;
                const val = self.cb();
                Dep.target = null;
                return val;
            },
            set () {
                console.error('');
            }
        })
    }
    
}