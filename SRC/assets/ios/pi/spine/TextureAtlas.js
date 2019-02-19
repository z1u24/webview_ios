_$define("pi/spine/TextureAtlas", function (require, exports, module){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
    var TextureAtlas = function () {
        function TextureAtlas(atlasText, textureLoader) {
            _classCallCheck(this, TextureAtlas);

            this.pages = new Array();
            this.regions = new Array();
            this.load(atlasText, textureLoader);
        }

        _createClass(TextureAtlas, [{
            key: "load",
            value: function load(atlasText, textureLoader) {
                if (textureLoader == null) throw new Error("textureLoader cannot be null.");
                var reader = new TextureAtlasReader(atlasText);
                var tuple = new Array(4);
                var page = null;
                while (true) {
                    var line = reader.readLine();
                    if (line == null) break;
                    line = line.trim();
                    if (line.length == 0) page = null;else if (!page) {
                        page = new TextureAtlasPage();
                        page.name = line;
                        if (reader.readTuple(tuple) == 2) {
                            // size is only optional for an atlas packed with an old TexturePacker.
                            page.width = parseInt(tuple[0]);
                            page.height = parseInt(tuple[1]);
                            reader.readTuple(tuple);
                        }
                        // page.format = Format[tuple[0]]; we don't need format in WebGL
                        reader.readTuple(tuple);
                        page.minFilter = Texture.filterFromString(tuple[0]);
                        page.magFilter = Texture.filterFromString(tuple[1]);
                        var direction = reader.readValue();
                        page.uWrap = TextureWrap.ClampToEdge;
                        page.vWrap = TextureWrap.ClampToEdge;
                        if (direction == "x") page.uWrap = TextureWrap.Repeat;else if (direction == "y") page.vWrap = TextureWrap.Repeat;else if (direction == "xy") page.uWrap = page.vWrap = TextureWrap.Repeat;
                        page.texture = textureLoader(line);
                        page.texture.setFilters(page.minFilter, page.magFilter);
                        page.texture.setWraps(page.uWrap, page.vWrap);
                        page.width = page.texture.getImage().width;
                        page.height = page.texture.getImage().height;
                        this.pages.push(page);
                    } else {
                        var region = new TextureAtlasRegion();
                        region.name = line;
                        region.page = page;
                        region.rotate = reader.readValue() == "true";
                        reader.readTuple(tuple);
                        var x = parseInt(tuple[0]);
                        var y = parseInt(tuple[1]);
                        reader.readTuple(tuple);
                        var width = parseInt(tuple[0]);
                        var height = parseInt(tuple[1]);
                        region.u = x / page.width;
                        region.v = y / page.height;
                        if (region.rotate) {
                            region.u2 = (x + height) / page.width;
                            region.v2 = (y + width) / page.height;
                        } else {
                            region.u2 = (x + width) / page.width;
                            region.v2 = (y + height) / page.height;
                        }
                        region.x = x;
                        region.y = y;
                        region.width = Math.abs(width);
                        region.height = Math.abs(height);
                        if (reader.readTuple(tuple) == 4) {
                            // split is optional
                            // region.splits = new Vector.<int>(parseInt(tuple[0]), parseInt(tuple[1]), parseInt(tuple[2]), parseInt(tuple[3]));
                            if (reader.readTuple(tuple) == 4) {
                                // pad is optional, but only present with splits
                                //region.pads = Vector.<int>(parseInt(tuple[0]), parseInt(tuple[1]), parseInt(tuple[2]), parseInt(tuple[3]));
                                reader.readTuple(tuple);
                            }
                        }
                        region.originalWidth = parseInt(tuple[0]);
                        region.originalHeight = parseInt(tuple[1]);
                        reader.readTuple(tuple);
                        region.offsetX = parseInt(tuple[0]);
                        region.offsetY = parseInt(tuple[1]);
                        region.index = parseInt(reader.readValue());
                        region.texture = page.texture;
                        this.regions.push(region);
                    }
                }
            }
        }, {
            key: "findRegion",
            value: function findRegion(name) {
                for (var i = 0; i < this.regions.length; i++) {
                    if (this.regions[i].name == name) {
                        return this.regions[i];
                    }
                }
                return null;
            }
        }, {
            key: "dispose",
            value: function dispose() {
                for (var i = 0; i < this.pages.length; i++) {
                    this.pages[i].texture.dispose();
                }
            }
        }]);

        return TextureAtlas;
    }();

    spine.TextureAtlas = TextureAtlas;

    var TextureAtlasReader = function () {
        function TextureAtlasReader(text) {
            _classCallCheck(this, TextureAtlasReader);

            this.index = 0;
            this.lines = text.split(/\r\n|\r|\n/);
        }

        _createClass(TextureAtlasReader, [{
            key: "readLine",
            value: function readLine() {
                if (this.index >= this.lines.length) return null;
                return this.lines[this.index++];
            }
        }, {
            key: "readValue",
            value: function readValue() {
                var line = this.readLine();
                var colon = line.indexOf(":");
                if (colon == -1) throw new Error("Invalid line: " + line);
                return line.substring(colon + 1).trim();
            }
        }, {
            key: "readTuple",
            value: function readTuple(tuple) {
                var line = this.readLine();
                var colon = line.indexOf(":");
                if (colon == -1) throw new Error("Invalid line: " + line);
                var i = 0,
                    lastMatch = colon + 1;
                for (; i < 3; i++) {
                    var comma = line.indexOf(",", lastMatch);
                    if (comma == -1) break;
                    tuple[i] = line.substr(lastMatch, comma - lastMatch).trim();
                    lastMatch = comma + 1;
                }
                tuple[i] = line.substring(lastMatch).trim();
                return i + 1;
            }
        }]);

        return TextureAtlasReader;
    }();

    var TextureAtlasPage = function TextureAtlasPage() {
        _classCallCheck(this, TextureAtlasPage);
    };

    spine.TextureAtlasPage = TextureAtlasPage;

    var TextureAtlasRegion = function (_TextureRegion) {
        _inherits(TextureAtlasRegion, _TextureRegion);

        function TextureAtlasRegion() {
            _classCallCheck(this, TextureAtlasRegion);

            return _possibleConstructorReturn(this, (TextureAtlasRegion.__proto__ || Object.getPrototypeOf(TextureAtlasRegion)).apply(this, arguments));
        }

        return TextureAtlasRegion;
    }(TextureRegion);

    spine.TextureAtlasRegion = TextureAtlasRegion;
})(spine || (spine = {}));
})