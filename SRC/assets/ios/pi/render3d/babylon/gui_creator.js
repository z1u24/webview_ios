_$define("pi/render3d/babylon/gui_creator", function (require, exports, module){
"use strict";
// tslint:disable-next-line:no-reference
/// <reference path='./babylon.d.ts'/>

var _UIButtonCreate, _AttrFunc, _EventFunc;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var root_1 = require("../../ui/root");
var gui_anim_controller_1 = require("./gui_anim_controller");
// tslint:disable-next-line:one-variable-per-declaration
var host = void 0,
    UICfgMap = new Map(),
    CustomizeControlMap = new Map(),
    PatchBabylonControlMap = new Map();
/**
 * 修复 BABYLON.GUI.Container 销毁子节点的 bug
 */

var Container = function (_BABYLON$GUI$Containe) {
    _inherits(Container, _BABYLON$GUI$Containe);

    function Container() {
        _classCallCheck(this, Container);

        return _possibleConstructorReturn(this, (Container.__proto__ || Object.getPrototypeOf(Container)).apply(this, arguments));
    }

    _createClass(Container, [{
        key: "dispose",
        value: function dispose() {
            for (var i = this.children.length; i >= 0; i--) {
                this.children[i].dispose();
            }
            this.children.length = 0;
            _get(Container.prototype.__proto__ || Object.getPrototypeOf(Container.prototype), "dispose", this).call(this);
        }
    }]);

    return Container;
}(BABYLON.GUI.Container);

exports.Container = Container;
/**
 * GUI 构建方法类
 */
// tslint:disable-next-line:no-unnecessary-class

var GUICreator = function () {
    function GUICreator() {
        _classCallCheck(this, GUICreator);
    }

    _createClass(GUICreator, null, [{
        key: "initUI",

        /**
         * 初始化创建 全屏 UI 根节点
         * @param scene
         */
        value: function initUI(scene) {
            host = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI('root');
            gui_anim_controller_1.GUIAnimController.init();
            return host;
        }
        /**
         * 返回 UI 根节点
         */

    }, {
        key: "getUIRoot",
        value: function getUIRoot() {
            return host;
        }
        /**
         * 切换 UI 显示与隐藏
         */

    }, {
        key: "triggerUIVisible",
        value: function triggerUIVisible() {
            host.rootContainer.isVisible = !host.rootContainer.isVisible;
        }
        /**
         * 更改 UI 显示与隐藏
         * @param b
         */

    }, {
        key: "setUIVisible",
        value: function setUIVisible(b) {
            host.rootContainer.isVisible = b;
        }
        /**
         * 设置 节点属性 - 多属性
         * @param control
         * @param cfg
         */

    }, {
        key: "setControlAttrs",
        value: function setControlAttrs(control, cfg) {
            for (var key in cfg) {
                if (cfg[key] !== undefined) {
                    GUICreator.setControlAttr(control, key, cfg[key]);
                }
            }
        }
        /**
         * 设置 节点指定属性
         * @param control
         * @param key
         * @param value
         */

    }, {
        key: "setControlAttr",
        value: function setControlAttr(control, key, value) {
            if (Attr1.indexOf(key) >= 0) {
                control[key] = value;
            } else if (AttrFunc[key] !== undefined) {
                AttrFunc[key](control, value);
            } else if (EventFunc[key] !== undefined) {
                EventFunc[key](control, value);
            }
        }
        /**
         * 创建 控件
         * @param cfg
         */

    }, {
        key: "CreateControl",
        value: function CreateControl(cfg) {
            var control = void 0;
            if (UIType1.indexOf(cfg.type) >= 0) {
                if (PatchBabylonControlMap.get(cfg.type) !== undefined) {
                    control = PatchBabylonControlMap.get(cfg.type)();
                } else {
                    control = new BABYLON.GUI[cfg.type]();
                }
                GUICreator.setControlAttrs(control, cfg);
            } else if (UIButtonCreate[cfg.type] !== undefined) {
                control = UIButtonCreate[cfg.type](cfg);
                // 原生按钮 边框为 1, 此处取消边框 
                control.thickness = 0;
                GUICreator.setControlAttrs(control, cfg);
            } else if (UIImageCreate[cfg.type] !== undefined) {
                control = UIImageCreate[cfg.type](cfg);
                GUICreator.setControlAttrs(control, cfg);
            } else if (CustomizeControlMap.get(cfg.type) !== undefined) {
                var customizeControl = void 0;
                customizeControl = CustomizeControlMap.get(cfg.type);
                control = customizeControl(cfg);
                GUICreator.setControlAttrs(control, cfg);
            } else {
                var registerCfg = void 0;
                if (cfg.w_tag !== undefined) {
                    registerCfg = GUICreator.readComponentCfg(cfg.w_tag);
                    if (registerCfg instanceof Function) {
                        control = registerCfg(cfg.it, cfg.it1);
                    } else {
                        cfg = mergeJson(registerCfg, cfg);
                        if (cfg.type !== undefined) {
                            control = GUICreator.CreateControl(cfg);
                        }
                    }
                }
            }
            return control;
        }
        /**
         * 创建 控件
         * @param cfg
         */
        // tslint:disable-next-line:max-func-body-length

    }, {
        key: "CreateControlWithWidget",
        value: function CreateControlWithWidget(cfg, parentW) {
            var control = void 0;
            if (UIType1.indexOf(cfg.type) >= 0) {
                if (PatchBabylonControlMap.get(cfg.type) !== undefined) {
                    control = PatchBabylonControlMap.get(cfg.type)();
                } else {
                    control = new BABYLON.GUI[cfg.type]();
                }
                GUICreator.setControlAttrs(control, cfg);
                control.pi_widget = parentW;
            } else if (UIButtonCreate[cfg.type] !== undefined) {
                control = UIButtonCreate[cfg.type](cfg);
                // 原生按钮 边框为 1, 此处取消边框 
                control.thickness = 0;
                GUICreator.setControlAttrs(control, cfg);
                control.pi_widget = parentW;
            } else if (UIImageCreate[cfg.type] !== undefined) {
                control = UIImageCreate[cfg.type](cfg);
                GUICreator.setControlAttrs(control, cfg);
                control.pi_widget = parentW;
            } else if (CustomizeControlMap.get(cfg.type) !== undefined) {
                var customizeControl = void 0;
                customizeControl = CustomizeControlMap.get(cfg.type);
                control = customizeControl(cfg);
                GUICreator.setControlAttrs(control, cfg);
                control.pi_widget = parentW;
            } else {
                var registerCfg = void 0;
                var widget = void 0;
                if (cfg.w_tag !== undefined) {
                    registerCfg = GUICreator.readComponentCfg(cfg.w_tag);
                    // 复杂组件
                    if (registerCfg instanceof Function) {
                        widget = root_1.create(cfg.w_tag, cfg.it);
                        // 非 widget 组件，为 GUI 组件
                        if (widget === undefined || widget.forelet === undefined) {
                            control = registerCfg(cfg.it, cfg.it1, parentW);
                            control.pi_widget = parentW;
                            // widget 组件
                        } else {
                            if (widget.control === undefined) {
                                widget.createGUI();
                            }
                            control = widget.control;
                            if (control !== undefined) {
                                control.pi_widget = widget;
                            }
                            parentW.children.push(widget);
                        }
                    } else {
                        cfg = mergeJson(registerCfg, cfg);
                        if (cfg.type !== undefined) {
                            control = GUICreator.CreateControl(cfg);
                        }
                        control.pi_widget = parentW;
                    }
                }
            }
            // if (cfg) {
            //     control.onAfterDrawObservable.add(() => {
            //     });
            // }
            return control;
        }
        /**
         * 创建带有树结构的UI
         * @param cfg
         */

    }, {
        key: "CreateControlWithTree",
        value: function CreateControlWithTree(cfg) {
            var control = void 0;
            control = GUICreator.CreateControl(cfg);
            if (cfg.children !== undefined) {
                cfg.children.forEach(function (eleCfg) {
                    var _control = void 0;
                    _control = GUICreator.CreateControlWithTree(eleCfg);
                    control.addControl(_control);
                });
            }
            return control;
        }
        /**
         * 创建带有树结构的UI
         * @param cfg
         */

    }, {
        key: "CreateControlWithTreeWidget",
        value: function CreateControlWithTreeWidget(cfg, widget) {
            var control = void 0;
            control = GUICreator.CreateControlWithWidget(cfg, widget);
            if (cfg.children !== undefined) {
                cfg.children.forEach(function (eleCfg) {
                    var _control = void 0;
                    _control = GUICreator.CreateControlWithTreeWidget(eleCfg, control.pi_widget);
                    control.addControl(_control);
                });
            }
            return control;
        }
    }, {
        key: "formatControlEvents",
        value: function formatControlEvents(control, events) {
            // 
        }
    }, {
        key: "registerComponentCfg",

        /**
         * 注册组件
         * @param name 组件名称
         * @param cfg (it:any, it1:any) => {} 的方法 或 { type, width } 的配置
         */
        value: function registerComponentCfg(name, cfg) {
            UICfgMap.set(name, cfg);
        }
        /**
         * 获取组件配置
         * @param name 组件名称
         */

    }, {
        key: "readComponentCfg",
        value: function readComponentCfg(name) {
            return UICfgMap.get(name);
        }
        /**
         * 注册自定义控件构造函数
         * @param name 控件名称
         * @param createFunc 控件创建方法 | 构造函数方法
         */

    }, {
        key: "registerCustomizeControl",
        value: function registerCustomizeControl(name, createFunc) {
            CustomizeControlMap.set(name, createFunc);
        }
        /**
         * 刷新容器内容 - 该容器内容为自定义界面内容
         * @param control 指定刷新该容器内容
         * @param createFunc 自定义界面内容创建方法
         */

    }, {
        key: "refreshWithCreateFunc",
        value: function refreshWithCreateFunc(control, createFunc, param) {
            var newChild = createFunc(param);
            GUICreator.clearChildren(control);
            control.addControl(newChild);
        }
        /**
         * 刷新容器内容 - 该容器内容为已注册的组件
         * @param control 指定刷新该容器内容
         * @param registerName 已注册的组件名称
         * @param it 组件数据
         * @param it1 组件数据
         */

    }, {
        key: "refreshWithComponentName",
        value: function refreshWithComponentName(control, registerName, it, it1) {
            var registerFunc = UICfgMap.get(registerName);
            GUICreator.clearChildren(control);
            if (registerFunc !== undefined) {
                var newChild = registerFunc(it, it1);
                control.addControl(newChild);
            }
        }
        /**
         * 刷新容器内容 - 该容器内容为自定义界面
         * @param control 指定刷新该容器内容
         * @param cfg 自定义好的界面配置
         */

    }, {
        key: "refreshWithCfg",
        value: function refreshWithCfg(control, cfg) {
            var newChild = GUICreator.CreateControlWithTree(cfg);
            GUICreator.clearChildren(control);
            control.addControl(newChild);
        }
        /**
         * 销毁容器所有子组件
         * @param control 目标容器
         */

    }, {
        key: "clearChildren",
        value: function clearChildren(control) {
            for (var len = control.children.length - 1; len >= 0; len--) {
                // child.dispose();
                GUICreator.disposeWithTree(control.children[len]);
            }
        }
    }, {
        key: "disposeWithTree",
        value: function disposeWithTree(control) {
            var pi_widget = control.pi_widget;
            if (pi_widget && pi_widget.control === control) {
                pi_widget.destroy();
            }
            if (control.children !== undefined) {
                control.children.forEach(function (child) {
                    GUICreator.disposeWithTree(child);
                });
                control.children.length = 0;
            }
            control.dispose();
        }
    }]);

    return GUICreator;
}();

exports.GUICreator = GUICreator;
// const controlGrayCheck = (control: BABYLON.GUI.Control) => {
//     if ((<IPiWidgetControl>control).pi_isGray === true) {
//         control.contains.
//     }
// };
/**
 * 返回 合并两个对象属性 的新对象
 * @param srcObj
 * @param newObj
 */
var mergeJson = function mergeJson(srcObj, newObj) {
    var res = void 0;
    res = {};
    for (var key in srcObj) {
        res[key] = srcObj[key];
    }
    if (newObj === undefined) {
        return res;
    } else {
        for (var _key in newObj) {
            if (newObj[_key] !== undefined) {
                res[_key] = newObj[_key];
            }
        }
        return res;
    }
};
/**
 * Control 属性设置
 * @param control
 * @param left
 */
var _formatHCenter = function _formatHCenter(control, left) {
    control.left = Math.abs(left) > 1 ? left + 'px' : left;
};
/**
 * Control 属性设置
 * @param control
 * @param top
 */
var _formatVCenter = function _formatVCenter(control, top) {
    control.top = Math.abs(top) > 1 ? top + 'px' : top;
};
/**
 * Control 属性设置
 * @param control
 * @param left
 */
var _formatLeft = function _formatLeft(control, left) {
    control.left = Math.abs(left) > 1 ? left + 'px' : left;
    control.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
};
/**
 * Control 属性设置
 * @param control
 * @param top
 */
var _formatTop = function _formatTop(control, top) {
    control.top = Math.abs(top) > 1 ? top + 'px' : top;
    control.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
};
/**
 * Control 属性设置
 * @param control
 * @param right
 */
var _formatRight = function _formatRight(control, right) {
    right = -right;
    control.left = Math.abs(right) > 1 ? right + 'px' : right;
    control.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
};
/**
 * Control 属性设置
 * @param control
 * @param bottom
 */
var _formatBottom = function _formatBottom(control, bottom) {
    bottom = -bottom;
    control.top = Math.abs(bottom) > 1 ? bottom + 'px' : bottom;
    control.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
};
/**
 * Control 属性设置
 * @param control
 * @param z
 */
var _formatZ = function _formatZ(control, z) {
    control.zIndex = z;
};
/**
 * Control 属性设置
 * @param control
 * @param s
 */
var _formatScale = function _formatScale(control, s) {
    control.scaleX = s;
    control.scaleY = s;
};
/**
 * Control 属性设置
 * @param control
 * @param r
 */
var _formatRotation = function _formatRotation(control, r) {
    control.rotation = r;
    control.rotation = r;
};
/**
 * Control 属性设置
 * @param control
 */
var _formatTextLeft = function _formatTextLeft(control) {
    control.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
};
/**
 * Control 属性设置
 * @param control
 */
var _formatTextTop = function _formatTextTop(control) {
    control.textVerticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
};
/**
 * Control 属性设置
 * @param control
 */
var _formatTextRight = function _formatTextRight(control) {
    control.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
};
/**
 * Control 属性设置
 * @param control
 */
var _formatTextBottom = function _formatTextBottom(control) {
    control.textVerticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
};
var _formatTextClip = function _formatTextClip(control) {
    control.textWrapping = BABYLON.GUI.TextWrapping.Clip;
};
var _formatTextEllipsis = function _formatTextEllipsis(control) {
    control.textWrapping = BABYLON.GUI.TextWrapping.Ellipsis;
};
var _formatTextWrap = function _formatTextWrap(control) {
    control.textWrapping = BABYLON.GUI.TextWrapping.WordWrap;
};
/**
 * Control 属性设置
 * @param control
 * @param height
 */
var _formatHeight = function _formatHeight(control, height) {
    control.height = Math.abs(height) > 1 ? height + 'px' : height;
};
/**
 * Control 属性设置
 * @param control
 * @param width
 */
var _formatWidth = function _formatWidth(control, width) {
    control.width = Math.abs(width) > 1 ? width + 'px' : width;
};
/**
 * Control 属性设置
 * @param control
 * @param image
 */
var _formatImage = function _formatImage(control, image) {
    control.source = image;
};
/**
 * Control 属性设置
 * @param control
 * @param value
 */
var _formatPaddingLeft = function _formatPaddingLeft(control, value) {
    control.paddingLeft = Math.abs(value) >= 1 ? value + 'px' : value;
};
/**
 * Control 属性设置
 * @param control
 * @param value
 */
var _formatPaddingTop = function _formatPaddingTop(control, value) {
    control.paddingTop = Math.abs(value) >= 1 ? value + 'px' : value;
};
/**
 * Control 属性设置
 * @param control
 * @param value
 */
var _formatPaddingRight = function _formatPaddingRight(control, value) {
    control.paddingRight = Math.abs(value) >= 1 ? value + 'px' : value;
};
/**
 * Control 属性设置
 * @param control
 * @param value
 */
var _formatPaddingBottom = function _formatPaddingBottom(control, value) {
    control.paddingBottom = Math.abs(value) >= 1 ? value + 'px' : value;
};
/**
 * Control 属性设置
 * @param control
 */
var _formatStretchExtend = function _formatStretchExtend(control) {
    control.stretch = BABYLON.GUI.Image.STRETCH_EXTEND;
};
/**
 * Control 属性设置
 * @param control
 */
var _formatStretchFill = function _formatStretchFill(control) {
    control.stretch = BABYLON.GUI.Image.STRETCH_FILL;
};
/**
 * Control 属性设置
 * @param control
 */
var _formatStretchNone = function _formatStretchNone(control) {
    control.stretch = BABYLON.GUI.Image.STRETCH_NONE;
};
var _formatMaxWidth = function _formatMaxWidth(control, value) {
    control.maxWidth = value > 1 ? value + "px" : value;
};
/**
 * Control 属性设置
 * @param control
 */
var _formatStretchUniform = function _formatStretchUniform(control) {
    control.stretch = BABYLON.GUI.Image.STRETCH_UNIFORM;
};
/**
 * Control 属性设置
 * @param control
 * @param f
 */
var _up = function _up(control, f) {
    control.onPointerUpObservable.add(f);
};
/**
 * Control 属性设置
 * @param control
 * @param f
 */
var _down = function _down(control, f) {
    control.onPointerDownObservable.add(f);
};
/**
 * Control 属性设置
 * @param control
 * @param f
 */
var _enter = function _enter(control, f) {
    control.onPointerEnterObservable.add(f);
};
/**
 * Control 属性设置
 * @param control
 * @param f
 */
var _out = function _out(control, f) {
    control.onPointerOutObservable.add(f);
};
/**
 * Control 属性设置
 * @param control
 * @param f
 */
var _click = function _click(control, f) {
    control.onPointerClickObservable.add(f);
};
/**
 * Control 属性设置
 * @param control
 * @param f
 */
var _move = function _move(control, f) {
    control.onPointerMoveObservable.add(f);
};
/**
 * Control 属性设置
 * @param control
 * @param f
 */
var _textChanged = function _textChanged(control, f) {
    control.onTextChangedObservable.add(f);
};
/**
 * Control 属性设置
 * @param control
 * @param f
 */
var _blur = function _blur(control, f) {
    control.onBlurObservable.add(f);
};
/**
 * 控件类型
 */
// const UITypeEnum = {
//     Grid: 'Grid',
//     Container: 'Container',
//     StackPanel: 'StackPanel',
//     Image: 'Image',
//     TextBlock: 'TextBlock',
//     ImageButton: 'ImageButton',
//     SimpleButton: 'SimpleButton',
//     ImageOnlyButton: 'ImageOnlyButton',
//     ImageWithCenterTextButton: 'ImageWithCenterTextButton',
// }
/**
 * 简单控件
 */
var UIType1 = ['TextBlock', 'Container', 'StackPanel', 'Rectangle', 'InputText', 'InputPassword', 'Grid', 'Line'];
/**
 * 图片控件
 */
var UIType2 = ['Image'];
/**
 * 按钮控件
 * _image           图片
 * _textBlock       文本
 *
 * ImageButton      左 20% Image, 右 80% TextBlock
 * SimpleButton:    文本居中
 * ImageOnlyButton: 图片充满
 * ImageWithCenterTextButton: 图片充满 & 文本居中
 */
var UITypeButton = ['ImageButton', 'SimpleButton', 'ImageOnlyButton', 'ImageWithCenterTextButton'];
/**
 * 图片控件创建方法
 */
var UIImageCreate = _defineProperty({}, UIType2[0], function (cfg) {
    return new BABYLON.GUI.Image(cfg.name);
});
/**
 * Button控件创建方法
 */
var UIButtonCreate = (_UIButtonCreate = {}, _defineProperty(_UIButtonCreate, UITypeButton[0], function (cfg) {
    return BABYLON.GUI.Button.CreateImageButton(cfg.name, cfg.text, cfg.image);
}), _defineProperty(_UIButtonCreate, UITypeButton[1], function (cfg) {
    return BABYLON.GUI.Button.CreateSimpleButton(cfg.name, cfg.text);
}), _defineProperty(_UIButtonCreate, UITypeButton[2], function (cfg) {
    return BABYLON.GUI.Button.CreateImageOnlyButton(cfg.name, cfg.image);
}), _defineProperty(_UIButtonCreate, UITypeButton[3], function (cfg) {
    return BABYLON.GUI.Button.CreateImageWithCenterTextButton(cfg.name, cfg.text, cfg.image);
}), _UIButtonCreate);
/**
 * 控件属性
 */
/**
 * Control 属性名 相同，可直接赋值(无单位类型的影响)
 *
 * alpha:       不透明度
 * background:  背景颜色
 * color:       文本颜色，容器背景颜色, 边框颜色
 * text:        文本内容
 * fontSize:    文本尺寸
 */
var Attr1 = ['alpha', 'background', 'zIndex', 'scaleX', 'scaleY', 'rotation',
// 元素状态
'isVertical', 'isVisible', 'isEnabled',
// 元素对齐
'horizontalAlignment', 'verticalAlignment',
// 元素阴影
'shadowBlur', 'shadowColor', 'shadowOffsetX', 'shadowOffsetY',
// 容器裁剪
'clipChildren', 'margin',
// 文本属性
'color', 'text', 'fontSize', 'fontFamily', 'fontWeight', 'lineSpacing', 'outlineColor', 'outlineWidth',
// 调整以充满容器，类似文本行充满
'resizeToFit',
// 文本对齐设置 - 推荐 使用 Attr5 中属性名
'textHorizontalAlignment', 'textVerticalAlignment',
// 图片裁剪显示
'cellId', 'cellHeight', 'cellWidth',
// 图片控件大小自适应图片资源大小 
'autoScale',
// 图片资源截取显示的设置
'sourceLeft', 'sourceTop', 'sourceWidth', 'sourceHeight',
// Input 控件
'placeholderText', 'placeholderColor', 'disabledColor', 'focusedBackground',
// line
'x1', 'x2', 'y1', 'y2', 'dash', 'lineWidth'];
/**
 * Control 属性有多种处理
 *
 * left:    相对父节点 左边缘定位
 * top:     相对父节点 上边缘定位
 * right:   相对父节点 右边缘定位
 * bottom:  相对父节点 下边缘定位
 * hCenter: 相对父节点 水平方向中部定位
 * vCenter: 相对父节点 垂直方向中部定位
 */
var Attr2 = ['left', 'top', 'right', 'bottom', 'hCenter', 'vCenter'];
/**
 * Control 属性有多种单位
 *
 * 属性值 >  1, 视为 px    单位
 * 属性值 <= 1, 视为 百分比 单位
 * 属性值 =  0, 俩种单位无影响，所以视为 百分比单位
 */
var Attr3 = ['width', 'height', 'maxWidth'];
/**
 * Control 属性名有差异
 *
 * H5 中 图片路径属性 相对 Babylon 设置资源路径有所差异
 */
var Attr4 = ['image', 'src', 'z-index', 'z', 'rotate'];
/**
 * Control 属性名简写
 *
 */
var Attr5 = [
// 文本对齐， 不设置 则分别有 重置居中，水平居中
'txtLeft', 'txtTop', 'txtRight', 'txtBottom',
// 文本换行
'txtClip', 'txtEllipsis', 'txtWrap'];
/**
 * Control 属性名共用
 */
var Attr6 = ['scale'];
/**
 * Control 属性有多种单位
 * 属性值 >=  1, 视为 px    单位
 * 属性值 < 1, 视为 百分比 单位
 * 属性值 =  0, 俩种单位无影响，所以视为 百分比单位
 */
var Attr7 = ['paddingLeft', 'paddingTop', 'paddingRight', 'paddingBottom'];
/**
 * Image 填充模式
 */
var Attr8 = ['stretch_extend', 'stretch_fill', 'stretch_none', 'stretch_uniform'];
/**
 * 特殊属性设置方法集合
 */
var AttrFunc = (_AttrFunc = {}, _defineProperty(_AttrFunc, Attr2[0], _formatLeft), _defineProperty(_AttrFunc, Attr2[1], _formatTop), _defineProperty(_AttrFunc, Attr2[2], _formatRight), _defineProperty(_AttrFunc, Attr2[3], _formatBottom), _defineProperty(_AttrFunc, Attr2[4], _formatHCenter), _defineProperty(_AttrFunc, Attr2[5], _formatVCenter), _defineProperty(_AttrFunc, Attr3[0], _formatWidth), _defineProperty(_AttrFunc, Attr3[1], _formatHeight), _defineProperty(_AttrFunc, Attr3[2], _formatMaxWidth), _defineProperty(_AttrFunc, Attr4[0], _formatImage), _defineProperty(_AttrFunc, Attr4[1], _formatImage), _defineProperty(_AttrFunc, Attr4[2], _formatZ), _defineProperty(_AttrFunc, Attr4[3], _formatZ), _defineProperty(_AttrFunc, Attr4[4], _formatRotation), _defineProperty(_AttrFunc, Attr5[0], _formatTextLeft), _defineProperty(_AttrFunc, Attr5[1], _formatTextTop), _defineProperty(_AttrFunc, Attr5[2], _formatTextRight), _defineProperty(_AttrFunc, Attr5[3], _formatTextBottom), _defineProperty(_AttrFunc, Attr5[4], _formatTextClip), _defineProperty(_AttrFunc, Attr5[5], _formatTextEllipsis), _defineProperty(_AttrFunc, Attr5[6], _formatTextWrap), _defineProperty(_AttrFunc, Attr6[0], _formatScale), _defineProperty(_AttrFunc, Attr7[0], _formatPaddingLeft), _defineProperty(_AttrFunc, Attr7[1], _formatPaddingTop), _defineProperty(_AttrFunc, Attr7[2], _formatPaddingRight), _defineProperty(_AttrFunc, Attr7[3], _formatPaddingBottom), _defineProperty(_AttrFunc, Attr8[0], _formatStretchExtend), _defineProperty(_AttrFunc, Attr8[1], _formatStretchFill), _defineProperty(_AttrFunc, Attr8[2], _formatStretchNone), _defineProperty(_AttrFunc, Attr8[3], _formatStretchUniform), _AttrFunc);
/**
 * event
 */
var EventTypeList = ['up', 'down', 'enter', 'out', 'move', 'click', 'textChanged', 'blur'];
/**
 * Event 绑定处理
 */
var EventFunc = (_EventFunc = {}, _defineProperty(_EventFunc, EventTypeList[0], _up), _defineProperty(_EventFunc, EventTypeList[1], _down), _defineProperty(_EventFunc, EventTypeList[2], _enter), _defineProperty(_EventFunc, EventTypeList[3], _out), _defineProperty(_EventFunc, EventTypeList[4], _move), _defineProperty(_EventFunc, EventTypeList[5], _click), _defineProperty(_EventFunc, EventTypeList[6], _textChanged), _defineProperty(_EventFunc, EventTypeList[7], _blur), _EventFunc);
var patchBabylonControls = function patchBabylonControls() {
    // PatchBabylonControlMap.set(
    //     'Container',
    //     (name?: string) => {
    //         return new Container(name);
    //     }
    // );
    var old = BABYLON.GUI.Container.prototype.dispose;
    BABYLON.GUI.Container.prototype.dispose = function () {
        for (var i = this.children.length - 1; i >= 0; i--) {
            this.children[i].dispose();
        }
        this.children.length = 0;
        old.call(this);
    };
};
patchBabylonControls();
})