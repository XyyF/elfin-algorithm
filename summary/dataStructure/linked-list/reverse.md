## 反转链表 reverse

在一次遍历中，将一个链表从头到尾进行反转，然后可以一步步深入占位头节点、占位尾节点等元素加入后的实现优化

## 反转单向链表

### 无占位头节点 - 双指针遍历
```ts
/**
 * 链表实现部分省略，下同，请查看
 * https://github.com/XyyF/elfin-dataStructure/blob/master/src/linked-list/index.ts
 */
class LList {
    // 因为没有占位头节点，head的指向就是真实头节点的地址
    head;
    /**
     * 反转链表 <双指针遍历> 示意
     * node1 -> node2 -> node3 -> null
     * ==>
     * node3 -> node2 -> node1 -> null
     */ 
    reverse() {
        let prev = null
        let current = this.head

        while (current !== null) {
            const nextNode = current.next
            current.next = prev

            prev = current
            current = nextNode
        }
    }
}
```
- 初始化
```
待完成: null node1 -> node2 -> node3 -> null
       prev current
```
- 第一步
```
已完成: node1 -> null
       prev
待完成: node2 -> node3 -> null
       current
```
- 第二步
```
已完成: node2 -> node1 -> null
       prev
待完成: node3 -> null
       current
```
....

### 存在占位头节点 - 单指针遍历
```ts
class LList {
    // 占位头节点，head.next的指向就是真实头节点的地址
    head;
    /**
     * 反转链表 <单指针遍历> 示意
     * head -> node1 -> node2 -> node3 -> null
     * ==>
     * head -> node3 -> node2 -> node1 -> null
     */ 
    reverse() {
        let current = null

        while (this.head.next !== null) {
            const nextNode = current
            current = this.head.next
            this.head.next = current.next
            current.next = nextNode
        }

        this.head.next = current
    }
}
```
- 初始化
```
待完成: null head -> node1 -> node2 -> node3 -> null
       current   
```
- 第一步
```
已完成: node1 -> null
       current
待完成: head -> node2 -> node3 -> null
```
- 第二步
```
已完成: node2 -> node1 -> null
       current
待完成: head -> node3 -> null
```
- 第三步
```
已完成: node3 -> node2 -> node1 -> null
       current
待完成: head -> null
```
- 第四步
```
已完成: head -> node3 -> node2 -> node1 -> null
               current
```