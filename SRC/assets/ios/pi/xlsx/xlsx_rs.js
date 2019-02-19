_$define("pi/xlsx/xlsx_rs", function (require, exports, module){
"use strict";
/**
 * .xlsx配置解析
 *
 * 表配置格式：
 * 		第一行：第一个单元格为表名称， 必填, $开头表示类型为结构体， e$为枚举，v$为变量
 * 		第一行：除第一个单元格，其余为字段名称，可以是宏，必填
 * 		第二行：字段类型，选填，不填时为默认类型（bool, string, number）
 * 		剩余行：表数据
 *
 * 例1  |$Tranform  |position |      |      |rotation |      |      |objName |
 * 		|           |{x:i32   |y:i32 |z:i32}|[i32     |i32   |i32]  |        |
 * 		|           |3        |4     |5     |3        |4     |5     |  例1   |
 * 将导出结构体Transform{postion:{x:i32,y:i32,z:i32}, rotation:[i32,i32,i32]}, 及其具体的配置数据
 *
 * 例2 |e$SkyColor  |blue     |white   |black   |
 *     |            |         |str     |        |
 *     |            |#0000ff  |#ffffff |#000000 |
 * 将导出一个枚举类型 enum SkyColor{blue="#0000ff", white="#ffffff", black:"#000000"}, 枚举类型的值只能是u8
 *
 * 例3 |v$age  |
 *     |       |
 *     |20     |
 * 将导出一个变量 let age=20, 变量类型为基础类型
 *
 * 外键：当导出类型为结构体时， 每个字段还可以以引用其他数据结构中的数据， 配置格式形如:"../../pi/obj/sys.Position#id@id"(路径.结构类型#内部关联键@外部关联键)
 * 其中，内部关联键和外部关联键都可以省略，内部关联键默认为自身索引，外部关联键默认为关联数据的索引
 *
 * 主键：可以通过在字段名的单元格上添加批注（实际上是给结构体添加注解），来指明该字段为主键， 配置：#[primary=true]
 */

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var xlsx_decoder_1 = require("./xlsx_decoder");
var util_1 = require("../util/util");
var gendrust_1 = require("../compile/gendrust");
var tpl_1 = require("../util/tpl");
var tpl_str_1 = require("../util/tpl_str");
var pathMode = require("path");
var CfgSuff;
(function (CfgSuff) {
    CfgSuff["TS"] = "ts";
    CfgSuff["RS"] = "rs";
})(CfgSuff || (CfgSuff = {}));
var str = void 0;
var structId = void 0;
var structHead = "__Anon";
var quoteId = void 0;
var quoteHead = "__Quote";
var cfgSuff = CfgSuff.TS;
var sheetName = "";
var sheetLen = 0;
var filePath = "";
var srcRoot = "";
var rpath = "";
var outCfgStr = void 0;
var ownStructs = void 0;
var optimizaId = "a";
var optimizaName = "_";
var outCfgImport = void 0;
var cfg = void 0;
//默认将配置实例转化为ts文件，
exports.encodexls2rs = function (workBook, path, c, sr, srcpath) {
    str = [];
    cfg = {};
    cfg.cfgPath = parsePath(path + "/xx", c.cfgPath);
    structHead = cfg.structHead || "__Anon";
    cfgSuff = cfg.cfgSuff || CfgSuff.TS;
    filePath = path.replace(".xlsx", "").replace(/\\/g, "/");
    srcpath = srcpath.replace(".xlsx", "");
    srcRoot = sr;
    rpath = genPath(srcpath, srcRoot);
    var arr = rpath.split("/");
    var fileName = arr[arr.length - 1];
    sheetLen = workBook.SheetNames.length;
    if (sheetLen > 1) {
        cfg.cfgPath = parsePath(path + "/xx", c.cfgPath);
    } else {
        cfg.cfgPath = parsePath(path, c.cfgPath);
    }
    var rsStrs = new Map();
    for (var i = 0; i < sheetLen; i++) {
        outCfgStr = [];
        ownStructs = [];
        outCfgImport = [];
        structId = 1;
        optimizaId = "a";
        quoteId = 1;
        optimizaName = "_";
        var f = new File();
        f.imports = [];
        var name = sheetName = workBook.SheetNames[i];
        trimSheet(workBook.Sheets[name]);
        var r = xlsx_decoder_1.decode(workBook.Sheets[name]);
        var feildData = new FeildData();
        feildData.structs = tables2rs(r[1], r[0], name, f);
        for (var _i = 1; _i < structId; _i++) {
            ownStructs.push("" + structHead + _i);
        }
        var anonImportstr = ownStructs.join(",");
        var imports = util_1.unique(f.imports);
        feildData.outCfgStr = util_1.unique(outCfgStr);
        feildData.importsrs = toRsImports(imports);
        feildData.importsts = toTsImports(imports);
        feildData.outCfgImports = []; //toCfgImports(outCfgImport);
        if (cfgSuff === CfgSuff.TS) {
            if (sheetLen > 1) {
                feildData.ownImports = "import {" + anonImportstr + "} from \"./" + name + ".s\";";
            } else {
                feildData.ownImports = "import {" + anonImportstr + "} from \"./" + fileName + ".s\";";
            }
        } else if (cfgSuff === CfgSuff.RS) {
            //todo
            console.log("todo");
        }
        rsStrs.set(name, feildData);
    }
    return rsStrs;
};
//计算路径
var parsePath = function parsePath(selfPath, dstPath) {
    var p = pathMode.relative(selfPath, dstPath).replace(/\\/g, "/");
    var pp = p.split("/");
    if (pp[0] && pp[0] === "..") {
        if (pp[1] !== "..") {
            pp[0] = ".";
        } else {
            pp = pp.slice(1, pp.length);
        }
    }
    return pp.join("/");
};

var FeildData = function FeildData() {
    _classCallCheck(this, FeildData);

    this.importsrs = []; //导入
    this.importsts = []; //导入
    this.structs = []; //结构体定义和实例
    this.ownImports = "";
    this.defCfg = "import {cfgMgr} from \"" + cfg.cfgPath + "\"";
};

var toRsImports = function toRsImports(imports) {
    var is = [];
    for (var i = 0; i < imports.length; i++) {
        var lastIndex = imports[i].lastIndexOf("/");
        var path = imports[i].slice(0, lastIndex + 1);
        var name = imports[i].slice(lastIndex + 1, imports[i].length);
        is.push("#[path=" + path + "]use " + name + ".s;");
    }
    return is;
};
var toTsImports = function toTsImports(imports) {
    var is = [];
    for (var i = 0; i < imports.length; i++) {
        var lastIndex = imports[i].lastIndexOf("/");
        var name = imports[i].slice(lastIndex + 1, imports[i].length);
        is.push("import * as " + name + " from \"" + imports[i] + ".s\"");
    }
    return is;
};
var toCfgImports = function toCfgImports(imports) {
    var is = util_1.unique(imports);
    for (var i = 0; i < is.length; i++) {
        is[i] = "import * as _cfg" + i + " from \"" + is[i] + "_cfg\"";
    }
    return is;
};
var trimSheet = function trimSheet(sheet) {
    for (var k in sheet) {
        if (k.indexOf("!") < 0 && sheet[k].v && typeof sheet[k].v === "string") {
            sheet[k].v = trim(sheet[k].v);
        }
    }
};
var isTupleType = function isTupleType(type) {
    if (type instanceof TupleType) {
        return true;
    } else {
        return false;
    }
};
var isStructType = function isStructType(type) {
    if (type instanceof StructType) {
        return true;
    } else {
        return false;
    }
};
var isQuoteStruct = function isQuoteStruct(type) {
    if (type instanceof QuoteStructType) {
        return true;
    } else {
        return false;
    }
};
var isQuoteEnum = function isQuoteEnum(type) {
    if (type instanceof QuoteEnumType) {
        return true;
    } else {
        return false;
    }
};
var tables2rs = function tables2rs(sheet, tables, sheetName, f) {
    var str = [];
    if (tables) {
        for (var i = 0; i < tables.length; i++) {
            str.push(table2rs(sheet, tables[i], sheetName, f));
        }
    }
    return str;
};
var table2rs = function table2rs(sheet, table, sheetName, f) {
    var start = getTableStart(table, sheet);
    if (!start) {
        return ["", ""];
    }
    var startCell = sheet.data.get(start.col + "-" + start.row); //表开始第一个单元格的值
    var type = void 0,
        structName = void 0,
        fields = void 0;
    table.colHand = start.col - table.start.col + 1;
    table.rowHand = start.row - table.start.row;
    if (startCell.v.indexOf("$") === 0) {
        type = "struct";
        structName = startCell.v.slice(1, startCell.v.length); //去掉前两个字符e$符号，为表名
    } else if (startCell.v.indexOf("e$") === 0) {
        type = "enum";
        structName = startCell.v.slice(2, startCell.v.length); //去掉第一个$符号，为表名
    } else if (startCell.v === "v$") {
        type = "sample";
    } else if (startCell.v === "f$") {
        type = "formula";
    }
    fields = xlsx_decoder_1.readTable(sheet, table); //读字段
    if (!fields) {
        throw "xlsx\u89E3\u6790\u9519\u8BEF\uFF1A" + structName + "\u8868\u6CA1\u6709\u5B57\u6BB5";
    }
    var colTypes = xlsx_decoder_1.readTable(sheet, table); //读每列类型
    if (!colTypes) {
        colTypes = [];
    }
    var contents = [],
        r = xlsx_decoder_1.readTable(sheet, table);
    while (r) {
        contents.push(r);
        r = xlsx_decoder_1.readTable(sheet, table); //读实例
    }
    var struct = initStruct(fields, colTypes, contents, structName, type, startCell.c, f);
    return toStr(struct);
};
var getType = function getType(type, index, contents, fieldName, f) {
    var t = void 0;
    if (type && (type.endsWith("]") || type.endsWith("}"))) {
        type = type.slice(0, type.length - 1);
    }
    if (!type) {
        for (var i = 0; i < contents.length; i++) {
            if (contents[i] && contents[i][index]) {
                return new BaseType(xlsxType2Rs(contents[i][index].t), index);
            }
        }
        throw "无法确定字段类型！：" + fieldName;
    } else {
        var index1 = void 0;
        if (type.indexOf("[") === 0) {
            //元组类型
            t = new TupleType();
            t.elems = [];
            t.elems.push(getType(type.slice(1, type.length), index, contents, fieldName, f));
        } else if (type.indexOf("{") === 0) {
            //匿名结构体
            t = new StructType();
            t.name = "" + structHead + structId++;
            t.fields = new Map();
            var field = new Field();
            var _str = type.slice(1, type.length);
            var arr = _str.split(":");
            field.name = trim(arr[0]);
            field.type = getType(trim(arr[1]), index, contents, fieldName, f);
            t.fields.set(field.name, field);
        } else if (index1 = type.indexOf("#") > 0) {
            //引用结构体类型, 例："../../pi/obj/sys.Position#id@id
            var qst = new QuoteStructType();
            t = qst;
            var _arr = type.split("#");
            var pointIndex = _arr[0].lastIndexOf(".");
            var _index = _arr[0].lastIndexOf("/");
            qst.type = _arr[0].slice(_index + 1, _arr[0].length);
            qst.index = index;
            if (pointIndex === -1) {
                //引用当前文件的结构体
                qst.path = "./" + sheetName;
                qst.file = sheetName;
                t.type = _arr[0].slice(pointIndex + 1, _arr[0].length);
            } else {
                qst.path = _arr[0].slice(0, pointIndex);
                qst.file = _arr[0].slice(_index + 1, pointIndex);
                t.type = _arr[0].slice(pointIndex + 1, _arr[0].length);
                f.imports.push(qst.path);
            }
            parseForeignKey(_arr[1], qst); //解析外键
            f.quoteStructs.push(qst);
        } else if (type.startsWith("e$")) {
            //以e$开始的类型为枚举类型
            type = type.slice(2, type.length);
            var qe = new QuoteEnumType();
            t = qe;
            var _arr2 = type.split("#");
            var _pointIndex = type.lastIndexOf(".");
            var _index2 = type.lastIndexOf("/");
            qe.index = index;
            qe.type = _arr2[0].slice(_pointIndex + 1, type.length);
            if (_pointIndex === -1) {
                //引用当前文件的结构体
                qe.path = "./" + sheetName;
                qe.file = sheetName;
            } else {
                qe.path = _arr2[0].slice(0, _pointIndex);
                qe.file = _arr2[0].slice(_index2 + 1, _pointIndex);
                f.imports.push(qe.path);
            }
        } else {
            t = new BaseType(type, index);
        }
        return t;
    }
};
var xlsxType2Rs = function xlsxType2Rs(xlsxType) {
    if (xlsxType === "b") {
        return "bool";
    } else if (xlsxType === "n") {
        return "f64";
    } else if (xlsxType === "s" || xlsxType === "d") {
        return "str";
    } else {
        throw "excel表，类型错误";
    }
};
//解析外键,外键规则为"外部关联键@内部关联键"， 内外关联键为空时，后续被处理成实例的索引
var parseForeignKey = function parseForeignKey(str, type) {
    var keys = str.split("@");
    type.foreignKeyIn = keys[1];
    type.foreignKeyOut = keys[0];
};
//返回表的开始（表名以$, e$, v$开始），$表示为结构体， e$为枚举，v$为变量（基础类型或基础类型组成的数组） 
var getTableStart = function getTableStart(t, sheet) {
    var cell = { row: t.start.row, col: t.start.col };
    while (cell) {
        var cellContent = sheet.data.get(cell.col + "-" + cell.row);
        if (cellContent && cellContent.v && typeof cellContent.v === "string" && (cellContent.v.indexOf("$") === 0 || cellContent.v.indexOf("e$") === 0 || cellContent.v.indexOf("v$") === 0 || cellContent.v.indexOf("f$") === 0)) {
            return cell;
        } else {
            cell = xlsx_decoder_1.nextCell(cell.row, cell.col, t.end.row, t.end.col, t.start.col);
        }
    }
    return null;
};
var initStruct = function initStruct(fields, colTypes, contents, name, stype, c, file) {
    var struct = new Struct();
    var note = parseNote(c); //结构体注释和注解
    struct.comment = note.comment;
    struct.annotation = note.annotation;
    struct.annotation.set("readonly", "true");
    struct.name = name;
    struct.type = stype;
    struct.objects = contents;
    if (struct.name) {
        ownStructs.push(struct.name);
    }
    struct.fields = new Map();
    var preField = void 0;
    var type = void 0;
    for (var i = 0; i < fields.length; i++) {
        var _type = colTypes[i] ? colTypes[i].v : "";
        if (!fields[i] || !fields[i].v || preField && preField.name === fields[i].v) {
            //如果当前单元格为空 或与前一个单元格内容相同， 表示同一字段
            preField.count++;
            var fieldType = preField.type;
            if (_type && (_type.indexOf("{") === 0 || _type.indexOf("[") === 0)) {
                throw "\u65E0\u6CD5\u5B9A\u4E49\u7ED3\u6784\u4F53" + name + ", \u56E0\u53EF\u80FD\u5B58\u5728\u4E8C\u7EF4\u5143\u7EC4\uFF0C \u533F\u540D\u7ED3\u6784\u4F53\u5D4C\u5957\uFF0C \u7ED3\u6784\u4F53\u4E0E\u5143\u7EC4\u7684\u76F8\u4E92\u5D4C\u5957\uFF01";
            } else if (fieldType instanceof StructType) {
                var f = getField(_type, i, contents, file);
                fieldType.fields.set(f.name, f);
            } else if (fieldType instanceof TupleType) {
                fieldType.elems.push(getType(_type, i, contents, preField.name, file));
            } else if (fieldType instanceof QuoteStructType) {
                throw "\u8868" + name + "\u4E2D\uFF0C \u5F15\u7528\u7ED3\u6784\u4F53\u7C7B\u578B\u5B57\u6BB5\u4E0D\u5E94\u8BE5\u6709\u591A\u5217\uFF01\u5B57\u6BB5\u540D\uFF1A" + preField.name + "\uFF01";
            } else if (fieldType instanceof BaseType) {
                throw "\u8868" + name + "\u4E2D\uFF0C \u57FA\u7840\u7C7B\u578B\u5B57\u6BB5\u4E0D\u5E94\u8BE5\u6709\u591A\u5217\uFF01\u5B57\u6BB5\u540D\uFF1A" + preField.name + "\uFF01";
            }
        } else if (fields[i]) {
            preField && struct.fields.set(preField.name, preField); //否则为新的字段，将前一字段保存在arr中
            preField = new Field();
            preField.name = fields[i].v;
            preField.count = 1;
            //todo comment, anonate
            preField.type = getType(_type, i, contents, preField.name, file);
            if (_type === "enum" && !(preField.type instanceof BaseType)) {
                throw "\u6570\u636E" + struct.name + "\u88AB\u5B9A\u4E49\u4E3A\u679A\u4E3E\u7C7B\u578B\uFF0C \u5176\u6570\u636E\u7684\u7C7B\u578B\u53EA\u80FD\u662F\u57FA\u7840\u7C7B\u578B";
            }
            var _note = parseNote(fields[i].c); //字段注释和注解
            preField.comment = _note.comment;
            preField.annotation = _note.annotation;
            if (preField.annotation.get("primary")) {
                if (!(preField.type instanceof BaseType)) {
                    throw "复合类型无法作为主键！:" + preField.name;
                }
                var an = struct.annotation.get("primary");
                if (!an) {
                    an = preField.name;
                } else {
                    an += "-" + preField.name;
                }
                struct.annotation.set("primary", an);
                preField.annotation.delete("primary");
            }
        } else {
            throw "属性定义不符合规则!";
        }
    }
    preField && struct.fields.set(preField.name, preField);
    var qs = file.quoteStructs;
    for (var _i2 = 0; _i2 < qs.length; _i2++) {
        var key = qs[_i2].foreignKeyIn;
        var _f = struct.fields.get(key);
        if (key) {
            if (!_f) {
                throw "\u5C5E\u6027\u4E0D\u5B58\u5728\uFF0C\u4E0D\u80FD\u4F5C\u4E3A\u5916\u952E, sheet\uFF1A " + sheetName + ",property:" + key;
            }
            qs[_i2].field = _f;
        }
        var _name = filePath;
        if (sheetLen == 1) {
            _name = _name.slice(0, _name.lastIndexOf("/"));
        }
        var rp = genPath(pathMode.join("" + _name, qs[_i2].path).replace(/\\/g, "/"), srcRoot.replace(/\\/g, "/"));
        var p = rp + "/" + qs[_i2].type;
        qs[_i2].outCfg = quoteHead + quoteId++;
        if (cfgSuff === CfgSuff.TS) {
            var foreignKeyOut = qs[_i2].foreignKeyOut ? "#" + qs[_i2].foreignKeyOut : "";
            outCfgStr.push("let " + qs[_i2].outCfg + " = cfgMgr.get(\"" + p + foreignKeyOut + "\");");
            if (qs[_i2].path != "./") {
                outCfgImport.push(qs[_i2].path);
            }
        } else if (cfgSuff === CfgSuff.RS) {
            //todo
        }
    }
    file.quoteStructs = [];
    return struct;
};
var parseNote = function parseNote(c) {
    var note = {};
    if (!c) {
        note.comment = [];
        note.annotation = new Map();
    } else {
        note.comment = c[0].t.match(/\/\*(.|\n)*?\*\//g);
        var annotations = c[0].t.match(/#\[.*?\]/g);
        note.annotation = new Map();
        for (var i = 0; i < annotations.length; i++) {
            parseAnnotation(annotations[i], note.annotation);
        }
    }
    return note;
};
var parseAnnotation = function parseAnnotation(str, map) {
    str = str.slice(2, str.length - 1);
    var arr = str.split(",");
    for (var i = 0; i < arr.length; i++) {
        var arr1 = arr[i].split("=");
        map.set(trim(arr1[0]), trim(arr1[1]));
    }
};
//将excel数据转化为rs字符串
var toStr = function toStr(struct) {
    var arr = ["", ""];
    var str = arr[0];
    if (struct.type === "enum") {
        arr[0] += defEnum(struct);
    } else if (struct.type === "sample") {
        arr[0] += rs_consts_tpl_fun(struct);
    } else if (struct.type === "formula") {
        arr[0] += rs_formulas_tpl_fun(struct);
    } else if (struct.fields.size > 0) {
        arr[0] += defStructs(struct); //定义结构体
        arr[1] = SetObjects.toString(new SetObjects(struct, sheetLen > 1 ? sheetName : "", rpath, optimizaName + optimizaId)); //生成结构体实例
        optimizaId = increaseWord(optimizaId);
    }
    return arr;
};
//递增字母，最大到z
var increaseWord = function increaseWord(str) {
    var code = str.charCodeAt(0) + 1;
    if (code > 122) {
        throw "sheet上的表个数大于26！";
    }
    return String.fromCharCode(code);
};

var SetObjects = function SetObjects(struct, sheetName, filePath, optimizaName) {
    var tol = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "";

    _classCallCheck(this, SetObjects);

    this.struct = struct;
    this.tol = tol;
    this.sheetName = sheetName;
    this.filePath = filePath;
    this.optimizaName = optimizaName;
};

SetObjects.tplrs = "\n{{let struct = it.struct}}let _{{struct.name}} = [\n{{for k, data of struct.objects}}\n\t{{struct.name}}{\n\t{{for k, field of struct.fields}}\n\t\t{{field.name}}: {{% \u5B57\u6BB5\u540D\u79F0 %}}\n\t\t{{if _isStructType(field.type)}} {{% \u533F\u540D\u7ED3\u6784\u4F53\u7C7B\u578B %}}\n\t\t{{let childType = field.type}}\n\t\t{{childType.name}}{\n\t\t\t{{for i, fieldc of childType.fields}}{{fieldc.name}}: {{% \u533F\u540D\u7ED3\u6784\u4F53\u6210\u5458}}\n\t\t\t\t{{if _isQuoteStruct(fieldc.type)}} {{fieldc.type.type}}#{{fieldc.type.foreignKey}}, {{% \u5F15\u7528\u7ED3\u6784\u4F53\u7C7B\u578B %}}\n\t\t\t\t{{elseif _isString(fieldc.type.type)}} \"{{data[field.start + (i - 0)].v}}\", {{% \u5B57\u7B26\u4E32\u7C7B\u578B %}}\n\t\t\t\t{{elseif _isBool(fieldc.type) || _isNumber(fieldc.type)}} {{data[field.start + (i - 0)].v}}, {{% \u975E\u5B57\u7B26\u4E32\u57FA\u7840\u7C7B\u578B %}}\n\t\t\t\t{{end}} {{% \u533F\u540D\u7ED3\u6784\u4F53\u5B57\u6BB5\u652F\u6301\u57FA\u7840\u7C7B\u578B\uFF0C\u5F15\u7528\u7ED3\u6784\u4F53\u7C7B\u578B %}} \n\t\t\t{{end}} },\n\t\t{{elseif _isTupleType(field.type)}} {{% \u5143\u7EC4\u7C7B\u578B %}}\n\t\t{{let childType = field.childType}}(\n\t\t\t{{for i, type of childType.elems}}\n\t\t\t\t{{if _isQuoteStruct(type)}} {{type.type}}#{{type.foreignKey}}, {{% \u5F15\u7528\u7ED3\u6784\u4F53\u7C7B\u578B %}}\n\t\t\t\t{{elseif _isString(type.type)}} \"{{data[field.start + (i - 0)].v}}\", {{% \u5B57\u7B26\u4E32\u7C7B\u578B %}}\n\t\t\t\t{{elseif _isBool(type.type) || _isNumber(type.type)}} {{data[field.start + (i - 0)].v}}, {{% \u975E\u5B57\u7B26\u4E32\u57FA\u7840\u7C7B\u578B %}}\n\t\t\t\t{{end}} {{% \u5143\u7EC4\u7684\u5143\u7D20\u652F\u6301\u57FA\u7840\u7C7B\u578B\uFF0C\u5F15\u7528\u7ED3\u6784\u4F53\u7C7B\u578B %}} \n\t\t\t{{end}} ),\n\t\t{{elseif _isString(field.type.type)}} \"{{data[field.start].v}}\", {{% \u5B57\u7B26\u4E32\u7C7B\u578B %}}\n\t\t{{elseif _isBool(field.type.type) || _isNumber(field.type)}} {{data[field.start].v}}, {{% \u975E\u5B57\u7B26\u4E32\u57FA\u7840\u7C7B\u578B %}}\n\t\t{{end}}\n\t{{end}} },\n{{end}} ]";
SetObjects.tplts = "\n{{let struct = it.struct}}\ncfgMgr.set(\"{{it.filePath}}{{it.sheetName?(\"/\" + it.sheetName):\"\"}}.{{struct.name}}\",new Map<number,any>([\n{{let oCount = 0}}\n{{let pCount = 0}}\n{{for k, data of struct.objects}}\n\t{{let isIndex = false}}\n\t{{if oCount > 0}},{{else}}{{:oCount = oCount + 1}}{{end}}[{{pCount}},{{it.optimizaName}}({{%\u5B9E\u4F8B\u7528\u9017\u53F7\u5206\u9694%}}\n\t{{let paramCount = 0}}\n    {{for k, field of struct.fields}}\n        {{if _isQuoteEnum(field.type)}}{{% \u5F15\u7528\u679A\u4E3E %}}\n            {{if paramCount > 0}},\n            {{end}}{{field.type.type}}.{{data[field.type.index].v}}{{: paramCount = paramCount + 1}}\n\t\t{{elseif _isQuoteStruct(field.type)}}{{% \u5F15\u7528\u7ED3\u6784\u4F53\u7C7B\u578B %}}\n\t\t\t{{if !field.type.foreignKeyIn && isIndex === false}}\n\t\t\t\t{{:isIndex = true}}{{if paramCount > 0}},{{end}}{{pCount}}{{:paramCount++}}\n\t\t\t{{elseif field.type.foreignKeyIn === field.name}}\n\t\t\t\t{{if paramCount > 0}},\n\t\t\t\t{{end}}{{data[field.type.index].v}}{{: paramCount = paramCount + 1}}\n            {{end}}\n\t\t{{elseif _isStructType(field.type)}}{{% \u533F\u540D\u7ED3\u6784\u4F53\u7C7B\u578B %}}\n\t\t\t{{for i, fieldc of field.type.fields}} {{% \u533F\u540D\u7ED3\u6784\u4F53\u6210\u5458}}\n\t\t\t\t{{if _isQuoteStruct(fieldc.type)}}\n\t\t\t\t\t{{if !fieldc.type.foreignKeyIn && isIndex === false}}\n\t\t\t\t\t\t{{:isIndex = true}}{{if paramCount > 0}},{{end}}{{pCount}}{{:paramCount++}}\n\t\t\t\t\t{{elseif fieldc.type.foreignKeyIn === field.name}}\n\t\t\t\t\t\t{{if paramCount > 0}},\n\t\t\t\t\t\t{{end}}{{data[fieldc.type.index].v}}{{: paramCount = paramCount + 1}}\n                    {{end}}\n                {{elseif _isString(fieldc.type.type)}}\n                    {{if paramCount > 0}},\n                    {{end}}'{{data[fieldc.type.index]?data[fieldc.type.index].v:\"\"}}'{{: paramCount = paramCount + 1}} {{% \u5B57\u7B26\u4E32\u7C7B\u578B %}}\n                {{elseif _isNumber(fieldc.type.type)}}\n                    {{if paramCount > 0}},\n                    {{end}}{{data[fieldc.type.index]?data[fieldc.type.index].v:0}}{{: paramCount = paramCount + 1}}{{% \u975E\u5B57\u7B26\u4E32\u57FA\u7840\u7C7B\u578B %}}\n                {{elseif _isBool(fieldc.type.type)}}\n                    {{if paramCount > 0}},\n                    {{end}}{{data[fieldc.type.index]?data[fieldc.type.index].v: false}}{{: paramCount = paramCount + 1}}{{% \u975E\u5B57\u7B26\u4E32\u57FA\u7840\u7C7B\u578B %}}\n                {{end}}{{% \u533F\u540D\u7ED3\u6784\u4F53\u5B57\u6BB5\u652F\u6301\u57FA\u7840\u7C7B\u578B\uFF0C\u5F15\u7528\u7ED3\u6784\u4F53\u7C7B\u578B %}} \n\t\t\t{{end}}\n\t\t{{elseif _isTupleType(field.type)}} {{% \u5143\u7EC4\u7C7B\u578B %}}\n\t\t\t{{for i, elem of field.type.elems}}\n\t\t\t\t{{if _isQuoteStruct(elem)}}\n\t\t\t\t\t{{if !elem.foreignKeyIn && isIndex === false}}\n\t\t\t\t\t\t{{:isIndex = true}}{{if paramCount > 0}},{{end}}{{pCount}}{{:paramCount++}}\n\t\t\t\t\t{{elseif elem.foreignKeyIn === field.name}}\n\t\t\t\t\t\t{{if paramCount > 0}},\n\t\t\t\t\t\t{{end}}{{data[elem.index].v}}{{: paramCount = paramCount + 1}}\n\t\t\t\t\t{{end}}\n                {{elseif _isString(elem.type)}}\n                    {{if paramCount > 0}},\n                    {{end}}'{{data[elem.index]?data[elem.index].v:\"\"}}'{{: paramCount = paramCount + 1}} {{% \u5B57\u7B26\u4E32\u7C7B\u578B %}}\n                {{elseif _isNumber(elem.type)}}\n                    {{if paramCount > 0}},\n                    {{end}}{{data[elem.index]?data[elem.index].v:0}}{{: paramCount = paramCount + 1}}{{% \u975E\u5B57\u7B26\u4E32\u57FA\u7840\u7C7B\u578B %}}\n                {{elseif _isBool(elem.type)}}\n                    {{if paramCount > 0}},\n                    {{end}}{{data[elem.index]?data[elem.index].v: false}}{{: paramCount = paramCount + 1}}{{% \u975E\u5B57\u7B26\u4E32\u57FA\u7840\u7C7B\u578B %}}\n                {{end}} {{% \u5143\u7EC4\u7684\u5143\u7D20\u652F\u6301\u57FA\u7840\u7C7B\u578B\uFF0C\u5F15\u7528\u7ED3\u6784\u4F53\u7C7B\u578B %}} \n\t\t\t{{end}}\n\t\t{{elseif _isString(field.type.type)}}\n\t\t\t{{if paramCount > 0}},\n\t\t\t{{end}}'{{data[field.type.index]?data[field.type.index].v:\"\"}}'{{: paramCount = paramCount + 1}} {{% \u5B57\u7B26\u4E32\u7C7B\u578B %}}\n\t\t{{elseif _isNumber(field.type.type)}}\n\t\t\t{{if paramCount > 0}},\n            {{end}}{{data[field.type.index]?data[field.type.index].v:0}}{{: paramCount = paramCount + 1}}{{% \u975E\u5B57\u7B26\u4E32\u57FA\u7840\u7C7B\u578B %}}\n        {{elseif _isBool(field.type.type)}}\n\t\t\t{{if paramCount > 0}},\n\t\t\t{{end}}{{data[field.type.index]?data[field.type.index].v: false}}{{: paramCount = paramCount + 1}}{{% \u975E\u5B57\u7B26\u4E32\u57FA\u7840\u7C7B\u578B %}}\n\t\t{{end}}\n\t{{end}})]\n\t{{:pCount++}}\n{{end}} ]))";
SetObjects.tpltsParam = "\n{{let struct = it.struct}}\nlet {{it.optimizaName}} = (\n{{let oCount = 0}}\n{{let isIndex = false}}\n{{for k, field of struct.fields}}\n\t{{if _isQuoteStruct(field.type)}}\n\t\t{{if !field.type.foreignKeyIn && isIndex === false}}\n\t\t\t{{:isIndex = true}}{{if oCount > 0}},{{end}}index{{:oCount++}}\n\t\t{{elseif field.type.foreignKeyIn === field.name}}\n\t\t\t{{if oCount > 0}},{{end}}o{{field.type.index}}{{:oCount++}}\n\t\t{{end}}\n\t{{elseif _isStructType(field.type)}}\n\t\t{{for k1, fieldc of field.type.fields}}\n\t\t\t{{if _isQuoteStruct(fieldc.type)}}\n\t\t\t\t{{if !fieldc.type.foreignKeyIn && isIndex === false}}\n\t\t\t\t\t{{:isIndex = true}}{{if oCount > 0}},{{end}}index{{:oCount++}}\n\t\t\t\t{{elseif fieldc.type.foreignKeyIn === field.name}}\n\t\t\t\t\t{{if oCount > 0}},{{end}}o{{fieldc.type.index}}{{:oCount++}}\n\t\t\t\t{{end}}\n\t\t\t{{else}}{{if oCount > 0}},{{end}}o{{fieldc.type.index}}{{:oCount++}}\n\t\t\t{{end}}\n\t\t{{end}}\n\t{{elseif _isTupleType(field.type)}}\n\t\t{{for k1, elem of field.type.elems}}\n\t\t\t{{if _isQuoteStruct(elem)}}\n\t\t\t\t{{if !elem.foreignKeyIn && isIndex === false}}\n\t\t\t\t\t{{:isIndex = true}}{{if oCount > 0}},{{end}}index{{:oCount++}}\n\t\t\t\t{{elseif elem.foreignKeyIn === field.name}}\n\t\t\t\t\t{{if oCount > 0}},{{end}}o{{elem.index}}{{:oCount++}}\n\t\t\t\t{{end}}\n\t\t\t{{else}}{{if oCount > 0}},{{end}}o{{elem.index}}{{:oCount++}}\n\t\t\t{{end}}\n\t\t{{end}}\n\t{{else}}{{if oCount > 0}},{{end}}o{{field.type.index}}{{:oCount++}} {{%\u57FA\u7840\u7C7B\u578B%}}\n\t{{end}}\t\n{{end}})\n";
SetObjects.tpltsnew = "\n{{let struct = it.struct}}:{{struct.name}} => { return new {{struct.name}}(\n{{let fieldCount = 0}}\n{{for k, field of struct.fields}}\n\t{{if fieldCount > 0}},\n\t{{end}}\n\t{{if _isStructType(field.type)}}new {{field.type.name}}({{%\u533F\u540D\u7ED3\u6784\u4F53%}}\n\t\t{{let cCount = 0}}\n\t\t{{for k1, fieldc of field.type.fields}}\n\t\t\t{{if cCount > 0}},{{%new\u533F\u540D\u7ED3\u6784\u4F53\uFF0C\u6210\u5458\u7528\u9017\u53F7\u5206\u9694%}}\n\t\t\t{{end}}\n\t\t\t{{if _isQuoteStruct(fieldc.type)}}\n\t\t\t\t{{if !field.type.foreignKeyIn}}\n\t\t\t\t\t{{fieldc.type.outCfg}}.get(index) as {{fieldc.type.file}}.{{fieldc.type.type}}\n\t\t\t\t{{elseif field.type.foreignKeyIn === field.name}}\n\t\t\t\t\t{{fieldc.type.outCfg}}.get(o{{fieldc.type.index}}) as {{fieldc.type.file}}.{{fieldc.type.type}}\n\t\t\t\t{{else}}\n\t\t\t\t\t{{fieldc.type.outCfg}}.get(o{{fieldc.type.field.type.index}}) as {{fieldc.type.file}}.{{fieldc.type.type}}{{%\u533F\u540D\u7ED3\u6784\u4F53\u4E2D\u7684\u5F15\u7528\u7ED3\u6784\u4F53\u7C7B\u578B%}}\n\t\t\t\t{{end}}\n\t\t\t{{else}}o{{fieldc.type.index}} {{%\u533F\u540D\u7ED3\u6784\u4F53\u4E2D\u7684\u57FA\u7840\u7C7B\u578B%}}\n\t\t\t{{end}}\n\t\t\t{{:cCount++}}\n\t\t{{end}})\n\t{{elseif _isTupleType(field.type)}}[{{%\u5143\u7EC4\u7C7B\u578B%}}\n\t\t{{for k1, elem of field.type.elems}}\n\t\t\t{{if k1 - 0 > 0}},{{%new\u533F\u540D\u7ED3\u6784\u4F53\uFF0C\u6210\u5458\u7528\u9017\u53F7\u5206\u9694%}}\n\t\t\t{{end}}\n\t\t\t{{if _isQuoteStruct(elem)}}\n\t\t\t\t{{if !elem.foreignKeyIn}}\n\t\t\t\t\t{{elem.outCfg}}.get(index) as {{elem.file}}.{{elem.type}}\n\t\t\t\t{{elseif elem.foreignKeyIn === field.name}}\n\t\t\t\t\t{{elem.outCfg}}.get(o{{elem.index}}) as {{elem.file}}.{{elem.type}}\n\t\t\t\t{{else}}\n\t\t\t\t\t{{elem.outCfg}}.get(o{{elem.field.type.index}}) as {{elem.file}}.{{elem.type}}{{%\u533F\u540D\u7ED3\u6784\u4F53\u4E2D\u7684\u5F15\u7528\u7ED3\u6784\u4F53\u7C7B\u578B%}}\n\t\t\t\t{{end}}\n\t\t\t{{else}}o{{elem.index}}\n\t\t\t{{end}}\n\t\t{{end}}]\n\t{{elseif _isQuoteStruct(field.type)}}{{%\u5F15\u7528\u7ED3\u6784\u4F53\u7C7B\u578B%}}\n\t\t{{if !field.type.foreignKeyIn}}\n\t\t\t{{field.type.outCfg}}.get(index) as {{field.type.file}}.{{field.type.type}}\n\t\t{{elseif field.type.foreignKeyIn === field.name}}\n\t\t\t{{field.type.outCfg}}.get(o{{field.type.index}}) as {{field.type.file}}.{{field.type.type}}\n\t\t{{else}}\n\t\t\t{{field.type.outCfg}}.get(o{{field.type.field.type.index}}) as {{field.type.file}}.{{field.type.type}}{{%\u533F\u540D\u7ED3\u6784\u4F53\u4E2D\u7684\u5F15\u7528\u7ED3\u6784\u4F53\u7C7B\u578B%}}\n\t\t{{end}}\n\t{{else}}o{{field.type.index}}{{%\u57FA\u7840\u7C7B\u578B%}}\n\t{{end}}\n\t{{: fieldCount++}}\t\n{{end}} );};\n";
SetObjects.toFunc = function (s) {
    return new Function("_stringify", "_isBase", "_isString", "_isBool", "_isNumber", "_isQuoteStruct", "_isTupleType", "_isStructType", "_relativePath", "_isQuoteEnum", "return " + s)(tpl_1.toString, gendrust_1.isBase, gendrust_1.isStr, gendrust_1.isBool, gendrust_1.isNumber, isQuoteStruct, isTupleType, isStructType, relativePath, isQuoteEnum);
};
SetObjects.tplRsFunc = SetObjects.toFunc(tpl_1.compile(SetObjects.tplrs, tpl_str_1.Parser, null, null, null, null, null, "es6"));
SetObjects.tplTsFunc = SetObjects.toFunc(tpl_1.compile(SetObjects.tplts, tpl_str_1.Parser, null, null, null, null, null, "es6"));
SetObjects.tpltsnewFunc = SetObjects.toFunc(tpl_1.compile(SetObjects.tpltsnew, tpl_str_1.Parser, null, null, null, null, null, "es6"));
SetObjects.tpltsparamFunc = SetObjects.toFunc(tpl_1.compile(SetObjects.tpltsParam, tpl_str_1.Parser, null, null, null, null, null, "es6"));
SetObjects.toString = function (objs) {
    if (cfgSuff === CfgSuff.TS) {
        var str = SetObjects.tpltsparamFunc(null, objs);
        str += SetObjects.tpltsnewFunc(null, objs);
        str += SetObjects.tplTsFunc(null, objs);
        return str;
    } else if (cfgSuff === CfgSuff.RS) {
        //todo
        //return SetObjects.tplRsFunc(null, struct, sheetName, filePath, optimizaId);
    } else {
        throw "导出文件类型不支持" + cfgSuff;
    }
};
//定义一个枚举
var defEnum = function defEnum(struct) {
    var tol = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

    var str = "\n" + tol + "enum " + struct.name + "{";
    var i = 0;
    for (var _iterator = struct.fields.values(), _isArray = Array.isArray(_iterator), _i3 = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
            if (_i3 >= _iterator.length) break;
            _ref = _iterator[_i3++];
        } else {
            _i3 = _iterator.next();
            if (_i3.done) break;
            _ref = _i3.value;
        }

        var v = _ref;

        str += v.name;
        if (struct.objects && struct.objects[0] && struct.objects[0][i]) {
            str += "=";
            if (gendrust_1.isStr(v.type.type)) {
                str += "\"" + struct.objects[0][i].v + "\",";
            } else {
                str += struct.objects[0][i].v + ",";
            }
        }
        i++;
    }
    str += "}";
    return str;
};
//定义一个结构体
var defStructs = function defStructs(struct) {
    var tol = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

    var str = "";
    //定义匿名结构体
    struct.fields.forEach(function (v, k) {
        var type = v.type;
        if (type instanceof StructType) {
            //匿名结构体，需要被定义
            var _s = new DefStruct(type);
            str += "\n" + DefStruct.toString(_s); //定义匿名结构体
        }
    });
    var s = new DefStruct(struct);
    str += "\n" + DefStruct.toString(s); //定义结构体
    return str;
};
/**
 * @description  返回定义的函数, 用定义字符串，转成匿名函数的返回函数
 * @example
 */
var toFunc = function toFunc(s) {
    return new Function("return " + s)();
};
var getTypeName = function getTypeName(type) {
    if (type instanceof BaseType) {
        return type.type;
    } else if (type instanceof StructType) {
        return type.name;
    } else if (type instanceof TupleType) {
        var strs = [];
        for (var i = 0; i < type.elems.length; i++) {
            strs.push(getTypeName(type.elems[i]));
        }
        return "(" + strs.join(",") + ")";
    } else if (type instanceof QuoteStructType || type instanceof QuoteEnumType) {
        if (type.file === sheetName) return type.type;else {
            return type.file + "::" + type.type;
        }
    }
};

var DefStruct = function DefStruct(struct) {
    var tol = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

    _classCallCheck(this, DefStruct);

    this.struct = struct;
    this.tol = tol;
};

DefStruct.tpl = "\n{{let struct = it.struct}}\n{{if struct.comment}}\n\t{{for k, v of struct.comment}}\n\t{{it.tol}}{{v}} {{% \u7ED3\u6784\u4F53\u6CE8\u91CA %}}\n\t{{end}}\n{{end}}\n#[db=memory,{{if struct.annotation && struct.annotation.size > 0}}\n\t{{let i = 0}}\n\t{{for k, v of struct.annotation}}\n\t\t{{if i > 0}},{{end}}\n\t\t{{k}}={{v}} {{% \u7ED3\u6784\u4F53\u6CE8\u89E3 %}}\n\t{{: i++}}\n\t{{end}}\n{{end}}]\n{{it.tol}}struct {{struct.name}}{ {{% \u5B9A\u4E49\u7ED3\u6784\u4F53 %}}\n{{for k, v of struct.fields}}\n\t{{if v.comment}}\n\t\t{{for k1, v1 of v.comment}}\n\t\t{{it.tol}}{{v1}} {{% \u6210\u5458\u6CE8\u91CA %}}\n\t\t{{end}}\n\t{{end}}\n\t{{if v.annotation && v.annotation.size > 0}}#[\n\t\t{{let i = 0}}\n\t\t{{for k1, v1 of v.annotation}}\n\t\t\t{{if i > 0}},{{end}}\n\t\t\t{{k1}}={{v1}} {{% \u6210\u5458\u6CE8\u89E3 %}}\n\t\t\t{{: i++}}\n\t\t{{end}}]\n    {{end}}\n    {{if _isQuoteEnum(v.type)}}\n    #[enum=true]\n    {{end}}\n\t{{it.tol}}{{v.name}}: {{_getTypeName(v.type)}}, {{% \u5B9A\u4E49\u6210\u5458 %}}\n{{end}} }";
DefStruct.toFunc = function (s) {
    return new Function("_stringify", "_getTypeName", "_isQuoteEnum", "return " + s)(tpl_1.toString, getTypeName, isQuoteEnum);
};
DefStruct.tplFunc = DefStruct.toFunc(tpl_1.compile(DefStruct.tpl, tpl_str_1.Parser, null, null, null, null, null, "es6"));
DefStruct.toString = function (obj) {
    return DefStruct.tplFunc(null, obj);
};

var Struct = function Struct() {
    _classCallCheck(this, Struct);
};
//匿名结构体


var StructType = function StructType() {
    _classCallCheck(this, StructType);

    this.annotation = new Map();
    this.annotation.set("readonly", "true");
};
//引用结构体


var QuoteStructType = function QuoteStructType() {
    _classCallCheck(this, QuoteStructType);
};
//枚举类型


var QuoteEnumType = function QuoteEnumType() {
    _classCallCheck(this, QuoteEnumType);
};
//基础类型


var BaseType = function BaseType(type, index) {
    _classCallCheck(this, BaseType);

    this.type = type;
    this.index = index;
};
//元组


var TupleType = function TupleType() {
    _classCallCheck(this, TupleType);
};

var Field = function Field() {
    _classCallCheck(this, Field);
};

var File = function File() {
    _classCallCheck(this, File);

    this.quoteStructs = []; //引用结构体
};

var getField = function getField(str, index, contents, file) {
    var f = new Field();
    var arr = str.split(":");
    if (str.endsWith("}") && str.indexOf(":") < 0) {
        arr[0] = trim(str.slice(0, str.length - 1));
        arr[1] = "}";
    }
    f.name = trim(arr[0]);
    f.type = getType(trim(arr[1]), index, contents, f.name, file);
    return f;
};
//去左右空格;
var trim = function trim(s) {
    try {
        return s.replace(/(^\s*)|(\s*$)/g, "");
    } catch (error) {
        console.log(s);
    }
};
//从数组中取出对应元素
var getFromArray = function getFromArray(key, value, array) {};
var genPath = function genPath(path, scrRoot) {
    var srcs = scrRoot.split("\\");
    path = path.replace(scrRoot, "");
    var paths = path.split("\\");
    return paths.join("/");
};
// 获得指定的路径相对目录的路径
var relativePath = function relativePath(filePath, dir) {
    var i, len, j;
    filePath;
    if (filePath.charCodeAt(0) !== 46) return filePath;
    i = 0;
    len = filePath.length;
    j = dir.length - 1;
    if (dir.charCodeAt(j) !== 47) {
        j = dir.lastIndexOf("/");
    }
    while (i < len) {
        if (filePath.charCodeAt(i) !== 46) break;
        if (filePath.charCodeAt(i + 1) === 47) {
            // ./的情况
            i += 2;
            break;
        }
        if (filePath.charCodeAt(i + 1) !== 46 || filePath.charCodeAt(i + 2) !== 47) break;
        // ../的情况
        i += 3;
        j = dir.lastIndexOf("/", j - 1);
    }
    if (i > 0) filePath = filePath.slice(i);
    if (j < 0) return filePath;
    if (j < dir.length - 1) dir = dir.slice(0, j + 1);
    return dir + filePath;
};
var rs_consts_tpl = "{{let struct = it}}\n{{let fields = struct.fields}}\n{{let i = 0}}\n{{for k, field of fields}}\nconst {{field.name}}: {{_getTypeName(field.type)}} = {{if _isStr(field.type.type)}}\"{{struct.objects[0][i].v}}\"{{else}}{{struct.objects[0][i].v}}{{end}};\n{{: i++}}\n{{end}}\n";
var rs_formulas_tpl = "{{let struct = it}}\n{{let fields = struct.fields}}\n{{let i = 0}}\n{{for k, field of fields}}\nconst {{field.name}}: String = \"formula#{{field.type.type}}#{{struct.objects[0][i].v}}\";\n{{: i++}}\n{{end}}\n";
var rs_consts_tpl_fun = function rs_consts_tpl_fun(struct) {
    var str = tplFunc.rs_consts_tpl(null, struct);
    return str;
};
var rs_formulas_tpl_fun = function rs_formulas_tpl_fun(struct) {
    var str = tplFunc.rs_formulas_tpl(null, struct);
    return str;
};
var tplToFunc = function tplToFunc(s) {
    return new Function("_stringify", "_getTypeName", "_isQuoteEnum", "_isStr", "return " + s)(tpl_1.toString, getTypeName, isQuoteEnum, gendrust_1.isStr);
};
var tplFunc = {
    rs_consts_tpl: tplToFunc(tpl_1.compile(rs_consts_tpl, tpl_str_1.Parser, null, null, null, null, null, "es6")),
    rs_formulas_tpl: tplToFunc(tpl_1.compile(rs_formulas_tpl, tpl_str_1.Parser, null, null, null, null, null, "es6"))
};
})