_$define("pi/render3d/particlesystem/ps", function (require, exports, module){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var three_1 = require("../three");
var particle_1 = require("./particle");
var util_1 = require("./util");
var emission_1 = require("./emission");
var main_1 = require("./main");
var renderer_1 = require("./renderer");
var shape_1 = require("./shape");
var texture_sheet_animation_1 = require("./texture_sheet_animation");
var color_lifetime_1 = require("./color_lifetime");
var rotation_lifetime_1 = require("./rotation_lifetime");
var size_lifetime_1 = require("./size_lifetime");
var velocity_lifetime_1 = require("./velocity_lifetime");
var force_1 = require("./force");
var force_lifetime_1 = require("./force_lifetime");
var inherit_velocity_1 = require("./inherit_velocity");
var limitvelocity_lifetime_1 = require("./limitvelocity_lifetime");
var color_speed_1 = require("./color_speed");
var rotation_speed_1 = require("./rotation_speed");
var size_speed_1 = require("./size_speed");
/**
 * 注：目前的粒子系统 不 支 持 以下模块
 *   inherit
 *   External Force 外部力
 *   Noise      噪音
 *   SubEmitter 子发射器
 *   Collision  碰撞
 *   Triggers
 *   Lights     光照
 *   Trails     拖尾
 *   Custom Data 用户数据
 */

var ParticleSystem = function (_three_1$THREE$Object) {
    _inherits(ParticleSystem, _three_1$THREE$Object);

    function ParticleSystem(config, scene, renderer, resTab) {
        _classCallCheck(this, ParticleSystem);

        var _this = _possibleConstructorReturn(this, (ParticleSystem.__proto__ || Object.getPrototypeOf(ParticleSystem)).call(this));

        var main = new main_1.MainModule(config.main);
        if (main.simulationSpace !== util_1.PSSimulationSpace.Local) {
            throw new Error('main.simulationSpace isn\'t PSSimulationSpace.Local');
        }
        _this.main = main;
        _this.psScene = scene;
        _this.resTab = resTab;
        _this.isStop = false;
        _this.totalTime = 0;
        _this.frees = [];
        _this.particles = [];
        _this.useAutoRandomSeed = config.useAutoRandomSeed;
        _this.randomSeed = _this.useAutoRandomSeed ? 0 : config.randomSeed;
        if (config.renderer) {
            _this.renderer = new renderer_1.RendererModule(config.renderer, renderer, resTab);
        }
        if (config.shape) {
            _this.shape = new shape_1.ShapeModule(config.shape);
        }
        if (config.emission) {
            _this.emission = new emission_1.EmissionModule(config.emission);
        }
        if (config.externalForces) {
            _this.externalForces = new force_1.ExternalForcesModule(config.externalForces);
        }
        if (config.textureSheetAnimation) {
            _this.textureSheetAnimation = new texture_sheet_animation_1.TextureSheetAnimationModule(config.textureSheetAnimation);
        }
        if (config.velocityOverLifetime) {
            _this.velocityOverLifetime = new velocity_lifetime_1.VelocityOverLifetimeModule(config.velocityOverLifetime);
        }
        if (config.rotationOverLifetime) {
            _this.rotationOverLifetime = new rotation_lifetime_1.RotationOverLifetimeModule(config.rotationOverLifetime);
        }
        if (config.sizeOverLifetime) {
            _this.sizeOverLifetime = new size_lifetime_1.SizeOverLifetimeModule(config.sizeOverLifetime);
        }
        if (config.colorOverLifetime) {
            _this.colorOverLifetime = new color_lifetime_1.ColorOverLifetimeModule(config.colorOverLifetime);
        }
        if (config.forceOverLifetime) {
            _this.forceOverLifetime = new force_lifetime_1.ForceOverLifetimeModule(config.forceOverLifetime);
        }
        if (config.inheritVelocity) {
            _this.inheritVelocity = new inherit_velocity_1.InheritVelocityModule(config.inheritVelocity);
        }
        if (config.limitVelocityOverLifetime) {
            _this.limitVelocityOverLifetime = new limitvelocity_lifetime_1.LimitVelocityOverLifetimeModule(config.limitVelocityOverLifetime);
        }
        if (config.colorBySpeed) {
            _this.colorBySpeed = new color_speed_1.ColorBySpeedModule(config.colorBySpeed);
        }
        if (config.rotationBySpeed) {
            _this.rotationBySpeed = new rotation_speed_1.RotationBySpeedModule(config.rotationBySpeed);
        }
        if (config.sizeBySpeed) {
            _this.sizeBySpeed = new size_speed_1.SizeBySpeedModule(config.sizeBySpeed);
        }
        return _this;
    }

    _createClass(ParticleSystem, [{
        key: "dispose",
        value: function dispose() {
            _get(ParticleSystem.prototype.__proto__ || Object.getPrototypeOf(ParticleSystem.prototype), "dispose", this).call(this);
            // this.geometry.dispose();
            for (var _iterator = this.particles, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
                var _ref;

                if (_isArray) {
                    if (_i >= _iterator.length) break;
                    _ref = _iterator[_i++];
                } else {
                    _i = _iterator.next();
                    if (_i.done) break;
                    _ref = _i.value;
                }

                var p = _ref;

                p.dispose();
            }
            for (var _iterator2 = this.frees, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
                var _ref2;

                if (_isArray2) {
                    if (_i2 >= _iterator2.length) break;
                    _ref2 = _iterator2[_i2++];
                } else {
                    _i2 = _iterator2.next();
                    if (_i2.done) break;
                    _ref2 = _i2.value;
                }

                var _p = _ref2;

                _p.dispose();
            }
        }
        // deltaTime的单位：秒

    }, {
        key: "update",
        value: function update(deltaTime) {
            var emission = this.emission;
            if (!emission || !this.renderer || this.isStop) {
                return;
            }
            if (!this.renderer.update()) {
                return;
            }
            deltaTime *= this.main.simulationSpeed;
            this.totalTime += deltaTime;
            // 更新
            var playTime = this.totalTime % this.main.duration;
            for (var i = 0; i < this.particles.length; ++i) {
                if (!this.particles[i].update(this.totalTime, deltaTime)) {
                    i = this.removePar(i);
                }
            }
            var delayTime = this.main.startDelay.getValue(playTime);
            if (this.totalTime < delayTime) {
                return;
            }
            if (this.main.loop || this.totalTime < delayTime + this.main.duration) {
                var maxCount = this.main.maxParticles - this.particles.length;
                if (maxCount < 0) maxCount = 0;
                var count = emission.update(this.totalTime, playTime, maxCount);
                this.createParticle(count, this.totalTime);
            } else {
                // 如果已经超出了发射器的生命周期，而且没有存活的粒子了，该粒子系统就可以停止播放了。
                if (this.particles.length === 0) {
                    this.isStop = true;
                }
            }
        }
    }, {
        key: "addSuccess",
        value: function addSuccess() {
            this.scene.animObjectMap.set(this.uuid, this);
        }
    }, {
        key: "createParticle",
        value: function createParticle(count, time) {
            var p = void 0;
            for (var i = 0; i < count; ++i) {
                if (this.frees.length > 0) {
                    p = this.frees.pop();
                    this.particles.push(p);
                } else {
                    p = new particle_1.Particle(this);
                    p.material = new three_1.THREE.MeshParticlesMaterial({ map: this.renderer.map });
                    var mat = this.renderer.mesh.material;
                    if (Array.isArray(mat)) {
                        mat = mat[0];
                    }
                    p.startTintColor.setRGBA(mat.tintColor.r, mat.tintColor.g, mat.tintColor.b, mat.tintOpacity);
                    p.material.copy(mat);
                    p.mesh = new three_1.THREE.Mesh(this.renderer.geometry, p.material);
                    this.particles.push(p);
                }
                this.add(p.mesh);
                p.init(time);
            }
        }
    }, {
        key: "removePar",
        value: function removePar(i) {
            var p = this.particles[i];
            this.frees.push(p);
            this.remove(p.mesh);
            this.particles[i] = this.particles[this.particles.length - 1];
            --this.particles.length;
            return i - 1;
        }
    }]);

    return ParticleSystem;
}(three_1.THREE.Object3D);

exports.ParticleSystem = ParticleSystem;
})