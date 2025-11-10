export {}
function sub(str1, str2) {
    let idxOne = str1.length - 1;
    let idxTwo = str2.length - 1;
    let borrow = 0;
    let res = '';
    while (idxOne >= 0 || idxTwo >= 0) {
        const num1 = idxOne >= 0 ? parseInt(str1[idxOne]) : 0;
        const num2 = idxTwo >= 0 ? parseInt(str2[idxTwo]) : 0; // !!!这里 是str2[idxTwo] 而不是str1
        const tmp = (num1 - num2 - borrow + 10) % 10;
        res += tmp.toString();
        // res +=  String(tmp);
        borrow = (num1 - num2 - borrow) < 0 ? 1 : 0;
        idxOne--;
        idxTwo--;
    }
    res = res.split('').reverse().join(''); // 颠倒顺序 !!! 注意赋值更新 不要依赖函数实现
    let pos = 0;
    for (let i = 0; i < res.length - 1; i++) {
        if (res[i] != '0') {
            break;
        };
        pos = i + 1;
    }
    return res.substring(pos); // 删除前面的无用0 但保留最后一个0
}

function compare(str1, str2): boolean {
    if (str1.length == str2.length) return str1 >= str2;
    return str1.length >= str2.length; 
}

function subStrings(str1, str2) {
    let res = '';
    if (compare(str1, str2)) {
        res = sub(str1, str2);
    } else {
        res = sub(str2, str1);
        if (res != '0') {
            res = '-' + res;
        }
    }
    return res;
}

const res1 = subStrings('321', '320');
const res2 = subStrings('18', '57');
console.log('yizhi- res1 is ', res1, ' res2 is ', res2);