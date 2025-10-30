export {};
/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */
class ListNode {
    val: number;
    next: ListNode | null;
    constructor(val?: number, next?: ListNode | null) {
        this.val = val;
        this.next = next;
    }
}

function reverseKGroup(head: ListNode | null, k: number): ListNode | null {
    const dummyHead = new ListNode(0, head);
    let curGroupStartPre = dummyHead;
    let curGroupStart = head;
    while(head) {
        let curGroupEnd = getGroupEnd(curGroupStart, k);
        if (!curGroupEnd) {
            break;
        }
        let nextGroupStart = curGroupEnd.next;
        reverseGroup(curGroupStart, curGroupEnd);

        curGroupStartPre.next = curGroupEnd;
        curGroupStart.next = nextGroupStart;

        curGroupStartPre = curGroupStart;
        curGroupStart = nextGroupStart;
    }
    return dummyHead.next;
};

// function getGroupEnd(head, k) {
//     if (k == 1) {
//         return head;
//     }
//     while(head && k > 1) { 
//         if (!head.next) { // 不足K个也反转 可以在这里提前判断head.next 不存在返回head 退出
//             return head;
//         }
//         head = head.next;
//         k--;
//     }
//     return head;
// }

function getGroupEnd(head, k) {
    let count = 1;
    while(head && count < k) {
        head = head.next;
        count++;
    }
    return head;
}

function reverseGroup(head, end) {
    let pre = null;
    let cur = head;
    let stopNode = end.next;
    while(cur !== stopNode) {
        const next = cur.next;
        cur.next = pre;
        pre = cur;
        cur = next;
    }
    return pre;
}

function printList(node) {
    const res = [];
    while(node) {
        res.push(node.val);
        node = node.next;
    }
    console.log(res);
}

const node5 = new ListNode(5, null);
const node4 = new ListNode(4, node5);
const node3 = new ListNode(3, node4);
const node2 = new ListNode(2, node3);
const node1 = new ListNode(1, node2);




const node = reverseKGroup(node1, 3);
printList(node);

