# LRU缓存淘汰算法

LRU 全称为 Least Recently Used，最近最少使用，结合缓存代表着 **使用过的内存的价值高低**，最近使用过的内存，在近期再次使用的概率较大，其价值较高。

LRU缓存有如下的要求：
- 提高读写效率，保证都是O(1)
- 当缓存被读取后，更新它的使用时间
- 缓存容量限制，当插入新的缓存时，若超出容量，弹出使用时间最早的数据

## LRU设计思路

可以使用 **HashMap** 来保证O(1)效率的读写，但是HashMap无法高效完成使用时间的更新
那么思路就是协同多种数据结构完成LRU，这个数据结构需要高效的完成数据的插入和删除，它就是 **双向链表**

```js
HashMap 存储 数据索引key、链表节点的内存地址
        1. 用以高效的查找链表节点

LinkList 存储 数据索引key、数据的真实值
         1. 链表中的顺序代表使用时间，越靠近tail节点的数据越新，最新的数据一定在末尾
         2. 数据索引key可以快速的反向查找 HashMap 中对应的值
  head    tail
  旧      新
```
![](https://rengar-1253859411.cos.ap-chengdu.myqcloud.com/img/微信图片_20201117115159.jpg)


## 代码实现
[LRU实现地址](https://github.com/XyyF/elfin-dataStructure/blob/master/src/LRU/index.ts)