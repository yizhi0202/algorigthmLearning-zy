export {};

class ListNode {
    val: number;
    next: ListNode | null;
    constructor(val?: number, next?: ListNode | null) {
        this.val = val;
        this.next = next;
    }
}

function mergeTwoLists(pre: ListNode, list1: ListNode | null, list2: ListNode | null): ListNode | null {
    while (pre && list1 && pre.val == list1.val) {
        list1 = list1.next;
    }
    while(pre && list2 && pre.val == list2.val) {
        list2 = list2.next;
    }
    if (!list1) return list2;
    if (!list2) return list1;

    if (list1.val < list2.val) {
        list1.next = mergeTwoLists(list1, list1.next, list2);
        return list1;
    } else {
        list2.next = mergeTwoLists(list2, list1, list2.next);
        return list2;
    }
};

function iterationMergeTwoList(list1, list2) {
    const dummy = new ListNode(undefined);
    let cur = dummy;
    
    while (list1 && list2) {
        // 选择较小的节点
        if (list1.val <= list2.val) {
            // 去重：跳过与当前节点值相同的节点
            if (cur.val !== list1.val) {
                cur.next = list1;
                cur = cur.next;
            }
            list1 = list1.next;
        } else {
            if (cur.val !== list2.val) {
                cur.next = list2;
                cur = cur.next;
            }
            list2 = list2.next;
        }
    }
    
    // 处理剩余节点
    let remain = list1 || list2;
    while (remain) {
        if (cur.val !== remain.val) {
            cur.next = remain;
            cur = cur.next;
        }
        remain = remain.next;
    }
    
    return dummy.next;
}

const arr = [1,2,2,4,5,7,8];
const arr2 = [2,3,5,8,9];
function getListNode(arr: number[]) {
    const dummyNode = new ListNode(0);
    let cur = dummyNode;
    for (const num of arr) {
        const tmpNode = new ListNode(num);
        cur.next = tmpNode;
        cur = cur.next;
    }
    return dummyNode.next;
}

function printList(head: ListNode) {
    const res = [];
    while(head) {
        res.push(head.val);
        head = head.next;
    }
    const finalMsg = res.join(' -> ');
    console.log('finalmsg is ', finalMsg);
}

const head = getListNode(arr);
const head2 = getListNode(arr2);
const resHead = mergeTwoLists(null, head, head2);
// const resHead = iterationMergeTwoList(head, head2);
printList(resHead);


