export {}
function dutchFlagResolve(nums: number[], pivot: number) {
    let low = 0, mid = 0, high = nums.length - 1;
    while (mid <= high) { // !!! 等于很重要 避免遗漏边界情况
        if (nums[mid] < pivot) {
            [nums[mid], nums[low]] = [nums[low], nums[mid]];
            low++;
            mid++;
        } else if (nums[mid] > pivot) {
            [nums[mid], nums[high]] = [nums[high], nums[mid]];
            high--;
        } else {
            mid++;
        }
    }
}