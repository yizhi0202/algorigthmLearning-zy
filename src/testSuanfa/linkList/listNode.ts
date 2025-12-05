 export {};
 class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.next = (next===undefined ? null : next)
    }
  }


/** 迭代法 有环不会死循环 环外不翻转 环内翻转*/
function reverseList(head: ListNode | null): ListNode | null {
    let pre = null;
    let cur = head;
    while(cur) {
        const next = cur.next;
        cur.next = pre;
        pre = cur;
        cur = next;
    }
    return pre;
};

/** 递归法 有环死循环爆栈*/
function reverseList2(head: ListNode | null): ListNode | null {
    if (!head || !head.next) { // 找到末尾newHead
        return head;
    }
    let newHead = reverseList2(head.next);
    head.next.next = head;
    head.next = null;
    return newHead;
}

/** 头插迭代 有环会死循环 */
function reverseListV3(head: ListNode | null): ListNode | null {
    if (!head || !head.next) return head;
    const dummy = new ListNode(-1, head);
    let cur = head;
    while (cur?.next) {
        const next = cur.next;
        cur.next = next.next;
        next.next = dummy.next; // !!! 这里指向的是dummy.next cur 只有第一次遍历才是dummy.next
        dummy.next = next;
    }
    return dummy.next;
};



function printList(node: ListNode | null) {
  const res = [];
  const set = new Set();
  while(node && !set.has(node)) {
    set.add(node);
    res.push(node.val);
    node = node.next;
  }
  console.log('yizhi list is ', res);
}

const node1 = new ListNode(1)
const node2 = new ListNode(2);
const node3 = new ListNode(3);
const node4 = new ListNode(4);
node1.next = node2;
node2.next = node3;
node3.next = node4;
node4.next = node2;

printList(node1);
const res = reverseList(node1);
printList(res);

// const res2 = reverseList2(node1);
// printList(res2);