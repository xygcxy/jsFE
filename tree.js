function deep(node) {
    //非递归
    let nodes = [];
    if (node != null) {
        let stack = [];
        stack.push(node);
        while (stack.length > 0) {
            let item = stack.pop();
            nodes.push(item)
            let children = item.children;
            for (let i = children.length - 1; i >= 0; i--) {
                stack.push(children[i])
            }
        }
    }
    return nodes
    //递归
    let nodes = []
    if (node != null) {
        nodes.push(node)
        let children = node.children;
        for (let i = 0; i < children.length; i++) {
            deep(children[i])
        }
    }
    return nodes
}

function wide(node) {
    //递归
    let nodes = [], i = 0;
    if (node != null) {
        nodes.push(node);
        wide(node.nextElementSlibing)
        node = node[i++]
        wide(node.firstElementChild)
    }
    return nodes
    //非递归
    let nodes = [], i = 0;
    while (node !== null) {
        nodes.push(node)
        node = node[i++]
        let children = node.children;
        for (let i = 0; i < children.length; i++) {
            nodes.push(children[i])
        }
    }
    return nodes
}