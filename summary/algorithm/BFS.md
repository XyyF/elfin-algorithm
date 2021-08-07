## BFS 广度优先搜索

`广度优先搜索`（BFS）是用于 在`树/图中遍历/搜索` 的另一种重要算法。了解[`队列`](./../../dataStructure/queue/index.md)能更好的帮助理解，广度遍历的特性和队列FIFO的特性十分贴合。

### 场景

使用队列的数据结构，越靠近根节点的数据越先处理；

不用于DFS:
1. DFS，递归过程中，栈是隐式存在的，在BFS中，队列的数据结构是需要显式创建的
2. BFS可以采用双向遍历，减轻内存压力；

### 伪代码
通过一个队列，在while循环中直到队列为空，代表遍历完成（以二叉树为例；

场景：
1. 注意根节点为空的处理（循环过程中不会考虑；
2. 是否分层级处理数据（一般是否需要层级相关的数据，如何层级累加和；
```js
function traverse(root) {
    if (root === null) return;
    const queue = [root];
    while(queue.length >= 0) {
        // 1. 如果不需要考虑分层级处理（即跨层级数据可以混合处理
        const node = queue.shift();
        console.log(node.val);
        if (root.left) queue.push(root.left);
        if (root.right) queue.push(root.right);

        // 2. 分层级处理数据
        for (let i = 0, l = queue.length; i < l; i++) {
            const node = queue.shift();
            console.log(node.val);
            if (root.left) queue.push(root.left);
            if (root.right) queue.push(root.right); 
        }
    }
}
```