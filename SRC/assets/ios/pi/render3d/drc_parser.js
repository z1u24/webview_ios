_$define("pi/render3d/drc_parser", function (require, exports, module){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var drc_decoder_1 = require("../polyfill/drc_decoder");
var three_1 = require("../render3d/three");
var DecoderModule = void 0;
var decoderType = {};
exports.decodeDrc = function (rawBuffer, attributeIdMap, callback, dracoDecoderType) {
    attributeIdMap = attributeIdMap || {};
    dracoDecoderType = dracoDecoderType ? dracoDecoderType : decoderType;
    // tslint:disable-next-line:no-invalid-this
    getDecoder(undefined, dracoDecoderType, function (dracoDecoder) {
        decodeDrcInternal(rawBuffer, attributeIdMap, dracoDecoder, callback);
    });
};
var decodeDrcInternal = function decodeDrcInternal(rawBuffer, attributeIdMap, dracoDecoder, callback) {
    var buffer = new dracoDecoder.DecoderBuffer();
    buffer.Init(new Int8Array(rawBuffer), rawBuffer.byteLength);
    var decoder = new dracoDecoder.Decoder();
    var geometryType = decoder.GetEncodedGeometryType(buffer);
    if (geometryType !== dracoDecoder.TRIANGULAR_MESH) {
        throw new Error("drc_loader: \u7C7B\u578B\u4E0D\u652F\u6301");
    }
    callback(convertDracoGeometryTo3JS(dracoDecoder, decoder, geometryType, buffer, attributeIdMap));
};
var addAttributeToGeometry = function addAttributeToGeometry(geometry, name, attribute, attributeData, numPoints) {
    if (attribute.ptr === 0) {
        throw new Error("THREE.DRACOLoader: No attribute " + name);
    }
    var numComponents = attribute.num_components();
    var numValues = numPoints * numComponents;
    var buffer = void 0;
    buffer = new Float32Array(numValues);
    if (name === 'skinIndex') {
        for (var i = 0; i < numValues; i++) {
            buffer[i] = Math.round(attributeData.GetValue(i)); // skinIndex应该是整数
        }
    } else {
        for (var _i = 0; _i < numValues; _i++) {
            buffer[_i] = attributeData.GetValue(_i);
        }
    }
    geometry.addAttribute(name, new three_1.THREE.BufferAttribute(buffer, numComponents));
};
var convertDracoGeometryTo3JS = function convertDracoGeometryTo3JS(dracoDecoder, decoder, geometryType, buffer, attributeIdMap) {
    // tslint:disable-next-line:variable-name
    var start_time = performance.now();
    var dracoGeometry = new dracoDecoder.Mesh();
    var decodingStatus = decoder.DecodeBufferToMesh(buffer, dracoGeometry);
    if (!decodingStatus.ok() || dracoGeometry.ptr === 0) {
        dracoDecoder.destroy(decoder);
        dracoDecoder.destroy(dracoGeometry);
        throw new Error("THREE.DRACOLoader: Decoding failed: " + decodingStatus.error_msg());
    }
    // tslint:disable-next-line:variable-name
    var decode_end = performance.now();
    dracoDecoder.destroy(buffer);
    var numFaces = dracoGeometry.num_faces();
    var numPoints = dracoGeometry.num_points();
    var attributeData = void 0;
    var attribute = void 0;
    var geometry = new three_1.THREE.BufferGeometry();
    for (var name in attributeIdMap) {
        attribute = decoder.GetAttribute(dracoGeometry, attributeIdMap[name]);
        attributeData = new dracoDecoder.DracoFloat32Array();
        decoder.GetAttributeFloatForAllPoints(dracoGeometry, attribute, attributeData);
        addAttributeToGeometry(geometry, name, attribute, attributeData, numPoints);
        dracoDecoder.destroy(attributeData);
    }
    var numIndices = numFaces * 3;
    var indexBuffer = void 0;
    var ia = void 0;
    var firstIndex = void 0;
    indexBuffer = new Uint32Array(numIndices);
    ia = new dracoDecoder.DracoInt32Array();
    for (var i = 0; i < numFaces; ++i) {
        decoder.GetFaceFromMesh(dracoGeometry, i, ia);
        firstIndex = i * 3;
        indexBuffer[firstIndex] = ia.GetValue(0);
        indexBuffer[firstIndex + 1] = ia.GetValue(1);
        indexBuffer[firstIndex + 2] = ia.GetValue(2);
    }
    dracoDecoder.destroy(ia);
    if (numIndices < 65536) {
        var temp = indexBuffer;
        indexBuffer = new Uint16Array(temp.length);
        for (var _i2 = 0; _i2 < temp.length; _i2++) {
            indexBuffer[_i2] = temp[_i2];
        }
    }
    geometry.setIndex(new three_1.THREE.BufferAttribute(indexBuffer, 1));
    dracoDecoder.destroy(decoder);
    dracoDecoder.destroy(dracoGeometry);
    console.log("Decode time: " + (decode_end - start_time));
    console.log("Import time: " + (performance.now() - decode_end));
    return geometry;
};
var getDecoder = function () {
    var decoder = void 0;
    var decoderCreationCalled = false;
    return function (dracoDecoder, dracoDecoderType, loadCallback) {
        if (typeof decoder !== 'undefined') {
            // Module already initialized.
            if (typeof loadCallback !== 'undefined') {
                loadCallback(decoder);
            }
        } else {
            decoderCreationCalled = true;
            // tslint:disable-next-line:no-reserved-keywords
            dracoDecoderType.onModuleLoaded = function (module) {
                decoder = module;
                loadCallback(decoder);
            };
            DecoderModule = drc_decoder_1.CreateDecoderModule(dracoDecoderType);
        }
    };
}();
})