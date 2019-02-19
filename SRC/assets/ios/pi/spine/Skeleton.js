_$define("pi/spine/Skeleton", function (require, exports, module){
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
    var Skeleton = function () {
        function Skeleton(data) {
            _classCallCheck(this, Skeleton);

            this._updateCache = new Array();
            this.updateCacheReset = new Array();
            this.time = 0;
            this.flipX = false;
            this.flipY = false;
            this.x = 0;
            this.y = 0;
            if (data == null) throw new Error("data cannot be null.");
            this.data = data;
            this.bones = new Array();
            for (var i = 0; i < data.bones.length; i++) {
                var boneData = data.bones[i];
                var bone = void 0;
                if (boneData.parent == null) bone = new Bone(boneData, this, null);else {
                    var parent = this.bones[boneData.parent.index];
                    bone = new Bone(boneData, this, parent);
                    parent.children.push(bone);
                }
                this.bones.push(bone);
            }
            this.slots = new Array();
            this.drawOrder = new Array();
            for (var _i = 0; _i < data.slots.length; _i++) {
                var slotData = data.slots[_i];
                var _bone = this.bones[slotData.boneData.index];
                var slot = new Slot(slotData, _bone);
                this.slots.push(slot);
                this.drawOrder.push(slot);
            }
            this.ikConstraints = new Array();
            for (var _i2 = 0; _i2 < data.ikConstraints.length; _i2++) {
                var ikConstraintData = data.ikConstraints[_i2];
                this.ikConstraints.push(new IkConstraint(ikConstraintData, this));
            }
            this.transformConstraints = new Array();
            for (var _i3 = 0; _i3 < data.transformConstraints.length; _i3++) {
                var transformConstraintData = data.transformConstraints[_i3];
                this.transformConstraints.push(new TransformConstraint(transformConstraintData, this));
            }
            this.pathConstraints = new Array();
            for (var _i4 = 0; _i4 < data.pathConstraints.length; _i4++) {
                var pathConstraintData = data.pathConstraints[_i4];
                this.pathConstraints.push(new PathConstraint(pathConstraintData, this));
            }
            this.color = new Color(1, 1, 1, 1);
            this.updateCache();
        }

        _createClass(Skeleton, [{
            key: "updateCache",
            value: function updateCache() {
                var updateCache = this._updateCache;
                updateCache.length = 0;
                this.updateCacheReset.length = 0;
                var bones = this.bones;
                for (var i = 0, n = bones.length; i < n; i++) {
                    bones[i].sorted = false;
                } // IK first, lowest hierarchy depth first.
                var ikConstraints = this.ikConstraints;
                var transformConstraints = this.transformConstraints;
                var pathConstraints = this.pathConstraints;
                var ikCount = ikConstraints.length,
                    transformCount = transformConstraints.length,
                    pathCount = pathConstraints.length;
                var constraintCount = ikCount + transformCount + pathCount;
                outer: for (var _i5 = 0; _i5 < constraintCount; _i5++) {
                    for (var ii = 0; ii < ikCount; ii++) {
                        var constraint = ikConstraints[ii];
                        if (constraint.data.order == _i5) {
                            this.sortIkConstraint(constraint);
                            continue outer;
                        }
                    }
                    for (var _ii = 0; _ii < transformCount; _ii++) {
                        var _constraint = transformConstraints[_ii];
                        if (_constraint.data.order == _i5) {
                            this.sortTransformConstraint(_constraint);
                            continue outer;
                        }
                    }
                    for (var _ii2 = 0; _ii2 < pathCount; _ii2++) {
                        var _constraint2 = pathConstraints[_ii2];
                        if (_constraint2.data.order == _i5) {
                            this.sortPathConstraint(_constraint2);
                            continue outer;
                        }
                    }
                }
                for (var _i6 = 0, _n = bones.length; _i6 < _n; _i6++) {
                    this.sortBone(bones[_i6]);
                }
            }
        }, {
            key: "sortIkConstraint",
            value: function sortIkConstraint(constraint) {
                var target = constraint.target;
                this.sortBone(target);
                var constrained = constraint.bones;
                var parent = constrained[0];
                this.sortBone(parent);
                if (constrained.length > 1) {
                    var child = constrained[constrained.length - 1];
                    if (!(this._updateCache.indexOf(child) > -1)) this.updateCacheReset.push(child);
                }
                this._updateCache.push(constraint);
                this.sortReset(parent.children);
                constrained[constrained.length - 1].sorted = true;
            }
        }, {
            key: "sortPathConstraint",
            value: function sortPathConstraint(constraint) {
                var slot = constraint.target;
                var slotIndex = slot.data.index;
                var slotBone = slot.bone;
                if (this.skin != null) this.sortPathConstraintAttachment(this.skin, slotIndex, slotBone);
                if (this.data.defaultSkin != null && this.data.defaultSkin != this.skin) this.sortPathConstraintAttachment(this.data.defaultSkin, slotIndex, slotBone);
                for (var i = 0, n = this.data.skins.length; i < n; i++) {
                    this.sortPathConstraintAttachment(this.data.skins[i], slotIndex, slotBone);
                }var attachment = slot.getAttachment();
                if (attachment instanceof PathAttachment) this.sortPathConstraintAttachmentWith(attachment, slotBone);
                var constrained = constraint.bones;
                var boneCount = constrained.length;
                for (var _i7 = 0; _i7 < boneCount; _i7++) {
                    this.sortBone(constrained[_i7]);
                }this._updateCache.push(constraint);
                for (var _i8 = 0; _i8 < boneCount; _i8++) {
                    this.sortReset(constrained[_i8].children);
                }for (var _i9 = 0; _i9 < boneCount; _i9++) {
                    constrained[_i9].sorted = true;
                }
            }
        }, {
            key: "sortTransformConstraint",
            value: function sortTransformConstraint(constraint) {
                this.sortBone(constraint.target);
                var constrained = constraint.bones;
                var boneCount = constrained.length;
                if (constraint.data.local) {
                    for (var i = 0; i < boneCount; i++) {
                        var child = constrained[i];
                        this.sortBone(child.parent);
                        if (!(this._updateCache.indexOf(child) > -1)) this.updateCacheReset.push(child);
                    }
                } else {
                    for (var _i10 = 0; _i10 < boneCount; _i10++) {
                        this.sortBone(constrained[_i10]);
                    }
                }
                this._updateCache.push(constraint);
                for (var ii = 0; ii < boneCount; ii++) {
                    this.sortReset(constrained[ii].children);
                }for (var _ii3 = 0; _ii3 < boneCount; _ii3++) {
                    constrained[_ii3].sorted = true;
                }
            }
        }, {
            key: "sortPathConstraintAttachment",
            value: function sortPathConstraintAttachment(skin, slotIndex, slotBone) {
                var attachments = skin.attachments[slotIndex];
                if (!attachments) return;
                for (var key in attachments) {
                    this.sortPathConstraintAttachmentWith(attachments[key], slotBone);
                }
            }
        }, {
            key: "sortPathConstraintAttachmentWith",
            value: function sortPathConstraintAttachmentWith(attachment, slotBone) {
                if (!(attachment instanceof PathAttachment)) return;
                var pathBones = attachment.bones;
                if (pathBones == null) this.sortBone(slotBone);else {
                    var bones = this.bones;
                    var i = 0;
                    while (i < pathBones.length) {
                        var boneCount = pathBones[i++];
                        for (var n = i + boneCount; i < n; i++) {
                            var boneIndex = pathBones[i];
                            this.sortBone(bones[boneIndex]);
                        }
                    }
                }
            }
        }, {
            key: "sortBone",
            value: function sortBone(bone) {
                if (bone.sorted) return;
                var parent = bone.parent;
                if (parent != null) this.sortBone(parent);
                bone.sorted = true;
                this._updateCache.push(bone);
            }
        }, {
            key: "sortReset",
            value: function sortReset(bones) {
                for (var i = 0, n = bones.length; i < n; i++) {
                    var bone = bones[i];
                    if (bone.sorted) this.sortReset(bone.children);
                    bone.sorted = false;
                }
            }
            /** Updates the world transform for each bone and applies constraints. */

        }, {
            key: "updateWorldTransform",
            value: function updateWorldTransform() {
                var updateCacheReset = this.updateCacheReset;
                for (var i = 0, n = updateCacheReset.length; i < n; i++) {
                    var bone = updateCacheReset[i];
                    bone.ax = bone.x;
                    bone.ay = bone.y;
                    bone.arotation = bone.rotation;
                    bone.ascaleX = bone.scaleX;
                    bone.ascaleY = bone.scaleY;
                    bone.ashearX = bone.shearX;
                    bone.ashearY = bone.shearY;
                    bone.appliedValid = true;
                }
                var updateCache = this._updateCache;
                for (var _i11 = 0, _n2 = updateCache.length; _i11 < _n2; _i11++) {
                    updateCache[_i11].update();
                }
            }
            /** Sets the bones, constraints, and slots to their setup pose values. */

        }, {
            key: "setToSetupPose",
            value: function setToSetupPose() {
                this.setBonesToSetupPose();
                this.setSlotsToSetupPose();
            }
            /** Sets the bones and constraints to their setup pose values. */

        }, {
            key: "setBonesToSetupPose",
            value: function setBonesToSetupPose() {
                var bones = this.bones;
                for (var i = 0, n = bones.length; i < n; i++) {
                    bones[i].setToSetupPose();
                }var ikConstraints = this.ikConstraints;
                for (var _i12 = 0, _n3 = ikConstraints.length; _i12 < _n3; _i12++) {
                    var constraint = ikConstraints[_i12];
                    constraint.bendDirection = constraint.data.bendDirection;
                    constraint.mix = constraint.data.mix;
                }
                var transformConstraints = this.transformConstraints;
                for (var _i13 = 0, _n4 = transformConstraints.length; _i13 < _n4; _i13++) {
                    var _constraint3 = transformConstraints[_i13];
                    var data = _constraint3.data;
                    _constraint3.rotateMix = data.rotateMix;
                    _constraint3.translateMix = data.translateMix;
                    _constraint3.scaleMix = data.scaleMix;
                    _constraint3.shearMix = data.shearMix;
                }
                var pathConstraints = this.pathConstraints;
                for (var _i14 = 0, _n5 = pathConstraints.length; _i14 < _n5; _i14++) {
                    var _constraint4 = pathConstraints[_i14];
                    var _data = _constraint4.data;
                    _constraint4.position = _data.position;
                    _constraint4.spacing = _data.spacing;
                    _constraint4.rotateMix = _data.rotateMix;
                    _constraint4.translateMix = _data.translateMix;
                }
            }
        }, {
            key: "setSlotsToSetupPose",
            value: function setSlotsToSetupPose() {
                var slots = this.slots;
                Utils.arrayCopy(slots, 0, this.drawOrder, 0, slots.length);
                for (var i = 0, n = slots.length; i < n; i++) {
                    slots[i].setToSetupPose();
                }
            }
            /** @return May return null. */

        }, {
            key: "getRootBone",
            value: function getRootBone() {
                if (this.bones.length == 0) return null;
                return this.bones[0];
            }
            /** @return May be null. */

        }, {
            key: "findBone",
            value: function findBone(boneName) {
                if (boneName == null) throw new Error("boneName cannot be null.");
                var bones = this.bones;
                for (var i = 0, n = bones.length; i < n; i++) {
                    var bone = bones[i];
                    if (bone.data.name == boneName) return bone;
                }
                return null;
            }
            /** @return -1 if the bone was not found. */

        }, {
            key: "findBoneIndex",
            value: function findBoneIndex(boneName) {
                if (boneName == null) throw new Error("boneName cannot be null.");
                var bones = this.bones;
                for (var i = 0, n = bones.length; i < n; i++) {
                    if (bones[i].data.name == boneName) return i;
                }return -1;
            }
            /** @return May be null. */

        }, {
            key: "findSlot",
            value: function findSlot(slotName) {
                if (slotName == null) throw new Error("slotName cannot be null.");
                var slots = this.slots;
                for (var i = 0, n = slots.length; i < n; i++) {
                    var slot = slots[i];
                    if (slot.data.name == slotName) return slot;
                }
                return null;
            }
            /** @return -1 if the bone was not found. */

        }, {
            key: "findSlotIndex",
            value: function findSlotIndex(slotName) {
                if (slotName == null) throw new Error("slotName cannot be null.");
                var slots = this.slots;
                for (var i = 0, n = slots.length; i < n; i++) {
                    if (slots[i].data.name == slotName) return i;
                }return -1;
            }
            /** Sets a skin by name.
             * @see #setSkin(Skin) */

        }, {
            key: "setSkinByName",
            value: function setSkinByName(skinName) {
                var skin = this.data.findSkin(skinName);
                if (skin == null) throw new Error("Skin not found: " + skinName);
                this.setSkin(skin);
            }
            /** Sets the skin used to look up attachments before looking in the {@link SkeletonData#getDefaultSkin() default skin}.
             * Attachments from the new skin are attached if the corresponding attachment from the old skin was attached. If there was no
             * old skin, each slot's setup mode attachment is attached from the new skin.
             * @param newSkin May be null. */

        }, {
            key: "setSkin",
            value: function setSkin(newSkin) {
                if (newSkin != null) {
                    if (this.skin != null) newSkin.attachAll(this, this.skin);else {
                        var slots = this.slots;
                        for (var i = 0, n = slots.length; i < n; i++) {
                            var slot = slots[i];
                            var name = slot.data.attachmentName;
                            if (name != null) {
                                var attachment = newSkin.getAttachment(i, name);
                                if (attachment != null) slot.setAttachment(attachment);
                            }
                        }
                    }
                }
                this.skin = newSkin;
            }
            /** @return May be null. */

        }, {
            key: "getAttachmentByName",
            value: function getAttachmentByName(slotName, attachmentName) {
                return this.getAttachment(this.data.findSlotIndex(slotName), attachmentName);
            }
            /** @return May be null. */

        }, {
            key: "getAttachment",
            value: function getAttachment(slotIndex, attachmentName) {
                if (attachmentName == null) throw new Error("attachmentName cannot be null.");
                if (this.skin != null) {
                    var attachment = this.skin.getAttachment(slotIndex, attachmentName);
                    if (attachment != null) return attachment;
                }
                if (this.data.defaultSkin != null) return this.data.defaultSkin.getAttachment(slotIndex, attachmentName);
                return null;
            }
            /** @param attachmentName May be null. */

        }, {
            key: "setAttachment",
            value: function setAttachment(slotName, attachmentName) {
                if (slotName == null) throw new Error("slotName cannot be null.");
                var slots = this.slots;
                for (var i = 0, n = slots.length; i < n; i++) {
                    var slot = slots[i];
                    if (slot.data.name == slotName) {
                        var attachment = null;
                        if (attachmentName != null) {
                            attachment = this.getAttachment(i, attachmentName);
                            if (attachment == null) throw new Error("Attachment not found: " + attachmentName + ", for slot: " + slotName);
                        }
                        slot.setAttachment(attachment);
                        return;
                    }
                }
                throw new Error("Slot not found: " + slotName);
            }
            /** @return May be null. */

        }, {
            key: "findIkConstraint",
            value: function findIkConstraint(constraintName) {
                if (constraintName == null) throw new Error("constraintName cannot be null.");
                var ikConstraints = this.ikConstraints;
                for (var i = 0, n = ikConstraints.length; i < n; i++) {
                    var ikConstraint = ikConstraints[i];
                    if (ikConstraint.data.name == constraintName) return ikConstraint;
                }
                return null;
            }
            /** @return May be null. */

        }, {
            key: "findTransformConstraint",
            value: function findTransformConstraint(constraintName) {
                if (constraintName == null) throw new Error("constraintName cannot be null.");
                var transformConstraints = this.transformConstraints;
                for (var i = 0, n = transformConstraints.length; i < n; i++) {
                    var constraint = transformConstraints[i];
                    if (constraint.data.name == constraintName) return constraint;
                }
                return null;
            }
            /** @return May be null. */

        }, {
            key: "findPathConstraint",
            value: function findPathConstraint(constraintName) {
                if (constraintName == null) throw new Error("constraintName cannot be null.");
                var pathConstraints = this.pathConstraints;
                for (var i = 0, n = pathConstraints.length; i < n; i++) {
                    var constraint = pathConstraints[i];
                    if (constraint.data.name == constraintName) return constraint;
                }
                return null;
            }
            /** Returns the axis aligned bounding box (AABB) of the region and mesh attachments for the current pose.
             * @param offset The distance from the skeleton origin to the bottom left corner of the AABB.
             * @param size The width and height of the AABB.
             * @param temp Working memory */

        }, {
            key: "getBounds",
            value: function getBounds(offset, size, temp) {
                if (offset == null) throw new Error("offset cannot be null.");
                if (size == null) throw new Error("size cannot be null.");
                var drawOrder = this.drawOrder;
                var minX = Number.POSITIVE_INFINITY,
                    minY = Number.POSITIVE_INFINITY,
                    maxX = Number.NEGATIVE_INFINITY,
                    maxY = Number.NEGATIVE_INFINITY;
                for (var i = 0, n = drawOrder.length; i < n; i++) {
                    var slot = drawOrder[i];
                    var verticesLength = 0;
                    var vertices = null;
                    var attachment = slot.getAttachment();
                    if (attachment instanceof RegionAttachment) {
                        verticesLength = 8;
                        vertices = Utils.setArraySize(temp, verticesLength, 0);
                        attachment.computeWorldVertices(slot.bone, vertices, 0, 2);
                    } else if (attachment instanceof MeshAttachment) {
                        var mesh = attachment;
                        verticesLength = mesh.worldVerticesLength;
                        vertices = Utils.setArraySize(temp, verticesLength, 0);
                        mesh.computeWorldVertices(slot, 0, verticesLength, vertices, 0, 2);
                    }
                    if (vertices != null) {
                        for (var ii = 0, nn = vertices.length; ii < nn; ii += 2) {
                            var x = vertices[ii],
                                y = vertices[ii + 1];
                            minX = Math.min(minX, x);
                            minY = Math.min(minY, y);
                            maxX = Math.max(maxX, x);
                            maxY = Math.max(maxY, y);
                        }
                    }
                }
                offset.set(minX, minY);
                size.set(maxX - minX, maxY - minY);
            }
        }, {
            key: "update",
            value: function update(delta) {
                this.time += delta;
            }
        }]);

        return Skeleton;
    }();

    spine.Skeleton = Skeleton;
})(spine || (spine = {}));
})