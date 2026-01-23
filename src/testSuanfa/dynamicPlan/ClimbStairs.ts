export {};
function climbStairs(n: number): number {
    if (n <= 2) return n;
    let pre1 = 1;
    let pre2 = 2;
    let res = 0;
    for (let i = 3; i <= n; i++) {
        res = pre1 + pre2;
        pre1 = pre2;
        pre2 = res;
    }
    return res;
};

const res = climbStairs(9999);
console.log('yizhi res is ', res);