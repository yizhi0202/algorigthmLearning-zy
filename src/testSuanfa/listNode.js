var ListNode = /** @class */ (function () {
    function ListNode(val, next) {
        this.val = (val === undefined ? 0 : val);
        this.next = (next === undefined ? null : next);
    }
    return ListNode;
}());
/** 迭代法 */
function reverseList(head) {
    var pre = null;
    var cur = head;
    while (cur) {
        var next = cur.next;
        cur.next = pre;
        pre = cur;
        cur = next;
    }
    return pre;
}
;
/** 递归法 */
function reverseList2(head) {
    if (!head || !head.next) { // 找到末尾newHead
        return head;
    }
    var newHead = reverseList(head.next);
    head.next.next = head;
    head.next = null;
    return newHead;
}
function printList(node) {
    var res = [];
    while (node) {
        res.push(node.val);
        node = node.next;
    }
    console.log('yizhi list is ', res);
}
var node1 = new ListNode(1, null);
var node4 = new ListNode(4, node1);
var node3 = new ListNode(3, node4);
var node2 = new ListNode(2, node3);
node1.next = node2;
var res = reverseList2(node1);
printList(res);
