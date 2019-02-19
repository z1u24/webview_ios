_$define("pi/compile/ts", function (require, exports, module){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * ts语法分析, 只处理注释, export方法， 其他语法暂不分析
 * https://kaisery.gitbooks.io/rust-book-chinese/content/content/Syntax%20Index%20%E8%AF%AD%E6%B3%95%E7%B4%A2%E5%BC%95.html
 */
// ============================== 导入
var reader_1 = require("./reader");
var parser_1 = require("./parser");
var scanner_1 = require("./scanner");
var tpl_1 = require("../util/tpl");
var tpl_str_1 = require("../util/tpl_str");
var util_1 = require("./util");

var Compiler = function () {
    function Compiler() {
        _classCallCheck(this, Compiler);

        this.scanner = new scanner_1.Scanner(); // 词法解析器
        this.parser = new parser_1.Parser(); // 语法解析器
        this.scanner.setRule(lex, "0");
        this.scanner.setRule(block, "1");
        this.scanner.setRule(signore, "2");
        this.parser.setRule(syntax, cfgs);
    }

    _createClass(Compiler, [{
        key: "reset",
        value: function reset(s) {
            var reader = reader_1.createByStr(s);
            this.scanner = new scanner_1.Scanner();
            this.scanner.setRule(lex, "0");
            this.scanner.setRule(block, "1");
            this.scanner.setRule(signore, "2");
            this.scanner.setRule(note, "3");
            this.scanner.initReader(reader);
            this.parser.initScanner(this.scanner);
        }
    }, {
        key: "compile",
        value: function compile(s) {
            this.reset(s);
            var r = this.parser.parseRule("file");
            return r;
        }
    }, {
        key: "compile_note",
        value: function compile_note(s) {
            this.reset(s);
            var r = this.parser.parseRule("note");
            return r;
        }
    }]);

    return Compiler;
}();

exports.Compiler = Compiler;
// ts的词法规则
var lex = "\n\t(* comment *)\n\tcommentLineSuf  = \"//\" , [{?notbreakline?}] ;\n    commentBlockSuf = \"/**\" , [ { & !\"*/\"!, ?all? & } ], \"*/\" ;\n\n\tconst = \"const\";\n\texport = \"export\";\n    let = \"let\";\n    var = \"var\";\n    class = \"class\";\n    interface = \"class\";\n    declare = \"declare\";\n    import = \"import\";\n\n\t(* update operator *)\n\t(* enum operator *)\n\t(* separator *)\n\t\"{\" = \"{\";\n\t\"}\" = \"}\";\n\t\"(\" = \"(\";\n\t\")\" = \")\";\n\t\"[\" = \"[\";\n\t\"]\" = \"]\";\n    \"=>\" = \"=>\";\n    \":\" = \":\";\n    \";\" = \";\";\n    \",\" = \",\";\n    \"#\" = \"#\";\n    \".\" = \".\";\n\n\t(* assignment operator *)\n\t\"=\" = \"=\";\n\n\t(* normal *)\n\tidentifier = |\"_\", ?alphabetic?| , [ { ? word ? } ] ;\n\twhitespace = {?whitespace?};\n\n";
// 块的匹配状态, 函数体会进入此状态1
var block = "\n\twhitespace = {?whitespace?};\n\t\"{\" = \"{\";\n\t\"}\" = \"}\";\n\tcontent = {&!\"{\"!, !\"}\"!, ?all?&};\n";
// 语句忽略状态, 2
var signore = "\n\t\";\" = \";\";\n\t\"\n\" = \"\n\";\n    content = {&!\";\"!, !\"\n\"!, ?all?&};\n    whitespace = {?whitespace?};\n";
// 注解状态,3
var note = "\n    \"#\" = \"#\";\n    \",\" = \",\";\n    \"[\" = \"[\";\n    \"]\" = \"]\";\n\t\"\n\" = \"\n\";\n    content = {& &!\"]\"!, !\",\"!&, ?all?&};\n    whitespace = {?whitespace?};\n";
// rust的语法规则
var syntax = "\n    type = [{\"identifier\", \".\"}], \"identifier\", [\"<\", {\"identifier\"}, \">\"], [\"[\", \"]\"];\n    import = \"import\"#2, \"content\", |\";\"#back, \"\n\"#back|;\n    sentence = [\"export\"], |\"let\", \"const\", \"declare\", \"import\"|, \"identifier\", \"=\"#2, \"content\", |\";\"#back, \"\n\"#back|;\n    struct = [\"export\"], |\"class\", \"interface\"|, \"identifier\"#1, block#back;\n    func = [\"export\"], |\"const\", \"let\"|#?, \"identifier\", \"=\", arg, [\":\", type],  \"=>\", block;\n    block = \"{\"#1, [\"content\"], [{block, [\"content\"]}], \"}\"#back, [\";\"#?];\n    arg = \"(\"#?, [{keyType, [\",\"]#? }], \")\"#?;\n    keyType = \"identifier\", \":\", type;\n\n    file = {|func, struct#?, sentence#?, import#?|};\n    \n    note = \"#\"#?3, \"[\"#?, [\"content\"], [{\",\"#?, \"content\"}], \"]\"#?;\n";
// rust的算符优先级及绑定函数
var cfgs = [
// 忽略空白
{ type: "whitespace", ignore: true },
// 注释
{ type: "commentBlockPre", note: -1 }, { type: "commentBlockSuf", note: 1 }, { type: "commentLinePre", note: -1 }, { type: "commentLineSuf", note: 1 },
//注解
{ type: "annotatePre", note: -1 }, { type: "annotateSuf", note: 1 }];
var genPath = function genPath(path, scrRoot) {
    var srcs = scrRoot.split("\\");
    path = path.replace(scrRoot, "");
    var paths = path.split("\\");
    return paths.join("/");
};
exports.translate = function (s, cfg, path, scrRoot) {
    var compiler = new Compiler();
    var file = compiler.compile(s);
    var right = file.right;
    if (!right || right.length === 0) {
        return ["", ""];
    }
    var entrancePath = util_1.parsePath(path, cfg.entranceStruct); //定义结构体的路径
    var cfgPath = util_1.parsePath(path, cfg.cfgPath); //cfg类型的路径
    var entrances = [];
    var paths = [];
    var names = [];
    for (var i = 0; i < right.length; i++) {
        var obj = right[i];
        if (obj.type === "func" && obj.right[0].type === "export" && obj.sufNotes) {
            for (var j = 0; j < obj.sufNotes.length; j++) {
                if (obj.sufNotes[j].type === "commentLineSuf") {
                    var _note = obj.sufNotes[j].value.replace("//", "");
                    var tree = compiler.compile_note(_note);
                    var note1 = null;
                    if (tree && tree.right) {
                        note1 = tree.right[0];
                    }
                    if (!note1) {
                        continue;
                    }
                    var notes = note1.value.split(",");
                    var funName = obj.right[2].value;
                    var notesmap = [];
                    for (var _i = 0; _i < notes.length; _i++) {
                        var ss = notes[_i].split("=");
                        notesmap.push([ss[0].replace(/^\s+|\s+$/g, ""), ss[1] ? ss[1].replace(/^\s+|\s+$/g, "") : "true"]);
                    }
                    var p = genPath(path + "." + funName, scrRoot);
                    entrances.push({ path: p, notes: notesmap });
                    paths.push(p);
                    names.push(funName);
                }
            }
        }
    }
    return [tplFunc.entranceCfgTpl(null, cfgPath, entrances, entrancePath), tplFunc.pathTpl(null, paths, names)];
};
var pathTpl = "{{let paths = it}}{{let names = it1}}\n{{for i, name of names}}\nexport const {{name}} = '{{paths[i]}}';\n{{end}}\n";
var entranceCfgTpl = "{{let cfgPath = it}}{{let entrances = it1}}{{let entrancePath = it2}}\nimport {cfgMgr} from \"{{cfgPath}}\";\nimport {Entrance} from \"{{entrancePath}}\";\n\nlet _$c = (path, notes):Entrance => {return new Entrance(path, notes)};\nlet arr = [{{for i, v of entrances}}{{i > 0?\",\":\"\"}}[{{i}}, _$c(\"{{v.path}}\", new Map<string,string>({{JSON.stringify(v.notes)}}))]{{end}}] as any;\ncfgMgr.update(Entrance._$info.name, new Map<number,any>(arr));\n";
entranceCfgTpl = entranceCfgTpl.replace(/^\t/mg, "");
/**
 * @description
 * @example
 */
var toFunc = function toFunc(s) {
    try {
        return new Function("_stringify", "return " + s)(tpl_1.toString);
    } catch (e) {
        //warn(level, "tpl toFun, path: "+", s: ", s, e);
        throw e;
    }
};
var tplFunc = {
    entranceCfgTpl: toFunc(tpl_1.compile(entranceCfgTpl, tpl_str_1.Parser)),
    pathTpl: toFunc(tpl_1.compile(pathTpl, tpl_str_1.Parser))
};
})