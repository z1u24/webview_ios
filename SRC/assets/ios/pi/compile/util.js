_$define("pi/compile/util", function (require, exports, module){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var pathMode = require("path");
var os = require("os");
exports.resolve = function (path) {
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
exports.parsePath = function (selfPath, dstPath) {
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
exports.relativePath = function (root, path) {
    var p = void 0;
    if (os.platform() == "linux") {
        root = root.replace(/\\/ig, "/");
        root = root.replace(/\\/ig, "/");
        p = pathMode.relative(root, path);
    } else {
        p = pathMode.relative(pathMode.resolve(root), path);
    }
    p = p.replace(/\\/ig, "/");
    return p;
};
})