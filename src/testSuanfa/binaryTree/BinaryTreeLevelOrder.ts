export {}
/** 二叉树层序遍历 时间复杂度 o(n) 空间复杂度 o(w)-bfs 树的最大宽度 / o(h)-dfs 树的最大高度 */
class TreeNode {
    left: TreeNode;
    right: TreeNode;
    val: number;
    constructor(val: number, left: TreeNode | null, right: TreeNode | null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

//#region bfs实现 on ow
/** bfs 时间复杂度on 空间复杂度ow */
function levelOrder(root: TreeNode): number[][] {
    if (!root) return [];
    const queue = [root];
    const res = [];
    while(queue.length > 0) {
        const size = queue.length;
        const currentLevel = [];
        for (let i = 0; i < size; i++) {
            const node = queue.shift(); // 取出队列首位元素
            currentLevel.push(node.val); // 注意 这里是塞数而不是node
            if (node.left) {
                queue.push(node.left);
            }
            if (node.right) {
                queue.push(node.right);
            }
        }
        res.push(currentLevel);
    }
    return res;
}
//#endregion bfs实现


//#region dfs实现 on oh

function levelOrderForDFS(root: TreeNode | null): number[][] {
    const res = [];
    dfs(root, 0, res);
    return res;
};

function dfs(node: TreeNode, level: number, res: number[][]) {
    if (!node) return;
    if (level == res.length) {
        res.push([]); // 层级和结果数组长度一致 添加新数组
    }

    res[level].push(node.val);
    dfs(node.left, level+1, res);
    dfs(node.right, level+1, res);
}

//#endregion dfs实现

function buildTree(arr: number[], index: number): TreeNode {
    if (arr.length == 0 || index >= arr.length || !arr[index]) return null;
    const root = new TreeNode(arr[index], null, null);
    const left = buildTree(arr, 2*index + 1);
    const right = buildTree(arr, 2*index + 2);
    root.left = left;
    root.right = right;
    return root;
}

const testArr = [1,2,3,null,null,6,7];
const root = buildTree(testArr, 0);
console.log('al-level order is ', levelOrder(root));

