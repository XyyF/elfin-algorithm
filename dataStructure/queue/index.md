## 队列

`FIFO`（first in, first out）型数据结构，当你想首先处理第一个元素时，队列将是最合适的数据结构。

![image from leetcode](https://pic.leetcode-cn.com/44b3a817f0880f168de9574075b61bd204fdc77748d4e04448603d6956c6428a-%E5%87%BA%E5%85%A5%E9%98%9F.gif)

### 队列实现
在JavaScript中，数组的地址是连续的，在栈内存中保存了数组的首地址，通过下标寻址的方式查找元素；队列不同于栈，当每个元素出队列时，会在堆内存中通过遍历元素将元素前移；因此效率是十分低的；

为了解决这个问题，有相应的策略：
1. 通过一个指针模拟头节点，每次出队列将头节点后移，并不是真正的推出元素；
![image from leetcode](https://aliyun-lc-upload.oss-cn-hangzhou.aliyuncs.com/aliyun-lc-upload/uploads/2018/07/21/screen-shot-2018-07-21-at-153558.png)
缺点：在使用过程中效率是有保证的，但是随着使用，浪费的内存空间会越来越大；

2. 为了避免空间的无限制浪费，可以采用限制队列大小的方案，通过覆盖旧值，甚至扩容策略来解决，这就是循环队列！
> 循环队列是一种线性数据结构，其操作表现基于 FIFO（先进先出）原则并且队尾被连接在队首之后以形成一个循环。它也被称为“环形缓冲器”。
![image from leetcode](https://pic.leetcode-cn.com/Figures/circular_queue/Slide51.png)

### 队列的实际应用
广度优先搜索BFS，优先遍历下一层级的子树，再推出根节点，再依次遍历；
![image from leetcode](https://pic.leetcode-cn.com/Figures/bfs/Slide01.png)
```
Queue:
A ->
ABCD ->
BCD ->
BCDE ->
CDE ->
CDEF ->
DEF ->
EFG ->
FG ->
G ->
空
```
甚至可以考虑双向BFS的思路：
- [752.打开转盘锁](https://leetcode-cn.com/problems/open-the-lock/)
- [279.完全平方数](https://leetcode-cn.com/problems/perfect-squares/)
