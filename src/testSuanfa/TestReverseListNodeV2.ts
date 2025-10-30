class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.next = (next===undefined ? null : next)
    }
  }

   function reverseBetween(head: ListNode | null, left: number, right: number): ListNode | null {
    const dummyNode = new ListNode(0, head);

    let pre = dummyNode;
    for (let i = 1; i < left; i++) {
        pre = pre.next;
    }
    const reversed = reverseList(pre.next, right-left+1);
    pre.next = reversed;
    return dummyNode.next;
 }
  
   function reverseList(node: ListNode, n: number) {
    if (n == 1 || !node || !node.next) {
        return node;
    }
    const reversedNode = reverseList(node.next, n-1);
    const tmp = node.next.next; // 记录需要反转节点区间外下一个节点
    node.next.next = node; // 调整反转节点2指向反转节点1
    node.next = tmp; // 反转节点1指向区间外下一个节点信息
    return reversedNode;
 }

// 创建带环链表：1 -> 2 -> 3 -> 4 -> 5 -> 3 (形成环)
function createCircularList(): ListNode {
    const node1 = new ListNode(1);
    const node2 = new ListNode(2);
    const node3 = new ListNode(3);
    const node4 = new ListNode(4);
    const node5 = new ListNode(5);
    
    node1.next = node2;
    node2.next = node3;
    node3.next = node4;
    node4.next = node5;
    node5.next = node3; // 形成环：5 -> 3
    
    return node1;
}

// 测试反转函数在带环链表上的行为
function testCircularList() {
    const circularList = createCircularList();
    console.log('创建了带环链表: 1 -> 2 -> 3 -> 4 -> 5 -> 3 (环)');
    
    try {
        // 尝试反转部分链表
        const result = reverseBetween(circularList, 2, 4);
        console.log('反转成功（理论上不应该发生）');
    } catch (error) {
        console.log('发生错误:', error.message);
    }
}

testCircularList();