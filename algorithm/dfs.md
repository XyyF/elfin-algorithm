# dfs 回溯算法

## 场景

针对树形结构场景，优先进行深度优先遍历，再不断回溯状态，直至遍历完整棵树
![](https://tva1.sinaimg.cn/large/007S8ZIlgy1ghzn9zywbtj31kl0u0dki.jpg)

## 推导

### 状态

## 代码实现
```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function(nums) {
    let max = 0
    let maxDeep = nums.length
    dfs([], 0)
    return max

    function dfs(temp, deep) {
        if (deep > maxDeep) return

        const cur = temp.length
        if (cur > max) max = cur
        // 核心思路：当满足某些条件时，可以更加深层次的遍历
        if (nums[deep] > temp[cur - 1] || cur === 0) {
            // 添加状态
            temp.push(nums[deep])
            dfs(temp, deep + 1)
            // 回溯状态
            temp.pop()
        }

        dfs(temp, deep + 1)
    }
};
```