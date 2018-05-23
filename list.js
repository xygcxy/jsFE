// 单向链表
function LinkedList() {
    let Node = function(element) {
        this.element = element;
        this.next = null;
    }
    let length = 0;
    let head = null;
    this.append = function(element) {
        let node = new Node(element), 
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
        length++;
    }
    this.insert = function(position, element) {
        var node = new Node(element),
            current = head,
            previous,
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

    }
    this.remove = function(position) {
        if (position > -1 && position < length) {
            let current = head,
                previous,
                index = 0
            if (position === 0) {
                head = current.next
            } else {
                while(index++ < position) {
                    previous = current;
                    current = current.next
                }
                previous.next = current.next
            }
            length--;
        }
    }
    this.reverse = function(node) {
        var head = node.head;
        var p, q, r;
        p = head;
        q = p.next;
        head.next = null;
        while(q) {
            r = q.next;
            q.next = p;
            p = q;
            q = r;
        }
    }
    this.getKnode = function(k) {
        var p = head;
        var q = head;
        for (var i = 0; i < k; i++) {
            q = q.next;
            if (null == q) break;
        }
        while(q) {
            q = q.next;
            p = p.next
        }
        return p;
    }
}
// 双向链表
function DoubleList() {
    var Node = function(element) {
        this.element = element;
        this.prev = null;
        this.next = null;
    }
    this.length = 0;
    this.head = null;
    this.tail = null;
}