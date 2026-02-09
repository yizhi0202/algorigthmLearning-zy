export {};

function getCircleBackToOriginPlanNum(n: number) {
    const len = 10; // 点数
    // dp[i][j] 代表走了i步到j点的方案数
    const dp = Array.from({length: n + 1}, () => new Array(len).fill(0));
    //走0步到0点一种方案
    dp[0][0] = 1;
    for (let i = 1; i <= n; i++) {
        for (let j = 0; j < len; j++) {
            // 走i步到j点方案数分别为 走i-1步到j-1点 和 走i-1步到j+1点的位置求和
            dp[i][j] = dp[i-1][(j - 1 + len) % len] + dp[i-1][(j+1) % len];
        }
    }
    // 返回走n步到0点
    return dp[n][0];
}

const testRes = getCircleBackToOriginPlanNum(12);
console.log('yizhi getCircleBackToOriginPlanNum is ', testRes);