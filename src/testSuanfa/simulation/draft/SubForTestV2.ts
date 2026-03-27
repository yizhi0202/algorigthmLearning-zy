export {}

function isGreater(str1: string, str2: string): boolean {
    if (str1.length == str2.length) return str1 >= str2;
    return (str1.length || 0) >= (str2.length || 0);
}

function sub(str1: string, str2: string) {
    const len1 = str1.length, len2 = str2.length;
    let borrow = 0;
    let idx1 = len1 - 1, idx2 = len2 - 1;
    let res = '';
    while (idx1 >= 0 || idx2 >= 0) {
        const num1 = idx1 >= 0 ? (str1[idx1].charCodeAt(0) - '0'.charCodeAt(0)) : 0;
        const num2 = idx2 >= 0 ? (str2[idx2].charCodeAt(0) - '0'.charCodeAt(0)) : 0; // !!! 注意复制粘贴场景1全改2
        const diff = (num1 - borrow - num2 + 10) % 10;
        res += diff;
        borrow = (num1 - borrow - num2) >= 0 ? 0 : 1;
        idx1--;
        idx2--;
    }
    res = res.split('').reverse().join('');
    let pos = 0;
    for (let i = 0; i < res.length - 1; i++) {
        if (res[i] !== '0') {
            break;
        }
        pos = pos + 1;
    }
    return res.substring(pos);
}

function substringsTest(str1: string, str2: string) {
    let res = '';
    if (isGreater(str1, str2)) {
        res = sub(str1, str2);
    } else {
        res = sub(str2, str1);
        if (res != '0') {
            res = '-' + res;
        }
    }
    return res;
}

let testStr1 = '21', testStr2 = '16';
let testStr3 = '53', testStr4 = '68';
console.log('yizhi 34 - 27', substringsTest(testStr1, testStr2));
console.log('53- 68', substringsTest(testStr3, testStr4));


