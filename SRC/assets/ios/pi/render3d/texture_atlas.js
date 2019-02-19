_$define("pi/render3d/texture_atlas", function (require, exports, module){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var three_1 = require("./three");
/**
 * 构建纹理图集
 */

var TextureAtlas = function () {
    function TextureAtlas(atlasText) {
        _classCallCheck(this, TextureAtlas);

        this.pages = new Array();
        this.regions = new Array();
        this.load(atlasText);
    }

    _createClass(TextureAtlas, [{
        key: "load",
        value: function load(atlasText) {
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
                    // page.texture = textureLoader(line, page.width, page.height);
                    // page.texture.setFilters(page.minFilter, page.magFilter);
                    // page.texture.setWraps(page.uWrap, page.vWrap);
                    // page.width = page.texture.getImage().width;
                    // page.height = page.texture.getImage().height;
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
                    // region.texture = page.texture;
                    this.regions.push(region);
                }
            }
        }
        /**
         * 所需图片加载成功后，调用设置 纹理
         * @param f     获取纹理的方法
         * @param res   资源表
         */

    }, {
        key: "setPageAndRegionTexture",
        value: function setPageAndRegionTexture(f, res) {
            this.pages.forEach(function (element) {
                if (element) {
                    element.texture = f(element.name, res, element.width, element.height);
                    element.texture.setFilters(element.minFilter, element.magFilter);
                    element.texture.setWraps(element.uWrap, element.vWrap);
                }
            });
            // for ( let i=0, l=arr.length; i<l; i++){
            //     this.pages[i].texture = arr[i];
            //     this.pages[i].texture.setFilters(this.pages[i].minFilter, this.pages[i].magFilter);
            //     this.pages[i].texture.setWraps(this.pages[i].uWrap, this.pages[i].vWrap);
            // }
            this.regions.forEach(function (element) {
                element && (element.texture = element.page.texture);
            });
        }
        /**
         * 所需图片加载成功后，调用设置 纹理
         * @param arrTexture   纹理表
         */

    }, {
        key: "setPageAndRegionTexture2",
        value: function setPageAndRegionTexture2(arrTexture) {
            for (var i = 0, l = this.pages.length; i < l; i++) {
                var texture = arrTexture["" + this.pages[i].name];
                var image = texture.image;
                this.pages[i].texture = new ThreeJsTexture(image, texture);
                this.pages[i].texture.setFilters(this.pages[i].minFilter, this.pages[i].magFilter);
                this.pages[i].texture.setWraps(this.pages[i].uWrap, this.pages[i].vWrap);
            }
            this.regions.forEach(function (element) {
                element && (element.texture = element.page.texture);
            });
        }
    }, {
        key: "findRegion",
        value: function findRegion(name) {
            for (var i = this.regions.length - 1; i >= 0; i--) {
                if (this.regions[i].name == name) {
                    return this.regions[i];
                }
            }
            return null;
        }
    }, {
        key: "dispose",
        value: function dispose() {
            for (var i = this.pages.length - 1; i >= 0; i--) {
                this.pages[i].texture.dispose();
            }
        }
    }]);

    return TextureAtlas;
}();

exports.TextureAtlas = TextureAtlas;

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

var Texture = function () {
    function Texture(image) {
        _classCallCheck(this, Texture);

        this._image = image;
    }

    _createClass(Texture, [{
        key: "getImage",
        value: function getImage() {
            return this._image;
        }
    }], [{
        key: "filterFromString",
        value: function filterFromString(text) {
            switch (text.toLowerCase()) {
                case "nearest":
                    return TextureFilter.Nearest;
                case "linear":
                    return TextureFilter.Linear;
                case "mipmap":
                    return TextureFilter.MipMap;
                case "mipmapnearestnearest":
                    return TextureFilter.MipMapNearestNearest;
                case "mipmaplinearnearest":
                    return TextureFilter.MipMapLinearNearest;
                case "mipmapnearestlinear":
                    return TextureFilter.MipMapNearestLinear;
                case "mipmaplinearlinear":
                    return TextureFilter.MipMapLinearLinear;
                default:
                    throw new Error("Unknown texture filter " + text);
            }
        }
    }, {
        key: "wrapFromString",
        value: function wrapFromString(text) {
            switch (text.toLowerCase()) {
                case "mirroredtepeat":
                    return TextureWrap.MirroredRepeat;
                case "clamptoedge":
                    return TextureWrap.ClampToEdge;
                case "repeat":
                    return TextureWrap.Repeat;
                default:
                    throw new Error("Unknown texture wrap " + text);
            }
        }
    }]);

    return Texture;
}();

exports.Texture = Texture;

