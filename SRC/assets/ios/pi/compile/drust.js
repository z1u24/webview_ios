_$define("pi/compile/drust", function (require, exports, module){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 将rust的数据结构定义，转换成指定语言的数据结构定义
 * https://kaisery.gitbooks.io/rust-book-chinese/content/content/Syntax%20Index%20%E8%AF%AD%E6%B3%95%E7%B4%A2%E5%BC%95.html
 */
// ============================== 导入
var reader_1 = require("./reader");
var parser_1 = require("./parser");
var scanner_1 = require("./scanner");
var gendrust_1 = require("./gendrust");

var Compiler = function () {
	function Compiler() {
		_classCallCheck(this, Compiler);

		this.scanner = new scanner_1.Scanner(); // 词法解析器
		this.parser = new parser_1.Parser(); // 语法解析器
		this.scanner.setRule(exports.lex, "0");
		this.scanner.setRule(block, "1");
		this.scanner.setRule(basket, "2");
		this.scanner.setRule(group, "3");
		this.scanner.setRule(gent, "4");
		this.scanner.setRule(con, "5");
		this.scanner.setRule(modName, "6");
		this.parser.setRule(syntax, exports.cfgs);
	}

	_createClass(Compiler, [{
		key: "reset",
		value: function reset(s) {
			var reader = reader_1.createByStr(s);
			this.scanner.initReader(reader);
			this.parser.initScanner(this.scanner);
		}
	}, {
		key: "compileMod",
		value: function compileMod(s) {
			this.scanner = new scanner_1.Scanner(); // 词法解析器
			this.parser = new parser_1.Parser(); // 语法解析器
			this.parser.setRule(syntax, exports.cfgs);
			this.scanner.setRule(exports.lex, "0");
			this.scanner.setRule(block, "1");
			this.scanner.setRule(basket, "2");
			this.scanner.setRule(group, "3");
			this.scanner.setRule(gent, "4");
			this.scanner.setRule(con, "5");
			this.scanner.setRule(modName, "6");
			var reader = reader_1.createByStr(s);
			this.scanner.initReader(reader);
			this.parser.initScanner(this.scanner);
			var r = this.parser.parseRule("file");
			var x = gendrust_1.gen(r);
			return x;
		}
	}, {
		key: "compileType",
		value: function compileType(s) {
			this.reset(s);
			this.scanner = new scanner_1.Scanner(); // 词法解析器
			this.parser = new parser_1.Parser(); // 语法解析器
			this.parser.setRule(syntax, exports.cfgs);
			this.scanner.setRule(exports.lex, "0");
			var reader = reader_1.createByStr(s);
			this.scanner.initReader(reader);
			this.parser.initScanner(this.scanner);
			var r = this.parser.parseRule("type");
			var x = gendrust_1.gen(r);
			return x;
		}
	}]);

	return Compiler;
}();

exports.Compiler = Compiler;
// rust的词法规则
exports.lex = "\n\ttestFun = \"#[test]\";\n\ttestMod = \"#[cfg(test)]\";\n\t(* comment *)\n\tcommentLinePre = \"//!\" , [{?notbreakline?}] ;\n\tcommentLineSuf  = \"//\" , [{?notbreakline?}] ;\n\tcommentBlockSuf = \"/*\" , [ { & !\"*/\"!, ?all? & } ], \"*/\" ;\n\tcommentBlockPre = \"/*!\" , [ { & !\"*/\"!, ?all? & } ], \"*/\" ;\n\tannotatePre = \"#![\" , [{ &!\"]\"!, ?all?& }], \"]\";\n\tannotateSuf = \"#[\" , [{ &!\"]\"!, ?all?&  }], \"]\";\n\n\tlifetime = \"'\", |identifier, static| ;\n\n\t(* class keyword *)\n\tstruct = & \"struct\", identifier &;\n\tenum = & \"enum\", identifier &;\n    (* keyword *)\n    dyn = & \"dyn\", identifier &;\n\tuse = & \"use\", identifier &;\n\tas = & \"as\", identifier &;\n\tbreak = & \"break\", identifier &;\n\tconst = & \"const\", identifier &;\n\tcontinue = & \"continue\", identifier &;\n\tcrate = & \"crate\", identifier &;\n\telse = & \"else\", identifier &;\n\textern = & \"extern\", identifier &;\n\tfalse = & \"false\", identifier &;\n\tfn = & \"fn\", identifier &;\n\tFn = & \"Fn\", identifier &;\n\tFnMut = & \"FnMut\", identifier &;\n\tFnOnce = & \"FnOnce\", identifier &;\n\tFnBox = & \"FnBox\", identifier &;\n\tfor = & \"for\", identifier &;\n\tif = & \"if\", identifier &;\n\timpl = & \"impl\", identifier &;\n\tin = & \"in\", identifier &;\n\tlet = & \"let\", identifier &;\n\tloop = & \"loop\", identifier &;\n\tmatch = & \"match\", identifier &;\n\tmod = & \"mod\", identifier &;\n\tmove = & \"move\", identifier &;\n\tmut = & \"mut\", identifier &;\n\tpub = & \"pub\", identifier &;\n\tref = & \"ref\", identifier &;\n\treturn = & \"return\", identifier &;\n\tSelf = & \"Self\", identifier &;\n\tself = & \"self\", identifier &;\n\tstatic = & \"static\", identifier &;\n\tstruct = & \"struct\", identifier &;\n\ttrait = & \"trait\", identifier &;\n\ttrue = & \"true\", identifier &;\n\ttype = & \"type\", identifier &;\n\tunsafe = & \"unsafe\", identifier &;\n\tuse = & \"use\", identifier &;\n\twhere = & \"where\", identifier &;\n\twhile = & \"while\", identifier &;\n\t(* type keyword *)\n\tbool = & \"bool\", identifier &;\n\tString = & \"String\", identifier &;\n\tstr =  & \"str\", identifier &;\n\ti8 =  & \"i8\", identifier &;\n\ti16 =  & \"i16\", identifier &;\n\ti32 =  & \"i32\", identifier &;\n    i64 =  & \"i64\", identifier &;\n    isize =  & \"isize\", identifier &;\n    u8 =  & \"u8\", identifier &;\n    u16 =  & \"u16\", identifier &;\n\tu32 =  & \"u32\", identifier &;\n    u64 =  & \"u64\", identifier &;\n    u128 =  & \"u128\", identifier &;\n\tusize =  & \"usize\", identifier &;\n\tf32 =  & \"f32\", identifier &;\n\tf64 =  & \"f64\", identifier &;\n\tdefault = & \"default\", identifier &;\n\t\"?Sized\" = \"?Sized\";\n\t\"macro_rules!\" = \"macro_rules!\";\n\n\t(* update operator *)\n\t\"..\" = \"..\";\n\t(* enum operator *)\n\t\"::\" = \"::\";\n\t(* separator *)\n\t\",\" = \",\";\n\t\".\" = \".\";\n\t\";\" = \";\";\n\t\":\" = \":\";\n\t\"{\" = \"{\";\n\t\"}\" = \"}\";\n\t\"(\" = \"(\";\n\t\")\" = \")\";\n\t\"[\" = \"[\";\n\t\"]\" = \"]\";\n\t(* other *)\n\t\"?\" = \"?\";\n\t\"@\" = \"@\";\n\t\"->\" = \"->\";\n\t\"=>\" = \"=>\";\n\t\"#!\" = \"#!\";\n\t\"#\" = \"#\";\n\t\"$\" = \"$\";\n\n\t(* compare operator *)\n\t\"==\" = \"==\";\n\t\"!=\" = \"!=\";\n\t\"<=\" = \"<=\";\n\t\">=\" = \">=\";\n\t(* assignment operator *)\n\t\"=\" = \"=\";\n\t\"+=\" = \"+=\";\n\t\"-=\" = \"-=\";\n\t\"*=\" = \"*=\";\n\t\"/=\" = \"/=\";\n\t\"%=\" = \"%=\";\n\t\"<<=\" = \"<<=\";\n\t\">>=\" = \">>=\";\n\t\"&=\" = \"&=\";\n\t\"|=\" = \"|=\";\n\t\"^=\" = \"^=\";\n\t(* arithmetic operator *)\n\t\"**\" = \"**\";\n\t\"+\" = \"+\";\n\t\"-\" = \"-\";\n\t\"*\" = \"*\";\n\t\"/\" = \"/\";\n\t\"%\" = \"%\";\n\t(* bool operator *)\n\t\"&&\" = \"&&\";\n\t\"||\" = \"||\";\n\t\"!\" = \"!\";\n\t(* bit operator *)\n\t\"&\" = \"&\";\n\t\"|\" = \"|\";\n\t\"~\" = \"~\";\n\t\"^\" = \"^\";\n\t\"<<\" = \"<<\";\n\t(* compare operator *)\n\t\"<\" = \"<\";\n\t\">\" = \">\";\n\t(* unmatch *)\n\t\">>\" = \">>\";\n\n\t(* normal *)\n\tchar = \"'\", | ?whitespace?, ?visible? |, \"'\";\n\t(* normal *)\n\tidentifier = |\"_\", ?alphabetic?| , [ { ? word ? } ] ;\n\tfloat = [integer], \".\", { ? digit ? }, [floate] ;\n\tfloate = \"e\", |\"+\", \"-\"|, { ? digit ? } ;\n\tinteger16 = [ \"-\" ] , \"0x\" , { |? digit ?, 'A', 'B', 'C', 'D', 'E', 'F', 'a', 'b', 'c', 'd', 'e', 'f' | } ;\n\tinteger = | \"0\", integer10 | ;\n\tinteger10 = [ \"-\" ] , ? digit19 ? , [ { ? digit ? } ] ;\n\tstring = '\"', { | '\\\"', & !'\"'!, ?visible? & | }, '\"' ;\n\twhitespace = {?whitespace?};\n\n";
// 宏的匹配状态（宏内容可以以“[”开始， 以“]”结束）, 函数体也会进入此状态
var block = "\n\twhitespace = {?whitespace?};\n\t\"{\" = \"{\";\n\t\"}\" = \"}\";\n\tcontent = {&!\"{\"!, !\"}\"!, ?all?&};\n";
// 宏的匹配状态（宏内容可以以“(”开始， 以“)”结束）
var basket = "\n\twhitespace = {?whitespace?};\n\t\"(\" = \"(\";\n\t\")\" = \")\";\n\tcontent = {&!\"(\"!, !\")\"!, ?all?&};\n";
// 宏的匹配状态（宏内容可以以“[”开始， 以“]”结束）
var group = "\n\twhitespace = {?whitespace?};\n\t\"[\" = \"[\";\n\t\"]\" = \"]\";\n\tcontent = {&!\"[\"!, !\"]\"!, ?all?&};\n";
// 泛型状态（有些泛型规则不被理解，现在也不用关心）
var gent = "\n\twhitespace = {?whitespace?};\n\t\"<\" = \"<\";\n\t\">\" = \">\";\n\tcontent = {&!\"<\"!, !\">\"!, ?all?&};\n";
// 静态常量定义状态（因为常量不导出，此状态意在匹配常量的结束，并不关心常量的定义规则）
var con = "\n\twhitespace = {?whitespace?};\n\t\";\" = \";\";\n\tcontent = {&!\";\"!, ?all?&};\n";
// use 模块名， 支持名称中含有"."(ts中文件名可以含有.)
var modName = "\n\twhitespace = {?whitespace?};\n\t\"::\" = \"::\";\n    modname = {&!\"::\"!, !\";\"!, !\"{\"!, !\"}\"!, ?all?&};\n    \"{\" = \"{\";\n    identifier = |\"_\", ?alphabetic?| , [ { ? word ? } ] ;\n";
// rust的语法规则
var syntax = "\n    identifierd = |\"identifier\", \"default\", \"struct\", \"enum\", \"use\", \"as\", \"break\", \"const\", \"continue\", \"crate\", \"else\", \"extern\", \"false\", \"fn\", \"Fn\", \"FnMut\", \"FnOnce\", \"for\", \"if\", \"in\", \"let\", \"loop\", \"match\", \"mod\", \"move\", \"mut\", \"pub\", \"ref\", \"Self\", \"self\", \"static\", \"trait\", \"true\", \"type\", \"unsafe\", \"where\", \"while\", \"bool\", \"String\", \"str\", \"i8\", \"i16\", \"i32\", \"i64\", \"u16\", \"u64\", \"u128\", \"isize\", \"usize\", \"f32\", \"f64\", \"str\",\"FnBox\", \"dyn\"|;\n    \n    declarCreat = \"extern\"#?, \"crate\"#?, identifierd, [\"as\"#?, identifierd#?],\";\"#?;\n    declarMod = [\"pub\"]#?, \"mod\"#?, identifierd, \";\"#?;\n\n\timportOne = [\"pub\"]#?, \"use\"#?6,\"modname\"#back, [{\"::\"#?6, \"modname\"#back}], [\"::\",\"*\"], [\"as\", identifierd], [\";\"#?];\n\timportMany = [\"pub\"]#?, \"use\"#?6,[\"modname\"#back,[{\"::\"#?6, \"modname\"#back}], \"::\"#?], importCs, [\";\"#?];\n    importCs = \"{\"#?,[|importAs, identifierd|], [{\",\"#?, |importAs, identifierd|}], \"}\"#?;\n    importAs = identifierd, \"as\"#?, identifierd;\n\tmod = [\"pub\"], \"mod\", identifierd, \"{\"#?, file, \"}\"#?;\n\textern = \"extern\", \"string\", body;\n\n\tptrType = \"*\"#?, |\"mut\", \"const\"|, type;\n\tdefAssocType = \"type\"#?, identifierd, [\":\", type], \";\"#?;\n\ttype = |\"!\", fnType, fnTrait, igenType, importType, baseType, tupleBody, arrBody, ptrType|;\n\tgenType = \"<\"#?, [\"dyn\"]#?, |assocValue#?, genAndTrait, traitLimit, typeDesc, \"lifetime\"#?|, [{\",\"#?, |assocValue#?, genAndTrait, traitLimit, typeDesc, \"lifetime\"#?|}], \">\"#?;\n    traitLimit = |fnTrait, igenType, importType, \"?Sized\"#?, \"lifetime\"#?|, [{\"+\"#?, |fnTrait, igenType, importType, \"?Sized\"#?, \"lifetime\"#?|}];\n\tgenAndTrait = typeDesc, \":\"#?, traitLimit;\n\twhere = \"where\"#?, genAndTrait, [{\",\"#?, genAndTrait}], [\",\"#?];\n\tassocValue = identifierd, \"=\"#?, typeDesc;\n\n\tigenType = importType, genType;\n\t(* struct, enum, trait *)\n\tgenIdentifier = \"<\"#4, [\"content\"], [{genIdentifier, [\"content\"]}], \">\"#back;\n\timportType = |identifierd, genIdentifier#?|, [{\"::\"#?, identifierd}];\n\ttupleBody = \"(\"#?, [typeDesc, [{\",\"#?, typeDesc}]], \")\"#?;\n\tarrBody = \"[\"#?, typeDesc, [\";\"#?, \"integer\"], \"]\"#?;\n\tbaseType = |\"bool\", \"str\", \"char\", \"i8\", \"i16\", \"i32\", \"i64\", \"u8\", \"u16\", \"u32\", \"u64\", \"u128\" , \"isize\", \"usize\", \"f32\", \"f64\", \"String\"|;\n\tnewType = [\"pub\"], \"type\"#?, identifierd, [genType], \"=\"#?, typeDesc, \";\"#?;\n\n    defConst1 = [\"pub\"], \"const\"#5, \"content\", \";\"#?back;\n    defConst = [\"pub\"]#?, \"const\"#?, identifierd, \":\"#?, typeDesc, \"=\"#?, |\"string\", \"integer\", \"float\", \"integer10\", \"integer16\", \"floate\", \"true\", \"false\"|, \";\"#?back;\n\tbracket = ?expr?, \")\"#?;\n\n\tdefStructTuple = [\"pub\"], \"struct\"#?, identifierd, [genType], [where], tupleBody, \";\"#?;\n\tdefStructEmpty = [\"pub\"], \"struct\"#?, identifierd, |@\"{\"#?, \"}\"#?@, \";\"#?|;\n\n\tdefStruct = [\"pub\"], \"struct\"#?, identifierd, [genType], [where], dataBody;\n\tdataBody = \"{\"#?, [{keyType, \",\"#?}], [keyType], \"}\"#?;\n\n\tenumMember = |@identifierd, tupleBody@, @identifierd, dataBody@, identifierd|, \",\"#?;\n\tenumMemberc = identifierd, [\"=\"#?, |\"string\",\"integer\", \"float\", \"integer10\", \"integer16\", \"floate\"|], \",\"#?;\n\tdefEnumC = [\"pub\"], \"enum\"#?, identifierd, \"{\"#?, [{enumMemberc}], \"}\"#?;\n\tdefEnum = [\"pub\"], \"enum\"#?, identifierd, [genType], [where], \"{\"#?, [{enumMember}], \"}\"#?;\n\n\tdefTriat = [\"pub\"], [\"unsafe\"]#?, \"trait\"#?, identifierd, [genType], [\":\"#?, traitLimit#?]#?, [where], \"{\"#?, [{defAssocType#?}], funcs, \"}\"#?;\n\tmacro = |macroName1, macroName2|, |body, macroBody1, macroBody2|; \n\tmacroName1 = \"macro_rules!\", identifierd;\n\tmacroName2 = identifierd, \"!\";\n\tmacroBody1 = \"(\"#?2, [\"content\"], [{macroBody1, [\"content\"]}], \")\"#?back, [\";\"]#?;\n\tmacroBody2 = \"[\"#?3, [\"content\"], [{macroBody2, [\"content\"]}], \"]\"#?back, [\";\"]#?;\n\n\tdefFn = [\"pub\"], [\"default\"]#?, [\"extern\"#?, \"string\"]#?, [\"unsafe\"], \"fn\"#?, identifierd, [genType], func, [where], |body#?, \";\"#?|;\n\tfnTrait = |\"Fn\", \"FnMut\", \"FnOnce\", \"FnBox\"|, func;\n\tfnType = \"fn\"#?, func;\n\tfunc = fnParam, [fnReturn];\n\tfnParam = \"(\"#?, [|keyType, selfPronoun|], [|keyType, typeDesc|], [{\",\"#?, |keyType, typeDesc|}], [\",\"#?]#?, \")\"#?;\n\tfnReturn = \"->\"#?, typeDesc;\n\n\timpl = [\"unsafe\"]#?, \"impl\"#?, [genType], type, [where], \"{\"#?, funcs, \"}\"#?;\n\timplTrait = [\"unsafe\"]#?, \"impl\"#?, [genType], [\"!\"]#?, type, \"for\"#?, typeDesc, [where], \"{\"#?, [{newType}]#?, funcs, \"}\"#?;\n\n\tbody = \"{\"#?1, [\"content\"], [{body, [\"content\"]}], \"}\"#?back;\n\tfuncs = [{|defFn, testError#?|}];\n\tkeyType = [\"pub\"]#?, [\"ref\"]#?, [\"mut\"], identifierd, \":\"#?, typeDesc;\n\ttypeDesc = [\"pub\"], [\"&\"], [\"lifetime\"#?], [\"mut\"], type;\n\tselfPronoun = [\"&\"], [\"mut\"], \"self\"#?;\n\n\t(* \u4E00\u4E2A\u9519\u8BEF\u7684test\u5339\u914D\uFF0C\u5F53\u51FA\u73B0\u6D4B\u8BD5\u4EE3\u7801\u65F6\uFF0C\u76F4\u63A5\u8DF3\u51FA\u5339\u914D *)\n\ttestError = |\"testFun\", \"testMod\"|, |defFn, importOne, importMany, mod, macro|#?;\n\n\tfile = {|defTriat, defStruct, defEnumC, defEnum, defStructEmpty, defStructTuple, importMany, importOne, impl, defFn, implTrait, newType, declarCreat, declarMod, macro#?, defConst, defConst1#?, testError#?, mod#?, extern#?|};\n";
// rust的算符优先级及绑定函数
exports.cfgs = [
// 表达式结束符
{ type: ",", rbp: -1 }, { type: ";", rbp: -1 }, { type: ")", rbp: -1 }, { type: "]", rbp: -1 }, { type: "}", rbp: -1 },
// 最低优先级运算符
{ type: "string" },
// 赋值运算符
{ type: "=", lbp: 10, rbp: 9 }, { type: "+=", lbp: 10, rbp: 9 }, { type: "-=", lbp: 10, rbp: 9 }, { type: "*=", lbp: 10, rbp: 9 }, { type: "/=", lbp: 10, rbp: 9 }, { type: "%=", lbp: 10, rbp: 9 }, { type: "<<=", lbp: 10, rbp: 9 }, { type: ">>=", lbp: 10, rbp: 9 }, { type: ">>>=", lbp: 10, rbp: 9 }, { type: "&=", lbp: 10, rbp: 9 }, { type: "|=", lbp: 10, rbp: 9 }, { type: "^=", lbp: 10, rbp: 9 },
// 关系运算符
{ type: "||", lbp: 30, rbp: 29 }, { type: "&&", lbp: 32, rbp: 31 }, { type: "|", lbp: 35 }, { type: "^", lbp: 36 }, { type: "&", lbp: 37 },
// 布尔运算符
{ type: "===", lbp: 40 }, { type: "!==", lbp: 40 }, { type: "==", lbp: 40 }, { type: "!=", lbp: 40 }, { type: "<=", lbp: 45 }, { type: ">=", lbp: 45 }, { type: "<", lbp: 45 }, { type: ">", lbp: 45 },
// 按位移动符
{ type: "<<", lbp: 50 }, { type: ">>", lbp: 50 }, { type: ">>>", lbp: 50 },
// 算数运算符
{ type: "+", lbp: 60 }, { type: "-", lbp: 60 }, { type: "*", lbp: 70 }, { type: "/", lbp: 70 }, { type: "%", lbp: 70 }, { type: "**", lbp: 70 },
// 前缀运算符
{ type: "!", rbp: 80 }, { type: "~", rbp: 80 }, { type: "+", rbp: 80 }, { type: "-", rbp: 80 },
// 算数表达式
{ type: "(", lbp: 1000, nud: "bracket" },
// statement 语句
//{ type: "struct", nud: "struct, structTuple, structEmpty" },
//{ type: "enum", nud: "enum" },
// 忽略空白
{ type: "whitespace", ignore: true },
// 注释
{ type: "commentBlockPre", note: -1 }, { type: "commentBlockSuf", note: 1 }, { type: "commentLinePre", note: -1 }, { type: "commentLineSuf", note: 1 },
//注解
{ type: "annotatePre", note: -1 }, { type: "annotateSuf", note: 1 }];
// ============================== 立即执行的代码
// scanner.setRule(lex);
// parser.setRule(syntax, cfgs);
// setSuffixTpl("", `
// 	{{if it.comments}}{{for i, v of it.comments}}{{ v.value }}{{end}}{{end}}
// 	{{if it.type === 'struct'}}
// 	{{let arr = it.childs}}
// 	{{let clazz = arr[0].value }}
// 	export class {{ clazz }} {{if arr[1].childs.length > 0 }} <{{ arr[1].childs[0].value }}>{{end}} {
// 		{{: arr = arr.slice(2)}}
// 		{{for i, v of arr}}
// 		{{if v.comments}}{{for i, vv of v.comments}}{{ vv.value }}{{end}}{{end}}
// 		{{let name = v.childs[1].value}}
// 		{{let type = v.childs[3].childs[0]}}
// 		{{let t = type.type}}
// 		{{if t==='identifier'}}
// 		{{ name }}: {{ type.value }} = null;
// 		{{elseif t==='bool'}}
// 		{{ name }}: boolean = false;
// 		{{elseif t==='f32' || t==='f64'}}
// 		{{ name }}: number = 0.0;
// 		{{else}}
// 		{{ name }}: number = 0;
// 		{{end}}
// 		{{end}}
// 		// 克隆
// 		copy() : {{ clazz }} -> {
// 			return new {{ clazz }}().copy(this);
// 		}
// 		// 拷贝
// 		copy(dst: {{ clazz }}) : {{ clazz }} -> {
// 		}
// 		// 从ArrayBuffer上序列化域
// 		decode(bs:BufferStream) -> {
// 		{{for i, v of arr}}
// 			{{let name = v.childs[1].value}}
// 			{{let type = v.childs[3].childs[0]}}
// 			{{let t = type.type}}
// 			{{if t==='identifier'}}
// 			if(bs.getU8()) {
// 				this.{{ name }} = new {{ type.value }};
// 				this.{{ name }}.decode(bs);
// 			}
// 			{{else}}
// 			this.{{ name }} = bs.get{{ t.charAt(0).toUpperCase() }}{{ t.slice(1) }}();
// 			{{end}}
// 		{{end}}
// 		}
// 		// 将域序列化到ArrayBuffer上
// 		encode(bs:BufferStream) -> {
// 		{{for i, v of arr}}
// 			{{let name = v.childs[1].value}}
// 			{{let type = v.childs[3].childs[0]}}
// 			{{let t = type.type}}
// 			{{if t==='identifier'}}
// 			if({{ name }}) {
// 				bs.setU8(1);
// 				this.{{ name }}.encode(bs);
// 			}else
// 				bs.setU8(0);
// 			{{else}}
// 			bs.set{{ t.charAt(0).toUpperCase() }}{{ t.slice(1) }}(this.{{ name }});
// 			{{end}}
// 		{{end}}
// 		}
// 	}
// 	{{end}}
// `);
})