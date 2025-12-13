export {}

function permute(nums: number[]): number[][] {
    const len = nums.length;
    const used = new Array(len).fill(false); /// !!! 记录是否使用过
    let res = [];
    const dfs = (path) => {
        if (path.length == len) {
            res.push([...path]);
            return;
        }
        for (let i = 0; i < len; i++) {
            if (used[i]) {
                continue;
            }
            path.push(nums[i]);
            used[i] = true;
            dfs(path);
            path.pop();
            used[i] = false;
        }
    }
    dfs([]);
    return res;
};

const arr = [1,2,3,4,5,6,7,8,9];
const tmp = permute(arr);
console.log('yizhi tmp is ', tmp);