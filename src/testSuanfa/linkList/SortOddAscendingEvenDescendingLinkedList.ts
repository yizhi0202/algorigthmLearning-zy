export {}
// class Node {
//     next: Node;
//     val: number;
//     constructor(val?: number, next?: Node) {
//         this.val = val;
//         this.next = next;
//     }
// }

// const node1 = new Node(1);
// const node2 = new Node(2);
// const node3 = new Node(3);
// // node1.next = node2, node2.next = node3;

// const node4 = new Node(4);
// const node5 = new Node(5);
// const node6 = new Node(6);
// // node6.next = node5, node5.next = node4;
// // 1 → 6 → 2 → 5 → 3 → 4
// node1.next = node6, node6.next = node2;
// node2.next = node5, node5.next = node3;
// node3.next = node4;

// const testHead = node1;
// function sortOddAscendingEvenDescendingLinkedList(head: Node) {
//     const [oddHead, evenHead] = splitOddAndEven(head);
//     const newEvenHead = reverseList(evenHead);
//     const res = mergeList(oddHead, newEvenHead);
//     printList(res);
//     return res;
// }

// function splitOddAndEven(head: Node): Node[] {
//     if (!head) return [null, null];
//     const res = [];
//     let cur = head;
//     let dummy = new Node();
//     let nextPre = dummy;
//     while (cur?.next) {
//         const next = cur.next;
//         nextPre.next = next;
//         nextPre = next;
//         cur.next = next?.next;
//         cur = cur.next;
//     }
//     res.push(head);
//     res.push(dummy.next);
//     return res;
// }

// function reverseList(head: Node) {
//     if (!head || !head.next) return head;
//     let pre = null;
//     let cur = head;
//     while (cur) {
//         const next = cur.next;
//         cur.next = pre;
//         pre = cur;
//         cur = next;
//     }
//     return pre;
// }

// function mergeList(node1: Node, node2: Node) {
//     let dummy = new Node();
//     let pre = dummy;
//     while (node1 && node2) {
//         if (node1.val <= node2.val) {
//             pre.next = node1;
//             node1 = node1.next;
//         } else {
//             pre.next = node2;
//             node2 = node2.next;
//         }
//         pre = pre.next;
//     }

//     pre.next = node1 || node2;
//     return dummy.next;
// }

// function printList(node: Node) {
//     let cur = node;
//     const res = [];
//     let isFirst = true;
//     while (cur) {
//         if (!isFirst) {
//             res.push('->');
//         }
//         res.push(cur.val);
//         cur = cur.next;
//         isFirst = false;
//     }
//     console.log('list is ', res);
// }

// // 执行用例
// sortOddAscendingEvenDescendingLinkedList(testHead);

class ListNode {
    val: number;
    next: ListNode;
    constructor(val?: number, next?: ListNode) {
        this.val = val;
        this.next = next;
    }
}

// 1->6->3->4->5->2
const node1 = new ListNode(1);
const node2 = new ListNode(2);
const node3 = new ListNode(3);
const node4 = new ListNode(4);
const node5 = new ListNode(5);
const node6 = new ListNode(6);
node1.next = node6;
node6.next = node3;
node3.next = node4;
node4.next = node5;
node5.next = node2;

/** 拆分奇数偶数链表 */
function splitList(node: ListNode): [ListNode, ListNode] {
    if (!node || !node.next) return [node, null];
    const dummy = new ListNode();
    let cur = node, nextPre = dummy;
    while (cur?.next) {
        const next = cur.next;
        cur.next = cur.next.next;
        cur = next.next; // !!! 注意上面已经修改了指向 这里正确的做法应该是使用next更新cur
        nextPre.next = next;
        nextPre = nextPre.next;
    }
    return [node, dummy.next]; // !!! 注意返回应该是dummy的next
}

function reverseList(node: ListNode) {
    if (!node || !node.next) {
        return node;
    }
    let pre = null, cur = node;
    while (cur) {
        const next = cur.next;
        cur.next = pre;
        pre = cur;
        cur = next;
    }
    return pre;
}

function mergeList(node1: ListNode, node2: ListNode) {
    if (!node1 || !node2) return node1 || node2;
    const dummy = new ListNode();
    let cur = dummy;
    while (node1 && node2) {
        if (node1.val <= node2.val) {
            cur.next = node1;
            node1 = node1.next;
        } else {
            cur.next = node2;
            node2 = node2.next;
        }
        cur = cur.next;
    }
    cur.next = node1 || node2;
    return dummy.next;
}

function printList(node: ListNode) {
    const res = [];
    let cur = node;
    if (!node) return res;
    let isFirst = true;
    while (cur) {
        if (!isFirst) {
            res.push('->');
        }
        isFirst = false;
        res.push(cur.val);
        cur = cur.next;
    }
    return res;
}

function sortOddAscendingEvenDescendingLinkedList(node: ListNode) {
    if (!node || !node.next) return node;
    const [oddHead, evenHead] = splitList(node);
    const newEvenHead = reverseList(evenHead);
    const resNode = mergeList(oddHead, newEvenHead);
    const res = printList(resNode);
    console.log('yizhi res is ', res);
}
sortOddAscendingEvenDescendingLinkedList(node1);
