_$define("pi/compile/genrd", function (require, exports, module){
"use strict";
/**
 * 分析rust定义的数据结构, 支持注释，注解， 将其转换为ts的数据结构定义， 并生成encode， decode， clone， copy等方法
 * 例：
 * #[path=../../ecs/]   --注解
 * use world::{Component};   --导入
 * #[type=rpc,readonly=true,noCopy=true]---注解
 * struct setName {
 * 	id: i16,
 * 	name:str,
 * }
 *
 * 结构体支持注解有：
 * 		type-类型，用户自定义类型，为运行时注解,
 * 		readonly（默认false）-只读，表示结构体的所有属性都是只读属性，编译为ts的类时，提供了构造方法设置属性，为编译期注解
 * 		noCopy（默认true）-不能copy，不会生成copy和clone方法，为编译期注解
 * 		noBinSeri（默认false）-不能序列化，没有binEncode，bindecode方法，为编译期注解
 * 		hasmgr（默认true）-有管理者，该注解为true时， 表示该结构体的实例应该被元数据管理起来， 当调用结构体的set方法时，会通知元数据中的修改监听器，为编译期注解
 * 		extends-继承， 表示继承另一个结构体， 为编译期注解
 * 属性支持注解：
 * 		default-默认值
 * 		readonly（默认false）-只读，当类的readonly注解为false时生效
 * 		noBinSeri（默认false）-不能序列化，当类的noBinSeri注解为false时生效
 * 导入支持注解：
 * 		path：表示导入模块的路径
 */

Object.defineProperty(exports, "__esModule", { value: true });
// ====================================== 导入
var hash = require("../util/hash");
var tpl_str_1 = require("../util/tpl_str");
var tpl_1 = require("../util/tpl");
var Gendrust = require("./gendrust");
//import {tsTypeStr} from "./genrust2ts";
var drust_1 = require("./drust");
var util_1 = require("../util/util");
var util_2 = require("./util");
function tsTypeStr(type, mod, tree, structName) {
    if (type.name.indexOf("JSType") > -1) {
        return "any";
    } else if (Gendrust.isNumber(type.name)) {
        return "number";
    } else if (Gendrust.isBigInt(type.name)) {
        return "bigInt.BigInteger";
    } else if (Gendrust.isStr(type.name)) {
        return "string";
    } else if (Gendrust.isArray(type.name)) {
        if (type.type.name === "u8") {
            return "Uint8Array";
        } else {
            return "Array<" + tsTypeStr(type.type, mod, tree, structName) + ">";
        }
    } /*else if(type.name === "Vec"){
        if(type.genType[0].name === "u8"){
            return "Uint8Array";
        }else{
            return "Array<" + tsTypeStr(type.genType[0], mod, tree, structName) + ">";
        }
      }*/
    else if (Gendrust.isBool(type.name)) {
            return "boolean";
        } else if (type.name === "Option") {
            return tsTypeStr(type.genType[0], mod, tree, structName);
        } else if (Gendrust.isTuple(type.name)) {
            if (type.childs.length === 0) {
                return "void";
            }
            var elems = [];
            for (var i = 0; i < type.childs.length; i++) {
                elems.push(tsTypeStr(type.childs[i], mod, tree, structName));
            }
            return "[" + elems.join(",") + "]";
        } else if (type.name === "self" || type.name === "Self") {
            return structName;
        } else if (type.name === "Result") {
            return tsTypeStr(type.genType[0], mod, tree, structName);
        } else if (mod && Gendrust.isRef(mod.getFullMod(type.name))) {
            return tsTypeStr(Gendrust.deref(type, mod, structName), mod, tree, structName);
        } else if (type.name === "*") {//指针类型
        } else if (Gendrust.isNativeObject(type.name)) {
            //let t = Gendrust.newTypeToType(type, mod, tree);
            return type.name.replace(/::/, ".");
        } else {
            throw "无法处理泛型类型：" + type.name;
        }
}
var pathMode = require("path");
//rs编译为ts
exports.translate = function (code, path, cfg, scrRoot) {
    cfg = initCfg(path, cfg);
    var compiler = new drust_1.Compiler();
    compiler.reset(code);
    var r = compiler.parser.parseRule("file");
    var arr = Gendrust.gen(r);
    return tsFunc(arr, util_2.relativePath(scrRoot, path), cfg, getEnumList(arr), getEnumcList(arr));
};
//取到所有的枚举类型
var getEnumList = function getEnumList(arr) {
    var first = arr[0];
    if (!first) {
        return null;
    }
    var arr_e = [];
    var annotate = first.annotate;
    if (annotate && annotate.enum) {
        arr_e = annotate.enum.split(",");
        delete annotate.enum;
    }
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] instanceof Gendrust.DefEnum) {
            arr_e.push(arr[i].name);
        }
    }
    return arr_e;
};
//取到所有的枚举类型
var getEnumcList = function getEnumcList(arr) {
    var first = arr[0];
    if (!first) {
        return null;
    }
    var arr_e = [];
    var annotate = first.annotate;
    if (annotate && annotate.enumc) {
        arr_e = annotate.enumc.split(",");
        delete annotate.enumc;
    }
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] instanceof Gendrust.DefEnumC) {
            arr_e.push(arr[i].name);
        }
    }
    return arr_e;
};
var initCfg = function initCfg(path, cfg) {
    var c = {};
    c.bin = parsePath(path, cfg.bin);
    c.mgr = parsePath(path, cfg.mgr);
    c.sinfo = parsePath(path, cfg.sinfo);
    return c;
};
var getImportNames = function getImportNames(arr) {
    var r = [];
    for (var i = 0; i < arr.length; i++) {
        var e = arr[i];
        if (e instanceof Gendrust.Import && e.contents) {
            r.concat(e.contents);
        }
    }
    return r;
};
var toMap = function toMap(arr) {
    var r = new Map();
    for (var i = 0; i < arr.length; i++) {
        var e = arr[i];
        if (!(e instanceof Gendrust.Import)) {
            r.set(e.name, e);
        }
    }
    return r;
};
var resolve = function resolve(path) {
    var rp = pathMode.resolve(path); //绝对路径
    var ps = path.split("\\");
    var rps = rp.split("\\");
    var len = ps.length;
    for (var i = 0; i < len; i++) {
        if (ps[i] === "..") {
            ps[i] = rps[rps.length - (len - i)];
        } else if (ps[i] === ".") {
            //i = 0时才可能是"."
            ps = ps.slice(1, len);
            break;
        } else {
            break;
        }
    }
    return ps.join("/");
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
//将一个json转换成二元数组
var jsonToArray = function jsonToArray(data) {
    var arr = [];
    for (var k in data) {
        arr.push([k, data[k]]);
    }
    return arr;
};
var isNativeObject = function isNativeObject(t) {
    if (t.name === "Option") {
        return isNativeObject(t.genType[0]);
    }
    if (t.name === "HashMap") {
        return false;
    } else {
        return Gendrust.isNativeObject(t.name);
    }
};
var tsTpl = "{{let _path = it1}}{{let _cfg = it2}}{{let _enums = it3}}{{let _enumcs = it4}}\n\timport { BonBuffer } from \"{{_cfg.bin}}\";\n\timport { addToMeta, removeFromMeta, Struct, notifyModify, StructMgr} from \"{{_cfg.mgr}}\";\n\timport { StructInfo, Type, FieldInfo, EnumType, EnumInfo} from \"{{_cfg.sinfo}}\";\n\t{{for k, v of it}}\n\t{{if v.type === \"import\" || \"importOne\"}}\n\t{{if v.sufComment}}{{for i, v1 of v.sufComment}}{{v1}}{{end}}{{end}}\n\t{{if v.type === \"import\"}}\n\t{{if v.annotate && v.annotate.path}}\n\timport { {{for index, c of v.contents}}{{if index > 0}},{{end}}{{c}}{{end}} } from \"{{v.annotate.path + v.path}}\";\n\t{{else}}\n\timport { {{for index, c of v.contents}}{{if index > 0}},{{end}}{{c}}{{end}} } from \"./{{v.path}}\";\n\t{{end}}\n\t{{elseif v.type === \"importOne\"}}\n\t{{if v.annotate && v.annotate.path}}\n\timport * as {{v.contents[0].endsWith(\".s\")?v.contents[0].slice(0, v.contents[0].length - 2): v.contents[0]}} from \"{{v.annotate.path + (v.path?v.path + \"/\":\"\") + v.contents[0]}}\";\n\t{{else}}\n\timport * as {{v.contents[0].endsWith(\".s\")?v.contents[0].slice(0, v.contents[0].length - 2): v.contents[0]}} from \"./{{v.path+ (v.path?v.path + \"/\":\"\") + v.contents[0]}}\";\n\t{{end}}\n\t{{end}}\n\t{{if v.preComment}}{{for i, v1 of v.preComment}}{{v1}}{{end}}{{end}}\n\t{{end}}\n\t{{end}}\n\n\t{{for k, v of it}}\n\t{{if v.type === \"Struct\" || v.type === \"Empty\"}}\n\t{{if v.sufComment}}{{for i, v1 of v.sufComment}}{{v1}}{{end}}{{end}}\n\t{{let members = v.members}}\n\t{{let clazz = v.name }}\n\texport class {{clazz}} {{if v.genType}}<{{for i, v1 of v.genType}}{{if i > 0}},{{end}}{{_tsTypeStr(v1)}}{{end}}>{{end}} extends {{if v.annotate && v.annotate.extends}}{{v.annotate.extends}}{{else}}Struct{{end}} {\n\n\t\t{{for i, v1 of members}}\n\t\t{{if v1.sufComment}}\n\t\t{{for j, vv of v.sufComment}}\n\t\t\n\t\t{{ vv }}\n\t\t{{end}}\n\t\t{{end}}\n\t\t{{if (v.annotate && v.annotate.readonly === \"true\") || (v1.annotate && v1.annotate.readonly === \"true\")}}\n\t\treadonly {{v1.name}}: {{_tsTypeStr(v1.type)}}\n\t\t{{else}}\n\n\t\t{{\"    \" + v1.name}}: {{_tsTypeStr(v1.type)}}\n\t\t{{end}}\n\t\t{{if v1.annotate && v1.annotate.default != undefined}} = {{v1.annotate.default}}{{end}};\n        {{if v1.preComment}}{{for j, vv of v.preComment}}{{ vv }}{{end}}{{end}}\n        {{if v1.annotate.enum}}\n        {{: v1.type = {name:\"u8\"} }}\n        {{end}}\n        {{end}}\n\t\tstatic _$info =  {{_sinfoFunc(_path+ \".\" + clazz, v.members, v.annotate, _enums, _enumcs)}};\n\n\t\t{{% \u6784\u9020\u65B9\u6CD5}}\n\t\t{{if v.annotate && (v.annotate.readonly === \"true\" || v.annotate.constructor===\"true\")}}\n\t\tconstructor({{for j, v1 of members}}{{if j > 0}},{{end}}{{v1.name}}?: {{_tsTypeStr(v1.type)}}{{end}}, old?: {{clazz}}){\n\t\t\tsuper();\n\t\t\tif(!old){\n\t\t\t\t{{for j, v1 of members}}\n\t\t\t\tthis.{{v1.name}} = {{v1.name}};\n\t\t\t\t{{end}}\n\t\t\t}else{\n\t\t\t\t{{for j, v1 of members}}\n\t\t\t\tthis.{{v1.name}} = {{v1.name}} === undefined? old.{{v1.name}}:{{v1.name}};\n\t\t\t\t{{end}}\n\t\t\t}\n\t\t}\n\t\t{{end}}\n\n\t\t{{% \u6DFB\u52A0}}\n\t\t{{if false && !v.annotate || v.annotate.hasmgr !== \"false\"}}\n\t\taddMeta(mgr: StructMgr){\n\t\t\tif(this._$meta)\n\t\t\t\treturn;\n\t\t\t{{for j, v1 of members}}\n\t\t\t{{if _isNativeObject(v1.type)}}\n\t\t\tthis.{{v1.name}} && this.{{v1.name}}.addMeta(mgr);\n\t\t\t{{elseif v1.type === \"Array\" && _isNativeObject(v1.type.genType[0])}}\n\t\t\tif(this.{{v1.name}}){\n\t\t\t\tfor(let i = 0; i < this.{{v1.name}}.length; i++){\n\t\t\t\t\tif(this.{{v1.name}}[i]){\n\t\t\t\t\t\tthis.{{v1.name}}[i].addMeta(mgr);\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t\t{{elseif v1.type === \"Tuple\"}}\n\t\t\t{{for j2,v2 of v1.childs}}\n\t\t\t{{if _isNativeObject(v2)}}\n\t\t\tif(this.{{v1.name}}[j2])\n\t\t\t\tthis.{{v1.name}}[j2].addMeta(mgr);\n\t\t\t{{end}}\n\t\t\t{{end}}\n\t\t\t{{elseif v1.type === \"Map\" && _isNativeObject(v1.type.genType[1])}}\n\t\t\tif(this.{{v1.name}}){\n\t\t\t\tthis.{{v1.name}}.forEach((v,k) => {\n\t\t\t\t\tv && c.addMeta(mgr);\n\t\t\t\t});\n\t\t\t}\n\t\t\t{{end}}\n\t\t\t{{end}}\n\t\t\taddToMeta(mgr, this);\n\t\t}\n\n\t\t{{% \u79FB\u9664}}\n\t\tremoveMeta(){\n\t\t\tremoveFromMeta(this);\n\t\t\t{{for j, v1 of members}}\n\t\t\t{{if _isNativeObject(v1.type)}}\n\t\t\tthis.{{v1.name}} && this.{{v1.name}}.removeMeta();\n\t\t\t{{elseif v1.type === \"Array\" && _isNativeObject(v1.type.genType[0])}}\n\t\t\tif(this.{{v1.name}}){\n\t\t\t\tfor(let i = 0; i < this.{{v1.name}}.length; i++){\n\t\t\t\t\tif(this.{{v1.name}}[i]){\n\t\t\t\t\t\tthis.{{v1.name}}[i].removeMeta();\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t\t{{elseif v1.type === \"Tuple\"}}\n\t\t\t{{for j2,v2 of v1.childs}}\n\t\t\t{{if _isNativeObject(v2)}}\n\t\t\tif(this.{{v1.name}}[j2])\n\t\t\t\tthis.{{v1.name}}[j2].removeMeta();\n\t\t\t{{end}}\n\t\t\t{{end}}\n\t\t\t{{elseif v1.type === \"Map\" && _isNativeObject(v1.type.genType[1])}}\n\t\t\tif(this.{{v1.name}}){\n\t\t\t\tthis.{{v1.name}}.forEach((v,k) => {\n\t\t\t\t\tv && c.removeMeta();\n\t\t\t\t});\n\t\t\t}\n\t\t\t{{end}}\n\t\t\t{{end}}\t\t\t\n\t\t}\n\t\t{{end}}\n\n\t\t{{% set \u8BBE\u7F6E}}\n\t\t{{if false && (!v.annotate || !v.annotate.readonly || v.annotate.readonly === \"false\")}}\n\t\t{{for j, v1 of members}}\n\t\t{{let _type = _tsTypeStr(v1.type)}}\n\t\t{{if v1.type.name === \"Array\"}}\n\t\tset{{_upperFirst(v1.name)}} (value: {{_tsTypeStr(v1.type)}}, index: number | string){\n\t\t\t!this.{{v1.name}} && (this.{{v1.name}} = [] as {{_tsTypeStr(v1.type)}});\n\t\t\t{{if _isNativeObject(v1.type)}}\n\t\t\tlet old = this.{{v1.name}}[index];\n\t\t\tthis.{{v1.name}}[index] = value;\n\t\t\tif(this._$meta){\n\t\t\t\tif(old)\n\t\t\t\t\told.removeMeta();\n\t\t\t\tvalue.addMeta(this._$meta.mgr);\n\t\t\t\t{{if v.annotate && v.annotate.hasmgr === \"true\"}}\t\t\t\n\t\t\t\tnotifyModify(this, \"{{v1.name}}\", value, old, index);\n\t\t\t\t{{end}}\n\t\t\t}\n\t\t\t{{else}}\n\t\t\tlet old = this.{{v1.name}}[index];\n\t\t\tthis.{{v1.name}}[index] = value;\n\t\t\t{{if v.annotate && v.annotate.hasmgr === \"true\"}}\n\t\t\tif(this._$meta)\n\t\t\t\tnotifyModify(this, \"{{v1.name}}\", value, old, index);\n\t\t\t{{end}}\n\t\t\t{{end}}\n\t\t}\n\t\t{{elseif v1.type.name === \"Tuple\"}}\n\t\t{{for j2, v2 of v1.type.childs}}\n\t\tset{{_upperFirst(v1.name)}}_{{j2}} (value: {{_tsTypeStr(v2)}}){\n\t\t\t!this.{{v1.name}} && (this.{{v1.name}} = [] as {{_tsTypeStr(v1.type)}});\n\t\t\t{{if _isNativeObject(v2)}}\n\t\t\tlet old = this.{{v1.name}}[{{j2}}];\n\t\t\tthis.{{v1.name}}[{{j2}}] = value;\n\t\t\tif(this._$meta){\n\t\t\t\tif(old)\n\t\t\t\t\told.removeMeta();\n\t\t\t\tvalue.addMeta(this._$meta.mgr);\t\n\t\t\t\t{{if v.annotate && v.annotate.hasmgr === \"true\"}}\t\t\n\t\t\t\tnotifyModify(this, \"{{v1.name}}\", value, old, {{j2}});\n\t\t\t\t{{end}}\n\t\t\t}\n\t\t\t{{else}}\n\t\t\tlet old = this.{{v1.name}}[{{j2}}];\n\t\t\tthis.{{v1.name}}[{{j2}}] = value;\n\t\t\t{{if v.annotate && v.annotate.hasmgr === \"true\"}}\n\t\t\tif(this._$meta)\n\t\t\t\tnotifyModify(this, \"{{v1.name}}\", value, old, {{j2}});\n\t\t\t{{end}}\n\t\t\t{{end}}\n\t\t}\n\t\t{{end}}\n\t\t{{elseif v1.type.name === \"Map\"}}\n\t\tset{{_upperFirst(v1.name)}} (value: {{_tsTypeStr(v1.type.genType[1])}}, key: number | string){\n\t\t\t!this.{{v1.name}} && (this.{{v1.name}} = [] as Map<{{_tsTypeStr(v1.type.genType[0])}}, {{_tsTypeStr(v1.type.genType[1])}}>);\n\t\t\t{{if _isNativeObject(v1.type.genType[0])}}\n\t\t\tlet old = this.{{v1.name}}.get(key);\n\t\t\tthis.{{v1.name}}.set(key,value);\n\t\t\tif(this._$meta){\n\t\t\t\tif(old)\n\t\t\t\t\told.removeMeta();\n\t\t\t\tvalue.addMeta(this._$meta.mgr);\n\t\t\t\t{{if v.annotate && v.annotate.hasmgr === \"true\"}}\n\t\t\t\tnotifyModify(this, \"{{v1.name}}\", value, old, key);\n\t\t\t\t{{end}}\n\t\t\t}\n\t\t\t{{else}}\n\t\t\tlet old = this.{{v1.name}}.get(key);\n\t\t\tthis.{{v1.name}}.set(key,value);\n\t\t\t{{if v.annotate && v.annotate.hasmgr === \"true\"}}\n\t\t\tif(this._$meta)\n\t\t\t\tnotifyModify(this, \"{{v1.name}}\", value, old, key);\n\t\t\t{{end}}\n\t\t\t{{end}}\n\t\t}\n\t\t{{else}}\n\t\tset{{_upperFirst(v1.name)}} (value: {{_type}}){\t\n\t\t\t{{if _isNativeObject(v1.type)}}\n\t\t\tlet old = this.{{v1.name}};\n\t\t\tthis.{{v1.name}} = value;\n\t\t\tif(this._$meta){\n\t\t\t\tif(old)\n\t\t\t\t\told.removeMeta();\n\t\t\t\tvalue.addMeta(this._$meta.mgr);\n\t\t\t\t{{if v.annotate && v.annotate.hasmgr === \"true\"}}\n\t\t\t\tnotifyModify(this, \"{{v1.name}}\", value, old);\n\t\t\t\t{{end}}\n\t\t\t}\n\t\t\t{{else}}\n\t\t\tlet old = this.{{v1.name}};\n\t\t\tthis.{{v1.name}} = value;\n\t\t\t{{if v.annotate && v.annotate.hasmgr === \"true\"}}\n\t\t\tif(this._$meta)\n\t\t\t\tnotifyModify(this, \"{{v1.name}}\", value, old);\n\t\t\t{{end}}\n\t\t\t{{end}}\t\t\t\n\t\t}\n\t\t{{end}}\n\t\t{{end}}\n\t\t{{end}}\n\n\t\t{{%\u5982\u679C\u5B57\u6BB5noCopy\u6CE8\u89E3\u4E3Afalse\uFF0C\u5E94\u8BE5\u8BBE\u7F6Ecopy\u548Cclone\u65B9\u6CD5}}\n\t\t{{if v.annotate && v.annotate.noCopy && v.annotate.noCopy === \"false\"}}\n\t\tcopy(o: {{clazz}}) : {{clazz}} {\n\t\t\t{{for i, v1 of members}}\n\t\t\t{{if (v.annotate && v.annotate.readonly === \"true\") || (v1.annotate && v1.annotate.readonly === \"true\")}}\n\t\t\t{{elseif _isNativeObject(v1.type)}}\n\t\t\to.{{v1.name}} && ((<any>this).{{v1.name}} = o.{{v1.name}}.clone());\n\t\t\t{{elseif v1.type.name === \"Array\"}}\n\t\t\tif(o.{{v1.name}}){\n\t\t\t\t(<any>this).{{v1.name}} = [] as {{_tsTypeStr(v1.type)}};\n\t\t\t\tfor(let i = 0; i < o.{{v1.name}}.length; i++){\n\t\t\t\t\t{{if _isNativeObject(v1.type.type)}}\n\t\t\t\t\to.{{v1.name}}[i] && ((<any>this).{{v1.name}}[i] = o.{{v1.name}}[i].clone());\n\t\t\t\t\t{{else}}\n\t\t\t\t\t(<any>this).{{v1.name}} = o.{{v1.name}};\n\t\t\t\t\t{{end}}\n\t\t\t\t}\n\t\t\t}\n\t\t\t{{elseif v1.type.name === \"Tuple\"}}\n\t\t\tif(o.{{v1.name}}){\n\t\t\t\tthis.{{v1.name}} = [] as {{_tsTypeStr(v1.type)}}\n\t\t\t\t{{for j2, v2 of v1.type.childs}}\n\t\t\t\t{{if _isNativeObject(v2)}}\n\t\t\t\to.{{v1.name}}[{{j2}}] && ((<any>this).{{v1.name}}[{{j2}}] = o.{{v1.name}}[{{j2}}].clone());\n\t\t\t\t{{else}}\n\t\t\t\t(<any>this).{{v1.name}}[{{j2}}] = o.{{v1.name}}[{{j2}}];\n\t\t\t\t{{end}}\n\t\t\t\t{{end}}\n\t\t\t}\n\t\t\t{{elseif v1.type.name === \"Map\"}}\n\t\t\tif(o.{{v1.name}}){\n\t\t\t\to.{{v1.name}}.forEach((v, k) => {\n\t\t\t\t\t{{if _isNativeObject(v1.type.genType)}}\n\t\t\t\t\tv && (this.{{v1.name}} = v.clone());\n\t\t\t\t\t{{else}}\n\t\t\t\t\tthis.{{v1.name}} = v;\n\t\t\t\t\t{{end}}\n\t\t\t\t});\n\t\t\t}\n\t\t\t{{else}}\n\t\t\tthis.{{v1.name}} = o.{{v1.name}};\n\t\t\t{{end}}\n\t\t\t{{end}}\n\t\t\treturn this;\n\t\t}\n\n\t\tclone() : {{clazz}} {\n\t\t\treturn new {{clazz}}().copy(this);\n\t\t}\n\t\t{{end}}\n\n\t\t{{%\u5982\u679C\u5B57\u6BB5noBinSeri\u6CE8\u89E3\u4E3Afalse\uFF0C\u5E94\u8BE5\u8BBE\u7F6E_binDecode\u548C_binEncode\u65B9\u6CD5}}\n\t\t{{if !v.annotate || !v.annotate.noBinSeri}}\n\t\t{{if !v.annotate || !v.annotate.readonly }}\n\t\tbonDecode(bb:BonBuffer) {\n\t\t\t{{for j, v1 of members}}\n\t\t\t{{if !v1.annotate || (!v1.annotate.readonly && !v1.annotate.noBinSeri) }}\n\t\t\t{{if v1.type.name === \"Option\"}}\n\t\t\tif(!bb.isNil()){\n\t\t\t\tthis.{{v1.name}} = {{_readFunc(v1.type.genType[0], v1.name, _enumcs)}};\n\t\t\t}\n\t\t\t{{else}}\n\t\t\tthis.{{v1.name}} = {{_readFunc(v1.type, v1.name, _enumcs)}};\n\t\t\t{{end}}\n\t\t\t{{end}}\n\t\t\t{{end}}\n\t\t}\n\t\t{{end}}\n\n\t\tbonEncode(bb:BonBuffer) {\n\t\t\t{{for j, v1 of members}}\n\t\t\t{{if !v1.annotate || !v1.annotate.noBinSeri}}\n\t\t\t\t{{_writeFunc(v1.type, \"this.\" + v1.name, _enumcs, \"        \")}}\n\t\t\t{{end}}\n\t\t\t{{end}}\n\t\t}\n\t\t{{end}}\n\t}\n\t{{if v.preComment}}{{for i, v1 of v.preComment}}{{v1}}{{end}}{{end}}\n\n\n\t{{elseif v.type === \"enumc\"}}\n    {{if v.sufComment}}{{for i, v1 of v.sufComment}}{{v1}}{{end}}\n    {{end}}\n\texport enum {{v.name}}{\n\t{{let members = v.members}}\n\t{{for k1, v1 of members}}\n\t\t{{if k1 > 0}},\n\t\t{{end}}\n\t\t{{v1.name}}={{v1.value}}\n\t{{end}} }\n\n\t{{elseif v.type === \"const\"}}\n\texport const {{v.name}} = {{_parseConst(v.value)}}\n\n\t{{elseif v.type === \"enum\"}}\n\t\t{{_rustEnumFunc(v, _path, _enums, _enumcs)}}\n\n\t{{end}}\n\t{{end}}\n";
tsTpl = tsTpl.replace(/^\t/mg, "");
//根据类型不同使用不同的反序列化接口
var readTpl = "{{let type = it}}{{let name = it1}}{{let _enumcs = it2}}\n{{if type.name === \"Option\"}}(() => {\n    if(!bb.isNil()){\n        return {{_readFunc(type.genType[0], name, _enumcs, \"    \")}}};\n    }\n)()\n{{elseif _enumcs.indexOf(type.name) > -1}}bb.readInt() as {{type.name}}\n{{elseif _isInteger(type.name)}}bb.readInt()\n{{elseif type.name === \"u64\"}}u64Merge(bb.readBigInt())\n{{elseif type.name === \"u128\"}}u128Merge(bb.readBigInt())\n{{elseif type.name === \"f32\" || type.name === \"f64\"}}bb.readf()\n{{elseif _isStr(type.name)}}bb.readUtf8()\n{{elseif type.name === \"bool\"}}bb.readBool()\n{{elseif type.name === \"Array\"}}\n{{if type.type.name === \"u8\"}}bb.readBin()\n{{else}}bb.readArray(() => {\n\treturn {{_readFunc(type.type, name, _enumcs, \"    \")}};\n})\n{{end}}\n\n{{elseif type.name === \"HashMap\"}}bb.readMap(() => {\n\treturn [{{_readFunc(type.genType[0], null, _enumcs)}}, {{_readFunc(type.genType[1], name, _enumcs)}}];\n})\n{{%\u503C\u4E3A\u7A7A\u7684\u60C5\u51B5\u5E94\u8BE5\u5728\u5916\u90E8\u5224\u65AD\uFF0C \u8BE5\u5206\u652F\u53EA\u5904\u7406\u4E86\u5143\u7EC4\u4E0D\u4E3A\u7A7A\u7684\u60C5\u51B5%}}\n{{elseif type.name === \"Tuple\"}} [{{for i, v of type.childs}}{{i > 0? \", \": \"\"}}{{_readFunc(type.childs[i], name, _enumcs)}}{{end}}] as {{_tsTypeStr(type)}}\n{{%\u7ED3\u6784\u4F53%}}\n{{else}}\n{{if name}} bb.readBonCode((<any>this)._$EnumTypeMap?(<any>this)._$EnumTypeMap(this.{{name}}):{{_tsTypeStr(type)}})\n{{else}} bb.readBonCode({{_tsTypeStr(type)}})\n{{end}}\n{{end}}\n";
//根据类型不同使用不同的序列化接口
var writeTpl = "{{let type = it}}{{let valueName = it1}}{{let _enumcs = it2}}\n{{if type.name === \"Option\"}}\nif({{valueName}} === undefined || {{valueName}} === null){\n    bb.writeNil();\n}else{\n{{_writeFunc(type.genType[0], valueName, _enumcs, \"    \")}}\n}\n{{elseif _enumcs.indexOf(type.name) > -1}}\nbb.writeInt({{valueName}});\n{{elseif _isInteger(type.name)}}\nbb.writeInt({{valueName}});\n\n{{elseif type.name == \"u64\"}}\nbb.writeBigInt(u64Unwrap({{valueName}}));\n\n{{elseif type.name == \"u128\"}}\nbb.writeBigInt(u128Unwrap({{valueName}}));\n\n{{elseif type.name === \"f32\"}}\nbb.writeF32({{valueName}});\n\n{{elseif type.name === \"f64\"}}\nbb.writeF64({{valueName}});\n\n{{elseif _isStr(type.name)}}\nbb.writeUtf8({{valueName}});\n\n{{elseif type.name === \"bool\"}}\nbb.writeBool({{valueName}});\n\n{{elseif type.name === \"Array\"}}\n{{if type.type.name === \"u8\"}}\nbb.writeBin({{valueName}});\n{{else}}\nbb.writeArray({{valueName}}, (el) => {\n\t{{_writeFunc(type.type, \"el\", _enumcs, \"    \")}}\n});\n{{end}}\n\n{{elseif type.name === \"HashMap\"}}\nbb.writeMap({{valueName}}, (k, v) => {\n\t{{_writeFunc(type.genType[0], \"k\", _enumcs, \"    \")}}\n\t{{_writeFunc(type.genType[1], \"v\", _enumcs, \"    \")}}\n});\n\n{{elseif type.name === \"Tuple\"}} {{%\u503C\u4E3A\u7A7A\u7684\u60C5\u51B5\u5E94\u8BE5\u5728\u5916\u90E8\u5224\u65AD\uFF0C \u8BE5\u5206\u652F\u53EA\u5904\u7406\u4E86\u5143\u7EC4\u4E0D\u4E3A\u7A7A\u7684\u60C5\u51B5%}}\n{{for i, v of type.childs}}\n{{_writeFunc(type.childs[i], valueName + \"[\" + i + \"]\", _enumcs)}}\n{{end}}\n\n{{else}} {{%\u7ED3\u6784\u4F53%}}\nbb.writeBonCode({{valueName}});\n\n{{end}}\n";
//定义元信息， 当名称为""是认为是元组
var sinfoTpl = "{{let name = it}}{{let  members= it1}}{{let _annotate = it2}}{{let _enums = it3}}{{let _enumcs = it4}}new StructInfo(\"{{name}}\",{{%name%}}\n{{%name_hash%}}\n{{_strHashCode(name, 0)}}, \n{{%note%}}\n{{if _annotate}} new Map( {{JSON.stringify(_jsonToArray(_annotate))}} ){{else}}null\n{{end}}, [\n{{%\u5982\u679C\u4E0D\u5B58\u518Dname\uFF0C \u8868\u793A\u533F\u540D\u7ED3\u6784\u4F53, \u6536\u5230\u7684merber\u5E94\u8BE5\u662F\u4E00\u4E2AType\uFF0C \u9700\u8981\u5C01\u88C5\u4E3Amember%}}\n{{for j,v1 of members}}{{j > 0? \", \": \"\"}}{{if !name}}{{:v1 = {name: j + \"\", type: v1} }}{{end}}new FieldInfo(\"{{v1.name}}\", {{_enumTypeFunc(v1.type, _enums, _enumcs)}}, {{if v1.annotate}} new Map( {{JSON.stringify(_jsonToArray(v1.annotate))}} ){{else}}null{{end}})\n{{end}} ])\n";
var enumTypeTpl = "{{let type = it}}{{let _enums = it1}}{{let _enumcs = it2}}\nnew EnumType(\n{{if _enums.indexOf(type.name) > -1}} Type.Enum, {{type.name}}._$info\n{{elseif _enumcs.indexOf(type.name) > -1}} Type.U8\n{{elseif type.name === \"Option\"}} Type.Option, {{_enumTypeFunc(type.genType[0], _enums, _enumcs)}}\n{{elseif type.name === \"u8\"}} Type.U8\n{{elseif type.name === \"u16\"}} Type.U16\n{{elseif type.name === \"u32\"}} Type.U32\n{{elseif type.name === \"u64\"}} Type.U64\n{{elseif type.name === \"u128\"}} Type.U128\n{{elseif type.name === \"u256\"}} Type.U256\n{{elseif type.name === \"usize\"}} Type.Usize\n{{elseif type.name === \"i8\"}} Type.I8\n{{elseif type.name === \"i16\"}} Type.I16\n{{elseif type.name === \"i32\"}} Type.I32\n{{elseif type.name === \"i64\"}} Type.I64\n{{elseif type.name === \"i128\"}} Type.I128\n{{elseif type.name === \"i256\"}} Type.I256\n{{elseif type.name === \"isize\"}} Type.Isize\n{{elseif type.name === \"bool\"}} Type.Bool\n{{elseif type.name === \"f32\"}} Type.F32\n{{elseif type.name === \"f64\"}} Type.F64\n{{elseif type.name === \"String\" || type.name === \"str\"}} Type.Str\n{{elseif type.name === \"bin\"}} Type.Bin\n{{elseif type.name === \"Array\"}} Type.Arr, {{_enumTypeFunc(type.type, _enums, _enumcs)}}\n{{elseif type.name === \"Tuple\"}} Type.Struct, {{_sinfoFunc(\"\", type.childs, null, _enums, _enumcs)}}  {{%\u5982\u679C\u662F\u5143\u7EC4\uFF0C \u5219\u8BA4\u4E3A\u662F\u4E00\u4E2A\u533F\u540D\u7ED3\u6784\u4F53%}}\n{{elseif type.name === \"HashMap\"}} Type.Map, [{{_enumTypeFunc(type.genType[0], _enums, _enumcs)}}, {{_enumTypeFunc(type.genType[1], _enums, _enumcs)}}]\n{{else}}Type.Struct, {{_tsTypeStr(type)}}._$info\n{{end}} )\n";
//rust类型的枚举转换为ts的类型
var rustEnumTpl = "{{let obj = it}}{{let _path = it1}}{{let _enums = it2}}{{let _enumcs = it3}}\n{{let members = obj.members}}\n{{_enumIntoTnterface(obj)}}\nexport enum {{obj.name}}_Enum{\n    {{for i, member of members}}{{i>0?\",\":\"\"}}\n    {{member.name}} = {{parseInt(i) + 1}}\n    {{end}}\n}\nexport class {{obj.name}} extends Struct{\n    enum_type: {{obj.name}}_Enum;\n    value: {{_toEnumType(obj)}};\n\n    static _$info = {{_enumInfoFunc(obj, _path+\".\"+obj.name, obj.annotate, _enums, _enumcs)}}\n\n    constructor(type?: {{obj.name}}_Enum, value?: {{_toEnumType(obj)}}){\n        super();\n        this.enum_type = type;\n        this.value = value;\n    }\n\n    {{if !obj.annotate || !obj.annotate.noBinSeri}}\n    bonEncode(bb: BonBuffer){\n        bb.writeInt(this.enum_type);\n        switch (this.enum_type){\n            {{for i, member of members}}\n            case {{parseInt(i) + 1}}:\n                {{if member.type === \"StructTuple\"}}\n                {{if member.members.length === 1 }}\n                {{_writeFunc(member.members[0], \"this.value as \" + _tsTypeStr(member.members[0]), _enumcs,\"                \")}}\n                {{else}}\n                {{_writeFunc({childs: member.members, name: \"Tuple\"}, \"(<\" + _tsTypeStr({name: \"Tuple\", childs:member.members}) + \">this.value)\", _enumcs, \"                \")}}\n                {{end}}\n                {{elseif member.type === \"Struct\"}}\n                {{for j, smember of member.members}}\n                {{_writeFunc(smember.type, \"(<_$_\" + obj.name + \"_\" + member.name + \">this.value).\" + smember.name, _enumcs, \"                \")}}\n                {{end}}\n                {{end}}\n                break;\n            {{end}}\n            default:\n                throw new Error(\"bonEncode type error, A is not exist index:\" + this.enum_type);\n        }\n    }\n\n    bonDecode(bb: BonBuffer){\n        let t = bb.readInt();\n        this.enum_type = t;\n        switch (t){\n            {{for i, member of members}}\n            case {{parseInt(i) + 1}}:\n                {{if member.type === \"StructTuple\"}}\n                {{if member.members.length === 1 }}\n                this.value = {{_readFunc(member.members[0], \"\", _enumcs)}}\n                {{else}}\n                this.value = {{_readFunc({childs: member.members, name: \"Tuple\"}, \"\", _enumcs)}}\n                {{end}}\n                {{elseif member.type === \"Struct\"}}\n                let _$temp: _$_{{obj.name}}_{{member.name}} = {} as any;\n                {{for j, smember of member.members}}\n                _$temp.{{smember.name}} = {{_readFunc(smember.type, \"\", _enumcs)}};\n                {{end}}\n                this.value = _$temp;\n                {{end}}\n                break;\n            {{end}}\n            default:\n                throw new Error(\"bonDecode type error, A is not exist index:\" + t);\n        }\n    }\n    {{end}}\n\n    {{if obj.annotate && obj.annotate.noCopy && obj.annotate.noCopy === \"false\"}}\n    copy(o: {{obj.name}}): {{obj.name}}{\n        this.enum_type = o.index;\n        switch (o.index){\n            {{for i, member of members}}\n            case {{parseInt(i) + 1}}:\n                {{if member.type === \"StructTuple\"}}\n                {{if member.members.length === 1 }}\n                {{_copyFunc(member.members[0], \"o.value\", \"this.value\", \"                \")}}\n                {{else}}\n                {{_copyFunc({childs: member.members, name: \"Tuple\"}, \"o.value\", \"this.value\", \"                \")}}\n                {{end}}\n                {{elseif member.type === \"Struct\"}}\n                let _$temp: _$_{{obj.name}}_{{member.name}} = {} as any;\n                let _$o: _$_{{obj.name}}_{{member.name}} = o.value as any;\n                {{for j, smember of member.members}}\n                {{_copyFunc(smember.type, \"_$temp.\" + smember.name, \"_$o.\" + smember.name, \"                \")}};\n                {{end}}\n                this.value = _$temp;\n                {{end}}\n                break;\n            {{end}}\n            default:\n                throw new Error(\"copy type error, A is not exist index:\" + o.index);\n        }\n        return this;\n    }\n    clone(): {{obj.name}}{\n        return new {{obj.name}}().copy(this);\n    }\n    {{end}}\n}\n";
//rust类型的枚举转换为ts的类型
var enumIntoTnterfaceTpl = "{{let _obj = it}}{{let _namespace = it1}}\n{{let members = _obj.members}}\n\nexport interface _$_{{_namespace}}_{{_obj.name}}{\n    {{for i, member of members}}\n\n    {{\"    \"}}{{member.name}}: {{_tsTypeStr(member.type)}};\n    {{end}}\n}\n";
//定义元信息
var enumInfo = "{{let _obj = it}}{{let _path = it1}}{{let _annotate = it2}}{{let _enums = it3}}{{let _enumcs = it4}}new EnumInfo('{{_path}}', {{_strHashCode(_path, 0)}}, {{if _annotate}} new Map( {{JSON.stringify(_jsonToArray(_annotate))}} ){{else}}null{{end}}, {{let members = _obj.members}} [\n{{for i, member of members}}{{i > 0?\",\":\"\"}}\n{{if member.type === \"StructTuple\"}}\n{{if member.members.length === 1}}\n{{_enumTypeFunc(member.members[0], _enums, _enumcs)}}\n{{else}} new EnumType(Type.Struct, {{_sinfoFunc(\"\", member.members, null, _enums, _enumcs)}})\n{{end}}\n{{elseif member.type === \"Struct\"}} new EnumType(Type.Struct, {{_sinfoFunc(\"_$Json\", member.members, null, _enums, _enumcs)}})\n{{else}} null\n{{end}}\n{{end}}]);\n";
//copy数据
var copyTpl = "{{let type = it}}{{let src = it1}}{{let dst = it2}}\n{{if _isNativeObject(type)}}\n\n{{src}} && ({{dst}} = {{src}}.clone())\n{{elseif type.name === \"Array\"}}\nif({{src}}){\n    {{dst}} = [] as {{_tsTypeStr(type)}};\n    for(let i = 0; i < {{src}}.length; i++){\n        {{_copyFunc(type.type, src+\"[\" + i + \"]\", dst+\"[\" + i + \"]\", \"        \")}}\n    }\n}\n{{elseif type.name === \"Tuple\"}}\nif({{src}}){\n\n    {{dst}} = [] as any;\n    {{for j2, v2 of type.childs}}\n    {{_copyFunc(type.childs[j2], src+\"[\" + j2 + \"]\", dst+\"[\" + j2 + \"]\", \"    \")}}\n    {{end}}\n}\n{{elseif type.name === \"Map\"}}\nif({{src}}){\n    {{src}}.forEach((v, k) => {\n        let key, value;\n        {{_copyFunc(type.genType[0], \"k\" , \"key\", \"        \")}}\n        {{_copyFunc(type.genType[0], \"v\" , \"value\", \"        \")}}\n        {{dst}}.set(key, value);\n    });\n}\n{{else}}\n\n{{dst}} = {{src}};\n{{end}}\n";
var tsTypeStr1 = function tsTypeStr1(type) {
    if (type.name === "Option") {
        return tsTypeStr1(type.genType[0]);
    } else if (type.name === "HashMap") {
        return "Map<" + tsTypeStr1(type.genType[0]) + "," + tsTypeStr1(type.genType[1]) + ">";
    } else {
        return tsTypeStr(type, null, null);
    }
};
//确定枚举的类型，如 number | [string, string]
var toEnumType = function toEnumType(obj) {
    var members = obj.members;
    var types = [];
    for (var i = 0; i < members.length; i++) {
        var str = void 0;
        var m = members[i];
        if (m.type === "StructTuple") {
            if (m.members.length === 1) {
                //如果元组中只存在一个元素， 则任务成员类型为其内部元素类型
                str = tsTypeStr1(m.members[0]);
            } else {
                //否则， 该成员类型为元组类型
                var s = [];
                for (var j = 0; j < m.members.length; j++) {
                    s.push(tsTypeStr1(m.members[j]));
                }
                str = "[" + s.join(",") + "]";
            }
        } else if (m.type === "Struct") {
            str = "_$_" + obj.name + "_" + members[i].name; //如果是一个结构体，其类型为“_$_+ 枚举名称 + _ + 成员的名称”， 该类型必须在外部定义出来
        } else {
                continue; //如果是一个空结构体，不需要描述其类型
            }
        if (types.indexOf(str) < 0) {
            types.push(str);
        }
    }
    return types.join(" | ");
};
var readFunc = function readFunc(type, name, enumcs, tab) {
    var str = tplFunc.readTpl(null, type, name, enumcs);
    if (tab) {
        str = str.replace(/^/mg, tab);
    }
    return str;
};
var writeFunc = function writeFunc(type, valueName, enumcs, tab) {
    var str = tplFunc.writeTpl(null, type, valueName, enumcs);
    if (tab) {
        str = str.replace(/^/mg, tab);
    }
    return str;
};
var enumTypeFunc = function enumTypeFunc(type, enums, enumcs, tab) {
    var str = tplFunc.enumTypeTpl(null, type, enums, enumcs);
    if (tab) {
        str = str.replace(/^/mg, tab);
    }
    return str;
};
var sinfoFunc = function sinfoFunc(name, members, annotate, enums, enumcs, tab) {
    var str = tplFunc.sinfoTpl(null, name, members, annotate, enums, enumcs);
    if (tab) {
        str = str.replace(/^/mg, tab);
    }
    return str;
};
var enumInfoFunc = function enumInfoFunc(obj, path, annotate, enums, enumcs, tab) {
    var str = tplFunc.enumInfo(null, obj, path, annotate, enums, enumcs);
    if (tab) {
        str = str.replace(/^/mg, tab);
    }
    return str;
};
//定义枚举内部结构体为interface
var enumIntoTnterface = function enumIntoTnterface(obj) {
    var members = obj.members;
    var types = "";
    for (var i = 0; i < members.length; i++) {
        if (members[i].type === "Struct") {
            types += tplFunc.enumIntoTnterfaceTpl(null, members[i], obj.name);
        }
    }
    return types;
};
var rustEnumFunc = function rustEnumFunc(obj, path, enums, enumcs, tab) {
    var str = tplFunc.rustEnumTpl(null, obj, path, enums, enumcs);
    if (tab) {
        str = str.replace(/^/mg, tab);
    }
    return str;
};
var tsFunc = function tsFunc(objs, path, cfg, enums, enumcs, tab) {
    var str = tplFunc.tsTpl(null, objs, path, cfg, enums, enumcs);
    if (tab) {
        str = str.replace(/^/mg, tab);
    }
    return str;
};
var copyFunc = function copyFunc(type, src, dst, tab) {
    var str = tplFunc.copyTpl(null, type, src, dst);
    if (tab) {
        str = str.replace(/^/mg, tab);
    }
    return str;
};
var parseConst = function parseConst(v) {
    if (v.startsWith('"formula#')) {
        //是一个公式字符串 （不严谨， 分析该字符串的语法来确定）
        var s = v.slice(9, v.length - 1); //去掉字符串‘"formula#’
        var arr = s.split("#");
        var param = arr[0].replace(/:([^,)]*)/g, function (word, v) {
            var t = v.trim();
            if (Gendrust.isNumber(t)) {
                return ":number";
            } else if (Gendrust.isStr(t)) {
                return ":string";
            } else if (Gendrust.isBool(t)) {
                return ":boolean";
            } else {
                return ":" + t;
            }
        });
        return param + " => {\n\treturn " + arr[1] + ";\n}";
    } else {
        return v;
    }
};
/**
 * @description  返回定义的函数, 用定义字符串，转成匿名函数的返回函数
 * @example
 */
