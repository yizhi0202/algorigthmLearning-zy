// class MedianFinder {
//     private nums: number[];
    
//     constructor() {
//         this.nums = [];
//     }

//     addNum(num: number): void {
//         this.nums.push(num);
//     }

//     findMedian(): number {
//         if (this.nums.length === 0) return 0;
        
//         const n = this.nums.length;
//         if (n % 2 === 1) {
//             // 奇数个：第 (n+1)/2 小的数
//             const k = Math.floor(n / 2) + 1;
//             return this.findKthSmallest(k);
//         } else {
//             // 偶数个：第 n/2 小和第 n/2 + 1 小的数的平均值
//             const k1 = n / 2;
//             const k2 = n / 2 + 1;
//             const num1 = this.findKthSmallest(k1);
//             const num2 = this.findKthSmallest(k2);
//             return (num1 + num2) / 2;
//         }
//     }

//     private findKthSmallest(k: number): number {
//         // 复制数组以避免修改原数组
//         const numsCopy = [...this.nums];
//         return this.quickSelect(numsCopy, 0, numsCopy.length - 1, k - 1);
//     }

//     private quickSelect(nums: number[], left: number, right: number, k: number): number {
//         if (left === right) return nums[left];
        
//         const pivotIndex = left + Math.floor(Math.random() * (right - left + 1));
//         const finalPivotIndex = this.partition(nums, left, right, pivotIndex);
        
//         if (k === finalPivotIndex) {
//             return nums[k];
//         } else if (k < finalPivotIndex) {
//             return this.quickSelect(nums, left, finalPivotIndex - 1, k);
//         } else {
//             return this.quickSelect(nums, finalPivotIndex + 1, right, k);
//         }
//     }

//     private partition(nums: number[], left: number, right: number, pivotIndex: number): number {
//         const pivotValue = nums[pivotIndex];
//         // 将pivot移到末尾
//         this.swap(nums, pivotIndex, right);
        
//         let storeIndex = left;
//         for (let i = left; i < right; i++) {
//             if (nums[i] < pivotValue) {
//                 this.swap(nums, storeIndex, i);
//                 storeIndex++;
//             }
//         }
//         // 将pivot移回正确位置
//         this.swap(nums, storeIndex, right);
//         return storeIndex;
//     }

//     private swap(nums: number[], i: number, j: number): void {
//         [nums[i], nums[j]] = [nums[j], nums[i]];
//     }
// }

// // 测试
// const medianFinder = new MedianFinder();
// medianFinder.addNum(1);
// medianFinder.addNum(2);
// console.log('Median of [1,2]:', medianFinder.findMedian()); // 应该是 1.5

// medianFinder.addNum(3);
// console.log('Median of [1,2,3]:', medianFinder.findMedian()); // 应该是 2

// medianFinder.addNum(4);
// console.log('Median of [1,2,3,4]:', medianFinder.findMedian()); // 应该是 2.5

class MedianFinder {
    private nums: number[];
    constructor() {
        this.nums = [];
    }

    addNum(num: number): void {
        this.nums.push(num);
        console.log('yizhi curr nums is ', this.nums);
    }

    findMedian(): number {
        if (this.nums.length % 2 == 0) { // 偶数个
            const first = this.nums.length - Math.floor(this.nums.length / 2);
            const second = first + 1;
            const firstValue = this.findKthNum(this.nums, first);
            const secondValue = this.findKthNum(this.nums, second);
            console.log('yizhi tmp firstValue is ', firstValue, ' second is ', secondValue);
            return (firstValue + secondValue) / 2;
        } else { // 奇数个
            let kTh = this.nums.length - Math.floor(this.nums.length / 2);
            const res = this.findKthNum(this.nums, kTh);
            console.log('yizhi tmp res is ', res);
            return res;
        }
    }

    findKthNum(nums, k) {
        let left = 0;
        let right = nums.length - 1;
        const targetIndex = nums.length - k;
        while(left <= right) {
            let pivotIndex = left + Math.floor(Math.random() * (right - left + 1));
            const [lt, gt] = this.threeWayPartition(nums, left, right, pivotIndex);
            if (targetIndex >= lt && targetIndex <= gt) {
                return nums[targetIndex];
            } else if (targetIndex > gt) {
                left = gt + 1;
            } else {
                right = lt - 1;
            }
        }
        return nums[targetIndex];
    }

    threeWayPartition(nums, left, right, pivotIndex) {
        let lt = left, i = left;
        let gt = right;
        const pivotValue = nums[pivotIndex];
        while(i <= gt) {
            if (nums[i] < pivotValue) {
                this.swap(nums, i, lt);
                lt++;
                i++;
            } else if (nums[i] > pivotValue) {
                this.swap(nums, i, gt);
                gt--;
            } else {
                i++;
            }
        }
        return [lt, gt];
    }

    swap(nums, a, b) {
        if (a == b) {
            return;
        }
        [nums[a], nums[b]] = [nums[b], nums[a]];
    }
}

const medianFinder = new MedianFinder();
medianFinder.addNum(1);
medianFinder.addNum(2);
const res1 = medianFinder.findMedian();
console.log('yizhi res1 is ', res1);
medianFinder.addNum(3);
const res2 = medianFinder.findMedian();
console.log('yizhi res2 is ', res2);

export {}