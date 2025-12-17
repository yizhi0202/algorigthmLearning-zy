export {}

/** 获取相交节点完整版 包括了可能有环的情况
 * 时间复杂度o(m+n) 空间复杂度o(1)
 * 核心步骤
 *  1 获取环入口
 *      判断是否有环（快慢指针）
 *      有环走x步得到入口
 *  2 判断选取解法
 *      都无环入口 普通双指针相交链表解法
 *      一个有一个无 直接return null 不可能相交
 *      都有环入口 则判断是否同一个入口 
 *                  是则回退到无环入口的解法逻辑
 *                  不是则判断是否共享环 （从entryA 遍历一圈是否有指针等于entryB 有返回true 无false)
 *                          共享环返回entryA (或entryB)
 *      默认兜底返回null
 */

interface ListNode {
  val: number;
  next: ListNode | null;
}

/**
 * 检测环并返回入口节点（Floyd 算法）
 * 时间 O(n)，空间 O(1)
 */
const detectCycle = (head: ListNode | null): ListNode | null => {
  if (!head || !head.next) return null;

  let slow: ListNode | null = head;
  let fast: ListNode | null = head;

  // 第一阶段：快慢指针找相遇点
  while (fast && fast.next) {
    slow = slow!.next;
    fast = fast.next.next;
    if (slow === fast) break;
  }

  // 无环
  if (!fast || !fast.next) return null;

  // 第二阶段：找环入口
  slow = head;
  while (slow !== fast) {
    slow = slow!.next;
    fast = fast!.next;
  }

  return slow;
};

/**
 * 无环链表的相交点（双指针法）
 */
const getIntersectionNoLoop = (
  headA: ListNode,
  headB: ListNode,
  endA: ListNode | null = null, // 虚拟终点，默认 null
  endB: ListNode | null = null
): ListNode | null => {
  let pA: ListNode | null = headA;
  let pB: ListNode | null = headB;

  while (pA !== pB) {
    // 到达终点后切换到另一个链表头
    pA = pA === endA ? headB : pA!.next;
    pB = pB === endB ? headA : pB!.next;
  }

  return pA === endA ? null : pA; // 如果相遇在终点，说明不相交
};

/**
 * 入口相同时，找真正的交点
 * 把 entry 当作"终点"，转化为无环问题
 */
const getIntersectionSameEntry = (
  headA: ListNode,
  headB: ListNode,
  entry: ListNode
): ListNode | null => {
  // 计算 headA 到 entry 的距离
  const getLen = (head: ListNode, end: ListNode): number => {
    let len = 0;
    let curr: ListNode | null = head;
    while (curr !== end) {
      len++;
      curr = curr!.next;
    }
    return len;
  };

  const lenA = getLen(headA, entry);
  const lenB = getLen(headB, entry);

  let pA: ListNode | null = headA;
  let pB: ListNode | null = headB;

  // 让长的先走差值步
  const diff = Math.abs(lenA - lenB);
  if (lenA > lenB) {
    for (let i = 0; i < diff; i++) pA = pA!.next;
  } else {
    for (let i = 0; i < diff; i++) pB = pB!.next;
  }

  // 同步走，第一个相同节点就是交点
  while (pA !== pB) {
    pA = pA!.next;
    pB = pB!.next;
  }

  return pA; // 可能是 entry 本身，也可能是 entry 之前的节点
};

/**
 * 检查两个环入口是否在同一个环上
 */
const isSameLoop = (entryA: ListNode, entryB: ListNode): boolean => {
  let curr: ListNode | null = entryA.next;
  while (curr !== entryA) {
    if (curr === entryB) return true;
    curr = curr!.next;
  }
  return false;
};

/**
 * 主函数：判断两个可能有环的链表是否相交
 * 时间 O(n + m)，空间 O(1)
 */
export const getIntersectionNode = (
  headA: ListNode | null,
  headB: ListNode | null
): ListNode | null => {
  if (!headA || !headB) return null;

  const entryA = detectCycle(headA);
  const entryB = detectCycle(headB);

  // 情况1：都无环 → 普通双指针
  if (!entryA && !entryB) {
    return getIntersectionNoLoop(headA, headB);
  }

  // 情况2：一个有环一个无环 → 不可能相交
  if (!entryA || !entryB) {
    return null;
  }

  // 情况3：都有环
  if (entryA === entryB) {
    // 3.1 入口相同：交点在入口或之前
    return getIntersectionSameEntry(headA, headB, entryA);
  }

  // 3.2 入口不同：检查是否同一个环
  if (isSameLoop(entryA, entryB)) {
    // 同一个环，两个入口都可以算交点，返回任意一个
    return entryA; // 或 entryB 都对
  }

  // 3.3 不同的环 → 不相交
  return null;
};