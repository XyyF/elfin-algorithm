## [剑指Offer30.包含min函数的栈](https://leetcode-cn.com/problems/bao-han-minhan-shu-de-zhan-lcof/)

[讨论](https://leetcode-cn.com/problems/bao-han-minhan-shu-de-zhan-lcof/comments/) | [题解](https://leetcode-cn.com/problems/bao-han-minhan-shu-de-zhan-lcof/solution/)

Tags: 栈 | 空间换时间

> 定义栈的数据结构，请在该类型中实现一个能够得到栈的最小元素的 min 函数在该栈中，调用 min、push 及 pop 的时间复杂度都是 O(1)。

```js
MinStack minStack = new MinStack();
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
minStack.min();   --> 返回 -3.
minStack.pop();
minStack.top();      --> 返回 0.
minStack.min();   --> 返回 -2.
```

限制:
- 各函数的调用总次数不超过 20000 次

### 推导
根据题意，需要实现 push、pop、top、min 方法，前三者根据栈的定义，可以实现O(1)的复杂度，关键是 min方法如何保证效率？

思路：利用辅助栈(空间换时间)，专门存储主栈中，**非严格降序** 元素(在主栈的最小元素 = 在辅助栈的)。
```js
StackA: -2, 0, -3, -1, 1,
StackB: -2, -3,
```
- 以第一个元素a为标准，比a大的元素不会出现在StackB；
- StackB的元素是降序；

### 题解
```js
/**
 * initialize your data structure here.
 */
var MinStack = function() {
    this.stackA = [];
    this.stackB = [];
    this.minNum = undefined;
};

/** 
 * @param {number} x
 * @return {void}
 */
MinStack.prototype.push = function(x) {
    this.stackA.push(x);
    if (this.minNum >= x || this.minNum === undefined) {
        this.stackB.push(x);
        this.minNum = x;
    }
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function() {
    const x = this.stackA.pop();
    if (x === this.minNum) {
        const xB = this.stackB.pop();
        this.minNum = this.min();
    }
};

/**
 * @return {number}
 */
MinStack.prototype.top = function() {
    return this.stackA[this.stackA.length - 1];
};

/**
 * @return {number}
 */
MinStack.prototype.min = function() {
    return this.stackB[this.stackB.length - 1];
};

/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(x)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.min()
 */
```