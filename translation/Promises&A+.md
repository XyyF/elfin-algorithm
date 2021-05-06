# Promises/A+
[原文地址](https://promisesaplus.com/#point-49)

一个开放的标准，用于实现可互操作的JavaScript Promises -- by implementers, for implementers.

一个Promsie代表异步操作的最终结果。要与Promise互动的主要方式是通过 then 方法，该方法注册回调以接收Promise的最终值或Promise无法完成的原因。

该规范详细说明了 then 方法的行为，提供了一个可互操作的基础，所有Promises/A+符合Promise的实现都可以依靠该基础来提供。因此，该规范应被认为是非常稳定的。尽管Promises/A+组织有时会通过向后兼容的微小更改来修订此规范，以解决新发现的极端情况，但只有在仔细考虑、讨论和测试之后，我们才会集成大型或向后不兼容的更改。

从结果来看，Promises/A+阐明了较早[Promises/A提案](http://wiki.commonjs.org/wiki/Promises/A)的行为条款，将其扩展为涵盖事实上的行为，并省略了未指定或有问题的部分。

最后，核心的Promises/A+规范不涉及如何创建、执行或拒绝Promise，而是选择专注于提供可互操作的then方法，伴随规范中的未来工作可能涉及这些主题。

## 1. 目录
1.1 "Promise"是具有then方法的对象或函数，其行为符合此规范。<br/>
1.2 "thenable"是定义then方法的对象或函数。<br/>
1.3 "value"是任何合法的JavaScript值（包括未定义、可实现的或者Promise）。<br/>
1.4 "exception"是使用throw语句抛出的值。<br/>
1.5 "reason"是表明拒绝Promise的原因的值。<br/>

## 2. 需求
### 2.1 Promise状态
一个promise必须处于以下三种状态之一：等待中(pending)、已完成(fulfilled)或已拒绝(rejected)。

2.1.1 当一个promise等待中时:<br/>
&nbsp;&nbsp;&nbsp;&nbsp;2.1.1.1 可能会转换为已完成或已拒绝状态。<br/>
2.1.2 当一个promise已完成时：<br/>
&nbsp;&nbsp;&nbsp;&nbsp;2.1.2.1 一定不会改变为其他任何状态；<br/>
&nbsp;&nbsp;&nbsp;&nbsp;2.1.2.2 一定会有一个绝不能改变的值。<br/>
2.1.3 当一个promise已拒绝时：<br/>
&nbsp;&nbsp;&nbsp;&nbsp;2.1.3.1 一定不会改变为其他任何状态；<br/>
&nbsp;&nbsp;&nbsp;&nbsp;2.1.3.2 一定会有一个绝不能改变的原因值。<br/>

在此，"绝不能改变"是指不变的身份(即===)，但并不表示深层次的不变性。

### 2.2 then方法
一个promise必须提供一个then方法来接收其当前的最终值或原因。

一个pormise的then方法接受两个参数：
```js
promise.then(onFulfilled, onRejected)
```
2.2.1 onFulfilled和onRjected都是可选参数：<br/>
&nbsp;&nbsp;&nbsp;&nbsp;2.2.1.1 如果onFulfilled不是一个函数，那么将被忽略；<br/>
&nbsp;&nbsp;&nbsp;&nbsp;2.2.1.2 如果onRejected不是一个函数，那么将被忽略。<br/>
2.2.2 如果onFulfilled是一个函数：<br/>
&nbsp;&nbsp;&nbsp;&nbsp;2.2.2.1 必须在promise是已完成状态后调用，它的第一个参数是该promise的最终值；<br/>
&nbsp;&nbsp;&nbsp;&nbsp;2.2.2.2 在promise状态为已完成之前，不能调用onFulfilled；<br/>
&nbsp;&nbsp;&nbsp;&nbsp;2.2.2.3 它不能被多次调用。<br/>
2.2.3 如果onRejected是一个函数：<br/>
&nbsp;&nbsp;&nbsp;&nbsp;2.2.3.1 必须在promise是已拒绝状态后调用，它的第一个参数是该promise的原因值；<br/>
&nbsp;&nbsp;&nbsp;&nbsp;2.2.3.2 在promise状态为已拒绝之前，不能调用onRejected；<br/>
&nbsp;&nbsp;&nbsp;&nbsp;2.2.3.3 它不能被多次调用。<br/>
2.2.4 在执行下上文堆栈仅包含平台代码之前，不能调用onFullfilled或onRejected。[3.1](#notes)<br/>
2.2.5 onFullfilled和onRejected必须作为函数调用(即没有this值)。<span style="color: red;">(PS: 大多浏览器实现，this会指向window)</span><br/>
2.2.6 同一promise上可能会多次调用then方法。<span style="color: red;">(PS: 不是链式调用的意思)</span><br/>
&nbsp;&nbsp;&nbsp;&nbsp;2.2.6.1 如果promise状态过渡到已完成，所有的onFulfilled回调将会按照他们定义的顺序进行执行；<br/>
&nbsp;&nbsp;&nbsp;&nbsp;2.2.6.2 如果promise状态过渡到已拒绝，所有的onRejected回调将会按照他们定义的顺序进行执行。<br/>
2.2.7 then方法必须返回一个promise[3.3](#notes)<br/>
```js
promise2 = promise1.then(onFulfilled, onRejected);
```
&nbsp;&nbsp;&nbsp;&nbsp;2.2.7.1 如果onFulfilled或onRejected返回了一个值x，那么将会返回 Promise.resolve(x)【TODO】；<br/>
&nbsp;&nbsp;&nbsp;&nbsp;2.2.7.2 如果onFulfilled或onRejected抛出了一个错误e，那么将会返回 Promise.rejected(e)【TODO】；<br/>
&nbsp;&nbsp;&nbsp;&nbsp;2.2.7.3 如果onFulfilled不是一个函数，并且promise1状态为已完成，那么返回的promise2状态为已完成并且最终值等同promise1；<br/>
&nbsp;&nbsp;&nbsp;&nbsp;2.2.7.4 如果onRejected不是一个函数，并且promise1状态为已拒绝，那么返回的promise2状态为已拒绝并且原因值等同promise1；<br/>

### 2.3 Promise执行程序