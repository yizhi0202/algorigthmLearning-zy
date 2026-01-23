export {};
function moveSpecElmentsToEnd(nums: number[], targets: Set<number>) {
    let writeIdx = nums.length - 1;
    for (let i = nums.length - 1; i >= 0; i--) {
        if (targets.has(nums[i])) {
            const tmp = nums[i];
            for (let j = i; j < writeIdx; j++) {
                nums[j] = nums[j+1];
            }
            nums[writeIdx] = tmp;
            writeIdx--;
        }
    }
}