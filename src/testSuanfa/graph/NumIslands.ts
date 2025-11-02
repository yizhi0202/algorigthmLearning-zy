export {}
/** 并查集求解岛屿数 */
function numIslands(grid: string[][]): number {
    if (!grid.length || !grid[0].length) return 0;
    
    const m = grid.length, n = grid[0].length;
    const uf = new UnionFind(grid);
    
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === '1') {
                // 检查右边
                if (j + 1 < n && grid[i][j + 1] === '1') {
                    uf.union(i * n + j, i * n + j + 1);
                }
                // 检查下边
                if (i + 1 < m && grid[i + 1][j] === '1') {
                    uf.union(i * n + j, (i + 1) * n + j);
                }
            }
        }
    }
    
    return uf.count;
}

class UnionFind {
    parent: number[];
    count: number;
    
    constructor(grid: string[][]) {
        const m = grid.length, n = grid[0].length;
        this.parent = new Array(m * n);
        this.count = 0;
        
        for (let i = 0; i < m; i++) {
            for (let j = 0; j < n; j++) {
                if (grid[i][j] === '1') {
                    const index = i * n + j;
                    this.parent[index] = index;
                    this.count++;
                }
            }
        }
    }
    
    find(x: number): number {
        while (x != this.parent[x])
        {
            x = this.parent[x];
        }
        return x;
    }
    
    union(x: number, y: number): void {
        const rootX = this.find(x);
        const rootY = this.find(y);
        
        if (rootX !== rootY) {
            this.parent[rootX] = rootY;
            this.count--;
        }
    }
}