_$define("pi/spine/AtlasAttachmentLoader", function (require, exports, module){
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
    var AtlasAttachmentLoader = function () {
        function AtlasAttachmentLoader(atlas) {
            _classCallCheck(this, AtlasAttachmentLoader);

            this.atlas = atlas;
        }
        /** @return May be null to not load an attachment. */


        _createClass(AtlasAttachmentLoader, [{
            key: "newRegionAttachment",
            value: function newRegionAttachment(skin, name, path) {
                var region = this.atlas.findRegion(path);
                if (region == null) throw new Error("Region not found in atlas: " + path + " (region attachment: " + name + ")");
                region.renderObject = region;
                var attachment = new RegionAttachment(name);
                attachment.setRegion(region);
                return attachment;
            }
            /** @return May be null to not load an attachment. */

        }, {
            key: "newMeshAttachment",
            value: function newMeshAttachment(skin, name, path) {
                var region = this.atlas.findRegion(path);
                if (region == null) throw new Error("Region not found in atlas: " + path + " (mesh attachment: " + name + ")");
                region.renderObject = region;
                var attachment = new MeshAttachment(name);
                attachment.region = region;
                return attachment;
            }
            /** @return May be null to not load an attachment. */

        }, {
            key: "newBoundingBoxAttachment",
            value: function newBoundingBoxAttachment(skin, name) {
                return new BoundingBoxAttachment(name);
            }
            /** @return May be null to not load an attachment */

        }, {
            key: "newPathAttachment",
            value: function newPathAttachment(skin, name) {
                return new PathAttachment(name);
            }
        }, {
            key: "newPointAttachment",
            value: function newPointAttachment(skin, name) {
                return new PointAttachment(name);
            }
        }, {
            key: "newClippingAttachment",
            value: function newClippingAttachment(skin, name) {
                return new ClippingAttachment(name);
            }
        }]);

        return AtlasAttachmentLoader;
    }();

    spine.AtlasAttachmentLoader = AtlasAttachmentLoader;
})(spine || (spine = {}));
})