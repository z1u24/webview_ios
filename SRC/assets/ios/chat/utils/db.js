_$define("chat/utils/db", function (require, exports, module){
"use strict";
/**
 * wrappers for db operations (CRUD)
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = require("../../pi_pt/db");
var logger_1 = require("./logger");
var logger = new logger_1.Logger('DB');
var createBucket = function createBucket(dbType, bucketName, bucketMetaInfo, dbMgr) {
    try {
        db_1.write(dbMgr, function (tr) {
            db_1.alter(tr, dbType, bucketName, bucketMetaInfo);
        });
    } catch (e) {
        console.log('create bucket failed with error: ', e);
        throw new Error('Create bucket failed');
    }
    return new Bucket(dbType, bucketName, dbMgr);
};
exports.createPersistBucket = function (bucketName, bucketMetaInfo, dbMgr) {
    return createBucket('file', bucketName, bucketMetaInfo, dbMgr);
};
exports.createMemoryBucket = function (bucketName, bucketMetaInfo, dbMgr) {
    return createBucket('memory', bucketName, bucketMetaInfo, dbMgr);
};

var Bucket = function () {
    function Bucket(dbType, bucketName, dbMgr) {
        _classCallCheck(this, Bucket);

        this.bucketName = bucketName;
        this.dbType = dbType;
        this.dbManager = dbMgr;
    }
    // tslint:disable-next-line:no-reserved-keywords


    _createClass(Bucket, [{
        key: "get",
        value: function get(key) {
            var timeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1000;

            var value = void 0;
            var items = [];
            try {
                if (Array.isArray(key)) {
                    for (var i = 0; i < key.length; i++) {
                        items.push({ ware: this.dbType, tab: this.bucketName, key: key[i] });
                    }
                } else {
                    items.push({ ware: this.dbType, tab: this.bucketName, key: key });
                }
                db_1.read(this.dbManager, function (tr) {
                    value = db_1.query(tr, items, timeout, false);
                });
            } catch (e) {
                logger.error('read key from bucket failed with error: ', e);
            }
            if (Array.isArray(value)) {
                value = value.map(function (v) {
                    return v.value;
                });
            }
            return value;
        }
    }, {
        key: "put",
        value: function put(key, value) {
            var timeout = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1000;

            var items = [];
            try {
                if (Array.isArray(key) && Array.isArray(value) && key.length === value.length) {
                    for (var i = 0; i < key.length; i++) {
                        items.push({ ware: this.dbType, tab: this.bucketName, key: key[i], value: value[i] });
                    }
                } else {
                    items.push({ ware: this.dbType, tab: this.bucketName, key: key, value: value });
                }
                db_1.write(this.dbManager, function (tr) {
                    db_1.modify(tr, items, timeout, false);
                });
                return true;
            } catch (e) {
                logger.error('failed to write key with error: ', e);
            }
            return false;
        }
        /**
         * 这是一个完整的事务不会被打断
         * @param key key
         * @param rwHandler RWHandler
         * @param timeout RWHandler
         */

    }, {
        key: "readAndWrite",
        value: function readAndWrite(key, rwHandler) {
            var _this = this;

            var timeout = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1000;

            var itemsRead = [];
            var itemsWrite = [];
            try {
                if (Array.isArray(key)) {
                    for (var i = 0; i < key.length; i++) {
                        itemsRead.push({ ware: this.dbType, tab: this.bucketName, key: key[i] });
                    }
                } else {
                    itemsRead.push({ ware: this.dbType, tab: this.bucketName, key: key });
                }
                logger.debug("before write");
                db_1.write(this.dbManager, function (tr) {
                    logger.debug("before query");
                    var value = db_1.query(tr, itemsRead, timeout, false);
                    if (Array.isArray(value)) {
                        value = value.map(function (v) {
                            return v.value;
                        });
                    }
                    value = rwHandler(value);
                    if (Array.isArray(key) && Array.isArray(value) && key.length === value.length) {
                        for (var _i = 0; _i < key.length; _i++) {
                            itemsWrite.push({ ware: _this.dbType, tab: _this.bucketName, key: key[_i], value: value[_i] });
                        }
                    } else {
                        itemsWrite.push({ ware: _this.dbType, tab: _this.bucketName, key: key, value: value });
                    }
                    logger.debug("before modify");
                    db_1.modify(tr, itemsWrite, timeout, false);
                    logger.debug("after modify");
                });
                return true;
            } catch (e) {
                logger.error('failed to readAndWrite key with error: ', e);
            }
            return false;
        }
    }, {
        key: "update",
        value: function update(key, value) {
            var timeout = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1000;

            if (this.get(key) === undefined) {
                return false;
            }
            return this.put(key, value, timeout);
        }
        // tslint:disable-next-line:no-reserved-keywords

    }, {
        key: "delete",
        value: function _delete(key) {
            var _this2 = this;

            var timeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1000;

            if (this.get(key) === undefined) {
                return false;
            }
            try {
                db_1.write(this.dbManager, function (tr) {
                    db_1.modify(tr, [{ ware: _this2.dbType, tab: _this2.bucketName, key: key }], timeout, false);
                });
                return true;
            } catch (e) {
                logger.error('failed to delete key with error: ', e);
            }
            return false;
        }
    }, {
        key: "iter",
        value: function iter(key) {
            var _this3 = this;

            var desc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
            var filter = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

            var iter = void 0;
            try {
                db_1.read(this.dbManager, function (tr) {
                    iter = db_1.iterDb(tr, _this3.dbType, _this3.bucketName, key, desc, filter);
                });
            } catch (e) {
                logger.error('failed to iter db with error: ', e);
            }
            return iter;
        }
    }]);

    return Bucket;
}();

exports.Bucket = Bucket;
})