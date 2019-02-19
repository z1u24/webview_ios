_$define("pi/render3d/particlesystem/shape", function (require, exports, module){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
 */
var three_1 = require("../three");
var tmp1 = void 0;
var tmp2 = void 0;
var PSShapeType;
(function (PSShapeType) {
    PSShapeType[PSShapeType["Sphere"] = 0] = "Sphere";
    PSShapeType[PSShapeType["SphereShell"] = 1] = "SphereShell";
    PSShapeType[PSShapeType["Hemisphere"] = 2] = "Hemisphere";
    PSShapeType[PSShapeType["HemisphereShell"] = 3] = "HemisphereShell";
    PSShapeType[PSShapeType["Cone"] = 4] = "Cone";
    PSShapeType[PSShapeType["Box"] = 5] = "Box";
    PSShapeType[PSShapeType["Mesh"] = 6] = "Mesh";
    PSShapeType[PSShapeType["ConeShell"] = 7] = "ConeShell";
    PSShapeType[PSShapeType["ConeVolume"] = 8] = "ConeVolume";
    PSShapeType[PSShapeType["ConeVolumeShell"] = 9] = "ConeVolumeShell";
    PSShapeType[PSShapeType["Circle"] = 10] = "Circle";
    PSShapeType[PSShapeType["CircleEdge"] = 11] = "CircleEdge";
    PSShapeType[PSShapeType["SingleSidedEdge"] = 12] = "SingleSidedEdge";
    PSShapeType[PSShapeType["MeshRenderer"] = 13] = "MeshRenderer";
    PSShapeType[PSShapeType["SkinnedMeshRenderer"] = 14] = "SkinnedMeshRenderer";
    PSShapeType[PSShapeType["BoxShell"] = 15] = "BoxShell";
    PSShapeType[PSShapeType["BoxEdge"] = 16] = "BoxEdge";
})(PSShapeType || (PSShapeType = {}));

var BoxImpl = function () {
    // tslint:disable-next-line:typedef
    function BoxImpl(config) {
        _classCallCheck(this, BoxImpl);

        this.box = new three_1.THREE.Vector3(config.box.x, config.box.y, config.box.z);
    }
    // tslint:disable-next-line:no-reserved-keywords


    _createClass(BoxImpl, [{
        key: "get",
        value: function get(pos, dir) {
            var x = this.box.x * (Math.random() - 0.5);
            var y = this.box.y * (Math.random() - 0.5);
            var z = this.box.z * (Math.random() - 0.5);
            pos.set(x, y, z);
        }
    }]);

    return BoxImpl;
}();

var BoxShellImpl = function () {
    // tslint:disable-next-line:typedef
    function BoxShellImpl(config) {
        _classCallCheck(this, BoxShellImpl);

        this.box = new three_1.THREE.Vector3(config.box.x, config.box.y, config.box.z);
    }
    // tslint:disable-next-line:no-reserved-keywords


    _createClass(BoxShellImpl, [{
        key: "get",
        value: function get(pos, dir) {
            var x = 0;
            var y = 0;
            var z = 0;
            var v1 = Math.random() - 0.5;
            var v2 = Math.random() - 0.5;
            var plane = Math.floor(Math.random() * 6);
            switch (plane) {
                case 0:
                    // x正面
                    x = this.box.x * 0.5;
                    y = this.box.y * v1;
                    z = this.box.z * v2;
                    break;
                case 1:
                    // x反面
                    x = this.box.x * -0.5;
                    y = this.box.y * v1;
                    z = this.box.z * v2;
                    break;
                case 2:
                    // y正面
                    x = this.box.x * v1;
                    y = this.box.y * 0.5;
                    z = this.box.z * v2;
                    break;
                case 3:
                    // y反面
                    x = this.box.x * v1;
                    y = this.box.y * -0.5;
                    z = this.box.z * v2;
                    break;
                case 4:
                    // z正面
                    x = this.box.x * v1;
                    y = this.box.y * v2;
                    z = this.box.z * 0.5;
                    break;
                case 5:
                    // z反面
                    x = this.box.x * v1;
                    y = this.box.y * v2;
                    z = this.box.z * -0.5;
                    break;
                default:
            }
            pos.set(x, y, z);
        }
    }]);

    return BoxShellImpl;
}();

var BoxEdgeImpl = function () {
    // tslint:disable-next-line:typedef
    function BoxEdgeImpl(config) {
        _classCallCheck(this, BoxEdgeImpl);

        this.box = new three_1.THREE.Vector3(config.box.x, config.box.y, config.box.z);
    }
    // tslint:disable-next-line:no-reserved-keywords


    _createClass(BoxEdgeImpl, [{
        key: "get",
        value: function get(pos, dir) {
            var x = 0;
            var y = 0;
            var z = 0;
            var v = Math.random() - 0.5;
            var edge = Math.floor(Math.random() * 12);
            switch (edge) {
                case 0:
                    x = this.box.x * 0.5;
                    y = this.box.y * 0.5;
                    z = this.box.z * v;
                    break;
                case 1:
                    x = -this.box.x * 0.5;
                    y = this.box.y * 0.5;
                    z = this.box.z * v;
                    break;
                case 2:
                    x = this.box.x * 0.5;
                    y = -this.box.y * 0.5;
                    z = this.box.z * v;
                    break;
                case 3:
                    x = -this.box.x * 0.5;
                    y = -this.box.y * 0.5;
                    z = this.box.z * v;
                    break;
                case 4:
                    x = this.box.x * v;
                    y = this.box.y * 0.5;
                    z = this.box.z * 0.5;
                    break;
                case 5:
                    x = this.box.x * v;
                    y = -this.box.y * 0.5;
                    z = this.box.z * 0.5;
                    break;
                case 6:
                    x = this.box.x * v;
                    y = this.box.y * 0.5;
                    z = -this.box.z * 0.5;
                    break;
                case 7:
                    x = this.box.x * v;
                    y = -this.box.y * 0.5;
                    z = -this.box.z * 0.5;
                    break;
                case 8:
                    x = this.box.x * 0.5;
                    y = this.box.y * v;
                    z = this.box.z * 0.5;
                    break;
                case 9:
                    x = -this.box.x * 0.5;
                    y = this.box.y * v;
                    z = this.box.z * 0.5;
                    break;
                case 10:
                    x = this.box.x * 0.5;
                    y = this.box.y * v;
                    z = -this.box.z * 0.5;
                    break;
                case 11:
                    x = -this.box.x * 0.5;
                    y = this.box.y * v;
                    z = -this.box.z * 0.5;
                    break;
                default:
            }
            pos.set(x, y, z);
        }
    }]);

    return BoxEdgeImpl;
}();
// tslint:disable:max-classes-per-file


var SphereImpl = function () {
    // tslint:disable-next-line:typedef
    function SphereImpl(config) {
        _classCallCheck(this, SphereImpl);

        this.radius = config.radius;
    }
    // tslint:disable-next-line:no-reserved-keywords


    _createClass(SphereImpl, [{
        key: "get",
        value: function get(pos, dir) {
            var r = this.radius * Math.random();
            var a = Math.PI * Math.random();
            var b = Math.PI * Math.random() * 2;
            var sa = r * Math.sin(a);
            var ca = r * Math.cos(a);
            var sb = Math.sin(b);
            var cb = Math.cos(b);
            pos.set(sa * cb, ca, sa * sb);
        }
    }]);

    return SphereImpl;
}();

var SphereShellImpl = function () {
    // tslint:disable-next-line:typedef
    function SphereShellImpl(config) {
        _classCallCheck(this, SphereShellImpl);

        this.radius = config.radius;
    }
    // tslint:disable-next-line:no-reserved-keywords


    _createClass(SphereShellImpl, [{
        key: "get",
        value: function get(pos, dir) {
            var a = Math.PI * Math.random();
            var b = Math.PI * Math.random() * 2;
            var sa = this.radius * Math.sin(a);
            var ca = this.radius * Math.cos(a);
            var sb = Math.sin(b);
            var cb = Math.cos(b);
            pos.set(sa * cb, ca, sa * sb);
        }
    }]);

    return SphereShellImpl;
}();

var HemisphereImpl = function () {
    // tslint:disable-next-line:typedef
    function HemisphereImpl(config) {
        _classCallCheck(this, HemisphereImpl);

        this.radius = config.radius;
    }
    // tslint:disable-next-line:no-reserved-keywords


    _createClass(HemisphereImpl, [{
        key: "get",
        value: function get(pos, dir) {
            var r = this.radius * Math.random();
            var a = Math.PI * Math.random() * 0.5;
            var b = Math.PI * Math.random() * 2;
            var sa = r * Math.sin(a);
            var ca = r * Math.cos(a);
            var sb = Math.sin(b);
            var cb = Math.cos(b);
            pos.set(sa * cb, ca, sa * sb);
        }
    }]);

    return HemisphereImpl;
}();

var HemisphereShellImpl = function () {
    // tslint:disable-next-line:typedef
    function HemisphereShellImpl(config) {
        _classCallCheck(this, HemisphereShellImpl);

        this.radius = config.radius;
    }
    // tslint:disable-next-line:no-reserved-keywords


    _createClass(HemisphereShellImpl, [{
        key: "get",
        value: function get(pos, dir) {
            var a = Math.PI * Math.random() * 0.5;
            var b = Math.PI * Math.random() * 2;
            var sa = this.radius * Math.sin(a);
            var ca = this.radius * Math.cos(a);
            var sb = Math.sin(b);
            var cb = Math.cos(b);
            pos.set(sa * cb, ca, sa * sb);
        }
    }]);

    return HemisphereShellImpl;
}();
/**
 * 圆柱底部的圆内
 */


var CylinderImpl = function () {
    // tslint:disable-next-line:typedef
    function CylinderImpl(config) {
        _classCallCheck(this, CylinderImpl);

        this.radius = config.radius;
        this.arc = config.arc * Math.PI / 180;
    }
    // tslint:disable-next-line:no-reserved-keywords


    _createClass(CylinderImpl, [{
        key: "get",
        value: function get(pos, dir) {
            var phi = this.arc * Math.random();
            var r = this.radius * Math.random();
            pos.set(r * Math.cos(phi), 0, r * Math.sin(phi));
            dir.set(0, 1, 0);
        }
    }]);

    return CylinderImpl;
}();
/**
 * 圆柱底部的圆周
 */


var CylinderShellImpl = function () {
    // tslint:disable-next-line:typedef
    function CylinderShellImpl(config) {
        _classCallCheck(this, CylinderShellImpl);

        this.radius = config.radius;
        this.arc = config.arc * Math.PI / 180;
    }
    // tslint:disable-next-line:no-reserved-keywords


    _createClass(CylinderShellImpl, [{
        key: "get",
        value: function get(pos, dir) {
            var phi = this.arc * Math.random();
            pos.set(this.radius * Math.cos(phi), 0, this.radius * Math.sin(phi));
            dir.set(0, 1, 0);
        }
    }]);

    return CylinderShellImpl;
}();
/**
 * 圆柱体内部
 */


var CylinderVolumeImpl = function () {
    // tslint:disable-next-line:typedef
    function CylinderVolumeImpl(config) {
        _classCallCheck(this, CylinderVolumeImpl);

        this.radius = config.radius;
        this.length = config.length;
        this.arc = config.arc * Math.PI / 180;
    }
    // tslint:disable-next-line:no-reserved-keywords


    _createClass(CylinderVolumeImpl, [{
        key: "get",
        value: function get(pos, dir) {
            var phi = this.arc * Math.random();
            var r = this.radius * Math.random();
            var len = this.length * Math.random();
            pos.set(r * Math.cos(phi), len, r * Math.sin(phi));
            dir.set(0, 1, 0);
        }
    }]);

    return CylinderVolumeImpl;
}();
/**
 * 圆柱体表面
 */


var CylinderVolumeShellImpl = function () {
    // tslint:disable-next-line:typedef
    function CylinderVolumeShellImpl(config) {
        _classCallCheck(this, CylinderVolumeShellImpl);

        this.radius = config.radius;
        this.length = config.length;
        this.arc = config.arc * Math.PI / 180;
    }
    // tslint:disable-next-line:no-reserved-keywords


    _createClass(CylinderVolumeShellImpl, [{
        key: "get",
        value: function get(pos, dir) {
            var phi = this.arc * Math.random();
            var len = this.length * Math.random();
            pos.set(this.radius * Math.cos(phi), len, this.radius * Math.sin(phi));
            dir.set(0, 1, 0);
        }
    }]);

    return CylinderVolumeShellImpl;
}();
/**
 * 圆锥底圆内部
 */


var ConeImpl = function () {
    // tslint:disable-next-line:typedef
    function ConeImpl(config) {
        _classCallCheck(this, ConeImpl);

        this.radius = config.radius;
        this.angle = config.angle * Math.PI / 180;
        this.arc = config.arc * Math.PI / 180;
    }
    // tslint:disable-next-line:no-reserved-keywords


    _createClass(ConeImpl, [{
        key: "get",
        value: function get(pos, dir) {
            var phi = this.arc * Math.random();
            var r = this.radius * Math.random();
            pos.set(r * Math.cos(phi), 0, r * Math.sin(phi));
            dir.set(pos.x, pos.y + this.radius / Math.tan(this.angle), pos.z);
            dir.normalize();
        }
    }]);

    return ConeImpl;
}();
/**
 * 圆锥底圆周
 */


var ConeShellImpl = function () {
    // tslint:disable-next-line:typedef
    function ConeShellImpl(config) {
        _classCallCheck(this, ConeShellImpl);

        this.radius = config.radius;
        this.angle = config.angle * Math.PI / 180;
        this.arc = config.arc * Math.PI / 180;
    }
    // tslint:disable-next-line:no-reserved-keywords


    _createClass(ConeShellImpl, [{
        key: "get",
        value: function get(pos, dir) {
            var phi = this.arc * Math.random();
            pos.set(this.radius * Math.cos(phi), 0, this.radius * Math.sin(phi));
            dir.set(pos.x, pos.y + this.radius / Math.tan(this.angle), pos.z);
            dir.normalize();
        }
    }]);

    return ConeShellImpl;
}();
/**
 * 圆锥体内部
 */


var ConeVolumeImpl = function () {
    // tslint:disable-next-line:typedef
    function ConeVolumeImpl(config) {
        _classCallCheck(this, ConeVolumeImpl);

        this.radius = config.radius;
        this.length = config.length;
        this.angle = config.angle * Math.PI / 180;
        this.arc = config.arc * Math.PI / 180;
    }
    // tslint:disable-next-line:no-reserved-keywords


    _createClass(ConeVolumeImpl, [{
        key: "get",
        value: function get(pos, dir) {
            var phi = this.arc * Math.random();
            var offset = this.radius / Math.tan(this.angle);
            var y = offset + this.length * Math.random();
            var tmp = y * Math.tan(this.angle) * Math.random();
            pos.set(tmp * Math.cos(phi), y - offset, tmp * Math.sin(phi));
            dir.set(pos.x, pos.y + offset, pos.z);
            dir.normalize();
        }
    }]);

    return ConeVolumeImpl;
}();
/**
 * 圆锥面
 */


var ConeVolumeShellImpl = function () {
    // tslint:disable-next-line:typedef
    function ConeVolumeShellImpl(config) {
        _classCallCheck(this, ConeVolumeShellImpl);

        this.radius = config.radius;
        this.length = config.length;
        this.angle = config.angle * Math.PI / 180;
        this.arc = config.arc * Math.PI / 180;
    }
    // tslint:disable-next-line:no-reserved-keywords


    _createClass(ConeVolumeShellImpl, [{
        key: "get",
        value: function get(pos, dir) {
            var phi = this.arc * Math.random();
            var offset = this.radius / Math.tan(this.angle);
            var y = offset + this.length * Math.random();
            var tmp = y * Math.tan(this.angle);
            pos.set(tmp * Math.cos(phi), y - offset, tmp * Math.sin(phi));
            dir.set(pos.x, pos.y + offset, pos.z);
            dir.normalize();
        }
    }]);

    return ConeVolumeShellImpl;
}();

var ShapeModule = function () {
    // tslint:disable-next-line:typedef
    function ShapeModule(config) {
        _classCallCheck(this, ShapeModule);

        if (!tmp1) {
            tmp1 = new three_1.THREE.Vector3();
            tmp2 = new three_1.THREE.Vector3();
        }
        this.alignToDirection = config.alignToDirection;
        this.randomDirectionAmount = config.randomDirectionAmount;
        this.sphericalDirectionAmount = config.sphericalDirectionAmount;
        this.shapeType = config.shapeType;
        switch (this.shapeType) {
            case PSShapeType.Box:
                this.impl = new BoxImpl(config);
                break;
            case PSShapeType.BoxEdge:
                this.impl = new BoxEdgeImpl(config);
                break;
            case PSShapeType.BoxShell:
                this.impl = new BoxShellImpl(config);
                break;
            case PSShapeType.Sphere:
                this.sphericalDirectionAmount = 1;
                this.impl = new SphereImpl(config);
                break;
            case PSShapeType.SphereShell:
                this.sphericalDirectionAmount = 1;
                this.impl = new SphereShellImpl(config);
                break;
            case PSShapeType.Hemisphere:
                this.sphericalDirectionAmount = 1;
                this.impl = new HemisphereImpl(config);
                break;
            case PSShapeType.HemisphereShell:
                this.sphericalDirectionAmount = 1;
                this.impl = new HemisphereShellImpl(config);
                break;
            case PSShapeType.Cone:
                if (Math.abs(config.angle) < 0.001) {
                    this.impl = new CylinderImpl(config);
                } else {
                    this.impl = new ConeImpl(config);
                }
                break;
            case PSShapeType.ConeShell:
                if (Math.abs(config.angle) < 0.001) {
                    this.impl = new CylinderShellImpl(config);
                } else {
                    this.impl = new ConeShellImpl(config);
                }
                break;
            case PSShapeType.ConeVolume:
                if (Math.abs(config.angle) < 0.001) {
                    this.impl = new CylinderVolumeImpl(config);
                } else {
                    this.impl = new ConeVolumeImpl(config);
                }
                break;
            case PSShapeType.ConeVolumeShell:
                if (Math.abs(config.angle) < 0.001) {
                    this.impl = new CylinderVolumeShellImpl(config);
                } else {
                    this.impl = new ConeVolumeShellImpl(config);
                }
                break;
            default:
                throw new Error('Not Implementation !');
        }
    }
    // tslint:disable-next-line:no-reserved-keywords


    _createClass(ShapeModule, [{
        key: "get",
        value: function get(pos, dir) {
            this.impl && this.impl.get(pos, dir);
            dir.set(0, 0, 1);
            if (this.randomDirectionAmount > 0) {
                tmp1.copy(dir);
                tmp2.set(Math.random(), Math.random(), Math.random());
                tmp2.normalize();
                dir.lerpVectors(tmp1, tmp2, this.randomDirectionAmount);
                dir.normalize();
            }
            if (this.sphericalDirectionAmount > 0) {
                tmp1.copy(dir);
                tmp2.copy(pos);
                tmp2.normalize();
                dir.lerpVectors(tmp1, tmp2, this.sphericalDirectionAmount);
                dir.normalize();
            }
        }
    }]);

    return ShapeModule;
}();

exports.ShapeModule = ShapeModule;
})