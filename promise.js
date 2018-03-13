const PENDING = 0,
      FULFILLED = 1,
      REJECTED = 2;
const isPromise = object => object && object.then && typeof object.then === 'function';
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
                    const successListener = child.successListener[0];
                    const failureListener = child.failureListener[0];
                    result.then(successListener, failureListener);
                    // Object.assign(child, result);
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

new Promise((resolve, reject) => {
    // setTimeout(() => {
        var data = 1;
        console.log(2);
        resolve(data);
    // },0)  
}).then((data) => {
    console.log(data);
    resolve(data);
})
// }).then((data) => {
//     console.log(data + '3');
// })

// const PENDING = 0,
//       FULFILLED =1,
//       REJECTED = 2;
// class Promise {
//     constructor (resolver) {
//         this.status = PENDING;
//         this.onfulfilled;
//         this.onrejected;
//         this.value;
//         resolver((value) => {
//             this.updatestatus(FULFILLED, value);
//         }, (reson) => {
//             this.updatestatus(REJECTED, reson);
//         })
//     }
//     updatestatus(status, data) {
//         if (this.status == PENDING) {
//             setTimeout(() => {
//                 this.status = status;
//                 this.value = (this.status == FULFILLED) ? (this.onfulfilled && this.onfulfilled(data)) : (this.onrejected && this.onrejected(data));
//                 this.onfulfilled = this.onrejected = null;
//             })
//         }
//     }
//     then(onfulfilled, onrejected) {
//         return new Promise((resolve, reject) => {
//             let success = (value) => {
//                 let result = onfulfilled(value) || value;
//                 if (isThenable(result)) {
//                     result.then((value) => {
//                         resolve(value);
//                     }, (value) => {
//                         reject(value);
//                     })
//                 } else {
//                     resolve(result);
//                 }
//             }
//         let error = (value) => {
//             let result = onrejected(value) || value;
//             resolve(result);
//         }
//         switch (this.status) {
//             case PENDING: 
//                 this.onfulfilled = success;
//                 this.onrejected = error;
//                 break;
//             case FULFILLED:
//                 onfulfilled(this.value);
//                 break;
//             case REJECTED:
//                 onrejected(this.reson);
//                 break;
//         }
//     })
//     }
// }
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
