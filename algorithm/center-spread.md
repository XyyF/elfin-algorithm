# CenterSpread 中心扩散算法

## 场景

针对回文问题，[传统动态规划解法](https://github.com/XyyF/elfin-algorithm/blob/master/summary/palindromic.md)，以遍历每个子串查找，时间复杂度达到了 O(n^2)

中心扩散算法思路，通过一些技巧，将遍历算法时间复杂度降低到了 O(n)

## 推导
中心扩散法的思路是：遍历字符串每一个索引，以这个索引为中心，利用"回文串"中心对称的特点，往两边扩散，看最多能扩散多远

以中心向外扩散的思路，需要注意回文的长度
- 当回文长度是偶数时，中心是两个字符，比如 "abccba"，中心是 cc
- 当回文长度是奇数时，中心是一个字符，比如 "abcba"，中心是 c

该方法的优势在于，从中心开始扩散，扩散时遇到了不是回文，及时止损，停止遍历

### 状态
从某一个中心开始扩散，并不需要关心中心是哪儿，只需要明确当前扩散字符串的起始下标

### 实现
```js
/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
    const length = s.length

    for (let i = 0; i < length; i++) {
        // 针对奇数回文中心
        centerSpread(i, i)
        // 针对偶数回文中心
        centerSpread(i, i + 1)
    }

    function centerSpread(i, j) {
        while(i >= 0 && j < length && s[i] === s[j]) {
            // 此时 s[i]...s[j] 已经是回文，根据题目作出相关处理
            i--;
            j++;
        }
    }

    return ''
};
```