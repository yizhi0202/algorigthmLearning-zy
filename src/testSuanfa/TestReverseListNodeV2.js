var ListNode = /** @class */ (function () {
    function ListNode(val, next) {
        this.val = (val === undefined ? 0 : val);
        this.next = (next === undefined ? null : next);
    }
    return ListNode;
}());


function reverseBetween(head, left, right) {
    var dummyNode = new ListNode(0, head);
    var pre = dummyNode;
    for (var i = 1; i < left; i++) {
        pre = pre.next;
    }
    var reversed = reverseList(pre.next, right - left + 1);
    pre.next = reversed;
    return dummyNode.next;
}

function reverseBetweenV2(head, left, right) {
    const dummyHead = new ListNode();
    dummyHead.next = head; //!!!注意这里需要生成dummy后链接
    let pre = dummyHead;
    let cur = head;
    let start = 0;
    while(head && start < left - 1) {
        const next = cur.next;
        pre = cur;
        cur = next;
        start++;
    }
    
    for (let i = 0; i < (right - left); i++) { //头插法 若有三个节点需要对调 则cur后元素头插两次
        const adjustNode = cur.next;
        cur.next = cur.next.next;
        adjustNode.next = pre.next;
        pre.next = adjustNode;
    }

    return dummyHead.next;
}

function reverseList(node, n) {
    if (n == 1 || !node || !node.next) {
        return node;
    }
    var reversedNode = reverseList(node.next, n - 1);
    var tmp = node.next.next; // 记录需要反转节点区间外下一个节点
    node.next.next = node; // 调整反转节点2指向反转节点1
    node.next = tmp; // 反转节点1指向区间外下一个节点信息
    return reversedNode;
}

function printList(head) {
    var res = [];
    const map = new Map();
    while (head) {
        if (map.has(head.val)) {
            res.push(head.val);
            break;
        }
        map.set(head.val, head);
        res.push(head.val);
        head = head.next;
    }
    console.log(res);
}
// 创建带环链表：1 -> 2 -> 3 -> 4 -> 5 -> 3 (形成环)
function createCircularList() {
    var node1 = new ListNode(1);
    var node2 = new ListNode(2);
    var node3 = new ListNode(3);
    var node4 = new ListNode(4);
    var node5 = new ListNode(5);
    node1.next = node2;
    node2.next = node3;
    node3.next = node4;
    node4.next = node5;
    node5.next = node3; // 形成环：5 -> 3
    return node1;
}
// 测试反转函数在带环链表上的行为
function testCircularList() {
    var circularList = createCircularList();
    console.log('创建了带环链表: 1 -> 2 -> 3 -> 4 -> 5 -> 3 (环)');
    try {
        // 尝试反转部分链表
        var result = reverseBetweenV2(circularList, 3, 5);
        printList(result);
        console.log('反转成功（理论上不应该发生）');
    }
    catch (error) {
        console.log('发生错误:', error.message);
    }
}
testCircularList();
