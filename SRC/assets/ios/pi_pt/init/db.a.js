_$define("pi_pt/init/db.a", function (require, exports, module){
"use strict";
/**
 * 数据库初始化
 * 根据DbCfg配置，创建数据库
 * DbCfg:{
 *      name: string, //为数据库取一个名称
 *      dbType: DbType //数据库的类型， 支持文件数据库和内存数据库， 如果是文件数据库需要一个path(文件库的路径)
 * }
 *
 * 根据struct上的注解，初始化数据库表
 * 在struct添加"db"注解， 表示该类型的实例会存入数据库， 会自动初始化数据的表
 * 注解规则 :  #[db=数据库名称]
 *
 * 例如： 在.c.ts文件中设置了一个配置：
 *         new DbCfg("db1", new DbType(DbType.Memory)) //该配置表明需要注册一个内存数据库， 数据库名称为“db1”
 *
 * 在.rs中定义结构体：
 *         //在结构体中添加“db”注解， 表示数据库“db1”中需要创建Player的表
 *         #[db=db1]
 *         struct Player{}
 *
 * 该模块将配置与注解结合起来， 使得数据库及数据库表的创建自动化
 */

Object.defineProperty(exports, "__esModule", { value: true });
var server_cfg_s_1 = require("./server_cfg.s");
var init_1 = require("./init");
var js_db_1 = require("../rust/pi_serv/js_db");
var db_1 = require("../db");
var memery_db_1 = require("../rust/pi_db/memery_db");
var struct_mgr_1 = require("../../pi/struct/struct_mgr");
var sinfo_1 = require("../../pi/struct/sinfo");
var cfg_1 = require("../../pi/util/cfg");
var constant_1 = require("../constant");
var constant_2 = require("../constant");
var dbMgr = init_1.getEnv().getDbMgr();
var initDb = function initDb() {
    // 创建session库
    js_db_1.registerMemeryDb(dbMgr, constant_2.SESSION_WARE, memery_db_1.DB.new());
    //默认创建文件数据库
    js_db_1.registerMemeryDb(dbMgr, constant_1.DEFAULT_FILE_WARE, memery_db_1.DB.new());
    // Lmdb
    // registerFileDb(dbMgr, LMDB_WARE, Lmdb.new(Atom.fromFrom("lmdb"), 1024*1024*100));
    //取到数据库服务配置
    var cfgs = cfg_1.cfgMgr.getPrimary(server_cfg_s_1.DbCfg._$info.name, "name");
    if (cfgs) {
        //遍历配置，注册对应的数据库
        cfgs.forEach(function (v, k) {
            if (k === constant_1.DEFAULT_FILE_WARE || k === constant_1.DEFAULT_WARE) {
                throw new Error(k + " is a default db, is not create");
            }
            js_db_1.registerMemeryDb(dbMgr, k, memery_db_1.DB.new());
        });
    }
    //遍历所有的Struct， 根据注解创建数据库表
    db_1.write(dbMgr, function (tr) {
        for (var id in pi_modules) {
            if (!pi_modules.hasOwnProperty(id) || !pi_modules[id].exports) {
                continue;
            }
            for (var kk in pi_modules[id].exports) {
                var c = pi_modules[id].exports[kk];
                if (!struct_mgr_1.Struct.isPrototypeOf(c) || !c._$info) {
                    continue;
                }
                var notes = c._$info.notes || new Map();
                var dbName = notes.get("db") || constant_1.DEFAULT_WARE; //如果没有“db注解”， 使用默认的数据库
                var key_type = void 0,
                    value_type = void 0;
                //key 元信息根据主键确定
                var primary = notes.get("primary");
                if (primary) {
                    key_type = getFieldType(primary, c._$info.fields); //如果存在主键， 数据库表的key类型为主键的类型
                } else {
                    key_type = new sinfo_1.EnumType(sinfo_1.Type.Usize); //否则为索引的类型
                }
                //value 元信息根据_$info确定
                if (c._$info instanceof sinfo_1.StructInfo) {
                    value_type = new sinfo_1.EnumType(sinfo_1.Type.Struct, c._$info);
                } else if (c._$info instanceof sinfo_1.EnumInfo) {
                    value_type = new sinfo_1.EnumType(sinfo_1.Type.Enum, c._$info);
                }
                //初始化是根据Struct创建数据库表
                db_1.alter(tr, dbName, c._$info.name, new sinfo_1.TabMeta(key_type, value_type));
            }
        }
    });
    //写配置数据
    writeCfg();
    //数据库恢复， 临时方案
    restore_temp(cfgs);
};
var getFieldType = function getFieldType(name, fields) {
    for (var i = 0; i < fields.length; i++) {
        if (fields[i].name === name) {
            return fields[i].ftype;
        }
    }
    throw new Error("field is not exist, name: " + name);
};
/**
 * 恢复数据库
 * 由于底层的文件数据库不完备， 暂时使用内存数据代替文件数据库使用， 每次数据库的改变将会备份到文件中， 当重新启动平台是需要从文件中恢复到内存数据库
 * 此方法就是启动过程中数据库的恢复
 * */
var restore_temp = function restore_temp(cfgs) {
    //临时方案， 恢复数据库
    for (var id in pi_modules) {
        if (!pi_modules.hasOwnProperty(id) || !pi_modules[id].exports) {
            continue;
        }
        for (var kk in pi_modules[id].exports) {
            var c = pi_modules[id].exports[kk];
            if (!struct_mgr_1.Struct.isPrototypeOf(c) || !c._$info || !c._$info.notes) {
                continue;
            }
            var tab = c._$info.name;
            var ware = c._$info.notes.get("db");
            //let cfg = cfgs.get(ware);
            var path = "./dump/" + constant_1.DEFAULT_FILE_WARE + "/" + tab;
            if (ware === constant_1.DEFAULT_FILE_WARE) {
                //判断是文件数据库
                console.log("restore----------------------------------", path);
                try {
                    js_db_1.restore(dbMgr, ware, tab, path);
                } catch (error) {
                    console.log(error);
                }
            }
        }
    }
};
var writeCfg = function writeCfg() {
    var items = [];
    cfg_1.cfgMgr.map.forEach(function (tab, k) {
        if (k.indexOf("#") < 0) {
            //如果不是一个主键表， 但类型中存在主键，则不处理该数据
            var first = tab.get(0);
            if (!first) {
                return; //没有数据直接返回
            }
            var primary = void 0;
            first._$getSinfo().notes && (primary = first._$getSinfo().notes.get("primary"));
            if (primary) {
                return;
            }
        }
        tab.forEach(function (value, key) {
            var ware = void 0;
            value._$getSinfo().notes && (ware = value._$getSinfo().notes.get("db") || constant_1.DEFAULT_WARE);
            if (!ware) {
                throw "cfg type: " + value._$getSinfo().name + " not note 'db'"; //如果配置没有db注解， 将抛出异常
            }
            items.push({ ware: ware, tab: value._$getSinfo().name, key: key, value: value });
        });
    });
    var t1 = new Date().getTime();
    if (items.length > 0) {
        db_1.write(dbMgr, function (tr) {
            console.log("writeCfg1----------------------------------", new Date().getTime());
            db_1.modify(tr, items, 1000, false);
            console.log("writeCfg2----------------------------------", new Date().getTime());
        });
    }
};
initDb();
})