var toFunc = function toFunc(s) {
    try {
        return new Function("_stringify", "_tsTypeStr", "_typeToString", "_isNativeObject", "_isInteger", "_isStr", "_isBase", "_strHashCode", "_upperFirst", "_readFunc", "_jsonToArray", "_writeFunc", "_enumTypeFunc", "_sinfoFunc", "_isBigInt", "_parseConst", "_toEnumType", "_enumIntoTnterface", "_rustEnumFunc", "_enumInfoFunc", "_copyFunc", "return " + s)(tpl_1.toString, tsTypeStr1, Gendrust.typeToString, isNativeObject, Gendrust.isInteger, Gendrust.isStr, Gendrust.isBase, hash.strHashCode, util_1.upperFirst, readFunc, jsonToArray, writeFunc, enumTypeFunc, sinfoFunc, Gendrust.isBigInt, parseConst, toEnumType, enumIntoTnterface, rustEnumFunc, enumInfoFunc, copyFunc);
    } catch (e) {
        //warn(level, "tpl toFun, path: "+", s: ", s, e);
        throw e;
    }
};
var tplFunc = {
    readTpl: toFunc(tpl_1.compile(readTpl, tpl_str_1.Parser)),
    writeTpl: toFunc(tpl_1.compile(writeTpl, tpl_str_1.Parser)),
    enumTypeTpl: toFunc(tpl_1.compile(enumTypeTpl, tpl_str_1.Parser)),
    sinfoTpl: toFunc(tpl_1.compile(sinfoTpl, tpl_str_1.Parser)),
    tsTpl: toFunc(tpl_1.compile(tsTpl, tpl_str_1.Parser)),
    enumIntoTnterfaceTpl: toFunc(tpl_1.compile(enumIntoTnterfaceTpl, tpl_str_1.Parser)),
    enumInfo: toFunc(tpl_1.compile(enumInfo, tpl_str_1.Parser)),
    rustEnumTpl: toFunc(tpl_1.compile(rustEnumTpl, tpl_str_1.Parser)),
    copyTpl: toFunc(tpl_1.compile(copyTpl, tpl_str_1.Parser))
};
})