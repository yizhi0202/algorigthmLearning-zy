export {};
/** 检测环形链表II */
class ListNode {
    val: number;
    next: ListNode;
    constructor(val, next) {
        this.val = val;
        this.next = next;
    }
}

function detectCycle(head: ListNode) {
    if (!head || !head.next) return null;
    let fast = head;
    let slow = head;
    while (fast?.next) {
        fast = fast.next.next;
        slow = slow.next;
        if (slow == fast) {// 有环
            fast = head;
            while (fast !== slow) { // 走a步
                fast = fast.next;
                slow = slow.next;
            }
            return fast;
        }
    }
    return null;
}

function getCycleLength(entryNode: ListNode) {
    let entry = entryNode;
    let len = 1;
    let pre = entryNode;
    let cur = entryNode.next;
    while (cur !== entry) {
        len++;
        pre = cur;
        cur = cur.next;
    }
    console.log('yizhi-getCycleLength tail is ', pre.val);
    return len;
}

function buildList(arr: number[], entryIndex: number) {
    let tmpNode, tailNode;
    const dummy = new ListNode(-1, null);
    let cur = dummy;
    for (let i = 0; i < arr.length; i++) {
        const node = new ListNode(arr[i], null);
        cur.next = node;
        cur = cur.next;

        if (entryIndex == i) {
            tmpNode = node;
        }
        if (i == (arr.length -1)) {
            tailNode = node;
        }
    }
    tailNode.next = tmpNode;
    return dummy.next;
}


const testArr = [1,2,3,4];
const head = buildList(testArr, 1);
const entryNode = detectCycle(head);
const len = getCycleLength(entryNode);
console.log('yizhi entryNode is ', entryNode.val, ' cycle len is ', len);

