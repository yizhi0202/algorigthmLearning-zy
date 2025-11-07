export {}
/** 二叉树最近的公共祖先 */

class TreeNode {
    val: number;
    left: TreeNode;
    right: TreeNode;
    constructor(val, left, right) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

/** on o(max(w,h)) */
function lowestCommonAncestor(root: TreeNode, p: TreeNode, q: TreeNode): TreeNode | null {
    if (!root || !q || !p) return null;
    const parentMap = new Map();
    const queue = [root];
    while (queue.length) {
        const node = queue.shift();
        if (node?.left) {
            parentMap.set(node.left, node);
            queue.push(node.left);
        }

        if (node?.right) {
            parentMap.set(node.right, node);
            queue.push(node.right);
        }
    }

    let pNodeParent = new Set();
    let cur = p;
    while (cur) {
        pNodeParent.add(cur);
        cur = parentMap.get(cur);
    }

    cur = q;
    while (cur) {
        if (pNodeParent.has(cur)) {
            return cur;
        }
        cur = parentMap.get(cur);
    }
    return null;
}

function buildTreeWithLookup(arr, index, map) {
    if (!arr.length || index >= arr.length || typeof arr[index] !== 'number') return null;
    const node = new TreeNode(arr[index], null, null);
    map.set(arr[index], node);
    const left = buildTreeWithLookup(arr, 2*index + 1, map);
    const right = buildTreeWithLookup(arr, 2*index + 2, map);
    node.left = left;
    node.right = right;
    return node;
}

function buildTree(arr, targetsArr) {
    const nodeMap = new Map();
    const root = buildTreeWithLookup(arr, 0, nodeMap);
    const nodeArr = [];
    for (const target of targetsArr) {
        const node = nodeMap.get(target);
        if (node) nodeArr.push(node);
    }
    return {
        root,
        nodeArr
    }
}



const testArr = [1,3,5,6,7,8,9,10,11,12,13];
const obj = buildTree(testArr, [6,7]);
const lca = lowestCommonAncestor(obj?.root, obj?.nodeArr[0], obj?.nodeArr[1]);
console.log('zhiyi - lca is ', lca?.val);
