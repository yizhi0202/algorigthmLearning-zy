/**
 * 数据流的中位数
 * 1、创建一个大顶堆（存储较小的一半数据） 和 一个小顶堆（存储较大的一半数据）
 * 2、当数组个数为偶数时，最终需要放入大顶堆，则先放入小顶堆，然后取堆顶的数（最小值）放入大顶堆
 *    当数组个数为奇数，最终需要放入小顶堆，则先放入大顶堆，然后取大顶堆顶 放入小顶堆
 * 3、放入大/小顶堆时，放入末尾，执行bubbleUp 仅比较当前index 是否小于/大于 父节点floor((index - 1) / 2) 若是结束，若不是交换 继续
 * 4、移除堆顶时，将最末尾元素放入堆顶 bubbleDwon 需要比较左右子节点 2*index + 1 2*index +2 的值 最终若targetIndex == index 结束
 */
class MedianFinder {
    private left: number[]; // 最大堆（存储较小的一半）
    private right: number[]; // 最小堆（存储较大的一半）

    constructor() {
        this.left = [];
        this.right = [];
    }

    addNum(num: number): void {
        if (this.left.length === this.right.length) {
            // 先加入最小堆，然后取最小堆的最小值加入最大堆
            this.addToMinHeap(num);
            this.addToMaxHeap(this.removeFromMinHeap()!);
        } else {
            // 先加入最大堆，然后取最大堆的最大值加入最小堆
            this.addToMaxHeap(num);
            this.addToMinHeap(this.removeFromMaxHeap()!);
        }
    }

    findMedian(): number {
        if (this.left.length > this.right.length) {
            return this.getMaxHeapTop();
        }
        return (this.getMaxHeapTop() + this.getMinHeapTop()) / 2;
    }

    // 最大堆操作
    private addToMaxHeap(num: number): void {
        this.left.push(num);
        this.bubbleUpMaxHeap(this.left.length - 1);
    }

    private removeFromMaxHeap(): number | undefined {
        if (this.left.length === 0) return undefined;
        const top = this.left[0];
        const last = this.left.pop()!;
        if (this.left.length > 0) {
            this.left[0] = last;
            this.bubbleDownMaxHeap(0);
        }
        return top;
    }

    private getMaxHeapTop(): number {
        return this.left[0];
    }

    private bubbleUpMaxHeap(index: number): void {
        while (index > 0) {
            const parent = Math.floor((index - 1) / 2);
            if (this.left[parent] >= this.left[index]) break;
            [this.left[parent], this.left[index]] = [this.left[index], this.left[parent]];
            index = parent;
        }
    }

    private bubbleDownMaxHeap(index: number): void {
        const length = this.left.length;
        while (true) {
            let leftChild = 2 * index + 1;
            let rightChild = 2 * index + 2;
            let largest = index;

            if (leftChild < length && this.left[leftChild] > this.left[largest]) {
                largest = leftChild;
            }
            if (rightChild < length && this.left[rightChild] > this.left[largest]) {
                largest = rightChild;
            }
            if (largest === index) break;
            
            [this.left[index], this.left[largest]] = [this.left[largest], this.left[index]];
            index = largest;
        }
    }

    // 最小堆操作
    private addToMinHeap(num: number): void {
        this.right.push(num);
        this.bubbleUpMinHeap(this.right.length - 1);
    }

    private removeFromMinHeap(): number | undefined {
        if (this.right.length === 0) return undefined;
        const top = this.right[0];
        const last = this.right.pop()!;
        if (this.right.length > 0) {
            this.right[0] = last;
            this.bubbleDownMinHeap(0);
        }
        return top;
    }

    private getMinHeapTop(): number {
        return this.right[0];
    }

    private bubbleUpMinHeap(index: number): void {
        while (index > 0) {
            const parent = Math.floor((index - 1) / 2); // 需要记忆
            if (this.right[parent] <= this.right[index]) break;
            [this.right[parent], this.right[index]] = [this.right[index], this.right[parent]];
            index = parent;
        }
    }

    private bubbleDownMinHeap(index: number): void {
        const length = this.right.length;
        while (true) {
            let leftChild = 2 * index + 1;
            let rightChild = 2 * index + 2;
            let smallest = index;

            if (leftChild < length && this.right[leftChild] < this.right[smallest]) {
                smallest = leftChild;
            }
            if (rightChild < length && this.right[rightChild] < this.right[smallest]) {
                smallest = rightChild;
            }
            if (smallest === index) break;
            
            [this.right[index], this.right[smallest]] = [this.right[smallest], this.right[index]];
            index = smallest;
        }
    }
}

// 测试代码
const medianFinder = new MedianFinder();

// 测试用例1: [1, 2]
medianFinder.addNum(1);
medianFinder.addNum(2);
console.log('Median of [1,2]:', medianFinder.findMedian()); // 1.5

// 测试用例2: [1, 2, 3]
medianFinder.addNum(3);
console.log('Median of [1,2,3]:', medianFinder.findMedian()); // 2

// 测试用例3: [1, 2, 3, 4]
medianFinder.addNum(4);
console.log('Median of [1,2,3,4]:', medianFinder.findMedian()); // 2.5

// 测试用例4: [1, 1, 2, 2, 3]
const medianFinder2 = new MedianFinder();
medianFinder2.addNum(1);
medianFinder2.addNum(1);
medianFinder2.addNum(2);
medianFinder2.addNum(2);
medianFinder2.addNum(3);
console.log('Median of [1,1,2,2,3]:', medianFinder2.findMedian()); // 2