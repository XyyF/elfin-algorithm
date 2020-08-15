## dynamic-programming 动态规划

- **动态规划问题一般形式是求最值**

> 比如最少的硬币、最大的值....

- **求解动态规划的核心问题是穷举**

> 因为是求最值，故要把所有的可行答案列举出来，找出最优解

## 核心关注点

### 穷举的弊端(重叠子问题)

穷举一般存在【重叠子问题】，暴力全部穷举效率必然低下，故有【备忘录】(自顶向下)或者【DP table】(自下向上)来优化穷举过程.

![dp表](https://tva1.sinaimg.cn/large/007S8ZIlgy1ghr9hr39xzj30zk0k0myd.jpg)

### 最优子结构

- 即问题可以逐层拆分为一个【最优子结构】的问题，然后根据其来逐步推到顶层;(最优子结构一般就是递归的底层)
- 最优子结构也最合适用来判断边界条件

凡事需要递归的问题，【递归树】可以帮助找到最优子结构

![](https://tva1.sinaimg.cn/large/007S8ZIlgy1ghr9jboh7bj30zk0k0myd.jpg)

### 状态转移方程(难点)

穷举也需要按一定的方式去执行，所有需要描述问题结构的数学方程式

![](https://tva1.sinaimg.cn/large/007S8ZIlgy1ghrairhehgj30bc020we9.jpg)
$$f(n)=\begin{cases} 1, & n=1,2\\ f(n-1) + f(n-2), & n > 2 \end{cases}$$


## 思路分析

**明确状态，画出递归树，找到最优子结构，写出状态转移方程**

### 备忘录自顶向下递归解法(剪枝)

![](https://tva1.sinaimg.cn/large/007S8ZIlgy1ghra1wwinjj30zk0k0dhf.jpg)

备忘录会存储计算过的子问题结果，如果再次遇到，就不必重复计算

### DP table自下向上递归解法

![](https://tva1.sinaimg.cn/large/007S8ZIlgy1ghra2c896rj30zk0k0ta5.jpg)

> 思路：dp[n] 可以由 dp[n-1]... 一次递推出来，**参考斐波那契数列的递归解决**

DP table就是从底向下根据状态转移方程一次计算出最终值

Dp table的结果其实和备忘录十分的相似，只不过两者的计算流程不一样

### 相关问题