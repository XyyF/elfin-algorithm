## DFS 深度优先搜索

`深度优先搜索`（DFS）是用于 在`树/图中遍历/搜索` 的另一种重要算法。了解[`栈`](./../../dataStructure/stack/index.md)能更好的帮助理解，深度遍历再回溯的特性和栈LIFO的特性十分贴合。

### 场景

针对树形结构场景，优先进行深度优先遍历，再不断回溯状态，直至遍历完整棵树，整个过程就是不断的`递归`
![](https://tva1.sinaimg.cn/large/007S8ZIlgy1ghzn9zywbtj31kl0u0dki.jpg)

### 缺点
如果递归的深度太高，你将遭受堆栈溢出。

### 递归
在进行递归的时候，我们并没有显式的使用栈，而是使用语言提供的隐式栈。
```java
/*
 * Return true if there is a path from cur to target.
 */
boolean DFS(Node cur, Node target, Set<Node> visited) {
    return true if cur is target;
    for (next : each neighbor of cur) {
        if (next is not in visited) {
            add next to visted;
            return true if DFS(next, target, visited) == true;
        }
    }
    return false;
}
```

### 代码实现
```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function(nums) {
    let max = 0
    let maxDeep = nums.length
    dfs([], 0)
    return max

    function dfs(temp, deep) {
        if (deep > maxDeep) return

        const cur = temp.length
        if (cur > max) max = cur
        // 核心思路：当满足某些条件时，可以更加深层次的遍历
        if (nums[deep] > temp[cur - 1] || cur === 0) {
            // 添加状态
            temp.push(nums[deep])
            dfs(temp, deep + 1)
            // 回溯状态
            temp.pop()
        }

        dfs(temp, deep + 1)
    }
};
```

### 优化

## BFS 广度优先搜索

`广度优先搜索`（BFS）是用于 在`树/图中遍历/搜索` 的另一种重要算法。了解[`队列`](./../../dataStructure/queue/index.md)能更好的帮助理解，广度遍历的特性和队列FIFO的特性十分贴合。

### 场景

使用队列的数据结构，越靠近根节点的数据越先处理，不同于DFS，递归过程中，栈是隐式存在的，在BFS中，队列的数据结构是需要显式创建的；
