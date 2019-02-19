_$define("pi/spine/AssetManager", function (require, exports, module){
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
    var AssetManager = function () {
        function AssetManager(textureLoader) {
            var pathPrefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

            _classCallCheck(this, AssetManager);

            this.assets = {};
            this.errors = {};
            this.toLoad = 0;
            this.loaded = 0;
            this.textureLoader = textureLoader;
            this.pathPrefix = pathPrefix;
        }

        _createClass(AssetManager, [{
            key: "loadText",
            value: function loadText(path) {
                var _this = this;

                var success = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
                var error = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

                path = this.pathPrefix + path;
                this.toLoad++;
                AssetManager.downloadText(path, function (data) {
                    _this.assets[path] = data;
                    if (success) success(path, data);
                    _this.toLoad--;
                    _this.loaded++;
                }, function (state, responseText) {
                    _this.errors[path] = "Couldn't load text " + path + ": status " + status + ", " + responseText;
                    if (error) error(path, "Couldn't load text " + path + ": status " + status + ", " + responseText);
                    _this.toLoad--;
                    _this.loaded++;
                });
            }
        }, {
            key: "loadTexture",
            value: function loadTexture(path) {
                var _this2 = this;

                var success = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
                var error = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

                path = this.pathPrefix + path;
                this.toLoad++;
                var img = new Image();
                img.decoding = "async";
                img.crossOrigin = "anonymous";
                img.onload = function (ev) {
                    var texture = _this2.textureLoader(img);
                    _this2.assets[path] = texture;
                    _this2.toLoad--;
                    _this2.loaded++;
                    if (success) success(path, img);
                };
                img.onerror = function (ev) {
                    _this2.errors[path] = "Couldn't load image " + path;
                    _this2.toLoad--;
                    _this2.loaded++;
                    if (error) error(path, "Couldn't load image " + path);
                };
                img.src = path;
            }
        }, {
            key: "loadTextureData",
            value: function loadTextureData(path, data) {
                var _this3 = this;

                var success = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
                var error = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

                path = this.pathPrefix + path;
                this.toLoad++;
                var img = new Image();
                img.decoding = "async";
                img.onload = function (ev) {
                    var texture = _this3.textureLoader(img);
                    _this3.assets[path] = texture;
                    _this3.toLoad--;
                    _this3.loaded++;
                    if (success) success(path, img);
                };
                img.onerror = function (ev) {
                    _this3.errors[path] = "Couldn't load image " + path;
                    _this3.toLoad--;
                    _this3.loaded++;
                    if (error) error(path, "Couldn't load image " + path);
                };
                img.src = data;
            }
        }, {
            key: "loadTextureAtlas",
            value: function loadTextureAtlas(path) {
                var _this4 = this;

                var success = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
                var error = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

                var parent = path.lastIndexOf("/") >= 0 ? path.substring(0, path.lastIndexOf("/")) : "";
                path = this.pathPrefix + path;
                this.toLoad++;
                AssetManager.downloadText(path, function (atlasData) {
                    var pagesLoaded = { count: 0 };
                    var atlasPages = new Array();
                    try {
                        var atlas = new spine.TextureAtlas(atlasData, function (path) {
                            atlasPages.push(parent + "/" + path);
                            var image = document.createElement("img");
                            image.width = 16;
                            image.height = 16;
                            return new spine.FakeTexture(image);
                        });
                    } catch (e) {
                        var ex = e;
                        _this4.errors[path] = "Couldn't load texture atlas " + path + ": " + ex.message;
                        if (error) error(path, "Couldn't load texture atlas " + path + ": " + ex.message);
                        _this4.toLoad--;
                        _this4.loaded++;
                        return;
                    }

                    var _loop = function _loop() {
                        if (_isArray) {
                            if (_i >= _iterator.length) return "break";
                            _ref = _iterator[_i++];
                        } else {
                            _i = _iterator.next();
                            if (_i.done) return "break";
                            _ref = _i.value;
                        }

                        var atlasPage = _ref;

                        var pageLoadError = false;
                        _this4.loadTexture(atlasPage, function (imagePath, image) {
                            pagesLoaded.count++;
                            if (pagesLoaded.count == atlasPages.length) {
                                if (!pageLoadError) {
                                    try {
                                        var _atlas = new spine.TextureAtlas(atlasData, function (path) {
                                            return _this4.get(parent + "/" + path);
                                        });
                                        _this4.assets[path] = _atlas;
                                        if (success) success(path, _atlas);
                                        _this4.toLoad--;
                                        _this4.loaded++;
                                    } catch (e) {
                                        var _ex = e;
                                        _this4.errors[path] = "Couldn't load texture atlas " + path + ": " + _ex.message;
                                        if (error) error(path, "Couldn't load texture atlas " + path + ": " + _ex.message);
                                        _this4.toLoad--;
                                        _this4.loaded++;
                                    }
                                } else {
                                    _this4.errors[path] = "Couldn't load texture atlas page " + imagePath + "} of atlas " + path;
                                    if (error) error(path, "Couldn't load texture atlas page " + imagePath + " of atlas " + path);
                                    _this4.toLoad--;
                                    _this4.loaded++;
                                }
                            }
                        }, function (imagePath, errorMessage) {
                            pageLoadError = true;
                            pagesLoaded.count++;
                            if (pagesLoaded.count == atlasPages.length) {
                                _this4.errors[path] = "Couldn't load texture atlas page " + imagePath + "} of atlas " + path;
                                if (error) error(path, "Couldn't load texture atlas page " + imagePath + " of atlas " + path);
                                _this4.toLoad--;
                                _this4.loaded++;
                            }
                        });
                    };

                    for (var _iterator = atlasPages, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
                        var _ref;

                        var _ret = _loop();

                        if (_ret === "break") break;
                    }
                }, function (state, responseText) {
                    _this4.errors[path] = "Couldn't load texture atlas " + path + ": status " + status + ", " + responseText;
                    if (error) error(path, "Couldn't load texture atlas " + path + ": status " + status + ", " + responseText);
                    _this4.toLoad--;
                    _this4.loaded++;
                });
            }
        }, {
            key: "get",
            value: function get(path) {
                path = this.pathPrefix + path;
                return this.assets[path];
            }
        }, {
            key: "remove",
            value: function remove(path) {
                path = this.pathPrefix + path;
                var asset = this.assets[path];
                if (asset.dispose) asset.dispose();
                this.assets[path] = null;
            }
        }, {
            key: "removeAll",
            value: function removeAll() {
                for (var key in this.assets) {
                    var asset = this.assets[key];
                    if (asset.dispose) asset.dispose();
                }
                this.assets = {};
            }
        }, {
            key: "isLoadingComplete",
            value: function isLoadingComplete() {
                return this.toLoad == 0;
            }
        }, {
            key: "getToLoad",
            value: function getToLoad() {
                return this.toLoad;
            }
        }, {
            key: "getLoaded",
            value: function getLoaded() {
                return this.loaded;
            }
        }, {
            key: "dispose",
            value: function dispose() {
                this.removeAll();
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
        }], [{
            key: "downloadText",
            value: function downloadText(url, success, error) {
                var request = new XMLHttpRequest();
                request.open("GET", url, true);
                request.onload = function () {
                    if (request.status == 200) {
                        success(request.responseText);
                    } else {
                        error(request.status, request.responseText);
                    }
                };
                request.onerror = function () {
                    error(request.status, request.responseText);
                };
                request.send();
            }
        }, {
            key: "downloadBinary",
            value: function downloadBinary(url, success, error) {
                var request = new XMLHttpRequest();
                request.open("GET", url, true);
                request.responseType = "arraybuffer";
                request.onload = function () {
                    if (request.status == 200) {
                        success(new Uint8Array(request.response));
                    } else {
                        error(request.status, request.responseText);
                    }
                };
                request.onerror = function () {
                    error(request.status, request.responseText);
                };
                request.send();
            }
        }]);

        return AssetManager;
    }();

    spine.AssetManager = AssetManager;
})(spine || (spine = {}));
})