var ThreeJsTexture = function (_Texture) {
    _inherits(ThreeJsTexture, _Texture);

    function ThreeJsTexture(image, texture) {
        _classCallCheck(this, ThreeJsTexture);

        var _this = _possibleConstructorReturn(this, (ThreeJsTexture.__proto__ || Object.getPrototypeOf(ThreeJsTexture)).call(this, image));

        _this.texture = texture || new three_1.THREE.Texture();
        _this.texture.image = image;
        _this.texture.flipY = false;
        _this.texture.needsUpdate = true;
        return _this;
    }

    _createClass(ThreeJsTexture, [{
        key: "setFilters",
        value: function setFilters(minFilter, magFilter) {
            this.texture.minFilter = ThreeJsTexture.toThreeJsTextureFilter(minFilter);
            this.texture.magFilter = ThreeJsTexture.toThreeJsTextureFilter(magFilter);
        }
    }, {
        key: "setWraps",
        value: function setWraps(uWrap, vWrap) {
            this.texture.wrapS = ThreeJsTexture.toThreeJsTextureWrap(uWrap);
            this.texture.wrapT = ThreeJsTexture.toThreeJsTextureWrap(vWrap);
        }
    }, {
        key: "dispose",
        value: function dispose() {
            // this.texture.dispose();
        }
    }], [{
        key: "toThreeJsTextureFilter",
        value: function toThreeJsTextureFilter(filter) {
            if (filter === TextureFilter.Linear) return three_1.THREE.LinearFilter;else if (filter === TextureFilter.MipMap) return three_1.THREE.LinearMipMapLinearFilter; // also includes TextureFilter.MipMapLinearLinear
            else if (filter === TextureFilter.MipMapLinearNearest) return three_1.THREE.LinearMipMapNearestFilter;else if (filter === TextureFilter.MipMapNearestLinear) return three_1.THREE.NearestMipMapLinearFilter;else if (filter === TextureFilter.MipMapNearestNearest) return three_1.THREE.NearestMipMapNearestFilter;else if (filter === TextureFilter.Nearest) return three_1.THREE.NearestFilter;else throw new Error("Unknown texture filter: " + filter);
        }
    }, {
        key: "toThreeJsTextureWrap",
        value: function toThreeJsTextureWrap(wrap) {
            if (wrap === TextureWrap.ClampToEdge) return three_1.THREE.ClampToEdgeWrapping;else if (wrap === TextureWrap.MirroredRepeat) return three_1.THREE.MirroredRepeatWrapping;else if (wrap === TextureWrap.Repeat) return three_1.THREE.RepeatWrapping;else throw new Error("Unknown texture wrap: " + wrap);
        }
    }]);

    return ThreeJsTexture;
}(Texture);

exports.ThreeJsTexture = ThreeJsTexture;

var TextureRegion = function TextureRegion() {
    _classCallCheck(this, TextureRegion);

    this.u = 0;
    this.v = 0;
    this.u2 = 0;
    this.v2 = 0;
    this.width = 0;
    this.height = 0;
    this.rotate = false;
    this.offsetX = 0;
    this.offsetY = 0;
    this.originalWidth = 0;
    this.originalHeight = 0;
};

exports.TextureRegion = TextureRegion;

var TextureAtlasPage = function TextureAtlasPage() {
    _classCallCheck(this, TextureAtlasPage);
};

exports.TextureAtlasPage = TextureAtlasPage;

var TextureAtlasRegion = function (_TextureRegion) {
    _inherits(TextureAtlasRegion, _TextureRegion);

    function TextureAtlasRegion() {
        _classCallCheck(this, TextureAtlasRegion);

        return _possibleConstructorReturn(this, (TextureAtlasRegion.__proto__ || Object.getPrototypeOf(TextureAtlasRegion)).apply(this, arguments));
    }

    return TextureAtlasRegion;
}(TextureRegion);

exports.TextureAtlasRegion = TextureAtlasRegion;
var TextureFilter;
(function (TextureFilter) {
    TextureFilter[TextureFilter["Nearest"] = 9728] = "Nearest";
    TextureFilter[TextureFilter["Linear"] = 9729] = "Linear";
    TextureFilter[TextureFilter["MipMap"] = 9987] = "MipMap";
    TextureFilter[TextureFilter["MipMapNearestNearest"] = 9984] = "MipMapNearestNearest";
    TextureFilter[TextureFilter["MipMapLinearNearest"] = 9985] = "MipMapLinearNearest";
    TextureFilter[TextureFilter["MipMapNearestLinear"] = 9986] = "MipMapNearestLinear";
    TextureFilter[TextureFilter["MipMapLinearLinear"] = 9987] = "MipMapLinearLinear"; // WebGLRenderingContext.LINEAR_MIPMAP_LINEAR
})(TextureFilter = exports.TextureFilter || (exports.TextureFilter = {}));
var TextureWrap;
(function (TextureWrap) {
    TextureWrap[TextureWrap["MirroredRepeat"] = 33648] = "MirroredRepeat";
    TextureWrap[TextureWrap["ClampToEdge"] = 33071] = "ClampToEdge";
    TextureWrap[TextureWrap["Repeat"] = 10497] = "Repeat"; // WebGLRenderingContext.REPEAT
})(TextureWrap = exports.TextureWrap || (exports.TextureWrap = {}));
})