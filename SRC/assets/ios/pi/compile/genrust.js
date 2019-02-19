_$define("pi/compile/genrust", function (require, exports, module){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var hash = require("../util/hash");
var tpl_str_1 = require("../util/tpl_str");
var tpl_1 = require("../util/tpl");
var Gendrust = require("./gendrust");
// ====================================== 导出
/*将rust结构对象转换成可序列化的rust
**@param objects:rust中定义的结构体、枚举、函数等
**@param cfg:描述rust中哪些结构是公开的接口，默认pub类型的定义公开
**cfg: {}
**file = {|defTriat#?, defStruct, defEnum, defStructEmpty, defStructTuple, importMany, importOne, impl, defFn, implTrait#?, newType|};
*/
exports.gen = function (mods, depend, tree) {
    var dropStr = "";
    var registStr = "\npub fn register(mgr: &BonMgr){"; //结构体、枚举、函数注册
    var rObjs = [];
    var strs = gen1(mods, rObjs, depend, tree);
    var useStr = depend.join(";\n") + ";"; //取到配置中的依赖
    for (var i = 0; i < rObjs.length; i++) {
        var p = rObjs[i];
        var h = hash.strHashCode(p, 0);
        registStr += "\n" + ("    mgr.regist_struct_meta(StructMeta{name:String::from(\"" + p + "\"), drop_fn: drop_" + h + "}, " + h + ");");
        dropStr += "\n" + dropTplFun(h, p);
    }
    if (!tree.isDef && !tree.isMain) {
        useStr += "\nuse " + tree.creatName + ";";
    }
    if (tree.isMain) {
        mods.forEach(function (mod, key) {
            useStr += "\nuse " + mod.modName + ";";
        });
    }
    // mods.forEach((v, k) => {
    // 	useStr += "\nuse " + tree.creatName + "::" + k + ";"; //引入所有库内定义的模块
    // })
    return useStr + "\n" + strs[0] + dropStr + registStr + strs[1] + "\n}";
};
//解析导入的std库的模块, 以及外模依赖库
var gen_use = function gen_use(typeCache, uses, declarCreats) {
    if (!typeCache) {
        return;
    } else {
        typeCache.forEach(function (v, k) {
            var s = void 0;
            if (!v.namespace.startsWith("std::")) {
                var names = v.namespace.split("::");
                if (declarCreats.indexOf(names[0]) > -1) {
                    s = "use " + names[0];
                } else {
                    return;
                }
            } else {
                s = "use " + v.namespace;
            }
            if (uses.indexOf(s) < 0) {
                uses.push(s);
            }
        });
    }
};
var gen1 = function gen1(mods, rObjs, uses, tree) {
    var str1 = "",
        str2 = "";
    mods.forEach(function (mod, k) {
        var r = gen2(mod, rObjs, uses, tree);
        str1 += r[0];
        str2 += r[1];
    });
    return [str1, str2];
};
var gen2 = function gen2(mod, rObjs, uses, tree) {
    var str1 = "",
        str2 = "";
    gen_use(mod.typeCache, uses, tree.declarCreats);
    if (mod.classFunc) {
        mod.classFunc.forEach(function (funcs, k) {
            var c = mod.classes.get(k);
            if (funcs.size > 0) {
                c.rsflag = true;
            }
            if (!c) {
                return;
            }
            var arr = [funcs];
            if (c.deref) {
                var funcDeref = mod.classFunc.get(c.deref.func.result.name);
                arr.push(funcDeref);
            }
            for (var i = 0; i < arr.length; i++) {
                arr[i].forEach(function (func, name) {
                    var mn = func.structName;
                    if (!mod.cfg.default) {
                        var modName = mod.mod();
                        mn = (modName ? modName + "::" : "") + mn;
                    }
                    var parentName = func.structStr;
                    var path = tree.creatName + "::" + mn;
                    if (tree.isDef) {
                        path = func.structName;
                    } else if (tree.isMain) {
                        path = mn;
                    }
                    if (func.implGenStr) {
                        path += "::" + func.implGenStr;
                    }
                    // let h = func.hash;
                    // if(func.vectoslice){
                    //     h = hash.strHashCode("vectoslice", h);
                    // }
                    var s = fnFunc(func, path, parentName, func.hash, mod, tree, func.vectoslice ? true : false);
                    str1 += s[0];
                    str2 += s[1];
                    // if(func.vectoslice === "add"){
                    //     let s = fnFunc(func, path,  parentName, func.hash, mod, tree, false);
                    //     str1 += s[0];
                    //     str2 += s[1];
                    // }
                    if (func.traitName) {
                        var _s = "use " + func.traitName;
                        if (uses.indexOf(_s) < 0) {
                            uses.push(_s);
                        }
                    }
                    var params = func.params;
                    if (func.sync || func.async) {
                        params.pop();
                    }
                    registerParamType(params, rObjs, mod, parentName, tree);
                    registerType(func.result, rObjs, mod, parentName, tree);
                    registerType(func.callBackPT, rObjs, mod, parentName, tree);
                });
            }
        });
    }
    if (mod.funMap) {
        var path = tree.creatName + "::" + mod.mod();
        if (tree.isDef) {
            path = "";
        } else if (tree.isMain) {
            path = mod.mod();
        }
        mod.funMap.forEach(function (func, k) {
            var s = fnFunc(func, path, null, func.hash, mod, tree, func.vectoslice ? true : false);
            str1 += s[0];
            str2 += s[1];
            var params = func.params;
            if (func.sync || func.async) {
                params.pop();
            }
            registerParamType(params, rObjs, mod, null, tree);
            registerType(func.result, rObjs, mod, null, tree);
            registerType(func.callBackPT, rObjs, mod, null, tree);
        });
    }
    if (mod.classes) {
        mod.classes.forEach(function (v, k) {
            if (v.rsflag === true || v.power !== "pub" || !Gendrust.isInclude(mod.getFullMod(v.name, false, tree), mod.cfg)) {
                return;
            }
            var m = mod.cfg.default ? "" : mod.mod() + "::";
            var path = (tree.isMain ? "" : tree.creatName + "::") + m + Gendrust.typeToString(v);
            var genTypeCfgs = Gendrust.initGenCfg(v.genType, path, mod.cfg.genType);
            for (var z = 0; z < genTypeCfgs.length; z++) {
                var t1 = new Gendrust.Type();
                t1.name = v.name;
                t1.genType = v.genType;
                var t = Gendrust.getActType(t1, genTypeCfgs[z]);
                registerType(t, rObjs, mod, null, tree);
            }
        });
    }
    return [str1, str2];
};
var genRegistObj = function genRegistObj() {
    var str = "";
    undefined.data.contex.registerObjMap.forEach(function (v, k) {
        str += "\n\tmgr.regist_struct_meta(StructMeta{name:String::from(\"" + k + "\")}, " + v + ");";
    });
    return str;
};
var genUses = function genUses() {
    var map = new Map();
    undefined.data.contex.typeCache.forEach(function (v, k) {
        map.set(v.namespace, true);
    });
    var str = "";
    map.forEach(function (v, k) {
        var i = k.indexOf("::");
        if (i > -1) {
            var u = k.slice(0, i);
            str += "\n" + ("use " + u + ";");
        }
    });
    return str;
};
var registerType = function registerType(type, arr, mod, structStr, tree) {
    if (!type) {
        return;
    }
    if (type.name === "self" || type.name === "Self") {
        if (arr.indexOf(structStr) < 0) {
            arr.push(structStr);
        }
    } else if (type.name === "Option" || type.name === "Result") {
        registerType(type.genType[0], arr, mod, structStr, tree);
    } else if (Gendrust.isNativeObject(type.name)) {
        var name = Gendrust.typeToString(type, false, structStr, mod, true, tree);
        if (arr.indexOf(name) < 0) {
            arr.push(name);
        }
    } else if (Gendrust.isArray(type.name)) {
        registerType(type.type, arr, mod, structStr, tree);
    } else if (Gendrust.isTuple(type.name)) {
        for (var i = 0; i < type.childs.length; i++) {
            registerType(type.childs[i], arr, mod, structStr, tree);
        }
    }
};
var registerParamType = function registerParamType(types, arr, mod, structStr, tree) {
    if (!types) {
        return;
    }
    for (var i = 0; i < types.length; i++) {
        registerType(types[i].type || types[i], arr, mod, structStr, tree);
    }
};
var fnFunc = function fnFunc(func, path, structName, h, mod, tree, vectoslice) {
    var str = "",
        str1 = "",
        ps = void 0;
    if (func.sync || func.async) {
        if (func.sync) {
            var synch = hash.strHashCode("sync", func.hash);
            str += "\n" + tplFunc.fnSyncCallTpl(null, func, mod, path, synch, tree, tps_has_nobj, vectoslice);
            str1 += regist_fun_meta(synch, func.fn.func.params, func.fn.func.result, func.callBackPT, "sync");
            //registerType(func.callBackPT, genTypeCfg, structName, mod);
        }
        if (func.async) {
            var async = hash.strHashCode("async", func.hash);
            str += "\n" + tplFunc.fnAsyncCallTpl(null, func, mod, path, async, tree, tps_has_nobj, vectoslice);
            str1 += regist_fun_meta(async, func.fn.func.params, func.fn.func.result, func.callBackPT, "async");
            //registerType(func.callBackPT, genTypeCfg, structName, mod);
        }
        ps = func.fn.func.params.slice(0, func.fn.func.params.length - 1);
    } else {
        str += "\n" + tplFunc.fnCallTpl(null, func, mod, path, tree, tps_has_nobj, vectoslice); //fncall
        ps = func.fn.func.params;
        str1 += regist_fun_meta(func.hash, func.fn.func.params, func.fn.func.result);
    }
    //registerParamType(ps, genTypeCfg, structName, mod);
    //if(func.fn.func.result) registerType(func.fn.func.result, genTypeCfg, structName, mod);
    return [str, str1];
};
//生成接口注册代码， 根据参数，返回值，回调值的类型选择注册的接口类型
var regist_fun_meta = function regist_fun_meta(hash, params, result, back, suf) {
    var v = suf ? 1 : 0;
    if (params && params.length > v) {
        // for(let i = 0 ; i < params.length - v; i++){
        //     if(params[i].name === "self" || has_nobj(params[i].type)){
        //         return "\n    " + `mgr.regist_fun_meta(FnMeta::CallArgNobj(call_${hash}${suf?"_"+suf:""}), ${hash});`
        //     }
        // }
        if (suf) {
            //阻塞方法或异步方法
            // if(suf === "async" || result && has_nobj(result)){
            //     return "\n    " + `mgr.regist_fun_meta(FnMeta::CallArgNobj(call_${hash}_${suf}), ${hash});`
            // }if(back && has_nobj(back)){
            //     return "\n    " + `mgr.regist_fun_meta(FnMeta::CallArgNobj(call_${hash}_${suf}), ${hash});`
            // }else{
            return "\n    " + ("mgr.regist_fun_meta(FnMeta::CallArg(call_" + hash + "_" + suf + "), " + hash + ");");
            //}
            //}else if(result && has_nobj(result)){
            // return "\n    " + `mgr.regist_fun_meta(FnMeta::CallArgNobj(call_${hash}), ${hash});`
        } else {
            return "\n    " + ("mgr.regist_fun_meta(FnMeta::CallArg(call_" + hash + "), " + hash + ");");
        }
    } else {
        if (suf) {
            //阻塞方法或异步方法
            // if(back && has_nobj(back)){
            //     return "\n    " + `mgr.regist_fun_meta(FnMeta::CallNobj(call_${hash}_${suf}), ${hash});`
            // }else{
            return "\n    " + ("mgr.regist_fun_meta(FnMeta::Call(call_" + hash + "_" + suf + "), " + hash + ");");
            //}
            // }else if(result && has_nobj(result)){
            //     return "\n    " + `mgr.regist_fun_meta(FnMeta::CallNobj(call_${hash}), ${hash});`
        } else {
            return "\n    " + ("mgr.regist_fun_meta(FnMeta::Call(call_" + hash + "), " + hash + ");");
        }
    }
};
//检查参数和返回值中是否存在NativeObject
var tps_has_nobj = function tps_has_nobj(params, result) {
    if (params && params.length > 0) {
        for (var i = 0; i < params.length; i++) {
            if (params[i].name === "self") {
                return true;
            } else if (has_nobj(params[i].type)) {
                return true;
            }
        }
    }
    if (result) {
        if (has_nobj(result)) {
            return true;
        }
    }
    return false;
};
var has_nobj = function has_nobj(type) {
    if (!has_nobj) {
        return false;
    } else if (Gendrust.isNativeObject(type.name)) {
        return true;
    } else if (Gendrust.isArray(type.name) && Gendrust.arrHasNObj(type)) {
        return true;
    } else if (Gendrust.isTuple(type.name) && Gendrust.tupleHasNObj(type)) {
        return true;
    }
};
//取到完整的路径名称
// const getFullMod = (name: string, r: Gendrust.Data): Json => {
// 	let names = name.split("::"), p = name;
// 	let n = names[0];
// 	let j = n.indexOf("<");
// 	if(j > 0){
// 		n = n.slice(0, j);
// 	}
// 	for(let i = 0 ; i < r.imports.length; i++){
// 		if(r.imports[i].type === "importOne"){
// 			let ps = r.imports[i].path.split("/");
// 			if(ps[ps.length - 1] === n){
// 				names = names.slice(1, names.length);
// 				p =  ps.join("::") + "::" + names.join("::");
// 			}
// 		}else{
// 			let ps = r.imports[i].path.split("/");
// 			for(let j = 0; j < r.imports[i].contents.length; j++){
// 				if(r.imports[i].contents[j] === n){
// 					p = ps.join("::") + "::" + name;
// 				}
// 			}
// 		}
// 	}
// 	if(r.objs[n]){
// 		p =  r.modName + "::" + name;
// 	}
// 	let i = p.indexOf("std::");
// 	if(i === 0){//如果类型以std开头,应该去掉"std::",并将其存入std列表中
// 		p = p.slice(5, p.length);
// 		let j = p.indexOf("::");
// 		r.contex.stds.set(p.slice(0,j), true);
// 	}else{
// 		let index = p.indexOf("::");
// 		if( index >= 0){
// 			r.contex.usesOther.set(p, true);
// 		}
// 	}
// 	return p;
// }
var parseJSTypeParamFun = function parseJSTypeParamFun(name, type, funcName, struct, r, tree, jsName) {
    return tplFunc.parseJSTypePrama(null, name, type, funcName, struct, r, tree, Gendrust.deref, jsName);
};
var parseJSTypeResultFun = function parseJSTypeResultFun(name, type, funcName, struct, r, hasp, tree, iq, jsName) {
    return tplFunc.parseJSTypeResult(null, name, type, funcName, struct, r, hasp, tree, iq, jsName);
};
var dropTplFun = function dropTplFun(hash, name) {
    return tplFunc.dropTpl(null, hash, name);
};
//结构体、枚举实现自动解应用特征  目前不需要
var implDerefTpl = "{{let name = it}}{{let contain = it1}}\nimpl Deref for {{name}} {\n\ttype Target = {{contain}};\n\tfn deref(&self) -> &{{contain}} {\n\t\t&self.0\n\t}\n}\nimpl DerefMut for {{name}} {\n\tfn deref_mut(&mut self) -> &mut {{contain}}{\n\t\t&mut self.0\n\t}\n}\n";
//生成注册函数的代码
// const registFnTpl = `{{let fnName = it}}{{let params = it1}}{{let path = it2}}{{let genType = it3}}
// let params = Vec::new();
// {{if param.length > 0}}
// {{for i, param of params}}
// params.push((param.type.isQuote, param.type.isMut, NType::from_str("{{_typeToString(type, false, struct)(param.type, genType)}}")));
// {{end}}
// funcMgr.insert({{_strHashCode(path + fnName)}}, FnMeta::new({{fnName}}, call{{fnName}}, params));
// {{end}}
// `
//生成注册数据结构（枚举，结构体）的代码   目前不需要
var registObjTpl = "{{let obj = it}}{{let name = it1}}{{let genType = it2}}{{let path = it3}}{{let modeName = it4}}{{let _createName = it5}}\n\tlet members = Vec::new();\n\n{{if obj.type === \"enum\" }}\n\n{{for i, member of obj.members}}\n\tlet members1 = Vec::new();\n{{if member.type === \"Struct\"}}\n{{let members1 = member.members}}\n{{for j, member1 of members1}}\n\tmembers1.push(Box::new(Property(\"{{member1.name}}\", TypeDesc({{member1.type.isQuote?true:false}}, {{member1.type.isMut?true:false}},  NType::from_str('{{_typeToString(type, false, struct)(member1.type)}}')))));\n{{end}}\n\n{{elseif member.type === \"StructTuple\"}}\n{{let members1 = member.members}}\n{{for j, member1 of members1}}\n\tmembers1.push(Box::new(TypeDesc({{member1.type.isQuote?true:false}}, {{member1.type.isMut?true:false}},  NType::from_str('{{_typeToString(member1.type)}}'))));\n{{end}}\n{{end}}\n\tmembers.push(StructMeta{name:\"{{member.name}}\", tp:{{member.type}}, members:members });\n\tmgr.regist_obj_meta(EnumMeta{name:\"{{name}}\", members: members}, {{_strHashCode(_createName + \"::\" + path + name, 0)}} );\n{{end}}\n\n{{elseif obj.type === \"Struct\"}}\n{{for i, member of obj.members}}\n\tmembers.push(Box::new(Property(\"{{member.name}}\", TypeDesc({{member.type.isQuote?true:false}}, {{member.type.isMut?true:false}},  NType::from_str(\"{{_typeToString(member.type)}}\")))));\n{{end}}\t\n\tmgr.regist_obj_meta(StructMeta{name:\"{{name}}\", str2:\"Struct\", members: members}, {{_strHashCode(_createName + \"::\" + path + name, 0)}} );\n\n\n{{elseif obj.type === \"StructTuple\"}}\n{{for i, member of obj.members}}\n\tmembers.push(Box::new(TypeDesc({{member.type.isQuote?true:false}}, {{member.type.isMut?true:false}},  NType::from_str(\"{{_typeToString(member.type, genType)}}\"))));\n{{end}}\n\tmgr.regist_obj_meta(StructMeta{name:\"{{name}}\", str2:\"StructTuple\", members: members}, {{_strHashCode(_createName + \"::\" + path + name, 0)}});\n\n{{end}}";
//函数实现  目前不需要
var fnBodyTpl = "{{let params = it}}{{let name = it1}}{{let genType = it2}}\n{\n{{name}}{{genType}}(\n{{if params && params.length > 0}}\n{{for i, param of params}}\n{{if i > 0}},\n{{end}}\n{{if !isParamSelf(param)}}\n\t{{param.name}}:{{_typeToString(param.type)}}\n{{else}}\n\tself\n{{end}}\n{{end}}\n{{end}} )\n}\n";
var parseJSTypePrama = "\n{{%name: \u53D8\u91CF\u540D\u79F0\uFF0C type:\u53D8\u91CF\u7C7B\u578B, funcName\uFF1A\u65B9\u6CD5\u540D\u540D\u79F0\uFF0CtabCount: \u6BCF\u884C\u7F29\u8FDB%}}\n{{let name = it}}{{let type = it1}}{{let errorStrName = it2}}{{let struct = it3}}{{let _r = it4}}{{let _tree = it5}}{{let _deref = it6}}{{let iq = it7}}\n{{: iq = iq?iq:type.isQuote}}{{let im = type.isMut}}\n{{if type.name === \"pi_vm::adapter::JSType\"}}\n\n{{elseif _isNumber(type.name)}}\n\tif !{{name}}.is_number(){ return Some(CallResult::Err(String::from(param_error)));}\n\t{{if type.name === \"usize\"}}\n\tlet {{name}} = {{if iq}}&{{if im}}mut{{\" \"}}{{end}}{{end}}{{name}}.get_u32() as usize;\n\t{{elseif type.name === \"isize\"}}\n\tlet {{name}} = {{if iq}}&{{if im}}mut{{\" \"}}{{end}}{{end}}{{name}}.get_i32() as isize;\n\t{{else}}\n\tlet {{name}} = {{if iq}}&{{if im}}mut{{\" \"}}{{end}}{{end}}{{name}}.get_{{type.name}}();\n\t{{end}}\n\n{{elseif _isStr(type.name)}}\n\tif !{{name}}.is_string(){ return Some(CallResult::Err(String::from(param_error)));}\n\tlet {{name}} = {{if iq}}&{{if im}}mut{{\" \"}}{{end}}{{end}}{{name}}.get_str();\n\n{{elseif _isBool(type.name)}}\n\tif !{{name}}.is_boolean(){ return Some(CallResult::Err(String::from(param_error))); }\n    let {{name}} = {{if iq}}&{{if im}}mut{{\" \"}}{{end}}{{end}}{{name}}.get_boolean();\n    \n{{elseif type.name === \"Option\"}} {{%\u6CA1\u8003\u8651Option\u662F\u5F15\u7528\u7684\u60C5\u51B5\uFF0C \u9700\u8981\u8003\u8651\uFF1F%}}\n    let {{name}} = if {{name}}.is_undefined() || {{name}}.is_null(){\n        None\n    }else{\n        {{_parseJSTypeParamFun(name, type.genType[0], errorStrName, struct, _r, _tree)}}\n        Some({{name}})\n    };\n\n{{elseif _isArray(type.name)}}\n{{if type.type.name === \"u8\" }}\n\tif !{{name}}.is_uint8_array() && !{{name}}.is_array_buffer(){return Some(CallResult::Err(String::from(param_error))); }\n    {{if iq}}{{if im}} {{%\u5F15\u7528%}}\n    let mut {{name}} = {{name}}.into_vec();\n    let {{name}} = {{name}}.as_mut_slice();{{else}}\n    let {{name}} = {{name}}.to_bytes();{{end}}\n    {{if type.len > 0}}\n    if {{name}}.len() != {{type.len}}{return Some(CallResult::Err(String::from(param_error))); }\n    let {{name}} = unsafe{*({{name}}.as_ptr() as * {{im?\"mut \":\"const \"}}[u8; {{type.len}}])};\n    let {{name}} = &{{name}};\n\t{{end}}\n    {{else}}{{%\u6240\u6709\u6743, \u5982\u679C\u53C2\u6570\u662F\u6570\u7EC4\u7684\u6240\u6709\u6743\uFF0C \u7531\u4E8E\u65E0\u6CD5\u4ECE\u76F4\u63A5\u4F7F\u7528vm\u4E2D\u7684\u5185\u5B58\uFF0C\u9700\u8981\u62F7\u8D1D%}}\n    let {{name}}_ = {{name}}.to_bytes();\n\tif {{name}}_.len() != {{type.len}}{return Some(CallResult::Err(String::from(param_error))); }\n    let mut {{name}} = [0u8; {{type.len}}];\n    {{name}}.copy_from_slice({{name}}_);\n    {{end}}\n\n{{else}}\n\tif !{{name}}.is_array(){return Some(CallResult::Err(String::from(param_error)));}\n\tlet a_len = {{name}}.get_array_length();\n\t{{if type.len > 0}}\n\tif a_len != {{type.len}}{return Some(CallResult::Err(String::from(param_error))); }\n    {{end}}\n\n    {{if type.len}}\n    let mut {{name}}_: [{{_typeToString(type, false, struct)}}}}; {{type.len}}] =  usafe{uninitialized()};\n    for i in 0..a_len{\n\t\tlet {{name}}_e = {{name}}.get_index(i as u32);\n\t\t{{_parseJSTypeParamFun(name + \"_e\", type.type, errorStrName, struct, _r, _tree)}}\n\t\t{{\"    \"}}{{name}}[i] = {{name}}_e;\n    }\n    {{if iq}}\n    let {{name}} = &{{im?\"mut \": \" \"}}{{name}}_;\n    {{else}}\n    let{{im?\" mut \": \" \"}}{{name}} = {{name}}_;\n    {{end}}\n\n    {{else}}\n    let mut {{name}}_ = Vec::new();\n    for i in 0..a_len{\n\t\tlet {{name}}_e = {{name}}.get_index(i as u32);\n\t\t{{_parseJSTypeParamFun(name + \"_e\", type.type, errorStrName, struct, _r, _tree)}}\n\t\t{{\"    \"}}{{name}}_.push({{name}}_e);\n    }\n    {{if im}}\n    let {{name}} = {{name}}_.as_mut_slice();\n    {{else}}\n    let {{name}} = {{name}}_.as_slice();\n    {{end}}\n    {{end}}\n{{end}}\n\n{{% \u975E\u533F\u540D\u5143\u7EC4\uFF0C\u56E0\u96BE\u4EE5\u5224\u65AD\u5176\u662F\u5143\u7EC4\u7C7B\u578B\uFF0C\u56E0\u6B64\u6309\u7167NativeObject\u5904\u7406%}}\n{{elseif _isTuple(type.name)}}\n\tif !{{name}}.is_array(){return Some(CallResult::Err(String::from(param_error)));}\n\t{{let len = type.childs.length}}\n\t{{let i = 0}}\n\t{{while i < len}}\n\tlet {{name}}_{{i}} = {{name}}.get_index({{i}});\n    {{_parseJSTypeParamFun(name + \"_\" + i, type.childs[i], errorStrName, struct, _r, _tree)}}\n    {{:i++}}\n\t{{end}}\n\t{{:i = 0}}\n\tlet {{name}} = (\n    {{while i < len}}{{if i> 0}},{{end}}{{name}}_{{i}}\n    {{:i++}}\n    {{end}});\n    {{if iq}}\n    let {{name}} = &{{im?\"mut \":\"\"}}{{name}}\n    {{end}}\n\n{{elseif _isNativeObject(type.name)}}\n{{let e = _isEnumC(type.name, _r, _tree)}}\n{{if e}}\n    if !{{name}}.is_number(){return Some(CallResult::Err(String::from(param_error)));}\n    {{let mv = -1}}\n    let {{name}} = match {{name}}.get_u32(){\n        {{for j, member of e.members}}\n        {{if member.value}}{{: mv = parseInt(member.value)}}\n        {{else}}\n        {{: mv += 1}}\n        {{end}}\n        \n        {{mv}} => {{type.name}}::{{member.name}},\n        {{end}}\n        _ => panic!(\"enum type error\")\n    };\n{{else}}\n    {{let dtype = _deref(type, _r, struct)}} {{%\u89E3\u5F15\u7528\u540E\u7684\u7C7B\u578B%}}\n    {{let rType = _typeToString(type, false, struct)}} {{%\u5168\u7C7B\u578B\u5B57\u7B26\u4E32%}}\n    {{let rdType = _typeToString(dtype, false, struct)}} {{%\u89E3\u5F15\u7528\u540E\u7684\u7C7B\u578B\u5B57\u7B26\u4E32%}}\n    {{let isref = (rType === rdType)?false:true}} \n    let ptr = jstype_ptr(&{{name}}, js.clone(), {{_strHashCode(rType, 0)}}, {{iq?false: true}}, param_error).expect(\"\");\n    {{if iq}}\n\tlet {{name}} = unsafe { &{{type.isMut?\"mut \":\"\"}}*(ptr as *{{type.isMut?\"mut \":\"const \"}}{{rType}}) };\n    {{else}}\n\t{{if isref}}\n\tlet {{name}} = *unsafe { Box::from_raw(ptr as *mut {{rType}})}.clone();\n\t{{else}}\n\tlet {{name}} = *unsafe { Box::from_raw(ptr as *mut {{rType}}) };\n\t{{end}}\n    {{end}}\n{{end}}\n\n{{elseif _isBigInt(type.name)}}\n    {{let len = _isBigInt(type.name)}}\n    if !{{name}}.is_uint8_array() && !{{name}}.is_array_buffer(){return Some(CallResult::Err(String::from(param_error))); }\n    let arr = unsafe{*({{name}}.to_bytes().as_ptr() as usize as *const [u8; {{len}}])};\n    let {{name}} = {{if iq}}&{{if im}}mut{{\" \"}}{{end}}{{end}}unsafe {\n        transmute::<[u8; {{len}}], {{type.name}}>(arr)\n    }; \n\n{{end}}\n";
var parseJSTypeResult = "\n{{%name: \u53D8\u91CF\u540D\u79F0\uFF0C type:\u53D8\u91CF\u7C7B\u578B, funType: \u65B9\u6CD5\u7C7B\u578B\uFF08\u540C\u6B65\uFF0C\u963B\u585E\uFF0C\u5F02\u6B65\uFF09 tabCount: \u6BCF\u884C\u7F29\u8FDB%}}\n{{let value = it}}{{let type = it1}}{{let funType = it2}}{{let struct = it3}}{{let _r = it4}}{{let hasp = it5}}{{let _tree= it6}}{{let iq = it7}}{{let jsName = it8}}\n{{: iq = iq?iq:type.isQuote}}\n{{let js  = jsName?jsName:\"js\"}}\n{{let pre = value?\"let mut \" + value + \" = \":\"\"}}\n{{if type.name === \"pi_vm::adapter::JSType\"}}\n    {{if funType === \"sync\"}}\n    {{pre}}{{js}}.new_undefined();\n    {{end}}\n{{elseif type.name === \"i8\"}}\n    {{if iq}}\n    {{pre}}{{js}}.new_i8({{value}}.clone());\n    {{else}}\n    {{pre}}{{js}}.new_i8({{value}});\n    {{end}}\n\n{{elseif type.name === \"i16\"}}\n    {{if iq}}\n    {{pre}}{{js}}.new_i16({{value}}.clone());\n    {{else}}\n    {{pre}}{{js}}.new_i16({{value}});\n    {{end}}\n\n{{elseif type.name === \"i32\"}}\n    {{if iq}}\n    {{pre}}{{js}}.new_i32({{value}}.clone());\n    {{else}}\n    {{pre}}{{js}}.new_i32({{value}});\n    {{end}}\n\n{{elseif type.name === \"i64\"}}\n    {{if iq}}\n    {{pre}}{{js}}.new_i64({{value}}.clone());\n    {{else}}\n    {{pre}}{{js}}.new_i64({{value}});\n    {{end}}\n\n{{elseif type.name === \"u8\"}}\n    {{if iq}}\n    {{pre}}{{js}}.new_u8({{value}}.clone());\n    {{else}}\n    {{pre}}{{js}}.new_u8({{value}});\n    {{end}}\n\n{{elseif type.name === \"u16\"}}\n    {{if iq}}\n    {{pre}}{{js}}.new_u16({{value}}.clone());\n    {{else}}\n    {{pre}}{{js}}.new_u16({{value}});\n    {{end}}\n\n{{elseif type.name === \"u32\"}}\n    {{if iq}}\n    {{pre}}{{js}}.new_u32({{value}}.clone());\n    {{else}}\n    {{pre}}{{js}}.new_u32({{value}});\n    {{end}}\n\n{{elseif type.name === \"u64\"}}\n    {{if iq}}\n    {{pre}}{{js}}.new_u64({{value}}.clone());\n    {{else}}\n    {{pre}}{{js}}.new_u64({{value}});\n    {{end}}\n\n{{elseif type.name === \"f32\"}}\n    {{if iq}}\n    {{pre}}{{js}}.new_f32({{value}}.clone());\n    {{else}}\n    {{pre}}{{js}}.new_f32({{value}});\n    {{end}}\n\n{{elseif type.name === \"f64\"}}\n    {{if iq}}\n    {{pre}}{{js}}.new_f64({{value}}.clone());\n    {{else}}\n    {{pre}}{{js}}.new_f64({{value}});\n    {{end}}\n\n{{elseif type.name === \"usize\"}}\n    {{if iq}}\n    {{pre}}{{js}}.new_u32({{value}}.clone() as u32);\n    {{else}}\n    {{pre}}{{js}}.new_u32({{value}} as u32);\n    {{end}}\n\n{{elseif type.name === \"isize\"}}\n    {{if iq}}\n    {{pre}}{{js}}.new_i32({{value}}.clone() as i32);\n    {{else}}\n    {{pre}}{{js}}.new_i32({{value}} as i32);\n    {{end}}\n\n{{elseif type.name === \"bool\"}}\n    {{if iq}}\n    {{pre}}{{js}}.new_boolean({{value}}.clone());\n    {{else}}\n    {{pre}}{{js}}.new_boolean({{value}});\n    {{end}}\n\n{{elseif type.name === \"str\"}}\n\t{{pre}}{{js}}.new_str(String::from({{value}}));\n\n{{elseif type.name === \"String\"}}\n    {{if iq}}\n    {{pre}}{{js}}.new_str(String::from({{value}}.as_str()));\n    {{else}}\n    {{pre}}{{js}}.new_str({{value}});\n    {{end}}\n    \n\n{{elseif type.name === \"Result\"}}\n{{if funType === \"sync\"}}\n    {{pre}}match {{value}}{\n        Ok(r) => {\n            block_reply({{js}}.clone(), Box::new(move |js: Arc<JS>| {\n                {{_parseJSTypeResultFun(\"r\", type.genType[0], funType, struct, _r, true, _tree)}}\n            } ), TaskType::Sync, 10, Atom::from(\"\"));\n        }\n        Err(v) => { \n            {{if type.genType[1] && type.genType[1].name === \"String\"}}\n            block_throw({{js}}.clone(), v + \", Result is Err\", TaskType::Sync, 10, Atom::from(\"block throw task\"));\n            {{else}}\n            block_throw({{js}}.clone(), v.to_string() + \", Result is Err\", TaskType::Sync, 10, Atom::from(\"block throw task\"));\n            {{end}}\n            return;\n        }\n    };\n{{elseif funType === \"async\"}}\n    {{pre}}match {{value}}{\n        Ok(r) => { {{_parseJSTypeResultFun(\"r\", type.genType[0], funType, struct, _r, true, _tree)}} r }\n        Err(v) => { \n            {{if type.genType[1] && type.genType[1].name === \"String\"}}\n            {{js}}.new_str(v + \", Result is Err\")\n            {{else}}\n            {{js}}.new_str(v.to_string() + \", Result is Err\")\n            {{end}}\n        }\n    };\n{{else}}\n    {{pre}}match {{value}}{\n        Ok(r) => { {{_parseJSTypeResultFun(\"r\", type.genType[0], funType, struct, _r, true, _tree)}} r }\n        Err(v) => { \n            {{if type.genType[1] && type.genType[1].name === \"String\"}}\n            return Some(CallResult::Err(v + \", Result is Err\"));\n            {{else}}\n            return Some(CallResult::Err(v.to_string() + \"Result is Err\"));\n            {{end}}\n        }\n    };\n{{end}}\n\n{{elseif type.name === \"Option\"}}\n    {{pre}}match {{value}}{\n        Some(v) => { {{_parseJSTypeResultFun(\"v\", type.genType[0], funType, struct, _r, true, _tree)}} v}\n        None => {{js}}.new_null()\n    };\n\n{{elseif _isNativeObject(type.name)}}\n{{if _isEnumC(type.name, _r, _tree)}}\n    {{pre}}{{js}}.new_i32({{value}} as i32);\n{{else}}\n    {{let dtype = _deref(type, _r, struct)}}\n    {{let rtype = _typeToString(type, false, struct, _r, true, _tree)}}\n    {{let rdtype = _typeToString(dtype, false, struct, _r, true, _tree)}}\n    {{let isref = (rtype === rdtype)?false:true}}\n\t{{if iq}}\n    let ptr = {{value}} as *const {{rtype}} as usize;\n    {{pre}}ptr_jstype({{js}}.get_objs_ref(), {{js}}.clone(), ptr,{{_strHashCode(rtype, 0)}});\n\t{{else}}\n    let ptr = Box::into_raw(Box::new({{value}})) as usize;\n    {{pre}}ptr_jstype({{js}}.get_objs(), {{js}}.clone(), ptr,{{_strHashCode(rtype, 0)}});\n    {{end}}\n{{end}}\n\n\n{{elseif _isArray(type.name)}}\n{{if type.type.name === \"u8\"}}\n\t{{if iq}}\t\n    let {{value}}_jstype = {{js}}.new_uint8_array({{value}}.len() as u32);\n    {{value}}_jstype.from_bytes({{value}});\n    {{if pre}}\n    {{pre}}{{value}}_jstype;\n    {{end}}\n\t{{else}}\n    let {{value}}_jstype = {{js}}.new_uint8_array({{value}}.len() as u32);\n    {{value}}_jstype.from_bytes(&{{value}});\n    {{if pre}}\n    {{pre}}{{value}}_jstype;\n    {{end}}\n\t{{end}}\n{{else}}\n\tlet mut {{value}}_array = {{js}}.new_array();\n\tfor {{value}}_index in 0..{{value}}.len(){\n\t\tlet mut {{value}}_elem = &{{value}}[{{value}}_index];\n{{_parseJSTypeResultFun(value + \"_elem\", type.type, funType, struct, _r, true, _tree, true)}}\n\t\t{{js}}.set_index(&{{value}}_array, {{value}}_index as u32, &mut {{value}}_elem);\n    }\n    {{if hasp}}\n    {{\"    \"}}{{pre}}{{value}}_array;\n    {{end}}\n{{end}}\n\n{{elseif _isTuple(type.name)}}\n\tlet array = {{js}}.new_array();\n    {{for i, child of type.childs}}\n    let mut {{value}}_elem = {{value}}.{{i}};\n    {{_parseJSTypeResultFun(value + \"_elem\", child, funType, struct, _r, true, _tree)}}\n\t{{js}}.set_index(&array, {{i}}, &mut {{value}}_elem);\n    {{end}}\n    {{if hasp}}\n    {{\"    \"}}{{pre}}array;\n    {{end}}\n\n{{elseif _isBigInt(type.name)}}\n    {{pre}}{{js}}.new_str({{value}}.to_string()); \n{{end}}\n";
//同步方法模板
var fnCallTpl = "\n{{%fn: Gendrust.DefFunc, path: \u65B9\u6CD5\u8DEF\u52B2, genTypeCfg\uFF1A\u6CDB\u578B\u914D\u7F6E%}}\n{{let fn = it}}{{let _r = it1}}{{let path = it2}}{{let _tree = it3}}{{let _tps_has_nobj = it4}}{{let _vectoslice = it5}}\n{{let struct = fn.structStr}}\n{{let h = fn.hash}}\n{{let genT = \"\"}}\n{{let params = fn.params}}\n{{if fn.genType}}\n{{: genT =  _genTypeToString(fn.genType, _r, _tree)}}\n{{end}}\n\nfn call_{{h}}(js: Arc<JS>{{if params && params.length > 0}}, v:Vec<JSType>{{end}}) -> Option<CallResult>{\n{{if params && params.length > 0}}\n\tlet param_error = \"param error in {{fn.fn.name}}\";\n{{for i, p of params}}\n\n\tlet jst{{i}} = &v[{{i}}];\n{{_parseJSTypeParamFun(\"jst\" + i, p.type || p, \"param_error\", struct, _r, _tree)}}\n{{end}}\n{{end}}\n\n{{let pt = 0}}\n{{if fn.result}}\n{{let rtypr = _typeToString(fn.result, false, struct)}}\n    let result{{struct && struct.indexOf(\"<\") > -1 && (fn.result.name === \"Self\" || fn.result.name === fn.structName)?(\":\"+struct):\"\"}} = {{path?path+\"::\":\"\"}}{{fn.fn.name}}{{genT}}({{for i, p of params}}{{if i > 0}},{{end}}jst{{i}}{{:pt++}}{{end}}{{if fn.hasJs}}{{pt?\",\":\"\"}}&js{{end}});\n\t{{_parseJSTypeResultFun(\"result\", fn.result, path, struct, _r, false, _tree)}}\n{{else}}\n\n\t{{\"    \"}}{{path?path +\"::\":\"\"}}{{fn.fn.name}}{{genT}}(\n\t{{for i, p of params}}{{if i > 0}},{{end}}jst{{i}}{{:pt++}}\n\t{{end}}{{if fn.hasJs}}{{pt?\",\":\"\"}}&js{{end}});\n{{end}}\n    Some(CallResult::Ok)\n}\n";
//异步方法模板
var fnAsyncCallTpl = "\n{{%fn: Gendrust.DefFunc, path: \u65B9\u6CD5\u8DEF\u52B2, genTypeCfg\uFF1A\u6CDB\u578B\u914D\u7F6E%}}\n{{let fn = it}}{{let _r = it1}}{{let path = it2}}{{let h = it3}}{{let _tree = it4}}{{let _tps_has_nobj = it5}}{{let _vectoslice = it6}}\n{{let struct = fn.structStr}}\n{{let genT = \"\"}}\n{{let params = fn.params}}\n{{:params = params.slice(0, params.length - 1)}} {{%\u56E0\u4E3A\u662F\u5F02\u6B65\u65B9\u6CD5\uFF0C\u6700\u540E\u4E00\u4E2A\u53C2\u6570\u6539\u4E3Au64\u7C7B\u578B%}}\n\n{{if fn.genType}}\n{{: genT = _genTypeToString(fn.genType, _r, _tree)}}\n{{end}}\nfn call_{{h}}_async( js: Arc<JS>{{if params.length > 0}}, v:Vec<JSType>{{end}}) -> Option<CallResult>{\n\n{{let j = 0;}}\n{{if params && params.length > 0}}\n    let param_error = \"param error in {{fn.fn.name}}\";\n{{for i, p of params}}\n    {{: j++}}\n\tlet jst{{i}} = &v[{{i}}];\n{{_parseJSTypeParamFun(\"jst\" + i, p.type || p, \"param_error\", struct, _r, _tree)}}\n{{end}}\n{{end}}\n    let call_index = &v[{{j}}];\n    if !call_index.is_number(){ return Some(CallResult::Err(String::from(param_error)));}\n    let call_index = call_index.get_u32();\n    \n    let jscopy = js.clone();\n    {{if fn.callBackPT}}\n\tlet call_back = move |r: {{_typeToString(fn.callBackPT, true, struct, _r, true, _tree)}}| {\n\t\tpush_callback(jscopy.clone(), call_index, Box::new(move |js: Arc<JS>| {\n            {{_parseJSTypeResultFun(\"r\", fn.callBackPT, \"async\", struct, _r, \"jscopy\", _tree)}}\n            1\n        } ), Atom::from(\"\"));\n    };\n    {{else}}\n    let call_back = move || {\n\t\tpush_callback(jscopy.clone(), call_index, Box::new(move |js: Arc<JS>| {0}), Atom::from(\"\"));\n    };\n    {{end}}\n{{let call_back = _enref(fn.callBack,\"call_back\", _r, struct)}}\n\n{{let i = 0}}\n{{if fn.result }}\n{{let rtypr = _typeToString(fn.result, false, struct)}}\n    let result{{struct && struct.indexOf(\"<\") > -1 && (fn.result.name === \"Self\" || fn.result.name === fn.structName)?(\":\"+struct):\"\"}} = {{path?path+\"::\":\"\"}}{{fn.fn.name}}{{genT}}({{for i, p of params}}{{if i > 0}},{{end}}jst{{i}}{{end}}{{if params.length > 0}},{{end}} {{call_back}}{{if fn.hasJs}},&js{{end}});\n\t{{_parseJSTypeResultFun(\"result\", fn.result, path, struct, _r, false, _tree)}}\n{{else}}\n\n\t{{\"    \"}}{{path?path +\"::\":\"\"}}{{fn.fn.name}}{{genT}}(\n\t{{for i, p of params}}{{if i > 0}},{{end}}jst{{i}}\n\t{{end}}{{if params.length > 0}},{{end}} {{call_back}}{{if fn.hasJs}},&js{{end}});\n{{end}}\n\tSome(CallResult::Ok)\n}\n";
//阻塞方法模板
var fnSyncCallTpl = "\n{{%fn: Gendrust.DefFunc, path: \u65B9\u6CD5\u8DEF\u52B2, genTypeCfg\uFF1A\u6CDB\u578B\u914D\u7F6E%}}\n{{let fn = it}}{{let _r = it1}}{{let path = it2}}{{let h = it3}}{{let _tree = it4}}{{let _tps_has_nobj = it5}}{{let _vectoslice = it6}}\n{{let struct = fn.structStr}}\n{{let genT = \"\"}}\n{{let params = fn.params}}\n{{:params = params.slice(0, params.length - 1)}} {{%\u56E0\u4E3A\u662F\u5F02\u6B65\u65B9\u6CD5\uFF0C\u5E94\u8BE5\u53BB\u6389\u6700\u540E\u4E00\u4E2A\u53C2\u6570\uFF08\u6700\u540E\u4E00\u4E2A\u53C2\u6570\u662F\u56DE\u8C03\u51FD\u6570\uFF09%}}\n\n{{if fn.genType}}\n{{: genT = _genTypeToString(fn.genType, _r, _tree)}}\n{{end}}\nfn call_{{h}}_sync( js: Arc<JS>{{if params.length > 0}}, v:Vec<JSType>{{end}}) -> Option<CallResult>{\n\n{{if params && params.length > 0}}\n\tlet param_error = \"param error in {{fn.fn.name}}\";\n{{for i, p of params}}\n\n\tlet jst{{i}} = &v[{{i}}];\n{{_parseJSTypeParamFun(\"jst\" + i, p.type || p, \"param_error\", struct, _r, _tree)}}\n{{end}}\n{{end}}\n    let jscopy = js.clone();\n    {{if fn.callBackPT}}\n\tlet call_back = move |r: {{_typeToString(fn.callBackPT, true, struct, _r, true, _tree)}}| {\n        {{_parseJSTypeResultFun(\"r\", fn.callBackPT, \"sync\", struct, _r, \"jscopy\", _tree, null, \"jscopy\")}}\n    };\n    {{else}}\n    let call_back = move || {\n\t\tblock_reply(jscopy.clone(), Box::new(move |js: Arc<JS>| {js.new_null();}), TaskType::Sync, 10, Atom::from(\"\"));\n    };\n    {{end}}\n{{let call_back = _enref(fn.callBack,\"call_back\", _r, struct)}}\n\n{{let i = 0}}\n{{if fn.result}}\n\t{{\"    let r = \"}}{{path?path +\"::\":\"\"}}{{fn.fn.name}}{{genT}}(\n\t{{for i, p of params}}{{if i > 0}},{{end}}jst{{i}}\n    {{end}}{{if params.length > 0}},{{end}} {{call_back}}{{if fn.hasJs}},&js{{end}});\n\tif r.is_some(){\n        let r = r.unwrap();\n        {{_parseJSTypeResultFun(\"r\", fn.callBackPT, \"\", struct, _r, false, _tree)}}\n        return Some(CallResult::Ok);\n    }\n{{else}}\n\t{{\"    \"}}{{path?path +\"::\":\"\"}}{{fn.fn.name}}{{genT}}(\n\t{{for i, p of params}}{{if i > 0}},{{end}}jst{{i}}\n\t{{end}}{{if params.length > 0}},{{end}} {{call_back}}{{if fn.hasJs}},&js{{end}});\n{{end}}\n\tNone\n}\n";
var dropTpl = "{{let _h = it}}{{let _name = it1}}\nfn drop_{{_h}}(ptr: usize){\n    unsafe { Box::from_raw(ptr as *mut {{_name}}) };\n}\n";
exports.toFunc = function (s) {
    try {
        return new Function("_stringify", "_isNumber", "_isStr", "_isBool", "_isArray", "_isTuple", "_isNativeObject", "_strHashCode", "_typeToString", "_mut", "_quote", "_parseJSTypeParamFun", "_parseJSTypeResultFun", "_genTypeToString", "_enref", "_deref", "_has_nobj", "_isBigInt", "_isEnumC", "return " + s)(tpl_1.toString, Gendrust.isNumber, Gendrust.isStr, Gendrust.isBool, Gendrust.isArray, Gendrust.isTuple, Gendrust.isNativeObject, hash.strHashCode, Gendrust.typeToString, Gendrust.mut, Gendrust.quote, parseJSTypeParamFun, parseJSTypeResultFun, Gendrust.genTypeToString, Gendrust.enref, Gendrust.deref, has_nobj, Gendrust.isBigInt, Gendrust.isEnumC);
    } catch (e) {
        //warn(level, "tpl toFun, path: "+", s: ", s, e);
        throw e;
    }
};
var tplFunc = {
    fnCallTpl: exports.toFunc(tpl_1.compile(fnCallTpl, tpl_str_1.Parser)),
    fnAsyncCallTpl: exports.toFunc(tpl_1.compile(fnAsyncCallTpl, tpl_str_1.Parser)),
    fnSyncCallTpl: exports.toFunc(tpl_1.compile(fnSyncCallTpl, tpl_str_1.Parser)),
    fnBodyTpl: exports.toFunc(tpl_1.compile(fnBodyTpl, tpl_str_1.Parser)),
    //registFnTpl:toFunc(compile(registFnTpl, TplParser)),
    implDerefTpl: exports.toFunc(tpl_1.compile(implDerefTpl, tpl_str_1.Parser)),
    registObjTpl: exports.toFunc(tpl_1.compile(registObjTpl, tpl_str_1.Parser)),
    parseJSTypePrama: exports.toFunc(tpl_1.compile(parseJSTypePrama, tpl_str_1.Parser)),
    parseJSTypeResult: exports.toFunc(tpl_1.compile(parseJSTypeResult, tpl_str_1.Parser)),
    dropTpl: exports.toFunc(tpl_1.compile(dropTpl, tpl_str_1.Parser))
};
})