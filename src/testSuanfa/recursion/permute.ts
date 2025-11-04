export {}
function permute(nums: number[]): number[][] {
    const res = [];
    const arr = [];
    const len = nums.length;
    const used = new Array(len); // !!! 这里使用数组记录是否使用即可
    const dfs = (target) => {
        if (target == 0) {
            res.push([...arr]);
            return;
        }

        for (let i = 0; i < len; i++) {
            if (!used[i]) {
                arr.push(nums[i]);
                used[i] = true;

                dfs(target-1);

                arr.pop();
                used[i] = false;
            }
        }
    }
    dfs(len);
    return res;
};

const arr = [1,2,3,4,5,6,7,8,9];
const tmp = permute(arr);
console.log('yizhi tmp is ', tmp);