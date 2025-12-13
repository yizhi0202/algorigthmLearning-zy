export {};
/**
 Do not return anything, modify nums1 in-place instead.
 */
function merge(nums1: number[], m: number, nums2: number[], n: number): void {
    let i = m - 1;
    let j = n - 1;
    let k = m + n -1;
    while (i >= 0 && j >= 0) {
        if (nums2[j] >= nums1[i]) {
            nums1[k] = nums2[j];
            j--;
        } else {
            nums1[k] = nums1[i];
            i--;
        }
        k--;
    }


    while (j >= 0) { // 如果是i >=0 无需特殊处理因为已经在正确位置上
        nums1[k] = nums2[j];
        k--;
        j--;
    }
};

function mergeWithDuplicate(nums1: number[], nums2: number[]) {
    let res = [];
    let i = 0, j = 0, k = 0;
    let len1 = nums1.length, len2 = nums2.length;
    while(i < len1 && j < len2) {
        while (i < len1 && nums1[i] == res[k-1]) { // !!! 注意是与前一位设置了正确值的比较 因为设置完成值后会+1
            i++
        }
        while (j < len2 && nums2[j] == res[k-1]) {
            j++;
        }
        if (i >= len1 || j >= len2) break;

        if (nums1[i] <= nums2[j]) {
            res[k] = nums1[i];
            i++;
        } else {
            res[k] = nums2[j];
            j++;
        }
        k++;
    }
    const copyNums = i < len1 ? nums1 : nums2;
    let tmpIdx = i < len1 ? i : j;
    let endLen = i < len1 ? len1 : len2;
    while (tmpIdx < endLen) {
        while (tmpIdx < endLen && copyNums[tmpIdx] == res[k-1]) {
            tmpIdx++;
        }
        if (tmpIdx >= endLen) break;
        res[k] = copyNums[tmpIdx];
        tmpIdx++;
        k++;
    }
    return res;
}

const nums1 = [1,3,4,4,5,6,8,8,9];
const nums2 = [2,5,6,7,10];
const res = mergeWithDuplicate(nums1, nums2);
console.log('yizhi == res is ', res);