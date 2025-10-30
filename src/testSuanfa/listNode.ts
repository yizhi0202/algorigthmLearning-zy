 class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.next = (next===undefined ? null : next)
    }
  }


/** 迭代法 */
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

/** 递归法 */
function reverseList2(head: ListNode | null): ListNode | null {
    if (!head || !head.next) { // 找到末尾newHead
        return head;
    }
    let newHead = reverseList(head.next);
    head.next.next = head;
    head.next = null;
    return newHead;
}



function printList(node: ListNode | null) {
  const res = [];
  while(node) {
    res.push(node.val);
    node = node.next;
  }
  console.log('yizhi list is ', res);
}

const node1 = new ListNode(1, null);

const node4 = new ListNode(4, node1);
const node3 = new ListNode(3, node4);
const node2 = new ListNode(2, node3);
node1.next = node2;

const res = reverseList(node1);
printList(res);