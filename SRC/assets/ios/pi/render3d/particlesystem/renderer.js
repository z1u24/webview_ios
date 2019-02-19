_$define("pi/render3d/particlesystem/renderer", function (require, exports, module){
"use strict";
/**
 *
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var load_1 = require("../load");
var three_1 = require("../three");

var RendererModule = function () {
    // tslint:disable-next-line:typedef
    function RendererModule(config, renderer, resTab) {
        _classCallCheck(this, RendererModule);

        if (!config.meshRender) return;
        var geo = config.geometry;
        if (geo.type === 'BufferGeometry') {
            this.mesh = load_1.newloadMesh(renderer, config.geometry, config.meshRender, resTab);
        } else if (geo.type === 'Plane') {
            this.mesh = load_1.newloadPlane(renderer, geo, config.meshRender, resTab);
        } else {
            this.mesh = load_1.newloadShape(renderer, geo, config.meshRender, resTab);
        }
    }

    _createClass(RendererModule, [{
        key: "update",
        value: function update() {
            if (this.geometry && this.map) {
                return true;
            }
            if (!this.geometry && this.mesh.geometry) {
                this.geometry = this.mesh.geometry;
            }
            if (!this.map && this.mesh.material && this.mesh.material[0].map) {
                this.map = this.mesh.material[0].map;
                if (!(this.map instanceof three_1.THREE.Texture)) {
                    this.map = undefined;
                }
            }
            return this.geometry && this.map;
        }
    }]);

    return RendererModule;
}();

exports.RendererModule = RendererModule;
})