# 归并排序 Merge Sort

归并排序的实现方式为 【递归】，是通过划分子问题，再合并子问题的形式;

!! 以下案例均以链表为示例 !!

```js
排序串: 6 5 4 3 2 1
step=1: (6 5 4) (3 2 1)
step=2: (6 5) (4) (3 2) (1)
step=3: (6) (5) (4) (3) (2) (1)
step=4: (5 6) (3 4) (1 2)
step=5: (3 4 5 6) (1 2)
step=6: (1 2 3 4 5 6)
```

## 子问题: 找到中间节点

通过快慢指针的形式，可以找到中间节点

```js
function findMiddleNode(head) {
  let slow = head, fast = head && head.next;

  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }

  return slow;
}
```

## 子问题：合并两个有序链表

> 如何保证最初的两个链表是有序的？
> 
> 因为在递归拆分子问题的过程中，最终的结果就是 单个节点，这本身就是有序的

依次递推遍历，小技巧是在一个链表遍历完成后，另一个不用继续遍历，直接续接即可，因为都是有序的

```js
function merge(l1, l2) {
  const dummy = new ListNode();
  let current = dummy;

  while (l1 && l2) {
    if (l1.val < l2.val) {
      current.next = l1;
      l1 = l1.next;
    } else {
      current.next = l2;
      l2 = l2.next;
    }
    current = current.next;
  }

  current.next = l1 || l2;

  return dummy.next;
}
```

# 代码实现
```js
function sortList(head) {
  if (!head || !head.next) return head;

  const midNode = findMiddleNode(head);
  const nextNode = midNode.next;
  midNode.next = null;

  return merge(
    sortList(head),
    sortList(nextNode),
  );
}
```