export {};

/** 
 * 假定减法都是大数减去小数（简化逻辑）
 *  - 如果输入是小减大 则调换顺序 结果不为0 补充符号标
 * 定义借位
 * 计算减法结果时取余采用+10取余
 * 借位设置逻辑 - 若前减后小于0 则借位
 * 结果去除前导0
 */
function sub(str1: string, str2: string) {
    if (!str1 || !str2) return str1 || str2;
    const len1 = str1.length;
    const len2 = str2.length;
    let idx1 = len1 - 1, idx2 = len2 - 1;
    let borrow = 0;
    let res = '';
    while (idx1 >= 0 || idx2 >= 0) {
        const num1 = idx1 >= 0 ? (str1.charCodeAt(idx1) - '0'.charCodeAt(0)) : 0;
        const num2 = idx2 >= 0 ? (str2.charCodeAt(idx2) - '0'.charCodeAt(0)) : 0;
        const diff = num1 - num2 - borrow;
        res = ((diff + 10) % 10).toString() + res;
        borrow = diff < 0 ? 1 : 0;
        idx1--; // !!! 递减
        idx2--;
    }

    let pos = 0; // 记录非0开始的位置
    let len = res.length;
    for (let i = 0; i < len - 1; i++) {
        if (res[i] != '0') {
            break;
        }
        pos = i + 1;
    }

    return res.substring(pos);
}

function compare(str1, str2) {
    if (str1.length == str2.length) return str1 >= str2;
    return str1.length >= str2.length;
}

function subString(str1, str2) {
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

const res1 = subString('321', '320');
const res2 = subString('18', '57');
console.log('yizhi res1 is ', res1, ' res2 is ', res2);