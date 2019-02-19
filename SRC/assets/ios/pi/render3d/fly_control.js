_$define("pi/render3d/fly_control", function (require, exports, module){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
 */
var three_1 = require("./three");

var FlyControl = function () {
    function FlyControl(target) {
        var movementSpeed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 80.0;
        var rollSpeed = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0.1;
        var dimension = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : { size: [1, 1], offset: [0, 0] };

        _classCallCheck(this, FlyControl);

        this.target = target;
        this.dimension = dimension;
        this.movementSpeed = movementSpeed;
        this.rollSpeed = rollSpeed;
        this.tmpQuaternion = new three_1.THREE.Quaternion();
        this.state = {
            x: 0,
            y: 0,
            z: 0,
            rx: 0,
            ry: 0
        };
        this.moveVector = new three_1.THREE.Vector3(0, 0, 0);
        this.rotationVector = new three_1.THREE.Vector3(0, 0, 0);
    }

    _createClass(FlyControl, [{
        key: "setRollSpeed",
        value: function setRollSpeed(rollSpeed) {
            this.rollSpeed = rollSpeed;
        }
    }, {
        key: "setMovementSpeed",
        value: function setMovementSpeed(movementSpeed) {
            this.movementSpeed = movementSpeed;
        }
    }, {
        key: "onMouseLDown",
        value: function onMouseLDown(event) {
            if (event.which === 1) {
                this.updateLastPos(event.clientX, event.clientY);
            }
        }
    }, {
        key: "onMouseMDown",
        value: function onMouseMDown(event) {
            if (event.which === 2) {
                this.updateLastPos(event.clientX, event.clientY);
            }
        }
    }, {
        key: "onMouseLMove",
        value: function onMouseLMove(event) {
            if (event.which !== 1) {
                return;
            }
            var xc = event.clientX - this.lastMouseX;
            var yc = event.clientY - this.lastMouseY;
            this.state.ry = xc;
            this.state.rx = yc;
            this.update();
            this.updateLastPos(event.clientX, event.clientY);
            this.restoreState();
        }
    }, {
        key: "onMouseMMove",
        value: function onMouseMMove(event) {
            if (event.which !== 2) {
                return;
            }
            var xc = event.clientX - this.lastMouseX;
            var yc = event.clientY - this.lastMouseY;
            this.state.x = xc;
            this.state.y = yc;
            this.update();
            this.updateLastPos(event.clientX, event.clientY);
            this.restoreState();
        }
    }, {
        key: "onMouseWheel",
        value: function onMouseWheel(event) {
            var dy = event.deltaY;
            this.state.z = dy;
            this.update();
            this.updateLastPos(event.clientX, event.clientY);
            this.restoreState();
        }
    }, {
        key: "update",
        value: function update() {
            var delta = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0.02;

            var moveMult = delta * this.movementSpeed;
            var rotMult = delta * this.rollSpeed;
            this.target.translateX(-this.state.x * moveMult);
            this.target.translateY(this.state.y * moveMult);
            this.target.translateZ(this.state.z * moveMult);
            this.target.rotation._x += this.state.rx * rotMult;
            this.target.rotation._y += this.state.ry * rotMult;
            // this.target.rotation._z += this.state.z * rotMult;
            this.target.quaternion.setFromEuler(this.target.rotation);
        }
    }, {
        key: "updateLastPos",
        value: function updateLastPos(x, y) {
            this.lastMouseX = x;
            this.lastMouseY = y;
        }
    }, {
        key: "restoreState",
        value: function restoreState() {
            this.state.x = 0;
            this.state.y = 0;
            this.state.z = 0;
            this.state.rx = 0;
            this.state.ry = 0;
        }
    }]);

    return FlyControl;
}();

exports.FlyControl = FlyControl;
})