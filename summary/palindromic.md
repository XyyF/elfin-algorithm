# 回文

> 回文的概念：正向、反向值相同的字符串，比如 "aba"、"abcba"
>
> 注意：单字符本身也是回文，比如 "a"、"b"

## 推导
回文的特性：

- 首尾字符相同
- 去掉首尾字符后，子串仍然是回文

延伸出**核心思路**:

- 首尾字符不同不是回文
- 里面的子串不是回文，那么整体也不是回文

### 状态
- 字符串起始位置 i
- 字符串结束位置 j

```js
for 0 <= i < s.length:
    for i <= j < s.length:
    // tips: j默认是大于等于i的
        dp[i][j] = isPalindromic(s, i, j)
```

### 状态方程

```js
s[i,.j] 代表字符串下标s到j

dp[i][j] 代表字符串s[i...j]是否是回文

dp[i][j] = (s[i] === s[j]) && dp[i + 1][j - 1]
```
![](https://tva1.sinaimg.cn/large/007S8ZIlgy1ghtkl1lgisj30ha08iglo.jpg)

## 优化
[Manacher算法](https://github.com/XyyF/elfin-algorithm/blob/master/algorithm/manacher.md)

## 相关问题