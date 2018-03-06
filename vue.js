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