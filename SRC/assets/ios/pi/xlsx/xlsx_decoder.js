_$define("pi/xlsx/xlsx_decoder", function (require, exports, module){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tableInterval = 2;
/**
 * 解析xls（一个sheet表中可能含有多个表）
 */
exports.decode = function (s, space) {
    var sheet = initSheet(s);
    var tables = getTables(sheet, space || tableInterval);
    return [tables, sheet];
};
/**
 * 读表(每次读一行)
 */
exports.readTable = function (sheet, table) {
    var row = table.rowHand + table.start.row;
    var col = table.colHand + table.start.col;
    if (row > table.end.row) {
        return null;
    }
    var arr = [];
    var i = 0;
    while (col) {
        arr[i] = sheet.data.get(col + "-" + row);
        i++;
        col = exports.next(col, table.end.col);
    }
    table.rowHand++;
    return arr;
};
// 下一单元格
exports.nextCell = function (curRow, curCol, endRow, endCol) {
    var startCol = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;

    curCol = exports.next(curCol, endCol);
    if (!curCol) {
        curRow = exports.next(curRow, endRow);
        if (!curRow) {
            return null;
        }
        curCol = startCol;
    }
    return { row: curRow, col: curCol };
};
// 下一列或下一行
exports.next = function (cur, end) {
    var nextIndex = cur + 1;
    // 超出图表范围
    if (nextIndex > end) {
        return null;
    } else {
        return nextIndex;
    }
};
/**
 * 默认空两行和两列为表的边界
 */
var initSheet = function initSheet(data) {
    var sheet = { ref: null, merge: null, data: null };
    initSheetRef(data['!ref'], sheet);
    // sheet.data = data;
    // initSheetMerge(data["!merges"], sheet);
    initSheetData(data, sheet);
    return sheet;
};
var initSheetData = function initSheetData(data, sheet) {
    sheet.data = new Map();
    for (var k in data) {
        if (k.indexOf('!') < 0) {
            var cell = getCell(k);
            // tslint:disable:prefer-template
            sheet.data.set(cell.col + '-' + cell.row, data[k]);
        }
    }
};
var initSheetMerge = function initSheetMerge(m, sheet) {
    if (m) {
        sheet.merge = new Map();
        for (var i = 0; i < m.length; i++) {
            var col = m[i].s.col + 1;
            var row = m[i].s.row + 1;
            sheet.merge.set(col + "-" + row, { start: { row: row, col: col }, end: { row: m[i].e.row + 1, col: m[i].e.col + 1 } });
        }
    }
};
/*
* @param "A1:CF200"
*/
var initSheetRef = function initSheetRef(r, sheet) {
    var ref = { start: null, end: null };
    if (r) {
        var arr = r.split(':');
        ref.start = getCell(arr[0]);
        ref.end = getCell(arr[1]);
        sheet.ref = ref;
    }
};
var getCell = function getCell(name) {
    var i = 0;
    while (i < name.length) {
        if (name.charCodeAt(i) < 65) {
            return { col: colParseInt(name.slice(0, i)), row: +name.slice(i, name.length) };
        }
        i++;
    }
};
/**
 * 默认空两行和两列为表的边界
 */
var getTables = function getTables(sheet, space) {
    // 空表
    if (!sheet.ref) {
        return null;
    }
    var tables = [];
    var cell = { row: 1, col: 1 };
    while (cell) {
        var table = findTable(sheet, cell.col, cell.row, tables);
        if (table) {
            tables.push(table);
            cell = exports.nextCell(table.start.row, table.end.col, sheet.ref.end.row, sheet.ref.end.col);
        } else {
            break;
        }
    }
    if (tables.length > 0) {
        return mergeTables(tables, sheet.ref.end.col, space);
    } else {
        return null;
    }
};
/**
 * 合并表
 */
var mergeTables = function mergeTables(tables, maxCol, space) {
    var preScan = function preScan(curIndex, tables) {
        for (var i = curIndex - 1; i >= 0; i--) {
            if (tables[i] && isSameTable(tables[curIndex], tables[i], maxCol, space)) {
                mergeTable(tables[i], tables[curIndex]);
                delete tables[i];
                preScan(curIndex, tables);
            }
        }
    };
    for (var i = 0; i < tables.length - 1; i++) {
        if (!tables[i]) {
            continue;
        }
        for (var j = i + 1; j < tables.length; j++) {
            if (tables[j] && isSameTable(tables[i], tables[j], maxCol, space)) {
                mergeTable(tables[i], tables[j]);
                delete tables[i];
                preScan(j, tables);
                break;
            }
        }
    }
    var t = [];
    for (var _i = 0; _i < tables.length; _i++) {
        tables[_i] && t.push(tables[_i]);
    }
    return t;
};
var mergeTable = function mergeTable(table1, table2) {
    table1.start.row < table2.start.row && (table2.start.row = table1.start.row);
    table1.start.col < table2.start.col && (table2.start.col = table1.start.col);
    table1.end.row > table2.end.row && (table2.end.row = table1.end.row);
    table1.end.col > table2.end.col && (table2.end.col = table1.end.col);
};
/**
 * 是否为同一个表（每个表格应该是一个矩形， 表格间的间距大于等于2个单元格， 一个表格不能出现在另一个表格内部）
 */
var isSameTable = function isSameTable(table1, table2, maxCol, space) {
    var start1 = table1.start;
    var start2 = table2.start;
    var end1 = table1.end;
    var end2 = table2.end;
    if (start1.row - end2.row > space || start2.row - end1.row > space) {
        return false;
    } else if (start1.col - end2.col > space || start2.col - end1.col > space) {
        return false;
    } else {
        return true;
    }
};
/**
 * 找table
 */
var findTable = function findTable(sheet, startCol, startRow, tables) {
    var cell = { row: startRow, col: startCol };
    while (true) {
        var start = findTableStart(sheet, cell.col, cell.row);
        if (start) {
            for (var i = 0; i < tables.length; i++) {
                var t = tables[i];
                if (start.row <= t.end.row && start.row >= t.start.row && start.col <= t.end.col && start.col >= t.start.col) {
                    cell = exports.nextCell(start.row, t.end.col, sheet.ref.end.row, sheet.ref.end.col);
                    continue;
                }
            }
            var end = findTableEnd(sheet, start.row, start.col);
            return { start: start, end: end, rowHand: 0, colHand: 0 };
        } else {
            return null;
        }
    }
};
/**
 * 找table开始
 */
var findTableStart = function findTableStart(sheet, startCol, startRow) {
    while (startRow) {
        startCol = rowStart(sheet, startRow, startCol, sheet.ref.end.col);
        if (startCol) {
            return { row: startRow, col: startCol };
        }
        startRow = exports.next(startRow, sheet.ref.end.row);
        startCol = 1;
    }
    return null;
};
// 找table
var findTableEnd = function findTableEnd(sheet, startRow, startCol) {
    var endCol = rowEnd(sheet, startRow, startCol, sheet.ref.end.col);
    var endRow = colEnd(sheet, startCol, startRow, sheet.ref.end.row);
    return { row: endRow, col: endCol };
};
// 找某一行的结束 默认空两行为结束
var rowEnd = function rowEnd(sheet, row, startCol, endCol) {
    var col = startCol;
    while (true) {
        var next1 = exports.next(col, endCol);
        if (!next1) {
            return col;
        }
        if (!sheet.data.get(next1 + "-" + row)) {
            var next2 = exports.next(next1, endCol);
            if (!next2 || !sheet.data.get(next2 + "-" + row)) {
                return col;
            }
            col = next2;
        } else {
            col = next1;
        }
    }
};
// 找某一行的结束 默认空两列为结束
var colEnd = function colEnd(sheet, col, startRow, endRow) {
    var row = startRow;
    while (true) {
        var next1 = exports.next(row, endRow);
        if (!next1) {
            return row;
        }
        if (!sheet.data.get(col + "-" + next1)) {
            var next2 = exports.next(next1, endRow);
            if (!next2 || !sheet.data.get(col + "-" + next2)) {
                return row;
            }
            row = next2;
        } else {
            row = next1;
        }
    }
};
// 找某一列的开始
var colStart = function colStart(sheet, col, startRow, endRow) {
    var row = startRow;
    while (row) {
        if (sheet.data.get(col + "-" + row)) {
            return row;
        }
        row = exports.next(row, endRow);
    }
    return null;
};
// 找某一行的开始
var rowStart = function rowStart(sheet, row, startCol, endCol) {
    var col = startCol;
    while (col) {
        if (sheet.data.get(col + "-" + row)) {
            return col;
        }
        col = exports.next(col, endCol);
    }
    return null;
};
// 比较列的大小
var compareCol = function compareCol(max, min) {
    var value = '';
    var minLen = min.length;
    var maxLen = max.length;
    if (maxLen < minLen) {
        return -1;
    } else if (maxLen > minLen) {
        return 1;
    }
    for (var i = 0; i < min.length; i++) {
        if (max.charAt(i) < min.charAt(i)) {
            return -1;
        } else if (max.charAt(i) > min.charAt(i)) {
            return 1;
        }
    }
    return 0; // 相等
};
// 上一列
var preCol = function preCol(curCol, startCol) {
    var arr = curCol.split('');
    var i = curCol.length - 1;
    var r = void 0;
    while (i >= 0) {
        var v = curCol.charCodeAt(i);
        if (v === 65) {
            // v = "A"
            arr[i] = 'Z';
            i--;
        } else {
            arr[i] = String.fromCharCode(v - 1);
            break;
        }
    }
    if (i === -1) {
        return null;
    } else {
        r = arr.join('');
    }
};
// 把列号转成z整数
var colParseInt = function colParseInt(str) {
    var j = 0;
    var value = 0;
    for (var i = str.length - 1; i >= 0; i--) {
        var code = str.charCodeAt(i);
        value += (code - 64) * Math.pow(26, j);
        j++;
    }
    return value;
};
// 把列号转成字符串
var colParseStr = function colParseStr(n) {
    var str = '';
    var i = 1;
    while (n > 0) {
        var sur = n % Math.pow(26, i);
        if (sur > 0) {
            str = String.fromCharCode(sur / Math.pow(26, i - 1) + 64) + str;
            n = n - sur;
        } else {
            str = 'Z' + str;
            n = n - Math.pow(26, i - 1);
        }
        i++;
    }
    return str;
};
})