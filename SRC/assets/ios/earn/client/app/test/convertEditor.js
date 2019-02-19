_$define("earn/client/app/test/convertEditor", function (require, exports, module){
"use strict";
/**
 * 商城编辑
 */

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var widget_1 = require("../../../../pi/widget/widget");
var constant_1 = require("../../../server/data/constant");
var item_s_1 = require("../../../server/data/db/item.s");
var stParties_p_1 = require("../../../server/rpc/stParties.p");
var init_1 = require("../net/init");
var compEditor_1 = require("./compEditor");

var ConvertEditor = function (_widget_1$Widget) {
    _inherits(ConvertEditor, _widget_1$Widget);

    function ConvertEditor() {
        _classCallCheck(this, ConvertEditor);

        var _this = _possibleConstructorReturn(this, (ConvertEditor.__proto__ || Object.getPrototypeOf(ConvertEditor)).apply(this, arguments));

        _this.props = {
            productsList: [],
            addProducts: [],
            addProduct: {},
            productId: 0,
            stNum: 0,
            productName: '',
            value: '',
            desc: '',
            progress: '',
            tips: '',
            level: 1,
            pic: '',
            convert: '',
            productNum: 0,
            deadTime: ''
        };
        return _this;
    }

    _createClass(ConvertEditor, [{
        key: "create",
        value: function create() {
            _get(ConvertEditor.prototype.__proto__ || Object.getPrototypeOf(ConvertEditor.prototype), "create", this).call(this);
            this.initData();
        }
    }, {
        key: "initData",
        value: function initData() {
            var _this2 = this;

            get_productInfo().then(function (res) {
                _this2.props.productsList = res;
                _this2.paint();
                console.log('initData in !!!!!!!!!!!!!!!!!!!', _this2.props.productsList);
            });
            this.paint();
        }
    }, {
        key: "addProduct",
        value: function addProduct() {
            add_product(this.props.productId, this.props.stNum, this.props.productName, this.props.value, this.props.desc, this.props.progress, this.props.tips, this.props.level);
            this.initData();
            this.paint();
        }
    }, {
        key: "inputProduct",
        value: function inputProduct(event) {
            this.props.addProducts.push(event.currentTarget.value);
            console.log('addProducts!!!!!!!!!!', this.props.addProducts);
        }
    }, {
        key: "inputProductId",
        value: function inputProductId(event) {
            this.props.productId = parseInt(event.currentTarget.value, 10);
            console.log('this.props.productId', event.currentTarget.value);
        }
    }, {
        key: "inputStNum",
        value: function inputStNum(event) {
            this.props.stNum = parseInt(event.currentTarget.value, 10);
        }
    }, {
        key: "inputProductName",
        value: function inputProductName(event) {
            this.props.productName = event.currentTarget.value;
        }
    }, {
        key: "inputValue",
        value: function inputValue(event) {
            this.props.value = event.currentTarget.value;
        }
    }, {
        key: "inputDesc",
        value: function inputDesc(event) {
            this.props.desc = event.currentTarget.value;
        }
    }, {
        key: "inputProgress",
        value: function inputProgress(event) {
            this.props.progress = event.currentTarget.value;
        }
    }, {
        key: "inputTips",
        value: function inputTips(event) {
            this.props.tips = event.currentTarget.value;
        }
    }, {
        key: "inputLevel",
        value: function inputLevel(event) {
            this.props.level = parseInt(event.currentTarget.value, 10);
        }
    }, {
        key: "inputPic",
        value: function inputPic(event) {
            this.props.pic = event.currentTarget.value;
        }
    }, {
        key: "inputConvert",
        value: function inputConvert(event) {
            this.props.convert = event.currentTarget.value;
        }
    }, {
        key: "inputProductNum",
        value: function inputProductNum(event) {
            this.props.productNum = parseInt(event.currentTarget.value, 10);
        }
    }, {
        key: "inputDeadTime",
        value: function inputDeadTime(event) {
            this.props.deadTime = event.currentTarget.value;
        }
    }, {
        key: "addConvert",
        value: function addConvert() {
            add_converts(this.props.convert, this.props.productNum, this.props.deadTime);
            this.initData();
            this.paint();
        }
    }, {
        key: "uploadAvatar",
        value: function uploadAvatar(event) {
            console.log('res!!!!!', event);
            var file = event.srcElement.files[0];
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
                console.log(reader.result);
                compEditor_1.uploadFile(reader.result);
            };
        }
    }, {
        key: "importExcel",
        value: function importExcel(event) {
            var objCon = new ActiveXObject('ADODB.Connection');
            objCon.Provider = 'Microsoft.Jet.OLEDB.4.0"';
            objCon.ConnectionString = "Data Source=" + event.srcElement.value + ";Extended Properties=Excel 8.0";
            objCon.CursorLocation = 1;
            objCon.Open;
            var strQuery = void 0;
            // Get the SheetName
            var strSheetName = 'Sheet1$';
            var rsTemp = new ActiveXObject('ADODB.Recordset');
            rsTemp = objCon.OpenSchema(20);
            if (!rsTemp.EOF) {
                strSheetName = rsTemp.Fields('Table_Name').Value;
            }
            rsTemp = null;
            var rsExcel = new ActiveXObject('ADODB.Recordset');
            strQuery = "SELECT * FROM [ + " + strSheetName + " + ]";
            rsExcel.ActiveConnection = objCon;
            rsExcel.Open(strQuery);
            while (!rsExcel.EOF) {
                for (var i = 0; i < rsExcel.Fields.Count; ++i) {
                    alert(rsExcel.Fields(i).value);
                }
                rsExcel.MoveNext;
            }
            // Close the connection and dispose the file
            objCon.Close;
        }
    }]);

    return ConvertEditor;
}(widget_1.Widget);

exports.ConvertEditor = ConvertEditor;
// 获取商品信息
var get_productInfo = function get_productInfo() {
    return new Promise(function (resolve, reject) {
        init_1.clientRpcFunc(stParties_p_1.get_convert_list, null, function (r) {
            console.log(r);
            if (r.reslutCode === constant_1.RESULT_SUCCESS) {
                var compList = JSON.parse(r.msg);
                var resData = [];
                compList.list.forEach(function (element) {
                    var data = {
                        id: element.id,
                        stCount: element.stCount,
                        name: element.name,
                        value: element.value,
                        desc: element.desc,
                        progress: element.desc,
                        tips: element.tips,
                        level: element.level,
                        leftCount: element.leftCount,
                        convertCount: element.convertCount
                    };
                    resData.push(data);
                });
                console.log('商品信息!!!!!!!!：', resData);
                resolve(resData);
            } else {
                reject(r);
            }
        });
    });
};
// 添加单个商品
var add_product = function add_product(productId, stNum, productName, value, desc, progress, tips, level) {
    return new Promise(function (resolve, reject) {
        var product = new item_s_1.ProductInfo(productId, stNum, productName, value, desc, progress, tips, level);
        console.log('productId!!!!!!', typeof productId === "undefined" ? "undefined" : _typeof(productId));
        var addList = new item_s_1.ConvertAwardList();
        addList.list = [];
        addList.list.push(product);
        console.log('product!!!!!!', product);
        init_1.clientRpcFunc(stParties_p_1.add_convert_info, addList, function (r) {
            console.log(r);
            if (r.reslutCode === constant_1.RESULT_SUCCESS) {
                alert('添加商品成功');
                resolve(r);
            } else {
                reject(r);
            }
        });
    });
};
// 添加兑换码
var add_converts = function add_converts(convert, productNum, deadTime) {
    return new Promise(function (resolve, reject) {
        var product = new item_s_1.AddConvert(productNum, convert, deadTime);
        var addList = new item_s_1.AddConvertList();
        addList.list = [];
        addList.list.push(product);
        console.log('product!!!!!!', product);
        init_1.clientRpcFunc(stParties_p_1.add_convert, addList, function (r) {
            console.log(r);
            if (r.reslutCode === constant_1.RESULT_SUCCESS) {
                alert('添加兑换码成功');
                resolve(r);
            } else {
                reject(r);
            }
        });
    });
};
// 批量添加商品
var add_products = function add_products(addProductList) {
    return new Promise(function (resolve, reject) {
        init_1.clientRpcFunc(stParties_p_1.add_convert_info, addProductList, function (r) {
            console.log(r);
            if (r.reslutCode === constant_1.RESULT_SUCCESS) {
                alert('添加商品成功');
                resolve(r);
            } else {
                reject(r);
            }
        });
    });
};
})