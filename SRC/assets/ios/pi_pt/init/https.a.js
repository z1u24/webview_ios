_$define("pi_pt/init/https.a", function (require, exports, module){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * https服务初始化
 */
var server_cfg_s_1 = require("./server_cfg.s");
var cfg_1 = require("../../pi/util/cfg");
var https_impl_1 = require("../rust/https/https_impl");
var mount_1 = require("../rust/https/mount");
var file_1 = require("../rust/https/file");
var files_1 = require("../rust/https/files");
var upload_1 = require("../rust/https/upload");
var atom_1 = require("../rust/atom");
var initHttps = function initHttps() {
    var httpsCfgs = cfg_1.cfgMgr.get(server_cfg_s_1.HttpsCfg._$info.name);
    if (httpsCfgs) {
        httpsCfgs.forEach(function (r, _k) {
            var mount = mount_1.Mount.new();
            var staticFile = file_1.StaticFile.newString(r.root);
            var staticFileBatch = files_1.StaticFileBatch.newString(r.root);
            addGenHead(staticFile, r.gen_head);
            addGenHead(staticFileBatch, r.gen_head);
            mount.mountStaticFile("/", staticFile);
            mount.mountStaticFileBatch("/files", staticFileBatch);
            if (r.uploadRoot) {
                mount.mountFileUpload("/upload", upload_1.FileUpload.newString(r.uploadRoot));
            }
            https_impl_1.startHttpMount(mount, atom_1.Atom.fromFrom(r.ip), r.port, r.keep_alive_timeout, r.handle_timeout);
        });
    }
    var httpsTlsCfgs = cfg_1.cfgMgr.get(server_cfg_s_1.HttpsTlsCfg._$info.name);
    if (httpsTlsCfgs) {
        httpsTlsCfgs.forEach(function (r, _k) {
            var mount = mount_1.Mount.new();
            var staticFile = file_1.StaticFile.newString(r.root);
            var staticFileBatch = files_1.StaticFileBatch.newString(r.root);
            addGenHead(staticFile, r.gen_head);
            addGenHead(staticFileBatch, r.gen_head);
            mount.mountStaticFile("/", staticFile);
            mount.mountStaticFileBatch("/files", staticFileBatch);
            if (r.uploadRoot) {
                mount.mountFileUpload("/upload", upload_1.FileUpload.newString(r.uploadRoot));
            }
            https_impl_1.startHttpsMount(mount, atom_1.Atom.fromFrom(r.ip), r.port, r.keep_alive_timeout, r.handle_timeout, atom_1.Atom.fromFrom(r.certPath), atom_1.Atom.fromFrom(r.keyPath));
        });
    }
};
var addGenHead = function addGenHead(f, map) {
    if (map) {
        map.forEach(function (v, k) {
            f.addGenRespHeader(k, v);
        });
    }
};
initHttps();
})