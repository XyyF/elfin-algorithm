## 链表
链表属于线性表数据结构，是一组节点的集合，相对数组这些节点不是连续的内存空间，通过 `指针` 将零散的内存空间串联起来，除了对数据的随机下标访问外，链表可以用在任何一维数组的场景中

> 在JavaScript中，指针指向的是 节点的堆内存地址

五花八门的种类：单向链表、双向链表、循环链表、etc.

### 单向链表
链表中每个节点存储着内存块地址，同时还通过 `后继指针next` 存储着下一个节点的内存块地址

```js
// 单向链表节点结构
{
    element: 内存块数据,
    next: 指向下一个链表节点,
}
```

![](https://tva1.sinaimg.cn/large/007S8ZIlgy1gitn0mny4mj30vq0b3aa9.jpg)

从图中可以发现有两个节点是比较特殊的:
- 头节点：链表中第一个节点，记录着链表的基地址
- 尾节点：链表中最后一个节点，后继指针指向 null

### 循环链表
特殊的单向链表，尾节点的后继指针next不是指向null，而是指向首节点的内存块地址，这种首尾链接的结构

应用场景：具有环形数据结构特点时

![](https://tva1.sinaimg.cn/large/007S8ZIlgy1gitsw4cm56j30vq0b3mxb.jpg)

### 双向链表
相较于单向链表，他支持两个方向，存在 `前驱指针prev` 存储着上一个节点的内存块地址，增加了内存消耗，但是相对单向链表更加高效

```js
// 单向链表节点结构
{
    prev: 指向上一个链表节点,
    element: 内存块数据,
    next: 指向下一个链表节点,
}
```

![](https://tva1.sinaimg.cn/large/007S8ZIlgy1gittc2w2mvj30vq0b3jrm.jpg)

### 双向循环链表
同循环链表


## 链表的设计
> 利用 `哨兵节点` 来解决边界问题

在链表中，可以利用 `head指针` `tail指针` 来作为哨兵节点，不参与业务处理
- 可以指定链表的基节点，作为入口查找节点
- 为了在处理边界的时候，哨兵节点用以占位的作用，就不用额外处理边界的判断(特别是当链表容量过大的场景

  ```js
  // 针对空链表，新增一个节点
  // [无哨兵节点] 需要单独的逻辑额外判断，这样，每个节点都会执行判断，当链表过大时的效率是极低的
  if (head === null) head = newNode;
  newNode.next = head.next;
  head.next = newNode;
  // [有哨兵节点] 跟链表节点的逻辑一致
  newNode.next = head.next;
  head.next = newNode;

  // 删除链表中的最后一个节点
  // [无哨兵节点]
  if (node.next === null) node = null;
  node.next = node.next.next;
  // [有哨兵节点]
  node.next = node.next.next;
  ```

### Node类
因为链表中的节点除了本身数据外，还存在前驱、后驱指针属性，所以需要单独封装

Node类作为链表中的节点，提供节点的属性
```js
function Node(element) {
    // 节点的数据
    this.element = element
    // 节点的后驱指针
    this.next = null
    // 节点的前驱指针 [双向链表使用]
    this.prev = null
}
```

### LList类
LList类作为链表中的容器，提供一系列的链表方法，和哨兵节点
```js
function LList() {
    const head = Symbol('head')
    this.head = new Node(head)
    this.push = function() {}
    this.pop = function() {}
    this.shift = function() {}
    this.unshift = function() {}
    this.reverse = function() {}
    this.display = function() {}
    // ...
}
```

[链表具体实现地址](https://github.com/XyyF/elfin-dataStructure/blob/master/src/linked-list/index.ts)

### 高效的后驱增删节点
前提：在某个已知的节点后，增删节点

因为不需要考虑内存的连续性，我们只需要将改变 节点前后的后继指针next 的指向即可
```js
// 已知节点p，在之后 新增 节点x
// p节点 -> q节点
// p节点 -> x节点 -> q节点
x.next = p.next
p.next = x

// 在节点p后 删除 节点x
// p节点 -> x节点 -> q节点
// p节点 -> q节点
p.next = p.next.next
```
> 在新增节点时，一定要注意顺序，应该优先将节点x.next指向节点q
>
> 这是因为，已知节点p，如果要拿到节点q，只能通过p.next，那么就应该优先将节点q的相关指针处理好

![](https://tva1.sinaimg.cn/large/007S8ZIlgy1gitnkxmtoaj30vq0i274p.jpg)

### 高效的前驱增删
前提：在某个已知的节点前，增删节点
```js
// 已知节点q，在之前 新增 节点x
// p节点 <-> q节点
// p节点 <-> x节点 <-> q节点
x.prev = q.prev
q.prev.next = x
x.next = q
q.prev = x


// 在节点q前 删除 节点x
// p节点 <-> x节点 <-> q节点
// p节点 <-> q节点
q.prev.prev.next = q
q.prev = q.prev.prev
```
> 同理，在新增节点时，一定要注意顺序，已知节点q，如果要拿到节点p，只能通过q.prev，那么就应该优先将节点p的相关指针处理好

### 低效的访问节点
因为不是连续的内存空间，如果要通过顺序(下标)访问某个节点，那么就需要从基地址向后遍历找到相应节点

## 链表小技巧

### Dummy node 假节点
如果没有占位首节点，有时候对链表进行遍历的时候，为了保证逻辑的一致性，可以手动添加一个占位首节点
> 适用于大部分场景
```js
function(head) {
    const dummy = new ListNode()
    dummy.next = head
}
```
- [203.移除链表元素](https://leetcode-cn.com/problems/remove-linked-list-elements/)
- [237.删除链表中的节点](https://leetcode-cn.com/problems/delete-node-in-a-linked-list/)
- [剑指Offer18.删除链表的节点](https://github.com/XyyF/elfin-algorithm/blob/master/problems/剑指Offer18.删除链表的节点.md)
- [83.删除排序链表中的重复元素](https://leetcode-cn.com/problems/remove-duplicates-from-sorted-list/)
- [82.删除排序链表中的重复元素 II](https://leetcode-cn.com/problems/remove-duplicates-from-sorted-list-ii/)

### 快慢指针
在单链表中，使用两个指针来遍历，一个fast指针，一个slow指针，在遍历链表的同时：
- 反转链表
- 判断是否有环
- 找到链表中点，将链表分割为两个链表
- [61.旋转链表](https://leetcode-cn.com/problems/rotate-list/)
- [86.分隔链表](https://leetcode-cn.com/problems/partition-list/)
- [92.反转链表II](https://leetcode-cn.com/problems/reverse-linked-list-ii/)
- [141.环形链表](https://leetcode-cn.com/problems/linked-list-cycle/)
- [142.环形链表II](https://leetcode-cn.com/problems/linked-list-cycle-ii/)
- [160.相交链表](https://leetcode-cn.com/problems/intersection-of-two-linked-lists/)
- [206.反转链表](https://leetcode-cn.com/problems/reverse-linked-list/)
- [234.回文链表](https://leetcode-cn.com/problems/palindrome-linked-list/)
- [328.奇偶链表](https://leetcode-cn.com/problems/odd-even-linked-list/)
- [876.链表的中间结点](https://leetcode-cn.com/problems/middle-of-the-linked-list/)
- [1721.交换链表中的节点](https://leetcode-cn.com/problems/swapping-nodes-in-a-linked-list/)
- [剑指Offer06.从尾到头打印链表](https://leetcode-cn.com/problems/cong-wei-dao-tou-da-yin-lian-biao-lcof/)
- [剑指Offer22.链表中倒数第k个节点](https://leetcode-cn.com/problems/lian-biao-zhong-dao-shu-di-kge-jie-dian-lcof/)
- [剑指Offer24.反转链表](https://leetcode-cn.com/problems/fan-zhuan-lian-biao-lcof/)
- [剑指Offer52.两个链表的第一个公共节点](https://leetcode-cn.com/problems/liang-ge-lian-biao-de-di-yi-ge-gong-gong-jie-dian-lcof/)
- [面试题02.04.分割链表](https://leetcode-cn.com/problems/partition-list-lcci/)
- [面试题02.06.回文链表](https://leetcode-cn.com/problems/palindrome-linked-list-lcci/)
- [面试题02.07.链表相交](https://leetcode-cn.com/problems/intersection-of-two-linked-lists-lcci/)

### 多链表合并
运用动态规划的思路，两两依次合并链表（一个链表也可以拆分为两个链表）

- [21.合并两个有序链表](https://leetcode-cn.com/problems/merge-two-sorted-lists/)
- [23.合并K个升序链表](https://leetcode-cn.com/problems/merge-k-sorted-lists/)
- [143.重排链表](https://leetcode-cn.com/problems/reorder-list/)
- [148.排序链表](https://leetcode-cn.com/problems/sort-list/)
- [1669.合并两个链表](https://leetcode-cn.com/problems/merge-in-between-linked-lists/)
- [剑指Offer25.合并两个排序的链表](https://leetcode-cn.com/problems/he-bing-liang-ge-pai-xu-de-lian-biao-lcof/)

### 链表排序
最适合链表的排序方式：[归并排序](../../algorithm/排序/归并排序.md)
[插入排序](https://leetcode-cn.com/problems/insertion-sort-list/solution/)

### 其他
- [382.链表随机节点](https://leetcode-cn.com/problems/linked-list-random-node/)
- [725.分隔链表](https://leetcode-cn.com/problems/split-linked-list-in-parts/)
- [剑指Offer35.复杂链表的复制](https://leetcode-cn.com/problems/fu-za-lian-biao-de-fu-zhi-lcof/)
- [面试题02.05.链表求和](https://leetcode-cn.com/problems/sum-lists-lcci/)