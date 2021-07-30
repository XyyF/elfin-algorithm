## [剑指 Offer 35. 复杂链表的复制](https://leetcode-cn.com/problems/fu-za-lian-biao-de-fu-zhi-lcof/)

[讨论](https://leetcode-cn.com/problems/fu-za-lian-biao-de-fu-zhi-lcof/comments/) | [题解](https://leetcode-cn.com/problems/fu-za-lian-biao-de-fu-zhi-lcof/solution/)

Tags: 链表
Subtags: 深拷贝

> 请实现 copyRandomList 函数，复制一个复杂链表。在复杂链表中，每个节点除了有一个 next 指针指向下一个节点，还有一个 random 指针指向链表中的任意节点或者 null。

![](https://rengar-1253859411.cos.ap-chengdu.myqcloud.com/img/20201201201853.png)
```js
输入：head = [[7,null],[13,0],[11,4],[10,2],[1,0]]
输出：[[7,null],[13,0],[11,4],[10,2],[1,0]]
```

![](https://rengar-1253859411.cos.ap-chengdu.myqcloud.com/img/e2.png)
```js
输入：head = [[1,1],[2,1]]
输出：[[1,1],[2,1]]
```

![](https://rengar-1253859411.cos.ap-chengdu.myqcloud.com/img/20201201203455.png)
```js
输入：head = [[3,null],[3,0],[3,null]]
输出：[[3,null],[3,0],[3,null]]
```

```js
输入：head = []
输出：[]
解释：给定的链表为空（空指针），因此返回 null。
```

限制:
- -10000 <= Node.val <= 10000
- Node.random 为空（null）或指向链表中的节点。
- 节点数目不超过 1000 。

### 推导

#### 思路1: 原地复制

1. 遍历链表，将每个节点的拷贝插入在其之后
```js
1    ->    2    ->    3    ->    4
1 -> 1c -> 2 -> 2c -> 3 -> 3c -> 4 -> 4c
```

2. 确定拷贝节点的random值
```js
copynode.random = node.random.next
```

3. 为了不改变原链表，对链表进行拆解，将拷贝节点拆分出来
```js
1 -> 1c -> 2 -> 2c -> 3 -> 3c -> 4 -> 4c

1 -> 2 -> 3 -> 4
1c -> 2c -> 3c -> 4c
```

#### 思路2: hash表

1. 遍历链表存储 {node: copynode} 的hash表数据

2. 遍历链表确定拷贝节点的random

### 题解
```js
/**
 * // Definition for a Node.
 * function Node(val, next, random) {
 *    this.val = val;
 *    this.next = next;
 *    this.random = random;
 * };
 */

/**
 * @param {Node} head
 * @return {Node}
 */
var copyRandomList = function(head) {
    let current = head;
    // const dummy = new Node();
    // dummy.next = head;

    // 添加镜像节点
    while (current) {
        const nextNode = current.next;
        current.next = new Node(current.val, nextNode, null);
        current = nextNode;
    }

    current = head;
    // 确认random指向
    while (current && current.next) {
        if (current.random) {
            current.next.random = current.random.next;
        }
        current = current.next.next;
    }

    current = head && head.next;
    const copyHead = head && head.next;
    // 拆分原节点 + 拷贝节点
    while (head && head.next) {
        const copyNode = current.next && current.next.next;
        const originNode = head.next.next;
        
        head.next = originNode;
        current.next = copyNode;


        current = copyNode;
        head = originNode;
    }

    return copyHead;
};
```
