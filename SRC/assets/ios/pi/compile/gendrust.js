_$define("pi/compile/gendrust", function (require, exports, module){
"use strict";

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var hash = require("../util/hash");
var tpl_1 = require("../util/tpl");
var util_1 = require("../util/util");
//rs编译为ts
exports.translate = function (arr, path, cfg) {
    return exports.tplFunc(null, arr, path, cfg);
};
//将语法树转换成ts代码
exports.gen = function (syntax) {
    if (!syntax) {
        return [];
    }
    var arr = preorder(syntax);
    return arr;
};
// ====================================== 本地
//先序遍历
var preorder = function preorder(syntax) {
    var funcs = seekFunc(syntax);
    var childs = funcs.child() || [];
    var childNodes = [];
    for (var i = 0; i < childs.length; i++) {
        var childNode = preorder(childs[i]);
        if (childNode) childNodes.push(childNode); //存在空文本节点的情况		
    }
    var node = funcs.node(childNodes);
    return node;
};
//每一个节点都有pre字符串和suf字符串
var seekFunc = function seekFunc(syntax) {
    try {
        return parserFunc[syntax.type](syntax);
    } catch (error) {
        throw "parserFunc[" + syntax.type + "]\u4E0D\u662F\u4E00\u4E2A\u65B9\u6CD5\uFF01";
    }
};
//"extern"#?, "crate"#?, identifierd, ";"#?;
var declarCreatFunc = function declarCreatFunc(syntax) {
    return Object.assign({}, defaultParse, {
        "child": function child() {
            return syntax.right;
        },
        "node": function node(childs) {
            var node = new DeclarCreat();
            node.name = childs[0];
            return node;
        }
    });
};
//["pub"], "mod"#?, identifierd, ";"#?;
var declarModFunc = function declarModFunc(syntax) {
    return Object.assign({}, defaultParse, {
        "child": function child() {
            return syntax.right;
        },
        "node": function node(childs) {
            var node = new DeclarMod();
            node.name = childs[childs.length - 1];
            if (childs.length === 2) {
                node.power = childs[0];
            }
            return node;
        }
    });
};
//"*"#?, |"mut", "const"|, type;
var ptrTypeFunc = function ptrTypeFunc(syntax) {
    return Object.assign({}, defaultParse, {
        "child": function child() {
            return [syntax.right[1]];
        },
        "node": function node(childs) {
            var node = new Type();
            node.name = "*";
            var mutable = syntax.right[0].value;
            if (mutable === "mut") {
                node.isMut = true;
            } else {
                //mutable === "const"
                node.isMut = false;
            }
            node.type = childs[0];
            return node;
        }
    });
};
//"("#?, typeDesc, [{","#?, typeDesc}], ")"#?;
var tupleBodyFunc = function tupleBodyFunc(syntax) {
    return Object.assign({}, defaultParse, {
        "child": function child() {
            return syntax.right;
        },
        "node": function node(childs) {
            var node = new Type();
            node.name = "Tuple";
            node.childs = childs;
            return node;
        }
    });
};
//"["#?, typeDesc, [","#?, "integer"], "]"#?;
var arrBodyFunc = function arrBodyFunc(syntax) {
    return Object.assign({}, defaultParse, {
        "child": function child() {
            return syntax.right; //type
        },
        "node": function node(childs) {
            var node = new Type();
            node.name = "Array";
            node.type = childs[0];
            node.len = childs[1] - 0;
            return node;
        }
    });
};
//|"bool", "str", "char", "i8", "i16", "i32", "i64", "u8", "u16", "u32", "u64", "u128", "isize", "usize", "f32", "f64"|;
var baseTypeFunc = function baseTypeFunc(syntax) {
    return Object.assign({}, defaultParse, {
        "child": function child() {
            return [];
        },
        "node": function node(childs) {
            var node = new Type();
            node.name = syntax.right[0].value;
            return node;
        }
    });
};
//|"!"#?, fnType, baseType, tupleBody, arrBody, igenType, importType, ptrType|
var typeFunc = function typeFunc(syntax) {
    return Object.assign({}, defaultParse, {
        "child": function child() {
            return syntax.right;
        },
        "node": function node(childs) {
            if (syntax.right[0].type === "Self") {
                var t = new Type();
                t.name = "Self";
                return t;
            } else {
                return childs[0];
            }
        }
    });
};
//["&"], ["mut"], "self";
var selfPronounFunc = function selfPronounFunc(syntax) {
    return Object.assign({}, defaultParse, {
        "child": function child() {
            return [];
        },
        "node": function node(childs) {
            var node = new Type();
            node.name = "self";
            for (var i = 0; i < syntax.right.length; i++) {
                if (syntax.right[i].type === "&") {
                    node.isQuote = true;
                } else if (syntax.right[i].type === "mut") {
                    node.isMut = true;
                }
            }
            return node;
        }
    });
};
//["pub"]#?, ["ref"]#?, ["mut"], identifierd, ":"#?, typeDesc;
var keyTypeFunc = function keyTypeFunc(syntax) {
    return Object.assign({}, defaultParse, {
        "child": function child() {
            return syntax.right;
        },
        "node": function node(childs) {
            var right = syntax.right;
            var node = new KeyType();
            var isMut = void 0;
            for (var i = 0; i < right.length; i++) {
                if (right[i].type === "mut") {
                    isMut = true;
                } else if (right[i].type === "identifierd") {
                    node.name = childs[i];
                } else if (right[i].type === "typeDesc") {
                    node.type = childs[i];
                }
            }
            var key = void 0;
            if (syntax.right.length === 2) {
                key = syntax.right[0];
            } else if (syntax.right.length === 3) {
                key = syntax.right[1];
            }
            parseNote(key, node); //解析注释和注解
            node.isMut = isMut;
            return node;
        }
    });
};
//["&"], ["lifetime"], ["mut"], type;
var typeDescFunc = function typeDescFunc(syntax) {
    return Object.assign({}, defaultParse, {
        "child": function child() {
            return syntax.right;
        },
        "node": function node(childs) {
            var t = childs[childs.length - 1];
            for (var i = 0; i < syntax.right.length; i++) {
                if (syntax.right[i].type === "&") {
                    t.isQuote = true;
                } else if (syntax.right[i].type === "mut") {
                    t.isMut = true;
                } else if (syntax.right[i].type === "lifetime") {
                    t.lifeTime = childs[i];
                }
            }
            return t;
        }
    });
};
//typeDesc, ":"#?, traitLimit;
var genAndTraitFun = function genAndTraitFun(syntax) {
    return Object.assign({}, defaultParse, {
        "child": function child() {
            return syntax.right;
        },
        "node": function node(childs) {
            var genType = new Type();
            //genType.name = childs[0];
            genType.type = childs[0];
            genType.traitBound = [];
            for (var i = 1; i < childs[1].length; i++) {
                genType.traitBound[i - 1] = childs[1][i];
            }
            return genType;
        }
    });
};
//|identifierd, genIdentifier#?|, [{"::"#?, identifierd}];
var importTypeFunc = function importTypeFunc(syntax) {
    return Object.assign({}, defaultParse, {
        "child": function child() {
            return syntax.right;
        },
        "node": function node(childs) {
            var node = new Type(),
                ts = [];
            for (var i = 0; i < syntax.right.length; i++) {
                ts.push(childs[i]);
            }
            node.name = ts.join("::");
            return node;
        }
    });
};
//importType, genType;
var igenTypeFunc = function igenTypeFunc(syntax) {
    return Object.assign({}, defaultParse, {
        "child": function child() {
            return syntax.right; //genType
        },
        "node": function node(childs) {
            var node = childs[0];
            node.genType = childs[1];
            return node;
        }
    });
};
//|"Fn", "FnMut", "FnOnce"|, func;
var fnTraitFunc = function fnTraitFunc(syntax) {
    return Object.assign({}, defaultParse, {
        "child": function child() {
            return syntax.right;
        },
        "node": function node(childs) {
            var node = new FnTrait();
            node.name = childs[0];
            node.func = childs[1];
            return node;
        }
    });
};
//"fn"#?, func;
var fnTypeFunc = function fnTypeFunc(syntax) {
    return Object.assign({}, defaultParse, {
        "child": function child() {
            return syntax.right;
        },
        "node": function node(childs) {
            return childs[0];
        }
    });
};
//fnParam, [fnReturn];
var funcFunc = function funcFunc(syntax) {
    return Object.assign({}, defaultParse, {
        "child": function child() {
            return syntax.right;
        },
        "node": function node(childs) {
            var node = new Func();
            node.params = childs[0];
            childs[1] && (node.result = childs[1]);
            return node;
        }
    });
};
//["pub"], ["default"]#?, ["extern", "string"]#?, ["unsafe"], "fn"#?, identifierd, [genType], func, [where], |body#?, ";"#?|;
var defFnFunc = function defFnFunc(syntax) {
    return Object.assign({}, defaultParse, {
        "child": function child() {
            return syntax.right;
        },
        "node": function node(childs) {
            var node = new DefFunc();
            for (var i = 0; i < syntax.right.length; i++) {
                if (syntax.right[i].type === "pub") {
                    node.power = "pub";
                } else if (syntax.right[i].type === "identifierd") {
                    node.name = childs[i];
                } else if (syntax.right[i].type === "genType") {
                    node.genType = childs[i];
                } else if (syntax.right[i].type === "func") {
                    node.func = childs[i];
                } else if (syntax.right[i].type === "where") {
                    for (var j = 0; j < childs[i].length; j++) {
                        if (node.genType) {
                            for (var k = 0; k < node.genType.length; k++) {
                                if (node.genType[k].name === childs[i][j].name) {
                                    node.genType[k].traitBound = childs[i][j].traitBound;
                                }
                            }
                        }
                    }
                } else if (syntax.right[i].type === "unsafe") {
                    node.unsafe = true;
                }
            }
            parseNote(syntax, node);
            return node;
        }
    });
};
//|"identifierd", "default"|;
var identifierdFunc = function identifierdFunc(syntax) {
    return Object.assign({}, defaultParse, {
        "child": function child() {
            return syntax.right;
        },
        "node": function node(childs) {
            return childs[0];
        }
    });
};
//"("#?, [self], [|keyType, typeDesc|], [{","#?, |keyType, typeDesc|}], ")"#?;
var fnParamFunc = function fnParamFunc(syntax) {
    return Object.assign({}, defaultParse, {
        "child": function child() {
            return syntax.right;
        },
        "node": function node(childs) {
            return childs;
        }
    });
};
//"->"#?, typeDesc;
var fnReturnFunc = function fnReturnFunc(syntax) {
    return Object.assign({}, defaultParse, {
        "child": function child() {
            return syntax.right;
        },
        "node": function node(childs) {
            return childs[0];
        }
    });
};
// [{defFn}];
var funcsFunc = function funcsFunc(syntax) {
    return Object.assign({}, defaultParse, {
        "child": function child() {
            return syntax.right;
        },
        "node": function node(childs) {
            return childs;
        }
    });
};
//"where"#?, genAndTrait, [{","#?, genAndTrait}];
var whereFunc = function whereFunc(syntax) {
    return Object.assign({}, defaultParse, {
        "child": function child() {
            return syntax.right;
        },
        "node": function node(childs) {
            return childs;
        }
    });
};
//"identifierd", "="#?, typeDesc;
var assocValueFunc = function assocValueFunc(syntax) {
    return Object.assign({}, defaultParse, {
        "child": function child() {
            return syntax.right;
        },
        "node": function node(childs) {
            var node = new AssocType();
            node.name = childs[0];
            node.type = childs[1];
            return node;
        }
    });
};
var onlyRightFunc = function onlyRightFunc(syntax) {
    return Object.assign({}, defaultParse, {
        "child": function child() {
            return syntax.right;
        }
    });
};
var valueFunc = function valueFunc(syntax) {
    return Object.assign({}, defaultParse, {
        "node": function node(childs) {
            return syntax.value;
        }
    });
};
//{|defTriat#?, defStruct, defEnum, defStructEmpty, defStructTuple, importMany, importOne, impl, defFn, implTrait#?, newType|};
var fileFunc = function fileFunc(syntax) {
    return Object.assign({}, defaultParse, {
        "child": function child() {
            return syntax.right;
        },
        "node": function node(childs) {
            return childs;
        }
    });
};
//["pub"]#?, "const"#?5, "identifierd", ":"#?, typeDesc, "="#?, |"string", "integer", "float", "integer10", "integer16", "floate", "true", "false"|, ";"#?back;
var defConstFunc = function defConstFunc(syntax) {
    return Object.assign({}, defaultParse, {
        "child": function child() {
            return syntax.right;
        },
        "node": function node(childs) {
            var node = new DefConst();
            defFunc(childs, node, syntax);
            node.value = childs[2];
            node.type = "const";
            return node;
        }
    });
};
//["pub"], "struct"#?, "identifierd", [genType], [where], dataBody;
var defStructFunc = function defStructFunc(syntax) {
    return Object.assign({}, defaultParse, {
        "child": function child() {
            return syntax.right;
        },
        "node": function node(childs) {
            var node = new DefStruct();
            defFunc(childs, node, syntax);
            node.members = childs[childs.length - 1]; //dataBody
            node.type = "Struct";
            return node;
        }
    });
};
//["pub"], "enum"#?, "identifierd", [genType], [where], "{"#?, [{enumMemberc}], "}"#?;
var defEnumCFunc = function defEnumCFunc(syntax) {
    return Object.assign({}, defaultParse, {
        "child": function child() {
            return syntax.right;
        },
        "node": function node(childs) {
            var node = new DefEnumC();
            node.type = "enumc";
            defFunc(childs, node, syntax);
            for (var i = 0; i < childs.length; i++) {
                if (syntax.right[i].type === "enumMemberc") {
                    node.members = node.members || [];
                    node.members.push(childs[i]);
                }
            }
            return node;
        }
    });
};
//["pub"], "enum"#?, identifierd, [genType], [where], "{"#?, [{enumMember}], "}"#?
var defEnumFunc = function defEnumFunc(syntax) {
    return Object.assign({}, defaultParse, {
        "child": function child() {
            return syntax.right;
        },
        "node": function node(childs) {
            var node = new DefEnum();
            node.type = "enum";
            defFunc(childs, node, syntax);
            for (var i = 0; i < childs.length; i++) {
                if (syntax.right[i].type === "enumMember") {
                    node.members = node.members || [];
                    node.members.push(childs[i]);
                } else {
                    continue;
                }
            }
            return node;
        }
    });
};
//"identifierd", ["="#?, |"string","integer", "float", "integer10", "integer16", "floate"|], ","#?;
var enumMembercFunc = function enumMembercFunc(syntax) {
    return Object.assign({}, defaultParse, {
        "child": function child() {
            return syntax.right;
        },
        "node": function node(childs) {
            var node = new KeyValue();
            node.name = childs[0];
            node.value = childs[1];
            parseNote(syntax, node); //解析注释和注解
            return node;
        }
    });
};
//|@"identifierd", tupleBody@, @"identifierd", dataBody@, "identifierd"|, ","#?;
var enumMemberFunc = function enumMemberFunc(syntax) {
    return Object.assign({}, defaultParse, {
        "child": function child() {
            return syntax.right;
        },
        "node": function node(childs) {
            var node = new DefStruct();
            node.name = childs[0];
            if (syntax.right[1]) {
                if (syntax.right[1].type === "tupleBody") {
                    node.type = "StructTuple";
                    node.members = childs[1].childs;
                } else if (syntax.right[1].type === "dataBody") {
                    node.type = "Struct";
                    node.members = childs[1];
                }
            } else {
                node.type = "Empty";
            }
            parseNote(syntax, node); //解析注释和注解
            return node;
        }
    });
};
//"{"#?, {keyType, ","#?}, [keyType], "}"#?;
var dataBodyFunc = function dataBodyFunc(syntax) {
    return Object.assign({}, defaultParse, {
        "child": function child() {
            return syntax.right;
        },
        "node": function node(childs) {
            return childs;
        }
    });
};
//["pub"], "struct"#?, "identifierd", [genType], [where], tupleBody;
var defStructTupleFunc = function defStructTupleFunc(syntax) {
    return Object.assign({}, defaultParse, {
        "child": function child() {
            return syntax.right;
        },
        "node": function node(childs) {
            var node = new DefStruct();
            defFunc(childs, node, syntax);
            node.members = childs[childs.length - 1];
            node.type = "StructTuple";
            return node;
        }
    });
};
//["pub"], "struct"#?, "identifierd", ["{"#?, "}"#?];
var defStructEmptyFunc = function defStructEmptyFunc(syntax) {
    return Object.assign({}, defaultParse, {
        "child": function child() {
            return syntax.right;
        },
        "node": function node(childs) {
            var node = new DefStruct();
            defFunc(childs, node, syntax);
            node.type = "StructEmpty";
            return node;
        }
    });
};
//["pub"], "type"#?, "identifierd", [genType], "="#?, typeDesc, ";"#?;
var newTypeFunc = function newTypeFunc(syntax) {
    return Object.assign({}, defaultParse, {
        "child": function child() {
            return syntax.right;
        },
        "node": function node(childs) {
            var node = new NewType();
            for (var i = 0; i < syntax.right.length; i++) {
                if (syntax.right[i].type === "identifierd") {
                    node.name = childs[i];
                } else if (syntax.right[i].type === "genType") {
                    node.genType = childs[i];
                } else if (syntax.right[i].type === "pub") {
                    node.power = "pub";
                } else if (syntax.right[i].type === "typeDesc") {
                    node.value = childs[i];
                }
            }
            return node;
        }
    });
};
// ["pub"], ["unsafe"]#?, "trait"#?, identifierd, [genType], [":"#?, traitLimit#?]#?, [where], "{"#?, [{defAssocType#?}], funcs, "}"#?;
var defTriatFunc = function defTriatFunc(syntax) {
    return Object.assign({}, defaultParse, {
        "child": function child() {
            return syntax.right;
        },
        "node": function node(childs) {
            var node = new DefStruct();
            for (var i = 0; i < syntax.right.length; i++) {
                if (syntax.right[i].type === "identifierd") {
                    node.name = childs[i];
                }
            }
            //defFunc(childs, node, syntax);
            //node.type = "StructEmpty";
            //暂不解析，似乎用不到
            return node;
        }
    });
};
//"impl"#?, [genType], type, "{"#?, funcs, "}"#?;
//implStruct
var implFunc = function implFunc(syntax) {
    return Object.assign({}, defaultParse, {
        "child": function child() {
            return syntax.right;
        },
        "node": function node(childs) {
            var node = new Impl();
            defFunc(childs, node, syntax);
            node.type = childs[childs.length - 2];
            node.funcs = childs[childs.length - 1];
            return node;
        }
    });
};
//["unsafe"]#?, "impl"#?, [genType], type, "for"#?, typeDesc, [where], "{"#?, [{newType}]#?, funcs, "}"#?;
var implTraitFunc = function implTraitFunc(syntax) {
    return Object.assign({}, defaultParse, {
        "child": function child() {
            return syntax.right;
        },
        "node": function node(childs) {
            var node = new Impl();
            //defFunc(childs, node, syntax);
            for (var i = 0; i < syntax.right.length; i++) {
                if (syntax.right[i].type === "genType") {
                    node.genType = childs[i];
                } else if (syntax.right[i].type === "type") {
                    node.trait = childs[i];
                } else if (syntax.right[i].type === "typeDesc") {
                    node.type = childs[i];
                } else if (syntax.right[i].type === "where") {
                    var bounds = childs[i];
                    for (var j = 0; j < bounds.length; j++) {
                        for (var k = 0; k < node.genType.length; k++) {
                            if (node.genType[k].name === bounds[j].name) {
                                node.genType[k].traitBound = bounds[j].traitBound;
                                break;
                            }
                        }
                    }
                } else if (syntax.right[i].type === "funcs") {
                    node.funcs = childs[i];
                }
            }
            return node;
        }
    });
};
//定义结构体或枚举或方法
var defFunc = function defFunc(childs, node, syntax) {
    for (var i = 0; i < childs.length; i++) {
        if (syntax.right[i].type === "pub") {
            node.power = "pub";
        } else if (syntax.right[i].type === "identifierd") {
            node.name = childs[i];
        } else if (syntax.right[i].type === "genType") {
            node.genType = childs[i];
        } else if (syntax.right[i].type === "where") {
            for (var j = 0; j < childs[i].length; j++) {
                for (var k = 0; k < node.genType.length; k++) {
                    if (node.genType[k].name === childs[i][j].name) {
                        node.genType[k].traitBound = childs[i][j].traitBound;
                        break;
                    }
                }
            }
        }
    }
    parseNote(syntax, node); //解析注释和注解
};
//"<"#?, |assocValue#?, genAndTrait, typeDesc, traitLimit, "lifetime"#?|, [{","#?, |assocValue#?, genAndTrait, typeDesc, traitLimit, "lifetime"#?|}], ">"#?;
var genTypeFunc = function genTypeFunc(syntax) {
    return Object.assign({}, defaultParse, {
        "child": function child() {
            return syntax.right;
        },
        "node": function node(childs) {
            for (var i = 0; i < childs.length; i++) {
                if (syntax.right[i].type === "traitLimit" && childs[i].childs) {
                    if (childs[i].childs.length === 1) {
                        childs[i] = childs[i].childs[0];
                    } else if (childs[i].childs.length === 0) {
                        childs = childs.slice(0, i).concat(childs.slice(i + 1, childs.length));
                        i--;
                    }
                }
            }
            return childs;
        }
    });
};
//|igenType, fnTrait, importType, "?Sized"#?, "lifetime"#?|, [{"+"#?, |fnTrait, igenType, importType, "?Sized"#?, "lifetime"#?|}];
var traitLimitFunc = function traitLimitFunc(syntax) {
    return Object.assign({}, defaultParse, {
        "child": function child() {
            return syntax.right;
        },
        "node": function node(childs) {
            var node = new Type();
            node.name = "limits";
            node.childs = childs;
            return node;
        }
    });
};
//["pub"], "use"#?,"identifierd",[{"::"#?, "identifierd"}], "::"#?, importCs, [";"#?];
var importManyFunc = function importManyFunc(syntax) {
    return Object.assign({}, defaultParse, {
        "child": function child() {
            return syntax.right;
        },
        "node": function node(childs) {
            var node = new Import();
            node.type = "import";
            var paths = [],
                contents = void 0;
            var i = 0;
            if (childs[0] === "pub") {
                node.power = "pub";
                i = 1;
            }
            for (; i < childs.length; i++) {
                if (i < childs.length - 1) {
                    paths.push(childs[i]);
                } else {
                    contents = childs[i];
                }
            }
            node.path = paths.join("/");
            node.contents = contents;
            parseNote(syntax, node); //解析注释和注解
            return node;
        }
    });
};
//["pub"]#?, "use"#?6,"modname"#back, [{"::"#?6, "modname"#back}], ["::","*"], ["as", identifierd], [";"#?];
var importOneFunc = function importOneFunc(syntax) {
    return Object.assign({}, defaultParse, {
        "child": function child() {
            return syntax.right;
        },
        "node": function node(childs) {
            var node = new Import();
            node.type = "importOne";
            var paths = [],
                contents = void 0;
            var i = 0;
            if (childs[0] === "pub") {
                node.power = "pub";
                i = 1;
            }
            for (; i < childs.length; i++) {
                if (i < childs.length - 1) {
                    paths.push(childs[i]);
                } else {
                    contents = childs[i].split(",");
                }
            }
            node.path = paths.join("/");
            node.contents = contents;
            parseNote(syntax, node); //解析注释和注解
            return node;
        }
    });
};
//"{"#?, [{|importAs, identifierd|, ","#?}], "}"#?;
var importCsFunc = function importCsFunc(syntax) {
    return Object.assign({}, defaultParse, {
        "child": function child() {
            return syntax.right;
            ;
        },
        "node": function node(childs) {
            return childs;
        }
    });
};
//identifierd, "as"#?, identifierd;
var importAsFunc = function importAsFunc(syntax) {
    return Object.assign({}, defaultParse, {
        "child": function child() {
            return syntax.right;
            ;
        },
        "node": function node(childs) {
            return childs;
        }
    });
};
// ================ JS的处理整体要简单很多
// child -> node->pre -> suf
var defaultParse = {
    "child": function child() {
        return [];
    },
    "node": function node(childs) {
        return null;
    }
};
//解析注释和注解
var parseNote = function parseNote(syntax, node) {
    if (syntax.preNotes) {
        var preNotes = syntax.preNotes;
        for (var i = 0; i < preNotes.length; i++) {
            if (preNotes[i].type === "commentBlockPre" || preNotes[i].type === "commentLinePre") {
                if (!node.preComment) node.preComment = [];
                node.preComment.push(preNotes[i].value);
            } else if (preNotes[i].type === "annotatePre") {
                if (!node.annotate) node.annotate = {};
                var ans = preNotes[i].value.slice(3, preNotes[i].value.length - 1).split(",");
                parseAnnotate(ans, node.annotate);
            }
        }
    }
    if (syntax.sufNotes) {
        var sufNotes = syntax.sufNotes;
        for (var _i = 0; _i < sufNotes.length; _i++) {
            if (sufNotes[_i].type === "commentBlockSuf" || sufNotes[_i].type === "commentLineSuf") {
                if (!node.sufNotes) node.sufNotes = [];
                node.sufNotes.push(sufNotes[_i].value);
            } else if (sufNotes[_i].type === "annotateSuf") {
                if (!node.annotate) node.annotate = {};
                var _ans = sufNotes[_i].value.slice(2, sufNotes[_i].value.length - 1).split(",");
                parseAnnotate(_ans, node.annotate);
            }
        }
    }
};
//解析注解
var parseAnnotate = function parseAnnotate(ans, anno) {
    var temp = void 0;
    for (var i = 0; i < ans.length; i++) {
        temp = ans[i].split("=");
        if (temp.length === 1) {
            anno[temp[0]] = true;
        } else if (temp.length === 2) {
            anno[temp[0]] = "" + temp[1];
        }
    }
};
var parserFunc = {
    "file": fileFunc,
    "declarCreat": declarCreatFunc,
    "declarMod": declarModFunc,
    "importOne": importOneFunc,
    "importMany": importManyFunc,
    "importCs": importCsFunc,
    "importAs": importAsFunc,
    "defConst": defConstFunc,
    "defStruct": defStructFunc,
    "defEnum": defEnumFunc,
    "defEnumC": defEnumCFunc,
    "defStructEmpty": defStructEmptyFunc,
    "defStructTuple": defStructTupleFunc,
    "defTriatTuple": defTriatFunc,
    "defTriat": defTriatFunc,
    "defFn": defFnFunc,
    "impl": implFunc,
    "implTrait": implTraitFunc,
    "newType": newTypeFunc,
    "enumMember": enumMemberFunc,
    "enumMemberc": enumMembercFunc,
    "dataBody": dataBodyFunc,
    "keyType": keyTypeFunc,
    "typeDesc": typeDescFunc,
    "selfPronoun": selfPronounFunc,
    "fnReturn": fnReturnFunc,
    "fnParam": fnParamFunc,
    "funcs": funcsFunc,
    "where": whereFunc,
    "genAndTrait": genAndTraitFun,
    "traitLimit": traitLimitFunc,
    "fnTrait": fnTraitFunc,
    "func": funcFunc,
    "assocValue": assocValueFunc,
    "ptrType": ptrTypeFunc,
    "fnType": fnTypeFunc,
    "genType": genTypeFunc,
    "importType": importTypeFunc,
    "type": typeFunc,
    "tupleBody": tupleBodyFunc,
    "igenType": igenTypeFunc,
    "arrBody": arrBodyFunc,
    "baseType": baseTypeFunc,
    "identifierd": identifierdFunc,
    "bool": valueFunc,
    "char": valueFunc,
    "str": valueFunc,
    "i8": valueFunc,
    "i16": valueFunc,
    "i32": valueFunc,
    "i64": valueFunc,
    "u8": valueFunc,
    "u16": valueFunc,
    "u32": valueFunc,
    "u64": valueFunc,
    "u128": valueFunc,
    "isize": valueFunc,
    "usize": valueFunc,
    "f32": valueFunc,
    "f64": valueFunc,
    "Self": valueFunc,
    "String": valueFunc,
    "default": valueFunc,
    "identifier": valueFunc,
    "float": valueFunc,
    "floate": valueFunc,
    "integer16": valueFunc,
    "integer": valueFunc,
    "integer10": valueFunc,
    "string": valueFunc,
    "true": valueFunc,
    "false": valueFunc,
    "modname": valueFunc,
    "pub": valueFunc,
    "unsafe": valueFunc,
    "self": valueFunc,
    "Fn": valueFunc,
    "FnMut": valueFunc,
    "FnOnce": valueFunc,
    "FnBox": valueFunc,
    "&": valueFunc,
    "mut": valueFunc,
    "!": valueFunc,
    "as": valueFunc,
    "dyn": valueFunc
};
exports.enref = function (type, name, mod, structName) {
    var str = "";
    if (type.name === "Self" || type.name === "self") {
        str += name;
    } else if (type.name.endsWith("FnBox")) {
        str += name;
    } else {
        var full = mod.getFullMod(type.name);
        if (exports.isRef(full)) {
            str += full + "::new(";
            str += exports.enref(type.genType[0], name, mod, structName);
            str += ")";
        } else {
            str += name;
        }
    }
    return str;
};

var RustMod = function () {
    function RustMod(modName, parent) {
        _classCallCheck(this, RustMod);

        this.imports = []; //外部依赖模块
        this.modNote = ""; //模块注释
        //临时变量
        this.impls = [];
        this.funs = [];
        this.modName = modName;
        this.parentMod = parent;
        this.modHash = hash.strHashCode(modName, 0);
        this.mods = new Map();
    }

    _createClass(RustMod, [{
        key: "setCfg",
        value: function setCfg(cfg) {
            this.cfg = cfg;
        }
    }, {
        key: "init",
        value: function init(objects) {
            //设置模块注释
            if (objects[0]) {
                var o = objects[0];
                if (o.sufNotes) {
                    for (var i = 0; i < o.sufNotes.length; i++) {
                        this.modNote += "\n" + o.sufNotes[i];
                    }
                }
            }
            for (var _i2 = 0; _i2 < objects.length; _i2++) {
                if (objects[_i2] instanceof Import) {
                    this.imports.push(objects[_i2]);
                } else if (objects[_i2] instanceof DefStruct || objects[_i2] instanceof DefEnum || objects[_i2] instanceof DefEnumC) {
                    !this.classes && (this.classes = new Map());
                    this.classes.set(objects[_i2].name, objects[_i2]);
                } else if (objects[_i2] instanceof Impl) {
                    !this.impls && (this.impls = []);
                    this.impls.push(objects[_i2]);
                } else if (objects[_i2] instanceof DefFunc) {
                    if (objects[_i2].power === "pub") {
                        !this.funs && (this.funs = []);
                        this.funs.push(objects[_i2]);
                    }
                } else if (objects[_i2] instanceof NewType) {
                    !this.newTypeMap && (this.newTypeMap = new Map());
                    this.newTypeMap.set(objects[_i2].name, objects[_i2]);
                }
            }
        }
        /**将类型转换为全路径， 如： "Vector" -> "pi_math::vector::Vector"
         * @param intoCatch 该类型转换后是否进入缓存
         * @param tree 如果存在tree参数， 表示需要给本库的类型加上库名
        */

    }, {
        key: "getFullMod",
        value: function getFullMod(name) {
            var intoCatch = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
            var tree = arguments[2];

            if (name === "fn" || name === "Fn" || name === "FnMut" || name === "FnOnce" || name === "FnBox") {
                return name;
            }
            if (!exports.isNativeObject(name)) {
                return name;
            }
            !this.typeCache && (this.typeCache = new Map());
            var p = name;
            var f = this.typeCache.get(name);
            if (f) {
                p = f.namespace;
            } else {
                var nickname = "";
                var names = name.split("::");
                var n = names[0];
                if (this.getClass(n)) {
                    var pre = "";
                    if (!this.cfg.default) {
                        pre += (tree.isMain ? "" : tree.creatName + "::") + (this.parentMod ? this.parentMod + "::" : "") + (this.modName ? this.modName + "::" : "");
                    }
                    p = pre + name;
                } else {
                    for (var i = 0; i < this.imports.length; i++) {
                        if (this.imports[i].type === "importOne") {
                            var ps = this.imports[i].path.split("/");
                            if (this.imports[i].contents[0] === n) {
                                //names = names.slice(1, names.length);
                                p = (ps.length > 0 && ps[0] ? ps.join("::") + "::" : "") + names.join("::");
                            }
                        } else {
                            var _ps = this.imports[i].path.split("/");
                            for (var j = 0; j < this.imports[i].contents.length; j++) {
                                if (typeof this.imports[i].contents[j] === "string") {
                                    if (this.imports[i].contents[j] === n) {
                                        p = (_ps.length > 0 && _ps[0] ? _ps.join("::") + "::" : "") + name;
                                        break;
                                    }
                                } else {
                                    if (this.imports[i].contents[j][1] === n) {
                                        var _name = names.length > 1 ? "::" + names.slice(1, names.length).join("::") : "";
                                        nickname = this.imports[i].contents[j][1];
                                        p = (_ps.length > 0 && _ps[0] ? _ps.join("::") + "::" : "") + this.imports[i].contents[j][0] + _name;
                                        break;
                                    }
                                }
                            }
                        }
                    }
                    if (tree) {
                        var pp = p.split("::");
                        if (tree.declarMods.indexOf(pp[0]) > -1) {
                            p = (tree.isMain ? "" : tree.creatName + "::") + p;
                        }
                    }
                }
                if (intoCatch) {
                    var r = { namespace: p, hash: hash.strHashCode(p, 0), nickname: nickname };
                    this.typeCache.set(name, r);
                    this.typeCache.set(p, r);
                }
            }
            if (p.startsWith("std::")) {
                var ss = p.split("::");
                return ss[ss.length - 1];
            }
            return p;
        }
    }, {
        key: "mod",
        value: function mod() {
            return (this.parentMod ? this.parentMod + "::" : "") + this.modName;
        }
    }, {
        key: "isImport",
        value: function isImport(s) {
            var arr = s.split("::");
            for (var i = 0; i < this.imports.length; i++) {
                // if(this.imports[i].type === "importOne"){
                // 	let ps = this.imports[i].path.split("/");
                // 	if(ps[ps.length - 1] === s){
                // 		return true;
                // 	}
                // }else{
                var ps = this.imports[i].path.split("/");
                var j = 0;
                var r = 0;
                if (ps.length > 0 && ps[0]) {
                    for (; j < arr.length; j++) {
                        if (ps[r] === arr[j]) {
                            r++;
                            continue;
                        }
                        if (r === ps.length || ps[j] !== arr[j] && r > 0) {
                            break;
                        }
                    }
                }
                for (var k = 0; k < this.imports[i].contents.length; k++) {
                    if (typeof this.imports[i].contents[k] === "string") {
                        if (this.imports[i].contents[k] === arr[j]) {
                            return true;
                        }
                    } else {
                        if (this.imports[i].contents[k][0] === arr[j]) {
                            return true;
                        }
                    }
                }
                //}
            }
        }
    }, {
        key: "getClass",
        value: function getClass(s) {
            if (this.classes) {
                var r = this.classes.get(s);
                if (r) return r;
            }
            if (this.newTypeMap) {
                var _r = this.newTypeMap.get(s);
                if (_r) return _r;
            }
            if (this.traits) {
                var _r2 = this.traits.get(s);
                if (_r2) return _r2;
            }
            return null;
        }
        //根据配置设置方法的调用方式(同步，异步，阻塞)， 如果是异步或阻塞方法，会分析该方法的回调函数的参数类型

    }, {
        key: "setCallMode",
        value: function setCallMode(fn, cfg, tree, parent) {
            var flag = false;
            var fun = fn.fn;
            if (cfg.async && cfg.async.indexOf(fn.fullPath) > -1) {
                flag = fn.async = true;
            }
            if (cfg.sync && cfg.sync.indexOf(fn.fullPath) > -1) {
                flag = fn.sync = true;
            }
            if (flag) {
                var params = fn.fn.func.params;
                if (!params || params.length < 1) {
                    throw "\u51FD\u6570" + fn.name + "\u4E0D\u542B\u6709\u53C2\u6570\uFF0C \u65E0\u6CD5\u6784\u5EFA\u4E3A\u4E00\u4E2A\u5F02\u6B65\u6216\u963B\u585E\u65B9\u6CD5\uFF01";
                }
                var ct = params[params.length - 1].type; //回调函数类型
                var genType = getGen(fun.genType, ct.name) || parent && getGen(parent.genType, ct.name);
                var callBackFunc = void 0; //回调方法
                if (!ct.genType) {
                    //如果函数类型被定义为一个newtype
                    var name = this.getFullMod(ct.name);
                    var mod = tree.getMod(name.replace("::" + ct.name, "").replace(tree.creatName + "::", ""));
                    var t = mod.newTypeMap.get(ct.name);
                    fn.callBack = t.value;
                } else {
                    fn.callBack = ct;
                }
                var fnValue = exports.deref(fn.callBack, this);
                if (fnValue.name === "limits") {
                    //traitobj, 含有多个特征绑定
                    for (var i = 0; i < fnValue.childs.length; i++) {
                        if (fnValue.childs[i].name === "Fn" || fnValue.childs[i].name === "FnOnce" || fnValue.childs[i].name === "FnMut" || fnValue.childs[i].name === "FnBox") {
                            fnValue = fnValue.childs[i];
                            break;
                        }
                    }
                }
                if (fnValue) {
                    if (fnValue.func.params && fnValue.func.params.length === 1) {
                        var p = fnValue.func.params[0];
                        if (p instanceof KeyType) {
                            fn.callBackPT = exports.newTypeToType(p.type, this, tree);
                        } else {
                            fn.callBackPT = exports.newTypeToType(p, this, tree);
                        }
                    } else if (fnValue.func.params && fnValue.func.params.length > 1) {
                        throw "回调函数的参数只能有一个或0个！";
                    }
                } else {
                    throw "阻塞或异步方法要求函数最后一个参数必须是一个回调函数";
                }
            }
        }
    }]);

    return RustMod;
}();

exports.RustMod = RustMod;

var ModTree = function (_RustMod) {
    _inherits(ModTree, _RustMod);

    /*构造函数
    * @param  creatName 库名
    * @param  lib lib.rs中定义的类型
    * */
    function ModTree(creatName, lib, isMain, isDef) {
        _classCallCheck(this, ModTree);

        var _this = _possibleConstructorReturn(this, (ModTree.__proto__ || Object.getPrototypeOf(ModTree)).call(this, "", ""));

        _this.map = new Map();
        _this.creatName = creatName;
        _this.isMain = isMain;
        _this.isDef = isDef;
        _this.declarMods = [];
        _this.declarCreats = [];
        _this.pubDeclarMods = [];
        for (var i = 0; i < lib.length; i++) {
            if (lib[i] instanceof DeclarCreat) {
                _this.declarCreats.push(lib[i].name);
            } else if (lib[i] instanceof DeclarMod) {
                if (lib[i].power === "pub") {
                    _this.pubDeclarMods.push(lib[i].name);
                }
                _this.declarMods.push(lib[i].name);
            }
        }
        _this.init(lib);
        return _this;
    }

    _createClass(ModTree, [{
        key: "addMod",
        value: function addMod(name, objs) {
            var names = name.split("::");
            var m = this.map;
            var p = "";
            for (var i = 0; i < names.length; i++) {
                var mc = m.get(names[i]);
                if (!mc) {
                    mc = new RustMod(names[i], p);
                    m.set(names[i], mc);
                }
                if (i === names.length - 1) {
                    mc.init(objs);
                }
                m = mc.mods;
            }
        }
    }, {
        key: "getMod",
        value: function getMod(name) {
            if (name === "") {
                return this;
            }
            var names = typeof name === "string" ? name.split("::") : name;
            var map = this.map;
            for (var i = 0; i < names.length; i++) {
                if (i === names.length - 1) {
                    return map.get(names[i]);
                } else {
                    var r = map.get(names[i]);
                    if (r && r.mods) {
                        map = r.mods;
                    } else {
                        //throw "找不到模块：" + name;
                        return null;
                    }
                }
            }
        }
    }, {
        key: "getClass",
        value: function getClass(name) {
            var names = typeof name === "string" ? name.split("::") : name;
            if (names.length == 1) {
                return _get(ModTree.prototype.__proto__ || Object.getPrototypeOf(ModTree.prototype), "getClass", this).call(this, names[0]);
            }
            var mod = this.getMod(names.slice(0, names.length - 1));
            if (!mod) {
                return null;
            }
            return mod.getClass(names[names.length - 1]);
        }
    }, {
        key: "analyze",
        value: function analyze(map) {
            var _this2 = this;

            if (map.size === 0) {
                return;
            }
            map.forEach(function (mod, k) {
                _this2.analyzeMod(mod);
            });
        }
    }, {
        key: "analyzeMod",
        value: function analyzeMod(mod) {
            if (mod.impls) {
                mod.classFunc = new Map();
                for (var i = 0; i < mod.impls.length; i++) {
                    analyzeImpl(mod, mod.impls[i], this);
                }
            }
            if (mod.funs) {
                var funMap = new Map();
                for (var _i3 = 0; _i3 < mod.funs.length; _i3++) {
                    exports.sumFunc(funMap, mod.funs[_i3], mod, this, null, null, null, mod.cfg);
                }
                mod.funMap = funMap;
            }
        }
    }]);

    return ModTree;
}(RustMod);

exports.ModTree = ModTree;
//解析impl
var analyzeImpl = function analyzeImpl(mod, obj, tree) {
    var m = mod.cfg.default ? "" : mod.mod() + "::";
    var path = (tree.isMain ? "" : tree.creatName + "::") + m + exports.typeToString(obj.type) + (obj.trait ? "::" + exports.typeToString(obj.trait) : "");
    if (mod.classes) {
        var c = mod.classes.get(obj.type.name);
        if (c && c.power !== "pub" || !exports.isInclude(path, mod.cfg)) {
            return;
        } else if (c && c.genType && c.genType.length > 0 && !mod.cfg.genType[path]) {
            return;
        } else if (exports.isBase(obj.type) || exports.isArray(obj.type.name) || exports.isTuple(obj.type.name)) {
            //如果是基础类型或数组或元组， 不需要解析
            return;
        }
        if (c && obj.trait && mod.getFullMod(obj.trait.name, true, tree) === "std::ops::Deref") {
            c.deref = obj.funcs[0];
        }
        var genTypeCfgs = obj.genType ? exports.initGenCfg(obj.genType, path, mod.cfg.genType) : exports.initGenCfg(obj.type.genType, path, mod.cfg.genType);
        var name = obj.type.name;
        var funMap = mod.classFunc.get(name);
        var objType = exports.getActType(obj.type, genTypeCfgs);
        if (!funMap) {
            funMap = new Map();
            mod.classFunc.set(name, funMap);
        }
        var funcs = obj.funcs;
        for (var z = 0; z < genTypeCfgs.length; z++) {
            for (var j = 0; j < funcs.length; j++) {
                exports.sumFunc(funMap, funcs[j], mod, tree, obj, path, genTypeCfgs[z], mod.cfg);
            }
        }
    }
};
// export const tansType = (t: Type): string => {
// 	return typeToString(parseType(t));
// }
exports.isInteger = function (type) {
    if (type === "i8" || type === "i16" || type === "i32" || type === "u8" || type === "u16" || type === "u32" || type === "isize" || type === "usize") return true;
};
exports.isBigInt = function (type) {
    if (type === "i64" || type === "u64") {
        return 8;
    } else if (type === "i128" || type === "u128") {
        return 16;
    } else if (type === "i256" || type === "u256") {
        return 32;
    } else {
        return false;
    }
};
// export const isFloat = (type: string) => {
// 	if(type === "f32" || type === "f64" ) return true;
// }
// export const isString = (type: string) => {
// 	if(type === "str" || type === "char" ) return true;
// }
exports.isInclude = function (name, cfg) {
    if (cfg.include) {
        if (cfg.include.indexOf(name) > -1) return true;
    } else {
        if (!cfg.ignore || cfg.ignore.indexOf(name) < 0) return true;
    }
    return false;
};
exports.isNumber = function (type) {
    if (type === "i8" || type === "i16" || type === "i32" || type === "i64" || type === "u8" || type === "u16" || type === "u32" || type === "isize" || type === "usize" || type === "f32" || type === "f64") return true;
};
exports.isStr = function (type) {
    if (type === "str" || type === "char" || type === "String") return true;
};
exports.isBool = function (type) {
    if (type === "bool") return true;
};
exports.isArray = function (type) {
    if (type === "Array") {
        return true;
    } else {
        return false;
    }
};
//是否为引用类型
exports.isRef = function (type) {
    if (type === "std::sync::Arc" || type === "std::rc::Rc" || type === "Box" || type === "std::boxed::Box" || type === "std::cell::RefCell" || type === "std::sync::RwLock" || type === "std::sync::Mutex" || type === "std::cell::Cell" || type === "Arc" || type === "Rc" || type === "RefCell" || type === "RwLock" || type === "Mutex" || type === "Cell") {
        return true;
    }
};
//如果为引用类型, 对其进行解引用
exports.deref = function (type, mod, structName) {
    if (type.name === "Self" || type.name === "self") {
        var t = new Type();
        t.name = structName;
        return t;
    }
    if (exports.isRef(mod.getFullMod(type.name))) {
        return exports.deref(type.genType[0], mod, structName);
    } else {
        return type;
    }
};
exports.isArrayBuffer = function (type) {
    // if(type.name === "Vec" && type.genType && type.genType[0].name === "u8"){
    // 	return true;
    // }else 
    if (type.name === "Array" || type.type.name === "u8") {
        return true;
    } else {
        return false;
    }
};
exports.isTuple = function (type) {
    if (type === "Tuple") {
        return true;
    } else {
        return false;
    }
};
//是否为c枚举
exports.isEnumC = function (type, mod, tree) {
    var arr = type.split("::");
    var last = arr[arr.length - 1];
    if (mod.classes) {
        var r = mod.classes.get(last);
        if (r && r instanceof DefEnumC) {
            // let mod_name = type.slice(0, type.length - last.length - 2);
            // for(let i = 0; i < r.members.length; i++){
            //     if tree.getMod(mod_name)
            // }
            return r;
        }
    }
    return false;
};
exports.isNativeObject = function (type) {
    if (!exports.isNumber(type) && !exports.isStr(type) && !exports.isBool(type) && !exports.isArray(type) && !exports.isTuple(type) && !exports.isBigInt(type)) return true;
};
exports.isBase = function (type) {
    if (!exports.isNumber(type.name) && !exports.isStr(type.name) && !exports.isBool(type.name)) return false;else return true;
};
//检查数组中是否存在NativeObject
exports.arrHasNObj = function (type) {
    var t = void 0;
    // if (type.name === "Vec"){
    //     t = type.genType[0];
    // }else{
    t = type.type;
    //}
    if (exports.isArray(t.name)) {
        return exports.arrHasNObj(t);
    } else if (exports.isTuple(t.name)) {
        return exports.tupleHasNObj(t);
    } else if (!exports.isBase(t)) {
        // 是NativeObject
        return true;
    }
};
//检查元组中是否存在NativeObject
exports.tupleHasNObj = function (type) {
    for (var i = 0; i < type.childs.length; i++) {
        var t = type.childs[i];
        if (exports.isArray(t.name) /* || t.name === "Vec"*/) {
                return exports.arrHasNObj(t);
            } else if (exports.isTuple(t.name)) {
            return exports.tupleHasNObj(t);
        } else if (!exports.isBase(t)) {
            // 是NativeObject
            return true;
        }
    }
};
//合并泛型
exports.mergeGenType = function (cfg1, cfg2) {
    var o = {};
    for (var k in cfg1) {
        o[k] = cfg1[k];
    }
    for (var _k in cfg2) {
        if (!o[_k]) {
            o[_k] = cfg2[_k];
        }
    }
    return o;
};
//对照rust定义的泛型和配置的泛型是否匹配， 得出需要实现的泛型数组
exports.getGenType = function (genTypes, genTypeCfg) {
    if (!genTypes || genTypes.length === 0) {
        //如果泛型为定义
        return [{ "": "" }];
    }
    if (!genTypeCfg) {
        //如果泛型未配置
        return [];
    }
    var arr = [];
    for (var i = 0; i < genTypeCfg.length; i++) {
        if (typeof genTypeCfg[i] === "string") {
            //如果配置中的泛型是一个字符串，表示泛型只有一个，将其转换成数组再与定义的泛型个数比较
            genTypeCfg[i] = [genTypeCfg[i]];
        }
        if (genTypes.length != genTypeCfg[i].length) {
            //泛型个数不相等，抛出异常
            var gen1 = genTypeCfg[i].join(",");
            var gen2 = "";
            for (var j = 0; j < genTypes.length; i++) {
                if (j > 0) {
                    gen2 += ",";
                }
                gen2 += genTypes[j].name;
            }
            throw "You want to implement generic " + gen1 + ", in fact he is " + gen2;
        }
        var map = {};
        for (var _j = 0; _j < genTypes.length; _j++) {
            var name = genTypes[_j].name ? genTypes[_j].name : genTypes[_j].type.name;
            map[name] = genTypeCfg[i][_j];
        }
        arr.push(map);
    }
    return arr;
};
// export const isParamSelf = (type: Type) => {
// 	if(type instanceof self) return true;
// }
exports.mut = function (type) {
    if (type.isMut) {
        return "mut";
    } else {
        return "";
    }
};
exports.quote = function (type) {
    if (type.isQuote) {
        return "&";
    } else {
        return "";
    }
};
exports.getActType = function (type, genType) {
    if (!type) {
        return;
    }
    if (genType && genType[type.name]) {
        var _t = genType[type.name].clone();
        _t.isQuote = type.isQuote;
        return _t;
    }
    var t = type.clone();
    if (t.type) {
        t.type = exports.getActType(t.type, genType);
    }
    if (t.childs) {
        var childs = t.childs;
        t.childs = [];
        for (var i = 0; i < childs.length; i++) {
            t.childs[i] = exports.getActType(childs[i], genType);
        }
    }
    if (t.genType) {
        var gens = t.genType;
        t.genType = [];
        for (var _i4 = 0; _i4 < gens.length; _i4++) {
            t.genType[_i4] = exports.getActType(gens[_i4], genType);
        }
    }
    return t;
};
exports.typeToString = function (type, isAll, struct, r) {
    var tranself = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
    var tree = arguments[5];

    var str = "";
    if (isAll) {
        str += exports.quote(type);
        str += exports.mut(type);
    }
    if (type.name === "Array") {
        str += "[";
        str += exports.typeToString(type.type, true, struct, r, tranself, tree);
        if (type.len) {
            str += "," + type.len;
        }
        str += "]";
    } else if (type.name === "Tuple") {
        str += "(";
        for (var i = 0; i < type.childs.length; i++) {
            if (i > 0) {
                str += ",";
            }
            str += exports.typeToString(type.childs[i], true, struct, r, tranself, tree);
        }
        str += ")";
    } else if (type.name === "self" || type.name === "Self") {
        if (tranself) {
            if (!struct) {
                throw "类型self无法转换成对应类型";
            }
            return struct;
        } else {
            return type.name;
        }
    } else if (type.name === "*") {
        var mc = type.isMut ? "mut" : "const";
        return "*" + mc + " " + exports.typeToString(type.type, true, struct, r, true, tree);
    } else {
        var t = r ? r.getFullMod(type.name, true, tree) : type.name;
        if (tree && tree.isDef && t.startsWith(tree.creatName)) {
            var start = t.lastIndexOf("::") === -1 ? 0 : t.lastIndexOf("::") + 2;
            t = t.slice(start, t.length);
        }
        str += t;
        if (type.genType && type.genType.length > 0) {
            str += exports.genTypeToString(type.genType, r, tree);
        }
    }
    return str;
};
//如果一个类型是一个NewType, 将会被替换成真正的类型, 如果不是全路径， 也将转换类型的全路径
exports.newTypeToType = function (type, mod, tree, useOld /*是否使用传入类型作为返回值*/) {
    if (!type) {
        return;
    }
    var t = useOld ? type : type.clone();
    if (type.type || type.genType || type.childs) {
        var genType = type.genType,
            tt = type.type,
            childs = type.childs;
        tt && exports.newTypeToType(tt, mod, tree, useOld);
        if (genType) {
            t.genType = [];
            for (var i = 0; i < genType.length; i++) {
                t.genType.push(exports.newTypeToType(genType[i], mod, tree, useOld));
            }
        }
        if (childs) {
            t.childs = [];
            for (var _i5 = 0; _i5 < childs.length; _i5++) {
                t.childs.push(exports.newTypeToType(childs[_i5], mod, tree, useOld));
            }
        }
    }
    var namefull = void 0,
        name = void 0;
    if (!tree.isDef) {
        namefull = mod.getFullMod(type.name, true, tree);
        var start = namefull.lastIndexOf("::") === -1 ? 0 : namefull.lastIndexOf("::") + 2;
        name = namefull.slice(start, namefull.length); //取到名字
    } else {
        namefull = name = type.name;
    }
    t.name = namefull;
    var modname = namefull.lastIndexOf("::") === -1 ? "" : namefull.replace("::" + name, "").replace(tree.creatName + "::", "");
    var m = tree.getMod(modname);
    if (!m) {
        return t;
    }
    if (m.newTypeMap) {
        var newType = m.newTypeMap.get(name);
        if (newType) {
            var value = newType.value;
            var newt = exports.newTypeToType(value, mod, tree, false);
            if (newType.genType) {
                for (var _i6 = 0; _i6 < newType.genType.length; _i6++) {
                    for (var j = 0; j < newt.genType.length; j++) {
                        if (newType.genType[_i6].name === newt.genType[j].name) {
                            newt.genType[j] = t.genType[_i6];
                        }
                    }
                }
            }
            return newt;
        } else {
            return t;
        }
    } else {
        return t;
    }
};
//将一个genType还原为字符串
exports.genTypeToString = function (types, r, tree) {
    var arr = exports.genTypes(types, r, tree);
    var str = "<" + arr.join(",") + ">";
    return str;
};
exports.genTypes = function (types, r, tree) {
    var strs = [];
    for (var i = 0; i < types.length; i++) {
        var t = types[i];
        if (!t.name && t.type) {
            strs.push(exports.typeToString(types[i].type, true, null, r, false, tree));
        } else {
            strs.push(exports.typeToString(types[i], true, null, r, false, tree));
        }
    }
    return strs;
};
exports.fnGenTypes = function (uses, genCfg, r, tree) {
    var strs = [];
    for (var i = 0; i < uses.length; i++) {
        strs.push(r.getFullMod(exports.typeToString(genCfg[uses[i]], false, null, r, false, tree)));
    }
    return strs;
};
exports.useGen = function (params, result, gens) {
    var arr = [];
    if (params && params.length > 0) {
        for (var i = 0; i < params.length; i++) {
            if (params[i].name != "self") {
                var s = gontainType(gens, params[i].type, arr);
                //s && arr.indexOf(s) < 0 && arr.push(s);
            }
        }
    }
    if (result) {
        var _s = gontainType(gens, result, arr);
        //s && arr.indexOf(s) < 0 && arr.push(s);
    }
    return arr;
};
//
exports.allGens = function (fn, impl) {
    var arr = [];
    fn.genType && (arr = arr.concat(exports.genTypes(fn.genType)));
    if (impl) {
        if (impl.genType) {
            arr = arr.concat(exports.genTypes(impl.genType));
        } else if (impl.type.genType) {
            for (var i = 0; i < impl.type.genType.length; i++) {
                arr.push(impl.type.genType[i].name);
            }
        }
    }
    return arr;
};
//泛型包含某个类型
var gontainType = function gontainType(gens, type, arr) {
    var index = gens.indexOf(type.name);
    if (gens.indexOf(type.name) > -1) {
        if (arr.indexOf(gens[index]) < 0) {
            arr.push(gens[index]);
        }
    } else if (type.genType) {
        for (var i = 0; i < type.genType.length; i++) {
            gontainType(gens, type.genType[i], arr);
        }
    } else if (type.type) {
        gontainType(gens, type.type, arr);
    } else if (type.childs) {
        for (var _i7 = 0; _i7 < type.childs.length; _i7++) {
            gontainType(gens, type.childs[_i7], arr);
        }
    }
};
//计算方法的hash值， 规则 fnHash.nextHash(traitHash).nexHash(gen)
exports.funHash = function (modHash, fnNameStr, traitStr, gens) {
    var h = modHash;
    h = hash.strHashCode(fnNameStr, h);
    if (traitStr) {
        h = hash.strHashCode(traitStr, h);
    }
    if (gens) {
        for (var i = 0; i < gens.length; i++) {
            h = hash.strHashCode(gens[i], h);
        }
    }
    return h;
};

var GenRustContex = function GenRustContex(outMode) {
    _classCallCheck(this, GenRustContex);

    this.typeCache = new Map();
    this.registerObjMap = new Map();
    this.stds = new Map();
    this.usesOther = new Map();
    this.outMode = outMode;
};

exports.GenRustContex = GenRustContex;

var GenFun = function GenFun() {
    _classCallCheck(this, GenFun);
};

exports.GenFun = GenFun;
var getGen = function getGen(genTypes, name) {
    if (genTypes) {
        for (var i = 0; i < genTypes.length; i++) {
            if (genTypes[i].name === name) {
                return genTypes[i];
            }
        }
    }
};
/**
 * 函数命名规则: 函数名 + 特征名 + 函数泛型
 * */
exports.sumFunc = function (funcMap, fn, mod, tree, impl, pMod, parentCfg, cfg) {
    var path = void 0;
    var fType = new Type();
    fType.name = fn.name;
    fType.genType = fn.genType;
    if (tree.isDef) {}
    if (impl) {
        path = pMod + "::" + exports.typeToString(fType);
    } else {
        path = (tree.isMain ? "" : tree.creatName + "::") + mod.mod() + "::" + exports.typeToString(fType);
    }
    if (!impl && fn.power !== "pub") {
        return;
    } else if (impl && !impl.trait && fn.power !== "pub") {
        return;
    } else if (!exports.isInclude(path, cfg)) {
        return;
    } else if (fn.genType && !cfg.genType[path]) {
        return;
    }
    var genTypeCfgs = exports.initGenCfg(fn.genType, path, cfg.genType);
    var result = fn.func.result;
    var params = fn.func.params;
    var gens = exports.allGens(fn, impl ? impl : null);
    var fnName = fn.name,
        trait = void 0,
        type = void 0;
    if (impl) {
        trait = impl.trait, type = impl.type;
        trait && (fnName += "_" + trait.name);
    }
    for (var j = 0; j < genTypeCfgs.length; j++) {
        var g = exports.mergeGenType(parentCfg, genTypeCfgs[j]);
        var usegens = exports.useGen(params, result, gens);
        var fnGenType = exports.fnGenTypes(usegens, g, mod, tree);
        var gn = exports.fnGenName(fnGenType);
        var name = fnName;
        gn && (name += "_" + gn);
        var fun = funcMap.get(name);
        if (fun) {
            continue;
        }
        fun = new GenFun();
        funcMap.set(name, fun);
        fun.fn = fn;
        //fun.genTypeCfg = g;
        fun.name = name;
        if (impl) {
            fun.structName = impl.type.name;
            var t = exports.getActType(impl.type, parentCfg);
            fun.structStr = exports.typeToString(t, false, null, mod, false, tree);
            fun.implGenStr = t.genType ? exports.genTypeToString(t.genType, mod, tree) : "";
            trait && (fun.traitName = mod.getFullMod(trait.name, false, tree));
        }
        fun.hash = exports.funHash(mod.modHash, fn.name + (fun.structName ? fun.structName : ""), trait ? trait.name : "", fnGenType);
        fun.fullPath = (fun.structName ? fun.structName + "::" : "") + exports.typeToString(fType);
        var r = exports.analyzeParam(params, g, mod, tree);
        fun.params = r[0];
        fun.hasJs = r[1];
        if (fun.hasJs) {
            fn.func.params = params.slice(0, params.length - 1);
        }
        fun.result = exports.newTypeToType(exports.getActType(result, g), mod, tree, true);
        if (fn.genType) {
            var gs = [];
            for (var k = 0; k < fn.genType.length; k++) {
                gs[k] = exports.getActType(gs[k], g);
            }
            fun.genType = gs;
        }
        mod.setCallMode(fun, cfg, tree, impl);
    }
};
//解析参数（替换参数中的泛型）
exports.analyzeParam = function (params, genTypeCfg, mod, tree) {
    if (!params) {
        return [null, false];
    }
    var r = [];
    var hasJs = false;
    for (var i = 0; i < params.length; i++) {
        var p = params[i];
        if (p instanceof KeyType) {
            var pNew = exports.getActType(p.type, genTypeCfg);
            pNew = exports.newTypeToType(pNew, mod, tree, true);
            var nn = exports.deref(pNew, mod, "");
            if (i === params.length - 1 && nn.name === "pi_vm::adapter::JS") {
                hasJs = true;
                continue;
            }
            r.push({ name: p.name, type: pNew });
        } else if (p.name === "self") {
            r.push(p);
        } else {
            //p instanceof Type
            r.push(exports.newTypeToType(exports.getActType(p, genTypeCfg), mod, tree, true));
        }
    }
    return [r, hasJs];
};
exports.fnGenName = function (gens) {
    //let uses = useGen(params, result, gens);
    var strs = [];
    for (var i = 0; i < gens.length; i++) {
        var s = gens[i];
        var li = s.indexOf("<");
        if (li > -1) {
            s = s.slice(0, li);
        }
        li = s.lastIndexOf("::");
        if (li > -1) {
            s = s.slice(li + 2, s.length);
        }
        strs.push(s);
    }
    return strs.join("_");
};
exports.initGenCfg = function (genType, path, cfg) {
    if (!genType || genType.length === 0) {
        return [{ "": "" }];
    }
    var genTypeCfgs = cfg[path];
    if (!genTypeCfgs) {
        return [{ "": "" }];
    }
    return exports.getGenType(genType, genTypeCfgs);
};
// export const isBool = (type: string) => {
// 	if(type === "bool") return true;
// }
// export const isStruct = (type: string) => {
// 	if(!isNumber(type) && !isString(type) && type !== "bool" && type !== "Array"&& type !== "Map" && type !== "Tuple") return true;
// }

var Type = function () {
    function Type() {
        _classCallCheck(this, Type);
    }

    _createClass(Type, [{
        key: "clone",
        value: function clone() {
            var t = new Type();
            t.name = this.name;
            t.genType = this.genType;
            t.traitBound = this.traitBound;
            t.isMut = this.isMut;
            t.isQuote = this.isQuote;
            t.lifeTime = this.lifeTime;
            t.childs = this.childs;
            t.childs = this.childs;
            t.type = this.type;
            t.len = this.len;
            return t;
        }
    }]);

    return Type;
}();

exports.Type = Type;
//库

var DeclarCreat = function DeclarCreat() {
    _classCallCheck(this, DeclarCreat);
};

exports.DeclarCreat = DeclarCreat;
//模块

var DeclarMod = function DeclarMod() {
    _classCallCheck(this, DeclarMod);
};

exports.DeclarMod = DeclarMod;
//关联类型

var AssocType = function AssocType() {
    _classCallCheck(this, AssocType);
};

exports.AssocType = AssocType;

var NewType = function NewType() {
    _classCallCheck(this, NewType);
};

exports.NewType = NewType;

var FnTrait = function () {
    function FnTrait() {
        _classCallCheck(this, FnTrait);
    }

    _createClass(FnTrait, [{
        key: "clone",
        value: function clone() {
            var f = new FnTrait();
            f.name = this.name;
            f.func = new Func();
            if (this.func.params) {
                f.func.params = [];
                for (var i = 0; i < this.func.params.length; i++) {
                    f.func.params[i] = this.func.params[i].clone();
                }
            }
            if (this.func.result) {
                f.func.result = this.func.result.clone();
            }
            return f;
        }
    }]);

    return FnTrait;
}();

exports.FnTrait = FnTrait;

var Func = function Func() {
    _classCallCheck(this, Func);
};

exports.Func = Func;

var Note = function Note() {
    _classCallCheck(this, Note);
};

exports.Note = Note;

var Def = function (_Note) {
    _inherits(Def, _Note);

    function Def() {
        _classCallCheck(this, Def);

        return _possibleConstructorReturn(this, (Def.__proto__ || Object.getPrototypeOf(Def)).apply(this, arguments));
    }

    return Def;
}(Note);

exports.Def = Def;

var DefStruct = function (_Def) {
    _inherits(DefStruct, _Def);

    function DefStruct() {
        _classCallCheck(this, DefStruct);

        return _possibleConstructorReturn(this, (DefStruct.__proto__ || Object.getPrototypeOf(DefStruct)).apply(this, arguments));
    }

    return DefStruct;
}(Def);

exports.DefStruct = DefStruct;

var DefConst = function (_Def2) {
    _inherits(DefConst, _Def2);

    function DefConst() {
        _classCallCheck(this, DefConst);

        return _possibleConstructorReturn(this, (DefConst.__proto__ || Object.getPrototypeOf(DefConst)).apply(this, arguments));
    }

    return DefConst;
}(Def);

exports.DefConst = DefConst;

var DefEnumC = function (_Def3) {
    _inherits(DefEnumC, _Def3);

    function DefEnumC() {
        _classCallCheck(this, DefEnumC);

        return _possibleConstructorReturn(this, (DefEnumC.__proto__ || Object.getPrototypeOf(DefEnumC)).apply(this, arguments));
    }

    return DefEnumC;
}(Def);

exports.DefEnumC = DefEnumC;

var DefEnum = function (_Def4) {
    _inherits(DefEnum, _Def4);

    function DefEnum() {
        _classCallCheck(this, DefEnum);

        return _possibleConstructorReturn(this, (DefEnum.__proto__ || Object.getPrototypeOf(DefEnum)).apply(this, arguments));
    }

    return DefEnum;
}(Def);

exports.DefEnum = DefEnum;

var DefFunc = function (_Def5) {
    _inherits(DefFunc, _Def5);

    function DefFunc() {
        _classCallCheck(this, DefFunc);

        return _possibleConstructorReturn(this, (DefFunc.__proto__ || Object.getPrototypeOf(DefFunc)).apply(this, arguments));
    }

    return DefFunc;
}(Def);

exports.DefFunc = DefFunc;

var Import = function (_Note2) {
    _inherits(Import, _Note2);

    function Import() {
        _classCallCheck(this, Import);

        return _possibleConstructorReturn(this, (Import.__proto__ || Object.getPrototypeOf(Import)).apply(this, arguments));
    }

    return Import;
}(Note);

exports.Import = Import;

var Member = function Member() {
    _classCallCheck(this, Member);
};

exports.Member = Member;

var KeyType = function (_Note3) {
    _inherits(KeyType, _Note3);

    function KeyType() {
        _classCallCheck(this, KeyType);

        return _possibleConstructorReturn(this, (KeyType.__proto__ || Object.getPrototypeOf(KeyType)).apply(this, arguments));
    }

    _createClass(KeyType, [{
        key: "clone",
        value: function clone() {
            var kv = new KeyType();
            kv.name = this.name;
            kv.type = this.type.clone();
            kv.isMut = this.isMut;
            return kv;
        }
    }]);

    return KeyType;
}(Note);

exports.KeyType = KeyType;

var KeyValue = function (_Note4) {
    _inherits(KeyValue, _Note4);

    function KeyValue() {
        _classCallCheck(this, KeyValue);

        return _possibleConstructorReturn(this, (KeyValue.__proto__ || Object.getPrototypeOf(KeyValue)).apply(this, arguments));
    }

    return KeyValue;
}(Note);

exports.KeyValue = KeyValue;

var Impl = function (_Def6) {
    _inherits(Impl, _Def6);

    function Impl() {
        _classCallCheck(this, Impl);

        return _possibleConstructorReturn(this, (Impl.__proto__ || Object.getPrototypeOf(Impl)).apply(this, arguments));
    }

    return Impl;
}(Def);

exports.Impl = Impl;
// export const restoreType = (t: Type): string => {
// 	return typeToString(parseType(t));
// }
// export const typeToString = (tg: TG): string => {
// 	if(tg.type === "Tuple"){
// 		return "[" + tg.genType.join(",") + "]";
// 	}
// 	let type;
// 	if(isNumber(tg.type)){
// 		type = "number";
// 	}else if(isString(tg.type)){
// 		type = "string";
// 	}else if(tg.type === "bool"){
// 		type = "boolean";
// 	}else{
// 		type = tg.type;
// 	}
// 	if(!tg.genType)
// 		return type;
// 	let str;			
// 	if(tg.genType){
// 		str += type + "<" + tg.genType.join(",") + ">";
// 	}
// 	return str;
// }
// export const parseType = (t: Type): TG => {
// 	let type : TG = {type: t.type};
// 	if(!t.genType){
// 		return type;
// 	}
// 	type.genType = [];
// 	for(let i = 0; i < t.genType.length; i++){
// 		type.genType.push(typeToString(parseType(t.genType[i])));
// 	}
// 	return type;
// }
var createWBStr = function createWBStr(type, key) {
    if (type.name === "f32") {
        return "bb.writeF32(this." + key + ");";
    } else if (type.name === "f64") {
        return "bb.writeF64(this." + key + ");";
    } else if (exports.isInteger(type.name)) {
        return "bb.writeInt(this." + key + ");";
    } else if (exports.isStr(type.name)) {
        return "bb.writeUtf8(this." + key + ");";
    } else if (type.name === "bool") {
        return "bb.writeBool(this." + key + ");";
    }
};
/**
 * @description  返回定义的函数, 用定义字符串，转成匿名函数的返回函数
 * @example
 */
exports.toFunc = function (s) {
    try {
        return new Function("_stringify", "_tsTypeStr", "_typeToString", "_isNativeObject", "_isInteger", "_isString", "_createWBStr", "_isBase", "_strHashCode", "_upperFirst", "return " + s)(tpl_1.toString, tsTypeStr, exports.typeToString, exports.isNativeObject, exports.isInteger, exports.isStr, createWBStr, exports.isBase, hash.strHashCode, util_1.upperFirst);
    } catch (e) {
        //warn(level, "tpl toFun, path: "+", s: ", s, e);
        throw e;
    }
};
function tsTypeStr(type, mod, structName) {
    if (exports.isNumber(type.name)) {
        return "number";
    } else if (exports.isBigInt(type.name)) {
        return "bigInt.BigInteger";
    } else if (exports.isStr(type.name)) {
        return "string";
    } else if (exports.isArray(type.name)) {
        return "Array<" + tsTypeStr(type.type, mod, structName) + ">";
    } else if (exports.isBool(type.name)) {
        return "boolean";
    } else if (exports.isTuple(type.name)) {
        var elems = [];
        for (var i = 0; i < type.childs.length; i++) {
            elems.push(tsTypeStr(type.childs[i], mod, structName));
        }
        return "[" + elems.join(",") + "]";
    } else if (mod && exports.isRef(mod.getFullMod(type.name))) {
        return tsTypeStr(exports.deref(type, mod, structName), mod, structName);
    } else if (type.name === "*") {//指针类型
    } else if (exports.isNativeObject(type.name)) {
        return type.name;
    } else {
        throw "无法处理泛型类型：" + type.name;
    }
}
exports.typeStr = tsTypeStr;
})