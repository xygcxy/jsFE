const statusProvider = (promise, status) => data => {
    if (promise.status !== PENDING) return false;
    promise.status = status;
    promise.result = data;
    switch (status) {
        case FULFILLED: return promise.successListener.foreach(fn => fn(data));
        case REJECTED: return promise.failureListener.foreach(fn => fn(data));
    }
}

const noop = () => {};

class Promise {
    constructor (executor) {
        this.status = PENDING;
        this.result = undefined;
        this.successListener = [];
        this.failureListener = [];
        executor( statusProvider(this, FULFILLED), statusProvider(this, REJECTED))
    }

    then (...args) {
        const child = new this.constructor(noop);

        const handle = fn => data => {
            if (typeof fn === 'function') {
                const result = fn(data);
                if (isPromise(result)){
                    Object.assign(child, result);
                } else {
                    statusProvider(child, FULFILLED)(result);
                }
            } else if (!fn) {
                statusProvider(child, this.status)(data)
            }
        }
        switch(this.status) {
            case PENDING: {
                this.successListener.push(args[0]);
                this.failureListener.push(args[1]);
                break;
            }
            case FULFILLED: {
                args[0](this.result);
                break;
            }
            case REJECTED: {
                args[1](this.result);
            }
        }
    }

    catch (arg) {
        return this.then(undefined, arg);
    }
}

// function resolveProvider (promise, data) {
//     if (promise.status !== PENDING) return false;
//     promise.status = FULFILLED;
// }

// function rejectProvider (promise, err) {
//     if (promise.status !== PENDING) return false;
//     promise.status = FULFILLED;
// }