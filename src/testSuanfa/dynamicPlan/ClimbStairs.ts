export {};
// bigInt解决 输入9999问题
function climbStairs(input: number): bigint {
    if (input <= 2) {
        return input == 1 ? 1n : 2n;
    }
    let pre1 = 1n;
    let pre2 = 2n;
    let res = 0n;
    for (let i = 3; i <= input; i++) {
        res = pre1 + pre2;
        pre1 = pre2;
        pre2 = res;
    }
    return res;
};

const res = climbStairs(9999);
console.log('yizhi res is ', res.toString());