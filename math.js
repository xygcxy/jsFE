// function mathseven () {
//     var i = 0;
//     var arr = [];
//     while(i <= 100) {
//         if (i%7 == 0 || i.toString().indexOf('7') > -1) {
//             arr.push(Number(i));
//         }
//         i++;
//     }
//     console.log(arr);
// }
// mathseven();
function quick(arr, start, end) {
    var mid = start, pivot = arr[start];
    var temp;
    for (var i = start + 1; i <= end; i++) {
        if (arr[i] < pivot) {
            temp = arr[i]
            mid++;
            arr[i] = arr[mid];
            arr[mid] = temp;
        }
    }
    temp = arr[start];
    arr[start] = arr[mid];
    arr[mid] = temp;
    return mid;
}
function quick_sort(arr, start, end) {
    if (start < end) {
        var mid = quick(arr, start, end);
        quick_sort(arr, start, mid-1);
        quick_sort(arr, mid+1, end)
    }
}


function quicksort(arr) {
    if (arr.length <= 1) return arr;
    var index = Math.floor(arr.length/2);
    var indexitem = arr.splice(index, 1)[0],
        left = [],
        right = [];
    arr.forEach(element => {
        if (element < indexitem) {
            left.push(element);
        } else {
            right.push(element);
        }
    });
    var _left = quicksort(left);
    var _right = quicksort(right);
    var result = _left.concat(indexitem, _right);
    console.log(result);
}
// quicksort([4,3,1,6,5,7,8,3,9]);

function quickSort(a) {
    return a.length <= 1 ? a : quickSort(a.slice(1).filter(item => item <= a[0])).concat(a[0], quickSort(a.slice(1).filter(item => item > a[0])));
}

// bind的实现
Function.prototype.bind = function (fn, context) {
    // var _this = this;
    var arg = [].slice.call(arguments, 1);
    return function () {
        fn.apply(context, [].slice.call(arguments).concat(arg));
    }
}


// js链表
function LinkedList () {
    var Node = function(element) {
        this.element = element;
        this.next = null;
    }
}
this.append = function (element) {
    var node = new Node(element),
        current;
    if (head == null) {
        head = node;
    } else {
        current = head;
        while(current.next) {
            current = current.next;
        }
        current.next = node;
    }
    length++
}
this.removeAt = function (position) {
    if(position > -1 && position < length) {
        var current = head,
            previous,
            index = 0;
        if (position == 0) {
            head = current.next
        } else {
            while(index++ < position) {
                previous = current;
                current = current.next
            }
            previous.next = current.next
        }
        length--;
        return current.element;
    } else {
        return null;
    }
}
this.insert = function (position, element) {
    if (position >= 0 && position <= length) {
        var node = new Node(element),
            previous,
            current = head,
            index = 0;
        if (position == 0) {
            node.next = current;
            head = node;
        } else {
            while(index++ < position) {
                previous = current;
                current = current.next;
            }
            node.next = current;
            previous.next = node;
        }
        length++
    }
}

// 双向链表
function DoubleLinkedList () {
    var Node = function(element){
        this.element = element;
        this.next = null;
        this.prev = null;
    }
    var length = 0;
    var head = null;
    var tail = null;
}
this.append = function (element) {
    var node = new Node(element),
        current = head;
    if (head == null) {
        head = node;
        tail = node;
    } else {
        while(current.next) {
            current = current.next
        }
        current.next = node;
        node.prev = current;
        tail = node;
    }
    length++
}
this.insert = function (position, element) {
    var node = new Node(element),
        current = head,
        previous,
        index = 0;
    if (position >= 0 && postion <= length) {
        if (postion == 0) {
            node.next = head;
            head.prev = node;
            head = node;
        } else if (position == length) {
            current = tail;
            current.next = node;
            node.prev = current;
            tail = node;
        } else {
            while(index++ < position) {
                previous = current;
                current = current.next;
            }
            node.next = current;
            previous.next = node;

            current.prev = node;
            node.prev = previous;
        }
    }
}

// [0-9]{4}-(0[1-9]|1[0-2])-()

// (\d)(?=(\d{3})+\.)

var event = {
    client: [],
    listen: function (key, fn) {
        if (!this.client[key]) {
            this.client[key] = [];
        }
        this.client.key.push(fn);
    },
    trigger: function () {
        var key = [].shift.call(arguments),
            fns = this.client[key];
        if(!fns || fns.length == 0) {
            return false;
        }
        for (var i = 0, fn; fn = fns[i++];) {
            fn.apply(this, arguments);
        }
    },
    remove: function(key, fn) {
        var fns = this.client[key];
        if (!fns) return
        for (var i = fns.length - 1, fnn; fnn = fns[i--];) {
            if (fnn == fn) {
                fns.splice(i, 1);
            }
        }
    }
}

