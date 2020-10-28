## 剑指Offer. 24 反转链表

> 定义一个函数，输入一个链表的头节点，反转该链表并输出反转后链表的头节点。

```js
输入: 1->2->3->4->5->NULL
输出: 5->4->3->2->1->NULL
```

限制:
```js
0 <= 节点个数 <= 5000
```

### 推导
通过双指针变量，保存遍历链表过程中的 前一节点、当前节点，从而完成节点后驱指针引用的改变

### 题解
```js
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
    // 初始化
    let prev = null;
    let current = head;
    // 循环
    while(current !== null) {
        const nextNode = current.next;
        current.next = prev;
        prev = current;
        current = nextNode;
    }

    return prev;
};
```

[链表反转深入](https://github.com/XyyF/elfin-algorithm/blob/master/dataStructure/%E9%93%BE%E8%A1%A8/%E5%8F%8D%E8%BD%AC%E9%93%BE%E8%A1%A8.md)

### 相同题目
[206.反转链表](https://leetcode-cn.com/problems/reverse-linked-list/submissions/)