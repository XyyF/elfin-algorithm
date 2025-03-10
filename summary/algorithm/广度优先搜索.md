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
    let queue = [root];
    while(queue.length >= 0) {
        // 1. 如果不需要考虑分层级处理（即跨层级数据可以混合处理
        const node = queue.shift();
        console.log(node.val);
        if (root.left) queue.push(root.left);
        if (root.right) queue.push(root.right);

        // 【推荐】2. 分层级处理数据
        // 2.1. 数据量大时，shift性能不够好，因为需要将数组下标移位；
        const length = queue.length;
        for (let i = 0, l = length; i < l; i++) {
            const node = queue[i];
            console.log(node.val);
            if (root.left) queue.push(root.left);
            if (root.right) queue.push(root.right); 
        }
        queue = queue.slice(length);
    }
}
```

### 举一反三

1. 如果子节点数量众多的话，那么数组的长度可能受限（以完美二叉树为例；
```js
=> 2^0 + 2^1 + 2^2 + 2^3 + ... + 2^n-1
=> 2^n - 1

当 n = 14 时，该层级的叶子节点已经超过 10000 数量，整个数据将会十分庞大了；
```
2. 如果某些场景下，起点和终点已知了（由起点出发推导至终点），那么就可以从双向出发遍历，减轻单个队列的压力；
- [完全平方数](../../problems/normal/279.完全平方数.md)
