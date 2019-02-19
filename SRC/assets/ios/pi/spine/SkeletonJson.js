_$define("pi/spine/SkeletonJson", function (require, exports, module){
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
    var SkeletonJson = function () {
        function SkeletonJson(attachmentLoader) {
            _classCallCheck(this, SkeletonJson);

            this.scale = 1;
            this.linkedMeshes = new Array();
            this.attachmentLoader = attachmentLoader;
        }

        _createClass(SkeletonJson, [{
            key: "readSkeletonData",
            value: function readSkeletonData(json) {
                var scale = this.scale;
                var skeletonData = new SkeletonData();
                var root = typeof json === "string" ? JSON.parse(json) : json;
                // Skeleton
                var skeletonMap = root.skeleton;
                if (skeletonMap != null) {
                    skeletonData.hash = skeletonMap.hash;
                    skeletonData.version = skeletonMap.spine;
                    skeletonData.width = skeletonMap.width;
                    skeletonData.height = skeletonMap.height;
                    skeletonData.fps = skeletonMap.fps;
                    skeletonData.imagesPath = skeletonMap.images;
                }
                // Bones
                if (root.bones) {
                    for (var i = 0; i < root.bones.length; i++) {
                        var boneMap = root.bones[i];
                        var parent = null;
                        var parentName = this.getValue(boneMap, "parent", null);
                        if (parentName != null) {
                            parent = skeletonData.findBone(parentName);
                            if (parent == null) throw new Error("Parent bone not found: " + parentName);
                        }
                        var data = new BoneData(skeletonData.bones.length, boneMap.name, parent);
                        data.length = this.getValue(boneMap, "length", 0) * scale;
                        data.x = this.getValue(boneMap, "x", 0) * scale;
                        data.y = this.getValue(boneMap, "y", 0) * scale;
                        data.rotation = this.getValue(boneMap, "rotation", 0);
                        data.scaleX = this.getValue(boneMap, "scaleX", 1);
                        data.scaleY = this.getValue(boneMap, "scaleY", 1);
                        data.shearX = this.getValue(boneMap, "shearX", 0);
                        data.shearY = this.getValue(boneMap, "shearY", 0);
                        data.transformMode = SkeletonJson.transformModeFromString(this.getValue(boneMap, "transform", "normal"));
                        skeletonData.bones.push(data);
                    }
                }
                // Slots.
                if (root.slots) {
                    for (var _i = 0; _i < root.slots.length; _i++) {
                        var slotMap = root.slots[_i];
                        var slotName = slotMap.name;
                        var boneName = slotMap.bone;
                        var boneData = skeletonData.findBone(boneName);
                        if (boneData == null) throw new Error("Slot bone not found: " + boneName);
                        var _data = new SlotData(skeletonData.slots.length, slotName, boneData);
                        var color = this.getValue(slotMap, "color", null);
                        if (color != null) _data.color.setFromString(color);
                        var dark = this.getValue(slotMap, "dark", null);
                        if (dark != null) {
                            _data.darkColor = new Color(1, 1, 1, 1);
                            _data.darkColor.setFromString(dark);
                        }
                        _data.attachmentName = this.getValue(slotMap, "attachment", null);
                        _data.blendMode = SkeletonJson.blendModeFromString(this.getValue(slotMap, "blend", "normal"));
                        skeletonData.slots.push(_data);
                    }
                }
                // IK constraints
                if (root.ik) {
                    for (var _i2 = 0; _i2 < root.ik.length; _i2++) {
                        var constraintMap = root.ik[_i2];
                        var _data2 = new IkConstraintData(constraintMap.name);
                        _data2.order = this.getValue(constraintMap, "order", 0);
                        for (var j = 0; j < constraintMap.bones.length; j++) {
                            var _boneName = constraintMap.bones[j];
                            var bone = skeletonData.findBone(_boneName);
                            if (bone == null) throw new Error("IK bone not found: " + _boneName);
                            _data2.bones.push(bone);
                        }
                        var targetName = constraintMap.target;
                        _data2.target = skeletonData.findBone(targetName);
                        if (_data2.target == null) throw new Error("IK target bone not found: " + targetName);
                        _data2.bendDirection = this.getValue(constraintMap, "bendPositive", true) ? 1 : -1;
                        _data2.mix = this.getValue(constraintMap, "mix", 1);
                        skeletonData.ikConstraints.push(_data2);
                    }
                }
                // Transform constraints.
                if (root.transform) {
                    for (var _i3 = 0; _i3 < root.transform.length; _i3++) {
                        var _constraintMap = root.transform[_i3];
                        var _data3 = new TransformConstraintData(_constraintMap.name);
                        _data3.order = this.getValue(_constraintMap, "order", 0);
                        for (var _j = 0; _j < _constraintMap.bones.length; _j++) {
                            var _boneName2 = _constraintMap.bones[_j];
                            var _bone = skeletonData.findBone(_boneName2);
                            if (_bone == null) throw new Error("Transform constraint bone not found: " + _boneName2);
                            _data3.bones.push(_bone);
                        }
                        var _targetName = _constraintMap.target;
                        _data3.target = skeletonData.findBone(_targetName);
                        if (_data3.target == null) throw new Error("Transform constraint target bone not found: " + _targetName);
                        _data3.local = this.getValue(_constraintMap, "local", false);
                        _data3.relative = this.getValue(_constraintMap, "relative", false);
                        _data3.offsetRotation = this.getValue(_constraintMap, "rotation", 0);
                        _data3.offsetX = this.getValue(_constraintMap, "x", 0) * scale;
                        _data3.offsetY = this.getValue(_constraintMap, "y", 0) * scale;
                        _data3.offsetScaleX = this.getValue(_constraintMap, "scaleX", 0);
                        _data3.offsetScaleY = this.getValue(_constraintMap, "scaleY", 0);
                        _data3.offsetShearY = this.getValue(_constraintMap, "shearY", 0);
                        _data3.rotateMix = this.getValue(_constraintMap, "rotateMix", 1);
                        _data3.translateMix = this.getValue(_constraintMap, "translateMix", 1);
                        _data3.scaleMix = this.getValue(_constraintMap, "scaleMix", 1);
                        _data3.shearMix = this.getValue(_constraintMap, "shearMix", 1);
                        skeletonData.transformConstraints.push(_data3);
                    }
                }
                // Path constraints.
                if (root.path) {
                    for (var _i4 = 0; _i4 < root.path.length; _i4++) {
                        var _constraintMap2 = root.path[_i4];
                        var _data4 = new PathConstraintData(_constraintMap2.name);
                        _data4.order = this.getValue(_constraintMap2, "order", 0);
                        for (var _j2 = 0; _j2 < _constraintMap2.bones.length; _j2++) {
                            var _boneName3 = _constraintMap2.bones[_j2];
                            var _bone2 = skeletonData.findBone(_boneName3);
                            if (_bone2 == null) throw new Error("Transform constraint bone not found: " + _boneName3);
                            _data4.bones.push(_bone2);
                        }
                        var _targetName2 = _constraintMap2.target;
                        _data4.target = skeletonData.findSlot(_targetName2);
                        if (_data4.target == null) throw new Error("Path target slot not found: " + _targetName2);
                        _data4.positionMode = SkeletonJson.positionModeFromString(this.getValue(_constraintMap2, "positionMode", "percent"));
                        _data4.spacingMode = SkeletonJson.spacingModeFromString(this.getValue(_constraintMap2, "spacingMode", "length"));
                        _data4.rotateMode = SkeletonJson.rotateModeFromString(this.getValue(_constraintMap2, "rotateMode", "tangent"));
                        _data4.offsetRotation = this.getValue(_constraintMap2, "rotation", 0);
                        _data4.position = this.getValue(_constraintMap2, "position", 0);
                        if (_data4.positionMode == PositionMode.Fixed) _data4.position *= scale;
                        _data4.spacing = this.getValue(_constraintMap2, "spacing", 0);
                        if (_data4.spacingMode == SpacingMode.Length || _data4.spacingMode == SpacingMode.Fixed) _data4.spacing *= scale;
                        _data4.rotateMix = this.getValue(_constraintMap2, "rotateMix", 1);
                        _data4.translateMix = this.getValue(_constraintMap2, "translateMix", 1);
                        skeletonData.pathConstraints.push(_data4);
                    }
                }
                // Skins.
                if (root.skins) {
                    for (var skinName in root.skins) {
                        var skinMap = root.skins[skinName];
                        var skin = new Skin(skinName);
                        for (var _slotName in skinMap) {
                            var slotIndex = skeletonData.findSlotIndex(_slotName);
                            if (slotIndex == -1) throw new Error("Slot not found: " + _slotName);
                            var _slotMap = skinMap[_slotName];
                            for (var entryName in _slotMap) {
                                var attachment = this.readAttachment(_slotMap[entryName], skin, slotIndex, entryName, skeletonData);
                                if (attachment != null) skin.addAttachment(slotIndex, entryName, attachment);
                            }
                        }
                        skeletonData.skins.push(skin);
                        if (skin.name == "default") skeletonData.defaultSkin = skin;
                    }
                }
                // Linked meshes.
                for (var _i5 = 0, n = this.linkedMeshes.length; _i5 < n; _i5++) {
                    var linkedMesh = this.linkedMeshes[_i5];
                    var _skin = linkedMesh.skin == null ? skeletonData.defaultSkin : skeletonData.findSkin(linkedMesh.skin);
                    if (_skin == null) throw new Error("Skin not found: " + linkedMesh.skin);
                    var _parent = _skin.getAttachment(linkedMesh.slotIndex, linkedMesh.parent);
                    if (_parent == null) throw new Error("Parent mesh not found: " + linkedMesh.parent);
                    linkedMesh.mesh.setParentMesh(_parent);
                    linkedMesh.mesh.updateUVs();
                }
                this.linkedMeshes.length = 0;
                // Events.
                if (root.events) {
                    for (var eventName in root.events) {
                        var eventMap = root.events[eventName];
                        var _data5 = new EventData(eventName);
                        _data5.intValue = this.getValue(eventMap, "int", 0);
                        _data5.floatValue = this.getValue(eventMap, "float", 0);
                        _data5.stringValue = this.getValue(eventMap, "string", "");
                        skeletonData.events.push(_data5);
                    }
                }
                // Animations.
                if (root.animations) {
                    for (var animationName in root.animations) {
                        var animationMap = root.animations[animationName];
                        this.readAnimation(animationMap, animationName, skeletonData);
                    }
                }
                return skeletonData;
            }
        }, {
            key: "readAttachment",
            value: function readAttachment(map, skin, slotIndex, name, skeletonData) {
                var scale = this.scale;
                name = this.getValue(map, "name", name);
                var type = this.getValue(map, "type", "region");
                switch (type) {
                    case "region":
                        {
                            var path = this.getValue(map, "path", name);
                            var region = this.attachmentLoader.newRegionAttachment(skin, name, path);
                            if (region == null) return null;
                            region.path = path;
                            region.x = this.getValue(map, "x", 0) * scale;
                            region.y = this.getValue(map, "y", 0) * scale;
                            region.scaleX = this.getValue(map, "scaleX", 1);
                            region.scaleY = this.getValue(map, "scaleY", 1);
                            region.rotation = this.getValue(map, "rotation", 0);
                            region.width = map.width * scale;
                            region.height = map.height * scale;
                            var color = this.getValue(map, "color", null);
                            if (color != null) region.color.setFromString(color);
                            region.updateOffset();
                            return region;
                        }
                    case "boundingbox":
                        {
                            var box = this.attachmentLoader.newBoundingBoxAttachment(skin, name);
                            if (box == null) return null;
                            this.readVertices(map, box, map.vertexCount << 1);
                            var _color = this.getValue(map, "color", null);
                            if (_color != null) box.color.setFromString(_color);
                            return box;
                        }
                    case "mesh":
                    case "linkedmesh":
                        {
                            var _path = this.getValue(map, "path", name);
                            var mesh = this.attachmentLoader.newMeshAttachment(skin, name, _path);
                            if (mesh == null) return null;
                            mesh.path = _path;
                            var _color2 = this.getValue(map, "color", null);
                            if (_color2 != null) mesh.color.setFromString(_color2);
                            var parent = this.getValue(map, "parent", null);
                            if (parent != null) {
                                mesh.inheritDeform = this.getValue(map, "deform", true);
                                this.linkedMeshes.push(new LinkedMesh(mesh, this.getValue(map, "skin", null), slotIndex, parent));
                                return mesh;
                            }
                            var uvs = map.uvs;
                            this.readVertices(map, mesh, uvs.length);
                            mesh.triangles = map.triangles;
                            mesh.regionUVs = uvs;
                            mesh.updateUVs();
                            mesh.hullLength = this.getValue(map, "hull", 0) * 2;
                            return mesh;
                        }
                    case "path":
                        {
                            var _path2 = this.attachmentLoader.newPathAttachment(skin, name);
                            if (_path2 == null) return null;
                            _path2.closed = this.getValue(map, "closed", false);
                            _path2.constantSpeed = this.getValue(map, "constantSpeed", true);
                            var vertexCount = map.vertexCount;
                            this.readVertices(map, _path2, vertexCount << 1);
                            var lengths = Utils.newArray(vertexCount / 3, 0);
                            for (var i = 0; i < map.lengths.length; i++) {
                                lengths[i] = map.lengths[i] * scale;
                            }_path2.lengths = lengths;
                            var _color3 = this.getValue(map, "color", null);
                            if (_color3 != null) _path2.color.setFromString(_color3);
                            return _path2;
                        }
                    case "point":
                        {
                            var point = this.attachmentLoader.newPointAttachment(skin, name);
                            if (point == null) return null;
                            point.x = this.getValue(map, "x", 0) * scale;
                            point.y = this.getValue(map, "y", 0) * scale;
                            point.rotation = this.getValue(map, "rotation", 0);
                            var _color4 = this.getValue(map, "color", null);
                            if (_color4 != null) point.color.setFromString(_color4);
                            return point;
                        }
                    case "clipping":
                        {
                            var clip = this.attachmentLoader.newClippingAttachment(skin, name);
                            if (clip == null) return null;
                            var end = this.getValue(map, "end", null);
                            if (end != null) {
                                var slot = skeletonData.findSlot(end);
                                if (slot == null) throw new Error("Clipping end slot not found: " + end);
                                clip.endSlot = slot;
                            }
                            var _vertexCount = map.vertexCount;
                            this.readVertices(map, clip, _vertexCount << 1);
                            var _color5 = this.getValue(map, "color", null);
                            if (_color5 != null) clip.color.setFromString(_color5);
                            return clip;
                        }
                }
                return null;
            }
        }, {
            key: "readVertices",
            value: function readVertices(map, attachment, verticesLength) {
                var scale = this.scale;
                attachment.worldVerticesLength = verticesLength;
                var vertices = map.vertices;
                if (verticesLength == vertices.length) {
                    var scaledVertices = Utils.toFloatArray(vertices);
                    if (scale != 1) {
                        for (var i = 0, n = vertices.length; i < n; i++) {
                            scaledVertices[i] *= scale;
                        }
                    }
                    attachment.vertices = scaledVertices;
                    return;
                }
                var weights = new Array();
                var bones = new Array();
                for (var _i6 = 0, _n = vertices.length; _i6 < _n;) {
                    var boneCount = vertices[_i6++];
                    bones.push(boneCount);
                    for (var nn = _i6 + boneCount * 4; _i6 < nn; _i6 += 4) {
                        bones.push(vertices[_i6]);
                        weights.push(vertices[_i6 + 1] * scale);
                        weights.push(vertices[_i6 + 2] * scale);
                        weights.push(vertices[_i6 + 3]);
                    }
                }
                attachment.bones = bones;
                attachment.vertices = Utils.toFloatArray(weights);
            }
        }, {
            key: "readAnimation",
            value: function readAnimation(map, name, skeletonData) {
                var scale = this.scale;
                var timelines = new Array();
                var duration = 0;
                // Slot timelines.
                if (map.slots) {
                    for (var slotName in map.slots) {
                        var slotMap = map.slots[slotName];
                        var slotIndex = skeletonData.findSlotIndex(slotName);
                        if (slotIndex == -1) throw new Error("Slot not found: " + slotName);
                        for (var timelineName in slotMap) {
                            var timelineMap = slotMap[timelineName];
                            if (timelineName == "attachment") {
                                var timeline = new AttachmentTimeline(timelineMap.length);
                                timeline.slotIndex = slotIndex;
                                var frameIndex = 0;
                                for (var i = 0; i < timelineMap.length; i++) {
                                    var valueMap = timelineMap[i];
                                    timeline.setFrame(frameIndex++, valueMap.time, valueMap.name);
                                }
                                timelines.push(timeline);
                                duration = Math.max(duration, timeline.frames[timeline.getFrameCount() - 1]);
                            } else if (timelineName == "color") {
                                var _timeline = new ColorTimeline(timelineMap.length);
                                _timeline.slotIndex = slotIndex;
                                var _frameIndex = 0;
                                for (var _i7 = 0; _i7 < timelineMap.length; _i7++) {
                                    var _valueMap = timelineMap[_i7];
                                    var color = new Color();
                                    color.setFromString(_valueMap.color);
                                    _timeline.setFrame(_frameIndex, _valueMap.time, color.r, color.g, color.b, color.a);
                                    this.readCurve(_valueMap, _timeline, _frameIndex);
                                    _frameIndex++;
                                }
                                timelines.push(_timeline);
                                duration = Math.max(duration, _timeline.frames[(_timeline.getFrameCount() - 1) * ColorTimeline.ENTRIES]);
                            } else if (timelineName == "twoColor") {
                                var _timeline2 = new TwoColorTimeline(timelineMap.length);
                                _timeline2.slotIndex = slotIndex;
                                var _frameIndex2 = 0;
                                for (var _i8 = 0; _i8 < timelineMap.length; _i8++) {
                                    var _valueMap2 = timelineMap[_i8];
                                    var light = new Color();
                                    var dark = new Color();
                                    light.setFromString(_valueMap2.light);
                                    dark.setFromString(_valueMap2.dark);
                                    _timeline2.setFrame(_frameIndex2, _valueMap2.time, light.r, light.g, light.b, light.a, dark.r, dark.g, dark.b);
                                    this.readCurve(_valueMap2, _timeline2, _frameIndex2);
                                    _frameIndex2++;
                                }
                                timelines.push(_timeline2);
                                duration = Math.max(duration, _timeline2.frames[(_timeline2.getFrameCount() - 1) * TwoColorTimeline.ENTRIES]);
                            } else throw new Error("Invalid timeline type for a slot: " + timelineName + " (" + slotName + ")");
                        }
                    }
                }
                // Bone timelines.
                if (map.bones) {
                    for (var boneName in map.bones) {
                        var boneMap = map.bones[boneName];
                        var boneIndex = skeletonData.findBoneIndex(boneName);
                        if (boneIndex == -1) throw new Error("Bone not found: " + boneName);
                        for (var _timelineName in boneMap) {
                            var _timelineMap = boneMap[_timelineName];
                            if (_timelineName === "rotate") {
                                var _timeline3 = new RotateTimeline(_timelineMap.length);
                                _timeline3.boneIndex = boneIndex;
                                var _frameIndex3 = 0;
                                for (var _i9 = 0; _i9 < _timelineMap.length; _i9++) {
                                    var _valueMap3 = _timelineMap[_i9];
                                    _timeline3.setFrame(_frameIndex3, _valueMap3.time, _valueMap3.angle);
                                    this.readCurve(_valueMap3, _timeline3, _frameIndex3);
                                    _frameIndex3++;
                                }
                                timelines.push(_timeline3);
                                duration = Math.max(duration, _timeline3.frames[(_timeline3.getFrameCount() - 1) * RotateTimeline.ENTRIES]);
                            } else if (_timelineName === "translate" || _timelineName === "scale" || _timelineName === "shear") {
                                var _timeline4 = null;
                                var timelineScale = 1;
                                if (_timelineName === "scale") _timeline4 = new ScaleTimeline(_timelineMap.length);else if (_timelineName === "shear") _timeline4 = new ShearTimeline(_timelineMap.length);else {
                                    _timeline4 = new TranslateTimeline(_timelineMap.length);
                                    timelineScale = scale;
                                }
                                _timeline4.boneIndex = boneIndex;
                                var _frameIndex4 = 0;
                                for (var _i10 = 0; _i10 < _timelineMap.length; _i10++) {
                                    var _valueMap4 = _timelineMap[_i10];
                                    var x = this.getValue(_valueMap4, "x", 0),
                                        y = this.getValue(_valueMap4, "y", 0);
                                    _timeline4.setFrame(_frameIndex4, _valueMap4.time, x * timelineScale, y * timelineScale);
                                    this.readCurve(_valueMap4, _timeline4, _frameIndex4);
                                    _frameIndex4++;
                                }
                                timelines.push(_timeline4);
                                duration = Math.max(duration, _timeline4.frames[(_timeline4.getFrameCount() - 1) * TranslateTimeline.ENTRIES]);
                            } else throw new Error("Invalid timeline type for a bone: " + _timelineName + " (" + boneName + ")");
                        }
                    }
                }
                // IK constraint timelines.
                if (map.ik) {
                    for (var constraintName in map.ik) {
                        var constraintMap = map.ik[constraintName];
                        var constraint = skeletonData.findIkConstraint(constraintName);
                        var _timeline5 = new IkConstraintTimeline(constraintMap.length);
                        _timeline5.ikConstraintIndex = skeletonData.ikConstraints.indexOf(constraint);
                        var _frameIndex5 = 0;
                        for (var _i11 = 0; _i11 < constraintMap.length; _i11++) {
                            var _valueMap5 = constraintMap[_i11];
                            _timeline5.setFrame(_frameIndex5, _valueMap5.time, this.getValue(_valueMap5, "mix", 1), this.getValue(_valueMap5, "bendPositive", true) ? 1 : -1);
                            this.readCurve(_valueMap5, _timeline5, _frameIndex5);
                            _frameIndex5++;
                        }
                        timelines.push(_timeline5);
                        duration = Math.max(duration, _timeline5.frames[(_timeline5.getFrameCount() - 1) * IkConstraintTimeline.ENTRIES]);
                    }
                }
                // Transform constraint timelines.
                if (map.transform) {
                    for (var _constraintName in map.transform) {
                        var _constraintMap3 = map.transform[_constraintName];
                        var _constraint = skeletonData.findTransformConstraint(_constraintName);
                        var _timeline6 = new TransformConstraintTimeline(_constraintMap3.length);
                        _timeline6.transformConstraintIndex = skeletonData.transformConstraints.indexOf(_constraint);
                        var _frameIndex6 = 0;
                        for (var _i12 = 0; _i12 < _constraintMap3.length; _i12++) {
                            var _valueMap6 = _constraintMap3[_i12];
                            _timeline6.setFrame(_frameIndex6, _valueMap6.time, this.getValue(_valueMap6, "rotateMix", 1), this.getValue(_valueMap6, "translateMix", 1), this.getValue(_valueMap6, "scaleMix", 1), this.getValue(_valueMap6, "shearMix", 1));
                            this.readCurve(_valueMap6, _timeline6, _frameIndex6);
                            _frameIndex6++;
                        }
                        timelines.push(_timeline6);
                        duration = Math.max(duration, _timeline6.frames[(_timeline6.getFrameCount() - 1) * TransformConstraintTimeline.ENTRIES]);
                    }
                }
                // Path constraint timelines.
                if (map.paths) {
                    for (var _constraintName2 in map.paths) {
                        var _constraintMap4 = map.paths[_constraintName2];
                        var index = skeletonData.findPathConstraintIndex(_constraintName2);
                        if (index == -1) throw new Error("Path constraint not found: " + _constraintName2);
                        var data = skeletonData.pathConstraints[index];
                        for (var _timelineName2 in _constraintMap4) {
                            var _timelineMap2 = _constraintMap4[_timelineName2];
                            if (_timelineName2 === "position" || _timelineName2 === "spacing") {
                                var _timeline7 = null;
                                var _timelineScale = 1;
                                if (_timelineName2 === "spacing") {
                                    _timeline7 = new PathConstraintSpacingTimeline(_timelineMap2.length);
                                    if (data.spacingMode == SpacingMode.Length || data.spacingMode == SpacingMode.Fixed) _timelineScale = scale;
                                } else {
                                    _timeline7 = new PathConstraintPositionTimeline(_timelineMap2.length);
                                    if (data.positionMode == PositionMode.Fixed) _timelineScale = scale;
                                }
                                _timeline7.pathConstraintIndex = index;
                                var _frameIndex7 = 0;
                                for (var _i13 = 0; _i13 < _timelineMap2.length; _i13++) {
                                    var _valueMap7 = _timelineMap2[_i13];
                                    _timeline7.setFrame(_frameIndex7, _valueMap7.time, this.getValue(_valueMap7, _timelineName2, 0) * _timelineScale);
                                    this.readCurve(_valueMap7, _timeline7, _frameIndex7);
                                    _frameIndex7++;
                                }
                                timelines.push(_timeline7);
                                duration = Math.max(duration, _timeline7.frames[(_timeline7.getFrameCount() - 1) * PathConstraintPositionTimeline.ENTRIES]);
                            } else if (_timelineName2 === "mix") {
                                var _timeline8 = new PathConstraintMixTimeline(_timelineMap2.length);
                                _timeline8.pathConstraintIndex = index;
                                var _frameIndex8 = 0;
                                for (var _i14 = 0; _i14 < _timelineMap2.length; _i14++) {
                                    var _valueMap8 = _timelineMap2[_i14];
                                    _timeline8.setFrame(_frameIndex8, _valueMap8.time, this.getValue(_valueMap8, "rotateMix", 1), this.getValue(_valueMap8, "translateMix", 1));
                                    this.readCurve(_valueMap8, _timeline8, _frameIndex8);
                                    _frameIndex8++;
                                }
                                timelines.push(_timeline8);
                                duration = Math.max(duration, _timeline8.frames[(_timeline8.getFrameCount() - 1) * PathConstraintMixTimeline.ENTRIES]);
                            }
                        }
                    }
                }
                // Deform timelines.
                if (map.deform) {
                    for (var deformName in map.deform) {
                        var deformMap = map.deform[deformName];
                        var skin = skeletonData.findSkin(deformName);
                        if (skin == null) throw new Error("Skin not found: " + deformName);
                        for (var _slotName2 in deformMap) {
                            var _slotMap2 = deformMap[_slotName2];
                            var _slotIndex = skeletonData.findSlotIndex(_slotName2);
                            if (_slotIndex == -1) throw new Error("Slot not found: " + _slotMap2.name);
                            for (var _timelineName3 in _slotMap2) {
                                var _timelineMap3 = _slotMap2[_timelineName3];
                                var attachment = skin.getAttachment(_slotIndex, _timelineName3);
                                if (attachment == null) throw new Error("Deform attachment not found: " + _timelineMap3.name);
                                var weighted = attachment.bones != null;
                                var vertices = attachment.vertices;
                                var deformLength = weighted ? vertices.length / 3 * 2 : vertices.length;
                                var _timeline9 = new DeformTimeline(_timelineMap3.length);
                                _timeline9.slotIndex = _slotIndex;
                                _timeline9.attachment = attachment;
                                var _frameIndex9 = 0;
                                for (var j = 0; j < _timelineMap3.length; j++) {
                                    var _valueMap9 = _timelineMap3[j];
                                    var deform = void 0;
                                    var verticesValue = this.getValue(_valueMap9, "vertices", null);
                                    if (verticesValue == null) deform = weighted ? Utils.newFloatArray(deformLength) : vertices;else {
                                        deform = Utils.newFloatArray(deformLength);
                                        var start = this.getValue(_valueMap9, "offset", 0);
                                        Utils.arrayCopy(verticesValue, 0, deform, start, verticesValue.length);
                                        if (scale != 1) {
                                            for (var _i15 = start, n = _i15 + verticesValue.length; _i15 < n; _i15++) {
                                                deform[_i15] *= scale;
                                            }
                                        }
                                        if (!weighted) {
                                            for (var _i16 = 0; _i16 < deformLength; _i16++) {
                                                deform[_i16] += vertices[_i16];
                                            }
                                        }
                                    }
                                    _timeline9.setFrame(_frameIndex9, _valueMap9.time, deform);
                                    this.readCurve(_valueMap9, _timeline9, _frameIndex9);
                                    _frameIndex9++;
                                }
                                timelines.push(_timeline9);
                                duration = Math.max(duration, _timeline9.frames[_timeline9.getFrameCount() - 1]);
                            }
                        }
                    }
                }
                // Draw order timeline.
                var drawOrderNode = map.drawOrder;
                if (drawOrderNode == null) drawOrderNode = map.draworder;
                if (drawOrderNode != null) {
                    var _timeline10 = new DrawOrderTimeline(drawOrderNode.length);
                    var slotCount = skeletonData.slots.length;
                    var _frameIndex10 = 0;
                    for (var _j3 = 0; _j3 < drawOrderNode.length; _j3++) {
                        var drawOrderMap = drawOrderNode[_j3];
                        var drawOrder = null;
                        var offsets = this.getValue(drawOrderMap, "offsets", null);
                        if (offsets != null) {
                            drawOrder = Utils.newArray(slotCount, -1);
                            var unchanged = Utils.newArray(slotCount - offsets.length, 0);
                            var originalIndex = 0,
                                unchangedIndex = 0;
                            for (var _i17 = 0; _i17 < offsets.length; _i17++) {
                                var offsetMap = offsets[_i17];
                                var _slotIndex2 = skeletonData.findSlotIndex(offsetMap.slot);
                                if (_slotIndex2 == -1) throw new Error("Slot not found: " + offsetMap.slot);
                                // Collect unchanged items.
                                while (originalIndex != _slotIndex2) {
                                    unchanged[unchangedIndex++] = originalIndex++;
                                } // Set changed items.
                                drawOrder[originalIndex + offsetMap.offset] = originalIndex++;
                            }
                            // Collect remaining unchanged items.
                            while (originalIndex < slotCount) {
                                unchanged[unchangedIndex++] = originalIndex++;
                            } // Fill in unchanged items.
                            for (var _i18 = slotCount - 1; _i18 >= 0; _i18--) {
                                if (drawOrder[_i18] == -1) drawOrder[_i18] = unchanged[--unchangedIndex];
                            }
                        }
                        _timeline10.setFrame(_frameIndex10++, drawOrderMap.time, drawOrder);
                    }
                    timelines.push(_timeline10);
                    duration = Math.max(duration, _timeline10.frames[_timeline10.getFrameCount() - 1]);
                }
                // Event timeline.
                if (map.events) {
                    var _timeline11 = new EventTimeline(map.events.length);
                    var _frameIndex11 = 0;
                    for (var _i19 = 0; _i19 < map.events.length; _i19++) {
                        var eventMap = map.events[_i19];
                        var eventData = skeletonData.findEvent(eventMap.name);
                        if (eventData == null) throw new Error("Event not found: " + eventMap.name);
                        var event = new Event(Utils.toSinglePrecision(eventMap.time), eventData);
                        event.intValue = this.getValue(eventMap, "int", eventData.intValue);
                        event.floatValue = this.getValue(eventMap, "float", eventData.floatValue);
                        event.stringValue = this.getValue(eventMap, "string", eventData.stringValue);
                        _timeline11.setFrame(_frameIndex11++, event);
                    }
                    timelines.push(_timeline11);
                    duration = Math.max(duration, _timeline11.frames[_timeline11.getFrameCount() - 1]);
                }
                if (isNaN(duration)) {
                    throw new Error("Error while parsing animation, duration is NaN");
                }
                skeletonData.animations.push(new Animation(name, timelines, duration));
            }
        }, {
            key: "readCurve",
            value: function readCurve(map, timeline, frameIndex) {
                if (!map.curve) return;
                if (map.curve === "stepped") timeline.setStepped(frameIndex);else if (Object.prototype.toString.call(map.curve) === '[object Array]') {
                    var curve = map.curve;
                    timeline.setCurve(frameIndex, curve[0], curve[1], curve[2], curve[3]);
                }
            }
        }, {
            key: "getValue",
            value: function getValue(map, prop, defaultValue) {
                return map[prop] !== undefined ? map[prop] : defaultValue;
            }
        }], [{
            key: "blendModeFromString",
            value: function blendModeFromString(str) {
                str = str.toLowerCase();
                if (str == "normal") return BlendMode.Normal;
                if (str == "additive") return BlendMode.Additive;
                if (str == "multiply") return BlendMode.Multiply;
                if (str == "screen") return BlendMode.Screen;
                throw new Error("Unknown blend mode: " + str);
            }
        }, {
            key: "positionModeFromString",
            value: function positionModeFromString(str) {
                str = str.toLowerCase();
                if (str == "fixed") return PositionMode.Fixed;
                if (str == "percent") return PositionMode.Percent;
                throw new Error("Unknown position mode: " + str);
            }
        }, {
            key: "spacingModeFromString",
            value: function spacingModeFromString(str) {
                str = str.toLowerCase();
                if (str == "length") return SpacingMode.Length;
                if (str == "fixed") return SpacingMode.Fixed;
                if (str == "percent") return SpacingMode.Percent;
                throw new Error("Unknown position mode: " + str);
            }
        }, {
            key: "rotateModeFromString",
            value: function rotateModeFromString(str) {
                str = str.toLowerCase();
                if (str == "tangent") return RotateMode.Tangent;
                if (str == "chain") return RotateMode.Chain;
                if (str == "chainscale") return RotateMode.ChainScale;
                throw new Error("Unknown rotate mode: " + str);
            }
        }, {
            key: "transformModeFromString",
            value: function transformModeFromString(str) {
                str = str.toLowerCase();
                if (str == "normal") return TransformMode.Normal;
                if (str == "onlytranslation") return TransformMode.OnlyTranslation;
                if (str == "norotationorreflection") return TransformMode.NoRotationOrReflection;
                if (str == "noscale") return TransformMode.NoScale;
                if (str == "noscaleorreflection") return TransformMode.NoScaleOrReflection;
                throw new Error("Unknown transform mode: " + str);
            }
        }]);

        return SkeletonJson;
    }();

    spine.SkeletonJson = SkeletonJson;

    var LinkedMesh = function LinkedMesh(mesh, skin, slotIndex, parent) {
        _classCallCheck(this, LinkedMesh);

        this.mesh = mesh;
        this.skin = skin;
        this.slotIndex = slotIndex;
        this.parent = parent;
    };
})(spine || (spine = {}));
})