# 股票买卖的最佳时机

## 推导
推导思路：穷举
```js
利用 [状态] 进行穷举，将所有的可能性列举出
for 状态1 in 状态1的所有取值：
    for 状态2 in 状态2的所有取值：
        for ...
            dp[状态1][状态2][...] = 择优(选择1，选择2...)

```

### 状态

股票问题状态有3种
- 天数：第i天

- 当天操作后允许交易的最大次数：

  其实对于最大可交易次数，大部分场景都是限制了1次交易 || 不限制交易次数

- 当天的持有状态：持有股票1、未持有股票0

```js
dp[i][j][0 or 1]
0 <= i <= n-1, 1 <= j <= K
    tips: j是从1...K开始遍历的，因为允许交易的最大次数是递减的，需要预留一位以免错误
n 为天数，大 K 为最多交易数
此问题共 n × K × 2 种状态，全部穷举就能搞定。

for 0 <= i < n:
    for 1 <= j <= K:
        for s in {0, 1}:
            dp[i][j][s] = max(buy, sell, rest)

例如：
dp[3][2][1]: 今天是第3天，我手上持有股票，还可至多交易2次，至此我获得的收益
dp[3][2][0]: 今天是第3天，我手上没有持有股票，还可至多交易2次，至此我获得的收益
收益说明：当天股票价格prices[i]：💰
前一天未持有 <-> 今天持有：说明我买入了股票，那么我将付出当天股票价格的💰，收益 - 💰
前一天持有 <-> 今天未持有：说明我卖了股票了，那么我将获得当天股票价格的💰，收益 + 💰
		**真实收益其实就是 买卖股票时价格的差值**
前一天持有 <-> 今天持有：说明我没有操作，那么我的收益将不会改变
前一天未持有 <-> 今天未持有：说明我没有操作，那么我的收益将不会改变
```

### 状态转移方程

![](https://tva1.sinaimg.cn/large/007S8ZIlgy1ghravyqc89j30m20efaa6.jpg)

```js
dp[i][j][0] = max(dp[i-1][j][0], dp[i-1][j][1] + prices[i])
			  max(前一天未持有股票, 前一天持有股票)
              max(选择 rest, 选择 sell)

dp[i][j][1] = max(dp[i-1][j][1], dp[i-1][j-1][0] - prices[i])
			  max(前一天持有股票, 前一天未持有股票)
              max(选择 rest, 选择 buy)
```

### base case初始化

```js
dp[0][j][0] = 0 因为我没有买入股票
    tips: 这里代表 dp[0][1][0]、dp[0][2][0].....dp[0][K][0] = 0
dp[0][j-1][1] = -prices[0] 第一天买入了股票
    tips: 这里代表 dp[0][1][1]、dp[0][2][1].....dp[0][K][1] = -prices[0]

dp[i][0][0] = max(dp[i - 1][0][0], dp[i - 1][-1][1] + prices[i]) = 0
```

### 最优解输出

```js
dp[i][K][0] 即最后一天时，我手上没有持有股票所得的最大收益(相较于持有，未持有的收益肯定最大
```

## 优化
### 当 K 无限制时，且没有其他限制
可以将算法从 动态规划算法 向 贪心算法 演变

- 无限制的含义
```js
1. 除去题目中明确制定了无限制
2. 由于一次交易至少需要两天的时间，一天买入，一天卖出
那么只要满足 K > prices.length / 2 同样可以认为是无限制
```
- 贪心算法
```js
如果第二天相较第一天，
    存在利润，那么我将会在第一天买入股票
    不存在润，那么我将不会买入
如果第二天相较第三天，
    存在利润，那么我将会 [继续持有股票] 或者 [买入股票]
    不存在润，那么我将会 [卖出股票] 或者 [不买入股票]
综上所述，其他整体的利润就是股票 [价格变动的上升区间]
```

### 当 K 无限制或者限制只能交易1次，且存在其他限制时
存在某些限制，导致算法无法通过贪心得出

可以通过增加参数，将多维数组扁平化

可以从状态转移方程看出，整个流程其实只需要几个变量即可
```js
dp[i][j][0]
dp[i][j][1]
dp[i - 1][j][0]
dp[i - 1][j][1]
dp[i - 1][j - 1][0]

可以将 dp[i] 层级提取出，简化层级
dp[i][j][0] => now[j][0] => nowUnHold[j]
dp[i][j][1] => now[j][1] => nowHold[j]
dp[i - 1][j][0] => pre[j][0] => preUnHold[j]
dp[i - 1][j][1] => pre[j][0] => preHold[j]
dp[i - 1][j-1][0] => pre[j-1][0] => preUnHold[j-1]

在某些場景下，K值为1，可以进一步将K值优化
dp[i][j][0] => nowUnHold
dp[i][j][1] => nowHold
dp[i - 1][j][0] => preUnHold
dp[i - 1][j][1] => preHold
dp[i - 1][j-1][0] => preUnHold
```

## 相关题目
- [121.best-time-to-buy-adn-sell-stock](https://github.com/XyyF/elfin-algorithm/blob/master/problems/121.best-time-to-buy-and-sell-stock.md)
- [122.best-time-to-buy-adn-sell-stock-ii](https://github.com/XyyF/elfin-algorithm/blob/master/problems/122.best-time-to-buy-and-sell-stock-ii.md)
- [123.best-time-to-buy-adn-sell-stock-iii](https://github.com/XyyF/elfin-algorithm/blob/master/problems/123.best-time-to-buy-and-sell-stock-iii.md)
- [309.best-time-to-buy-adn-sell-stock-with-cooldown](https://github.com/XyyF/elfin-algorithm/blob/master/problems/309.best-time-to-buy-and-sell-stock-with-cooldown.md)
- [714.best-time-to-buy-adn-sell-stock-with-transaction-fee](https://github.com/XyyF/elfin-algorithm/blob/master/problems/714.best-time-to-buy-and-sell-stock-with-transaction-fee.md)