_$define("pi/compile/genrust2ts", function (require, exports, module){
"use strict";
/**
 * cfg: {
 * 		"genType":[elem, elem],    //elem: string | [string, string], 描述类型中只有一个泛型时，可以直接使用string表示，否则必须用数组表示
 * 		"include":[path, path], //需要导出的类型路径, 如果不配置，表示导出限制为“pub”的类型
 * 		"ignore":[path, path], //需要忽略的类型路径
 * }
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var hash = require("../util/hash");
var tpl_str_1 = require("../util/tpl_str");
var tpl_1 = require("../util/tpl");
var Gendrust = require("./gendrust");
var pathMode = require("path");
// ====================================== 导出
//将rust接口解析为ts接口
exports.gen = function (mod, cfg, tree) {
    var depend = cfg.depend || {};
    //let map = new Map();
    var pcfg = new PathCfg(cfg);
    var root = cfg.root;
    var str = mod.modNote ? mod.modNote : "";
    return str + gen1(mod, cfg.depend || {}, pcfg, tree, root);
};
exports.genCfg = function (mods) {
    var str = {};
    mods.forEach(function (mod, k) {
        if (mod.classFunc) {
            mod.classFunc.forEach(function (c, k) {
                str[k] = mod.mod();
            });
        }
    });
    return JSON.stringify(str);
};
var gen1 = function gen1(mod, depend, pcfg, tree, root) {
    var str = "";
    var imports = new Map();
    pcfg.setModPath(mod, tree);
    for (var k in depend) {
        var dp = getRelPath(pcfg, depend[k][1].split("/"), tree);
        if (depend[k][0].startsWith("* as")) {
            str += "\nimport " + depend[k][0] + " from \"" + dp + "\";";
        } else {
            str += "\nimport {" + depend[k][0] + "} from \"" + dp + "\";";
        }
    }
    var ss = "";
    if (mod.classFunc) {
        mod.classFunc.forEach(function (funMap, k) {
            var c = mod.classes.get(k);
            if (!c) {
                return;
            }
            c.tsflag = true;
            var arr = [funMap];
            if (c.deref) {
                var funcDeref = mod.classFunc.get(c.deref.func.result.name);
                arr.push(funcDeref);
            }
            ss += structFun(k, arr, mod, imports, tree, c, root);
        });
    }
    if (mod.funMap) {
        mod.funMap.forEach(function (v, k) {
            ss += funcFun(v, mod, imports, tree, null);
        });
    }
    if (mod.classes) {
        mod.classes.forEach(function (v, k) {
            if (v.tsflag === true || v.power !== "pub" || !Gendrust.isInclude(mod.getFullMod(v.name, false, tree), mod.cfg)) {
                return;
            } else {
                if (v instanceof Gendrust.DefEnumC) {
                    ss += enumcFun(v);
                } else {
                    ss += structFun(k, [], mod, null, tree, v, root);
                }
            }
        });
    }
    // if(mod.newTypeMap){
    //     mod.newTypeMap.forEach((v, k) => {
    //         if(v.power !== "pub" || !Gendrust.isInclude( mod.getFullMod(v.name, true, tree), mod.cfg)){
    //             return;
    //         }else{
    //             let value = v.value;
    //             let name = mod.getFullMod(value.name, true, tree);
    //             imports.set(mod.typeCache.get(value.name).namespace, true);
    //             ss += "\n" + `export type ${k} = ${value.name}`;
    //         }
    //     });
    // }
    str += genImport(pcfg, mod, imports, tree);
    str += ss;
    // if(str){
    // 	map.set(mod.mod(), str);
    // }
    // if(mod.mods && mod.mods.size > 0){
    // 	gen1(mod.mods, map, depend, pcfg, defCfg, eve);
    // }
    return str;
};

var PathCfg = function () {
    function PathCfg(cfg) {
        _classCallCheck(this, PathCfg);

        this.outMode = cfg.outMode;
        this.buildPath = cfg.buildPath; //build.cfg的路径
        this.srcPath = pathMode.join(this.buildPath, "../../src"); //src路径
    }

    _createClass(PathCfg, [{
        key: "setModPath",
        value: function setModPath(mod, tree) {
            this.modPath = tree.creatName + (mod.mod() ? "::" + mod.mod() : "");
            this.selfPath = pathMode.join(this.srcPath, this.modPath.replace(/::/g, "/")); //模块本身的路径
        }
    }]);

    return PathCfg;
}();

var genImport = function genImport(cfg, mod, imports, tree) {
    var str = "";
    imports.forEach(function (v, k) {
        var ks = k.split("::");
        if (tree.isMain && tree.pubDeclarMods.indexOf(ks[0]) > -1) {
            ks = [tree.creatName].concat(ks);
        }
        var last = ks[ks.length - 1];
        if (!mod.getClass(v || last) && !mod.isImport(k) && tree.pubDeclarMods.indexOf(ks[0]) < 0) {
            if (Gendrust.isRef(k)) {
                return;
            }
            if (tree.creatName === "def") {
                //如果是标准库
                var modName = findModByType(v || last, tree.map);
                if (modName) {
                    ks = [modName].concat(ks);
                }
            } else {
                ks = ["def", k.toLowerCase()].concat(ks);
            }
        }
        ks.length--;
        var p = getRelPath(cfg, ks, tree);
        if (p) {
            var r = v ? last + " as " + v : last;
            str += "\n" + ("import {" + r + "} from \"" + p + "\"");
        }
    });
    return str;
};
var findModByType = function findModByType(name, map) {
    for (var _iterator = map.values(), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
            if (_i >= _iterator.length) break;
            _ref = _iterator[_i++];
        } else {
            _i = _iterator.next();
            if (_i.done) break;
            _ref = _i.value;
        }

        var mod = _ref;

        if (mod.classes && mod.classes.get(name)) {
            return mod.mod();
        } else if (mod.newTypeMap && mod.newTypeMap.get(name)) {
            return mod.mod();
        } else if (mod.mods) {
            var s = findModByType(name, mod.mods);
            if (s) {
                return s;
            }
        }
    }
};
var getRelPath = function getRelPath(cfg, ks, tree) {
    var first = ks[0];
    if (ks.length <= 0) return;
    var iPath = void 0;
    if (first === "..") {
        var r = [];
        for (var i = 0; i < cfg.modPath.split("::").length - 1; i++) {
            r.push("..");
        }
        var pre = r.join("/");
        return (pre ? pre + "/" : "") + ks.join("/");
    }
    if (first && (first === "def" || first === "std" || tree.declarCreats.indexOf(first) > -1) || first === "js_njs") {
        //引入外部库
        iPath = pathMode.join(cfg.buildPath, "../../src/" + ks.join("/")); //src路径
    } else if (ks.indexOf(cfg.modPath) === 0) {
        iPath = pathMode.join(cfg.srcPath, ks.join("/"));
    } else {
        iPath = pathMode.join(cfg.buildPath, "../../src/" + ks.join("/")); //src路径
    }
    if (iPath === cfg.selfPath) {
        return;
    }
    var p = preDir(pathMode.relative(cfg.selfPath, iPath).replace(/\\/g, "/"));
    return p;
};
var preDir = function preDir(s) {
    var str = s.slice(3, s.length);
    if (str.indexOf("../") < 0) {
        str = "./" + str;
    }
    return str;
};
// 取到类型本身中含有的泛型类型
var genTypes = function genTypes(cfg, type, result) {
    if (cfg[type.name]) {
        result[type.name] = true;
    }
    if (type.genType) {
        for (var i = 0; i < type.genType.length; i++) {
            genTypes(cfg, type.genType[i], result);
        }
    }
};
//name, funcs, _funcFun
var structFun = function structFun(name, funcs, mod, imports, tree, c, root, tab) {
    var str = c.sufNotes ? "\n" + c.sufNotes.join("\n") : "";
    var path = root + tree.creatName + "/" + mod.mod().replace("::", "/") + "." + name;
    str += tplFunc.structTpl(null, name, hash.strHashCode(mod.mod() + "::" + name, 0), funcs, funcFun, mod, imports, tree, path);
    if (tab) {
        str = str.replace(/^/mg, tab);
    }
    return str;
};
//fn, _callParamTpl, _tsTypeStr
var funcFun = function funcFun(fn, mod, imports, tree, tab) {
    var str = fn.fn.sufNotes ? "\n" + fn.fn.sufNotes.join("\n") : "";
    str += tplFunc.noteTpl(null, fn);
    var count = 0;
    if (fn.async || fn.sync) {
        if (fn.async) {
            str += tplFunc.funcAsyncTpl(null, fn, mod, hash.strHashCode("async", fn.hash), callParamFun, callResultFun, tree, imports);
        }
        if (fn.sync) {
            str += tplFunc.funcSyncTpl(null, fn, mod, hash.strHashCode("sync", fn.hash), callParamFun, callResultFun, tree, imports);
        }
        var type = fn.callBackPT;
        type && setImport(type, mod, tree, imports);
    } else {
        str += tplFunc.funcTpl(null, fn, mod, callParamFun, callResultFun, tree, imports);
    }
    if (tab) {
        str = str.replace(/^/mg, tab);
    }
    return str;
};
//type,name ,valueName, _arrHasNObj
var callParamFun = function callParamFun(type, name, valueName, _mod, indexN, tree, imports, tab) {
    var str = tplFunc.callParamTpl(null, type, name, valueName, _mod, indexN, tree, imports, tab, callParamFun);
    if (tab) {
        str = str.replace(/^/mg, tab);
    }
    setImport(type, _mod, tree, imports);
    return str;
};
var setImport = function setImport(type, mod, tree, imports) {
    if (type.name === "Tuple") {
        for (var i = 0; i < type.childs.length; i++) {
            setImport(type.childs[i], mod, tree, imports);
        }
    } else if (type.name === "Array") {
        setImport(type.type, mod, tree, imports);
    } else if (mod.typeCache && Gendrust.isNativeObject(type.name)) {
        var t = getRealType(type, mod, tree, "");
        if (Gendrust.isNativeObject(t.name)) {
            var ca = mod.typeCache.get(t.name);
            if (!ca || ca.namespace === "pi_vm::adapter::JSType") {
                return;
            }
            ca && imports.set(ca.namespace, ca.nickname);
        } else {
            setImport(t, mod, tree, imports);
        }
    }
};
var callResultFun = function callResultFun(type, name, valueName, _mod, indexN, tree, imports, structName, tab) {
    var str = tplFunc.callResultTpl(null, type, name, valueName, _mod, indexN, tree, imports, structName, tab, callResultFun);
    if (tab) {
        str = str.replace(/^/mg, tab);
    }
    if (type.name !== structName && type.name && "Self") {
        setImport(type, _mod, tree, imports);
    }
    return str;
};
var enumcFun = function enumcFun(obj) {
    var str = tplFunc.enumcTpl(null, obj);
    return str;
};
var getRealType = function getRealType(type, mod, tree, structName) {
    if (type.name === "Option" || type.name === "Result") {
        return getRealType(type.genType[0], mod, tree, structName);
    }
    return Gendrust.deref(type, mod, structName);
};
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
            var _i2 = type.name.lastIndexOf("::");
            if (_i2 > -1) {
                return type.name.slice(_i2 + 2, type.name.length); //取到名字;
            } else {
                return type.name;
            }
        } else {
            throw "无法处理泛型类型：" + type.name;
        }
}
exports.tsTypeStr = tsTypeStr;
var toTsFunName = function toTsFunName(value) {
    return value.replace(/([a-z])_([a-z])/gi, function (r, r1, r2) {
        return r1 + r2.toUpperCase();
    });
};
//c枚举
var enumcTpl = "{{let _obj = it}}\nexport enum {{_obj.name}}{\n    {{for j, member of _obj.members}}{{j > 0?\",\":\"\"}}\n\n    {{member.name}}{{!member.value?\"\":(\"=\" + member.value)}}\n    {{end}}\n}";
//结构体、枚举实现自动解应用特征
var structTpl = "\n{{let name = it}}{{let hash = it1}}{{let funcs = it2}}{{let _funcFun = it3}}{{let _mod = it4}}{{let _imports = it5}}{{let _tree = it6}}{{let _root = it7}}\nexport class {{name}} extends NObject{\n    static _$info = new SInfo(\"{{_root}}\", {{hash}} , new Map(), []);\n\t{{for j, funcs1 of funcs}}{{for i, func of funcs1}}\n\t{{_funcFun(func, _mod, _imports, _tree, \"    \")}}\n\t{{end}}{{end}}\n}";
/**
 * TsFun{
 *	name: string;
 *	nextHash: boolean;
 *	hash:number
 *	fn:Gendrust.DefFunc;
 *	genTypeCfg?:Json;
 *	structStr: string;
 *	structName:string;
    }
 * pName:string
 */
//注释生成模板
var noteTpl = "{{let fn = it}}\n/**\n{{let params = fn.fn.func.params || []}}\n{{if fn.sync || fn.async}}\n{{:params = params.slice(0, params.length - 1)}}\n{{end}}\n{{for i, param of params}}\n * @param {{param.name}} {{if param.type}}:{{_typeToString(param.type, true)}}{{end}}\n{{end}}\n{{if fn.async}}\n * @param ({{fn.callBackPT?_typeToString(n.callBackPT, true):\"\"}}) => void\n{{end}}\n{{if fn.sync && fn.callBackPT}}\n * @return {{_typeToString(fn.callBackPT, true)}}\n{{elseif fn.result}}\n * @return {{_typeToString(fn.result, true)}}\n{{end}}\n */\n";
var funcTpl = "\n{{let fn = it}}{{let _mod = it1}}{{let _callParamFun = it2}}{{let _callResultFun = it3}}{{let _tree = it4}}{{let _imports = it5}}\n{{let isStatic = false}}\n{{let isFirst = true}}\n{{let params = fn.params || []}}\n{{let result1 = fn.result}}\n{{let result = result1?_deref(fn.result, _mod, fn.structName):null}}\n\n{{if fn.structName && (!params[0] || params[0].name !== \"self\")}}\n{{let isStatic = true}}\n{{end}}\n{{fn.structName?\"\":\"export const \"}} {{isStatic?\"static \":\"\"}}{{_toTsFunName(fn.name)}} = (\n{{for i, param of params}}\n{{if param.name !== \"self\"}}{{isFirst===false?\",\":\"\"}}\n{{param.name}}:{{_tsTypeStr(param.type, _mod, _tree)}}\n{{:isFirst = false}}\n{{end}}\n{{end}}){{if result}}: {{_tsTypeStr(result, _mod, _tree, fn.structName)}} {{end}} => {     {{%\u65B9\u6CD5\u8FD4\u56DE\u503C%}}\n\t{{%\u5982\u679C\u53C2\u6570\u4E2D\u542B\u6709\u7ED3\u6784\u4F53\uFF0C\u9700\u8981\u89E3\u5305%}}\n\t{{for i, param of params}}{{if param.name !== \"self\"}}{{_callParamFun(param.type, param.name, param.name, _mod, \"i\", _tree, _imports, \"    \")}} {{end}}\n\t{{end}}\n    {{if result}}{{if _isBase(result)}}\n    return call({{fn.hash}},[ {{for i, param of params}}{{i>0?\",\":\"\"}}{{if param.name === \"self\"}}this.self{{else}}{{param.name}}{{end}}{{end}} ]); {{else}}\n    let result = call({{fn.hash}},[ {{for i, param of params}}{{i>0?\",\":\"\"}}{{if param.name === \"self\"}}this.self{{else}}{{param.name}}{{end}}{{end}} ]);\n{{_callResultFun(result, \"result\", \"result\", _mod, \"i\", _tree, _imports, fn.structName, \"    \")}}\n    return result; {{end}}\n    {{else}}\n    call({{fn.hash}},[ {{for i, param of params}}{{i>0?\",\":\"\"}}{{if param.name === \"self\"}}this.self{{else}}{{param.name}}{{end}}{{end}} ]);\n    {{end}}\n}\n";
var funcAsyncTpl = "\n{{let fn = it}}{{let _mod = it1}}{{let _h = it2}}{{let _callParamFun = it3}}{{let _callResultFun = it4}}{{let _tree = it5}}{{let _imports = it6}}\n{{let isStatic = false}}\n{{let isFirst = true}}\n{{let params = fn.fn.func.params.slice(0, fn.fn.func.params.length - 1)}}\n{{let cbName = fn.fn.func.params[fn.fn.func.params.length - 1].name}}\n{{let result1 = fn.fn.func.result}}\n{{let result = result1?_deref(result1, _mod, fn.structName): null}}\n\n{{let pttype = fn.callBackPT?_tsTypeStr(_deref(fn.callBackPT,  _mod, fn.structName), _mod, _tree, fn.structName): null}}\n{{if fn.structName && (!params[0] || params[0].name !== \"self\")}}\n{{let isStatic = true}}\n{{end}}\n\n{{fn.structName?\"\":\"export const \"}} {{isStatic?\"static \":\"\"}}{{_toTsFunName(fn.name)+ \"Async\"}} = (\n{{for i, param of params}}{{if param.name !== \"self\"}}{{isFirst===false?\",\":\"\"}}\n{{param.name}}:{{_tsTypeStr(param.type, _mod, _tree)}} {{:isFirst = false}}{{end}}\n{{end}}, {{cbName}}:({{pttype?pttype:\"\"}}) => void) => {\n\n    {{if fn.callBackPT && !_isBase(fn.callBackPT)}}\n    let {{cbName}}_ = (r) => {\n        {{_callResultFun(fn.callBackPT, \"r\", \"r\", _mod, \"i\", _tree, _imports, fn.structName, \"    \")}}\n        {{cbName}}(r);\n    };\n    {{else}}\n    let {{cbName}}_ = {{cbName}};\n    {{end}}\n\n\t{{%\u5982\u679C\u53C2\u6570\u4E2D\u542B\u6709\u7ED3\u6784\u4F53\uFF0C\u9700\u8981\u89E3\u5305%}}\n\t{{for i, param of params}}\n\t{{if param.name !== \"self\"}}\n\t{{_callParamFun(param.type, param.name, param.name, _mod, \"i\", _tree, _imports, \"    \")}} \n\t{{end}}\n\t{{end}}\n    asyncCall({{_h}},[ {{:isFirst = true}}{{for i, param of params}}{{i>0?\",\":\"\"}}{{:isFirst = false}}\n\t\t{{if param.name === \"self\"}}this.self{{else}}{{param.name}}\n        {{end}}{{end}}], {{cbName}}_);\n}";
var funcSyncTpl = "\n{{let fn = it}}{{let _mod = it1}}{{let _h = it2}}{{let _callParamFun = it3}}{{let _callResultFun = it4}}{{let _tree = it5}}{{let _imports = it6}}\n{{let isStatic = false}}\n{{let isFirst = true}}\n{{let params = fn.fn.func.params.slice(0, fn.fn.func.params.length - 1)}}\n{{let result1 = fn.fn.func.result}}\n{{let result = result1?_deref(result1, _mod, fn.structName): null}}\n\n{{let pttype = fn.callBackPT?_tsTypeStr(_deref(fn.callBackPT,  _mod, fn.structName), _mod, _tree, fn.structName): null}}\n{{if fn.structName && (!params[0] || params[0].name !== \"self\")}}\n{{let isStatic = true}}\n{{end}}\n\n{{fn.structName?\"\":\"export const \"}} {{isStatic?\"static \":\"\"}}{{_toTsFunName(fn.name)}} = (\n{{for i, param of params}}{{if param.name !== \"self\"}}{{isFirst===false?\",\":\"\"}}\n{{param.name}}:{{_tsTypeStr(param.type, _mod, _tree)}} {{:isFirst = false}}{{end}}\n{{end}}){{pttype?\":\" + pttype:\"\"}} => {     {{%\u65B9\u6CD5\u8FD4\u56DE\u503C%}}\n\n\t{{%\u5982\u679C\u53C2\u6570\u4E2D\u542B\u6709\u7ED3\u6784\u4F53\uFF0C\u9700\u8981\u89E3\u5305%}}\n\t{{for i, param of params}}\n\t{{if param.name !== \"self\"}}\n\t{{_callParamFun(param.type, param.name, param.name, _mod, \"i\", _tree, _imports, \"    \")}} \n\t{{end}}\n\t{{end}}\n    {{if fn.callBackPT}}\n    let r = syncCall({{_h}},[ {{:isFirst = true}}{{for i, param of params}}{{i>0?\",\":\"\"}}{{:isFirst = false}}\n\t\t{{if param.name === \"self\"}}this.self{{else}}{{param.name}}\n        {{end}}{{end}} ]);\n    {{_callResultFun(fn.callBackPT, \"r\", \"r\", _mod, \"i\", _tree, _imports, fn.structName, \"            \")}}\n    return r;\n    {{else}}\n    syncCall({{_h}},[ {{:isFirst = true}}{{for i, param of params}}{{i>0?\",\":\"\"}}{{:isFirst = false}}\n\t\t{{if param.name === \"self\"}}this.self{{else}}{{param.name}}\n        {{end}}{{end}} ]);\n    {{end}}\n}";
//解析调用call方法时的参数, 结构体需要解包, 参数不能是Result
var callParamTpl = "\n{{let t = it}}{{let name = it1}}{{let valueName = it2}}{{let _mod = it3}}{{let indexN = it4}}{{let _tree = it5}}{{let _imports = it6}}{{let tabS = it7}}{{let _callParamFun = it8}}\n{{let type = _deref(t, _mod)}}  {{%type\u4E0D\u80FD\u662Fself%}}\n{{if type.name === \"Option\"}}\nif({{valueName}} !== null && {{valueName}} !== undefined){\n{{_callParamFun(type.genType[0], valueName, valueName, _mod, indexN, _tree, _imports, tabS + \"    \")}}\n}\n\n{{elseif type.name.indexOf(\"JSType\") < 0 && (_isNativeObject(type.name) && !_isEnumC(type.name, _mod, _tree))}}\n(<any>{{name}}) = {{valueName}}.self;\n\n{{elseif type.name === \"u64\"}}\n(<any>{{name}}) = u64ToBuffer({{valueName}});\n\n{{elseif type.name === \"u128\"}}\n(<any>{{name}}) = u128ToBuffer({{valueName}});\n\n{{elseif _isArray(type.name) && _arrHasNObj(type)}} {{%\u5F53\u4E3A\u6570\u7EC4\u65F6\uFF0C\u5982\u679C\u5176\u5185\u90E8\u5305\u542BNativeObject, \u5E94\u8BE5\u5FAA\u73AF\u6570\u7EC4\uFF0C\u53D6\u51FAativeObject%}}\nlet {{name}}_arr = [];\nfor(let {{indexN}} = 0; {{indexN}} < {{valueName}}.length; {{indexN}}++){\n    let {{indexN}}_e = {{valueName}}[{{indexN}}]; let {{indexN}}_e1;\n{{_callParamFun(type.type, indexN + \"_e1\", indexN + \"_e\", _mod, indexN, _tree, _imports, tabS + \"    \")}}\n    {{valueName}}[{{indexN}}] = {{indexN}}_e1;\n}\n(<any>{{name}}) = {{name}}_arr;\n\n{{elseif _isTuple(type.name) && _arrHasNObj(type)}}\nlet {{name}}_arr = [];\n{{for i, elem of type.childs}}\n{{_callParamFun(elem, name + \"[\" + i + \"]\", name + \"[\" + i + \"]\", _mod, indexN, _tree, _imports, tabS + \"    \")}}\n{{end}}\n(<any>{{name}}) = {{name}}_arr;\n{{end}}\n";
//解析调用call方法返回值, 结构体需要装包
var callResultTpl = "\n{{let t = it}}{{let name = it1}}{{let valueName = it2}}{{let _mod = it3}}{{let indexN = it4}}{{let _tree = it5}}{{let _imports = it6}}{{let _structName = it7}}{{let tabS = it8}}\n{{let type = _deref(t, _mod, _structName)}}  {{%type\u4E0D\u80FD\u662FSelf%}}\n{{if type.name === \"pi_vm::adapter::JSType\"}} {{%type\u662FJsType,\u4E0D\u9700\u8981\u505A\u4EFB\u4F55\u5904\u7406%}}\n\n{{elseif type.name === \"Result\"}}\n{{_callResultFun(type.genType[0], valueName, valueName, _mod, indexN, _tree, _imports, _structName, tabS)}}\n\n{{elseif type.name === \"Option\"}}\nif({{name}} !== undefined && {{name}} !== null){\n{{_callResultFun(type.genType[0], valueName, valueName, _mod, indexN, _tree, _imports, _structName, tabS + \"    \")}}\n}\n\n{{elseif _isNativeObject(type.name) && !_isEnumC(type.name, _mod, _tree)}}\n(<any>{{name}}) = new {{_tsTypeStr(type, _mod, _tree)}}({{valueName}});\n\n{{elseif _isBigInt(type.name)}}\n(<any>{{name}}) = bigInt({{valueName}});\n\n{{elseif _isArray(type.name) && _arrHasNObj(type)}} {{%\u5F53\u4E3A\u6570\u7EC4\u65F6\uFF0C\u5982\u679C\u5176\u5185\u90E8\u5305\u542BNativeObject, \u5E94\u8BE5\u5FAA\u73AF\u6570\u7EC4\uFF0C\u5305\u88C5NativeObject%}}\nfor(let {{indexN}} = 0; {{indexN}} < {{valueName}}.length; {{indexN}}++){\n{{_callResultFun(type.type, valueName + \"[\" + indexN + \"]\", valueName + \"[\" + indexN + \"]\", _mod, indexN, _tree, _imports, _structName, tabS + \"    \")}}\n}\n\n{{elseif _isTuple(type.name)}}\n{{if _tupleHasNObj(type)}}\n{{for i, child of type.childs}}\n{{_callResultFun(child, name + \"[\" + i + \"]\", valueName + \"[\" + i + \"]\", _mod, indexN, _tree, _imports, _structName, tabS)}}\n{{end}}\n{{end}}\n{{end}}\n";
exports.toFunc = function (s) {
    try {
        return new Function("_stringify", "_isNumber", "_isStr", "_isBool", "_isArray", "_isTuple", "_isNativeObject", "_isBase", "_tsTypeStr", "_arrHasNObj", "_deref", "_tupleHasNObj", "_isBigInt", "_toTsFunName", "_isEnumC", "_callResultFun", "_typeToString", "return " + s)(tpl_1.toString, Gendrust.isNumber, Gendrust.isStr, Gendrust.isBool, Gendrust.isArray, Gendrust.isTuple, Gendrust.isNativeObject, Gendrust.isBase, tsTypeStr, Gendrust.arrHasNObj, Gendrust.deref, Gendrust.tupleHasNObj, Gendrust.isBigInt, toTsFunName, Gendrust.isEnumC, callResultFun, Gendrust.typeToString);
    } catch (e) {
        //warn(level, "tpl toFun, path: "+", s: ", s, e);
        throw e;
    }
};
var tplFunc = {
    funcTpl: exports.toFunc(tpl_1.compile(funcTpl, tpl_str_1.Parser)),
    funcSyncTpl: exports.toFunc(tpl_1.compile(funcSyncTpl, tpl_str_1.Parser)),
    funcAsyncTpl: exports.toFunc(tpl_1.compile(funcAsyncTpl, tpl_str_1.Parser)),
    structTpl: exports.toFunc(tpl_1.compile(structTpl, tpl_str_1.Parser, null, null, null, null, null, "es6")),
    callParamTpl: exports.toFunc(tpl_1.compile(callParamTpl, tpl_str_1.Parser)),
    callResultTpl: exports.toFunc(tpl_1.compile(callResultTpl, tpl_str_1.Parser)),
    enumcTpl: exports.toFunc(tpl_1.compile(enumcTpl, tpl_str_1.Parser)),
    noteTpl: exports.toFunc(tpl_1.compile(noteTpl, tpl_str_1.Parser))
};
})