# Promises/A+
[原文地址](https://promisesaplus.com/#point-49)

一个开放的标准，用于实现可交互的JavaScript Promises -- by implementers, for implementers.

一个Promsie代表异步操作的最终结果。要与Promise交互的主要方式是通过 then 方法，该方法注册回调以接收Promise完成的最终值或Promise无法完成的原因值。

该规范详细说明了 then 方法的行为，提供了一个可交互的基础，所有Promises/A+符合Promise的实现都可以依靠该基础来提供。因此，该规范应被认为是非常稳定的。尽管Promises/A+组织有时会通过向后兼容的微小更改来修订此规范，以解决新发现的极端情况，但只有在仔细考虑、讨论和测试之后，我们才会集成大型或向后不兼容的更改。

从结果来看，Promises/A+阐明了较早[Promises/A提案](http://wiki.commonjs.org/wiki/Promises/A)的行为条款，将其扩展为涵盖事实上的行为，并省略了未指定或有问题的部分。

最后，核心的Promises/A+规范不涉及如何创建、执行或拒绝Promise，而是选择专注于提供可交互的then方法，伴随规范中的未来工作可能涉及这些主题。

## 1. 术语
1.1 "Promise"是具有then方法的对象或函数，其行为符合此规范。<br/>
1.2 "thenable"是定义then方法的对象或函数。<br/>
1.3 "value"是任何合法的JavaScript值（包括未定义、可实现的或者Promise）。<br/>
1.4 "exception"是使用throw语句抛出的值。<br/>
1.5 "reason"是表明拒绝Promise的原因值。<br/>

## 2. 要求
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
一个promise必须提供一个then方法来接收其当前的最终值或原因值。

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
2.2.4 在执行下上文堆栈仅包含平台代码之前，不能调用onFullfilled或onRejected。[[3.1](#user-content-3-注意事项)]<br/>
2.2.5 onFullfilled和onRejected必须作为函数调用(即没有this值)。[[3.2](#user-content-3-注意事项)]<br/>
2.2.6 同一promise上可能会多次调用then方法。<span style="color: red;">(PS: 不是链式调用的意思)</span><br/>
&nbsp;&nbsp;&nbsp;&nbsp;2.2.6.1 如果promise状态过渡到已完成，所有的onFulfilled回调将会按照他们定义的顺序进行执行；<br/>
&nbsp;&nbsp;&nbsp;&nbsp;2.2.6.2 如果promise状态过渡到已拒绝，所有的onRejected回调将会按照他们定义的顺序进行执行。<br/>
2.2.7 then方法必须返回一个promise[[3.3](#user-content-3-注意事项)]<br/>
```js
promise2 = promise1.then(onFulfilled, onRejected);
```
&nbsp;&nbsp;&nbsp;&nbsp;2.2.7.1 如果onFulfilled或onRejected返回了一个值x，那么将会执行 [[Resolve]](promise2, x)；<br/>
&nbsp;&nbsp;&nbsp;&nbsp;2.2.7.2 如果onFulfilled或onRejected抛出了一个错误e，以e为原因值，拒绝promise2；<br/>
&nbsp;&nbsp;&nbsp;&nbsp;2.2.7.3 如果onFulfilled不是一个函数，并且promise1状态为已完成，那么返回的promise2状态为已完成并且最终值等同promise1；<br/>
&nbsp;&nbsp;&nbsp;&nbsp;2.2.7.4 如果onRejected不是一个函数，并且promise1状态为已拒绝，那么返回的promise2状态为已拒绝并且原因值等同promise1；<br/>

### 2.3 Promise解释程序
Promise解释程序是一个以promise和值作为输入的抽象操作，我们将其表示为[[Resolve]](promise, x)。如果x是thenable，这会试图让promise采用x的状态，假设x的表现有些像Pormise。否则，promise将会带着最终值x处于已完成状态。

只要thenables暴露出Promises/A+的相关then方法，那么允许thenables的then方法和promsie的实现互通。thenables的then方法还允许Promises/A+实现以合理的方式去“同化”不合格的实现。

执行[[Resolve]](promise, x)，遵从以下步骤：<br/>
2.3.1 如果promise和x指向同一个对象，拒绝promise并且以TypeError作为原因值。<br/>
2.3.2 如果x是一个promise，采用它的状态[[3.4](#user-content-3-注意事项)]：<br/>
&nbsp;&nbsp;&nbsp;&nbsp;2.3.2.1 如果x处于等待中状态，promise必须保持等待中状态直到x变更为已完成或已拒绝；<br/>
&nbsp;&nbsp;&nbsp;&nbsp;2.3.2.2 如果x处于已完成状态，用相同的最终值完成promise；<br/>
&nbsp;&nbsp;&nbsp;&nbsp;2.3.2.3 如果x处于已拒绝状态，用相同的原因值拒绝promise。<br/>
2.3.3 如果x是一个对象或者函数：<br/>
&nbsp;&nbsp;&nbsp;&nbsp;2.3.3.1 定义then = x.then；[[3.5](#user-content-3-注意事项)]<br/>
&nbsp;&nbsp;&nbsp;&nbsp;2.3.3.2 如果在检索x.then属性时抛出错误e，使用e作为原因值拒绝promise；<br/>
&nbsp;&nbsp;&nbsp;&nbsp;2.3.3.3 如果then是一个函数，以x作为this调用该函数，第一个参数为resolvePromise，第二个参数为rejectPromise，然后：<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2.3.3.3.1 如果resolvePromise执行携带最终值y，执行 [[Resolve]](promise, y)；<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2.3.3.3.2 如果rejectPromise执行携带原因值e，用原因e拒绝promise；<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2.3.3.3.3 如果resolvePromise和rejectPromise都被调用了，或者多次以相同参数调用，那么首次调用具有优先权，后续调用将被忽略；<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2.3.3.3.4 如果在调用期间抛出错误e：<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2.3.3.3.4.1 如果resolvePromise和rejectPromise已经被调用了，那么忽略它；<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2.3.3.3.4.2 否则，使用e作为原因值拒绝promise；<br/>
&nbsp;&nbsp;&nbsp;&nbsp;2.3.3.4 如果then不是函数，使用x作为最终值完成promise；<br/>
2.3.4 如果x不是对象或者函数，使用x作为最终值完成promise。<br/>

如果[[Resolve]](promise, x)中，x.then再次返回一个thenable，如此反复的递归调用，将会导致无限递归。规范鼓励去检测这种递归并以TypeError为原因值拒绝promsie，但这并不是必须的。[[3.6](#user-content-3-注意事项)]

## 3. 注意事项
3.1  这里的"平台代码"是指引擎、环境和Promise实现代码。在实践中，此要求可确保在事件循环回合之后调用onFulfilled和onRejected异步执行，然后使用新的堆栈进行调用。这可以通过“宏任务”机制（例如setTimeout或setImmediate）或“微任务”机制（例如MutationObserver或process.nextTick）来实现。<br/>
3.2 在严格的模式下，这将是未定义的内部;在非严格模式下，它将是全局对象。<br/>
3.3 只要实现符合所有要求，实现可以允许promise2 === promise1。每种实现都应记录它是否可以生成promise2 === promise1以及在什么条件下可以生成。<br/>
3.4 通常，只有当x来自当前的promise实现时，才知道x是一个promise。本条款允许使用实施特定方法来采用x的promise状态。<br/>
3.5 此过程首次存储对x的引用，然后测试引用，然后调用该引用，避免对x.then属性进行多次访问。这种预防措施对于确保接收器属性的一致性非常重要，其值可能会在检索期间发生变化。<br/>
3.6 实现方式不应在此链式调用的深度上设置任意限制，并假设超出该递归的任意限制将是无限的。只有真正的循环应该导致TypeError;如果遇到thenable截然不同的链式调用，则永久传递是正确的行为。<br/>
