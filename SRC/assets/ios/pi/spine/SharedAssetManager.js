_$define("pi/spine/SharedAssetManager", function (require, exports, module){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/******************************************************************************
 * Spine Runtimes Software License v2.5
 *
 * Copyright (c) 2013-2016, Esoteric Software
 * All rights reserved.
 *
 * You are granted a perpetual, non-exclusive, non-sublicensable, and
 * non-transferable license to use, install, execute, and perform the Spine
 * Runtimes software and derivative works solely for personal or internal
 * use. Without the written permission of Esoteric Software (see Section 2 of
 * the Spine Software License Agreement), you may not (a) modify, translate,
 * adapt, or develop new applications using the Spine Runtimes or otherwise
 * create derivative works or improvements of the Spine Runtimes or (b) remove,
 * delete, alter, or obscure any trademarks or any copyright, trademark, patent,
 * or other intellectual property or proprietary rights notices on or in the
 * Software, including any copy thereof. Redistributions in binary or source
 * form must include this license and terms.
 *
 * THIS SOFTWARE IS PROVIDED BY ESOTERIC SOFTWARE "AS IS" AND ANY EXPRESS OR
 * IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO
 * EVENT SHALL ESOTERIC SOFTWARE BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
 * PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES, BUSINESS INTERRUPTION, OR LOSS OF
 * USE, DATA, OR PROFITS) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER
 * IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 *****************************************************************************/
var spine;
(function (spine) {
    var Assets = function () {
        function Assets(clientId) {
            _classCallCheck(this, Assets);

            this.toLoad = new Array();
            this.assets = {};
            this.clientId = clientId;
        }

        _createClass(Assets, [{
            key: "loaded",
            value: function loaded() {
                var i = 0;
                for (var v in this.assets) {
                    i++;
                }return i;
            }
        }]);

        return Assets;
    }();

    var SharedAssetManager = function () {
        function SharedAssetManager() {
            var pathPrefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

            _classCallCheck(this, SharedAssetManager);

            this.clientAssets = {};
            this.queuedAssets = {};
            this.rawAssets = {};
            this.errors = {};
            this.pathPrefix = pathPrefix;
        }

        _createClass(SharedAssetManager, [{
            key: "queueAsset",
            value: function queueAsset(clientId, textureLoader, path) {
                var clientAssets = this.clientAssets[clientId];
                if (clientAssets === null || clientAssets === undefined) {
                    clientAssets = new Assets(clientId);
                    this.clientAssets[clientId] = clientAssets;
                }
                if (textureLoader !== null) clientAssets.textureLoader = textureLoader;
                clientAssets.toLoad.push(path);
                // check if already queued, in which case we can skip actual
                // loading
                if (this.queuedAssets[path] === path) {
                    return false;
                } else {
                    this.queuedAssets[path] = path;
                    return true;
                }
            }
        }, {
            key: "loadText",
            value: function loadText(clientId, path) {
                var _this = this;

                path = this.pathPrefix + path;
                if (!this.queueAsset(clientId, null, path)) return;
                var request = new XMLHttpRequest();
                request.onreadystatechange = function () {
                    if (request.readyState == XMLHttpRequest.DONE) {
                        if (request.status >= 200 && request.status < 300) {
                            _this.rawAssets[path] = request.responseText;
                        } else {
                            _this.errors[path] = "Couldn't load text " + path + ": status " + request.status + ", " + request.responseText;
                        }
                    }
                };
                request.open("GET", path, true);
                request.send();
            }
        }, {
            key: "loadJson",
            value: function loadJson(clientId, path) {
                var _this2 = this;

                path = this.pathPrefix + path;
                if (!this.queueAsset(clientId, null, path)) return;
                var request = new XMLHttpRequest();
                request.onreadystatechange = function () {
                    if (request.readyState == XMLHttpRequest.DONE) {
                        if (request.status >= 200 && request.status < 300) {
                            _this2.rawAssets[path] = JSON.parse(request.responseText);
                        } else {
                            _this2.errors[path] = "Couldn't load text " + path + ": status " + request.status + ", " + request.responseText;
                        }
                    }
                };
                request.open("GET", path, true);
                request.send();
            }
        }, {
            key: "loadTexture",
            value: function loadTexture(clientId, textureLoader, path) {
                var _this3 = this;

                path = this.pathPrefix + path;
                if (!this.queueAsset(clientId, textureLoader, path)) return;
                var img = new Image();
                img.decoding = "async";
                img.crossOrigin = "anonymous";
                img.onload = function (ev) {
                    _this3.rawAssets[path] = img;
                };
                img.onerror = function (ev) {
                    _this3.errors[path] = "Couldn't load image " + path;
                };
                img.src = path;
            }
        }, {
            key: "get",
            value: function get(clientId, path) {
                path = this.pathPrefix + path;
                var clientAssets = this.clientAssets[clientId];
                if (clientAssets === null || clientAssets === undefined) return true;
                return clientAssets.assets[path];
            }
        }, {
            key: "updateClientAssets",
            value: function updateClientAssets(clientAssets) {
                for (var i = 0; i < clientAssets.toLoad.length; i++) {
                    var path = clientAssets.toLoad[i];
                    var asset = clientAssets.assets[path];
                    if (asset === null || asset === undefined) {
                        var rawAsset = this.rawAssets[path];
                        if (rawAsset === null || rawAsset === undefined) continue;
                        if (rawAsset instanceof HTMLImageElement) {
                            clientAssets.assets[path] = clientAssets.textureLoader(rawAsset);
                        } else {
                            clientAssets.assets[path] = rawAsset;
                        }
                    }
                }
            }
        }, {
            key: "isLoadingComplete",
            value: function isLoadingComplete(clientId) {
                var clientAssets = this.clientAssets[clientId];
                if (clientAssets === null || clientAssets === undefined) return true;
                this.updateClientAssets(clientAssets);
                return clientAssets.toLoad.length == clientAssets.loaded();
            }
            /*remove (clientId: string, path: string) {
                path = this.pathPrefix + path;
                let asset = this.assets[path];
                if ((<any>asset).dispose) (<any>asset).dispose();
                this.assets[path] = null;
            }
             removeAll () {
                for (let key in this.assets) {
                    let asset = this.assets[key];
                    if ((<any>asset).dispose) (<any>asset).dispose();
                }
                this.assets = {};
            }*/

        }, {
            key: "dispose",
            value: function dispose() {
                // this.removeAll();
            }
        }, {
            key: "hasErrors",
            value: function hasErrors() {
                return Object.keys(this.errors).length > 0;
            }
        }, {
            key: "getErrors",
            value: function getErrors() {
                return this.errors;
            }
        }]);

        return SharedAssetManager;
    }();

    spine.SharedAssetManager = SharedAssetManager;
})(spine || (spine = {}));
})