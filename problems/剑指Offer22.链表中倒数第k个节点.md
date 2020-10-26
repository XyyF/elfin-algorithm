## 剑指 Offer 22. 链表中倒数第k个节点

> 输入一个链表，输出该链表中倒数第k个节点。为了符合大多数人的习惯，本题从1开始计数，即链表的尾节点是倒数第1个节点。例如，一个链表有6个节点，从头节点开始，它们的值依次是1、2、3、4、5、6。这个链表的倒数第3个节点是值为4的节点。

```js
给定一个链表: 1->2->3->4->5, 和 k = 2.

返回链表 4->5.
```

### 推导
使用双指针节点，让快指针优先跑，慢指针再同步

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
 * @param {number} k
 * @return {ListNode}
 */
var getKthFromEnd = function(head, k) {
    let fast = head;
    let slow = head;
    // 快指针优先跑k步
    for(let i = 0; i < k; i++){
        fast = fast.next;
    }
    
    while(fast){
        slow = slow.next;
        fast = fast.next;
    }
    return slow;
};
```

### 关联
[19.删除链表的倒数第N个节点](https://github.com/XyyF/elfin-algorithm/blob/master/problems/19.删除链表的倒数第N个节点.md)
