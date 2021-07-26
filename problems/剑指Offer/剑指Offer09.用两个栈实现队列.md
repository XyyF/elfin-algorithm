## [剑指Offer09.用两个栈实现队列](https://leetcode-cn.com/problems/yong-liang-ge-zhan-shi-xian-dui-lie-lcof/)

[讨论](https://leetcode-cn.com/problems/yong-liang-ge-zhan-shi-xian-dui-lie-lcof/comments/) | [题解](https://leetcode-cn.com/problems/yong-liang-ge-zhan-shi-xian-dui-lie-lcof/solution/)

Tags: 栈 | 队列

> 用两个栈实现一个队列。队列的声明如下，请实现它的两个函数 appendTail 和 deleteHead ，分别完成在队列尾部插入整数和在队列头部删除整数的功能。(若队列中没有元素，deleteHead 操作返回 -1)

```js
示例 1：

输入：
["CQueue","appendTail","deleteHead","deleteHead"]
[[],[3],[],[]]
输出：[null,null,3,-1]
示例 2：

输入：
["CQueue","deleteHead","appendTail","appendTail","deleteHead","deleteHead"]
[[],[],[5],[2],[],[]]
输出：[null,-1,null,null,5,2]
```

限制:
- 1 <= values <= 10000
- 最多会对 appendTail、deleteHead 进行 10000 次调用

### 推导
使用两个栈来模拟先进先出的队列，那么一个栈A模拟队列进，一个栈B模拟队列出；

模拟队列进很简单，那么队列出呢？因为栈是先进先出的，如果想要出元素，那么就要把元素放在栈顶；为了保证效率，有以下几点可以考虑：
1. 当执行deleteHead时再将栈A的元素转移至栈B；
2. 当栈B中存在元素时，无需转移；
3. 模拟的队列可以看作：栈A顶 -> 栈A底 -> 栈B底 -> 栈B顶；
```js
append 1 -> append 2 -> delete -> append 8

StackA: 1
StackB:
=>
StackA: 1 2
StackB:
=>
StackA: 
StackB: 2（2 1，然后delete 1）
=>
StackA: 8
StackB: 2
```

### 题解
```js
var CQueue = function() {
    this.stackA = [];
    this.stackB = [];
};

/** 
 * @param {number} value
 * @return {void}
 */
CQueue.prototype.appendTail = function(value) {
    this.stackA.push(value);
};

/**
 * @return {number}
 */
CQueue.prototype.deleteHead = function() {
    if (this.stackB.length > 0) {
        return this.stackB.pop();
    }
    if (this.stackA.length > 0) {
        for (let i = 0, l = this.stackA.length; i < l; i++) {
            this.stackB.push(this.stackA.pop());
        }
        return this.stackB.pop();
    }
    return -1;
};
```