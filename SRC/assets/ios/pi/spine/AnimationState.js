_$define("pi/spine/AnimationState", function (require, exports, module){
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
    var AnimationState = function () {
        function AnimationState(data) {
            _classCallCheck(this, AnimationState);

            this.tracks = new Array();
            this.events = new Array();
            this.listeners = new Array();
            this.queue = new EventQueue(this);
            this.propertyIDs = new IntSet();
            this.mixingTo = new Array();
            this.animationsChanged = false;
            this.timeScale = 1;
            this.trackEntryPool = new Pool(function () {
                return new TrackEntry();
            });
            this.data = data;
        }

        _createClass(AnimationState, [{
            key: "update",
            value: function update(delta) {
                delta *= this.timeScale;
                var tracks = this.tracks;
                for (var i = 0, n = tracks.length; i < n; i++) {
                    var current = tracks[i];
                    if (current == null) continue;
                    current.animationLast = current.nextAnimationLast;
                    current.trackLast = current.nextTrackLast;
                    var currentDelta = delta * current.timeScale;
                    if (current.delay > 0) {
                        current.delay -= currentDelta;
                        if (current.delay > 0) continue;
                        currentDelta = -current.delay;
                        current.delay = 0;
                    }
                    var next = current.next;
                    if (next != null) {
                        // When the next entry's delay is passed, change to the next entry, preserving leftover time.
                        var nextTime = current.trackLast - next.delay;
                        if (nextTime >= 0) {
                            next.delay = 0;
                            next.trackTime = nextTime + delta * next.timeScale;
                            current.trackTime += currentDelta;
                            this.setCurrent(i, next, true);
                            while (next.mixingFrom != null) {
                                next.mixTime += currentDelta;
                                next = next.mixingFrom;
                            }
                            continue;
                        }
                    } else if (current.trackLast >= current.trackEnd && current.mixingFrom == null) {
                        tracks[i] = null;
                        this.queue.end(current);
                        this.disposeNext(current);
                        continue;
                    }
                    if (current.mixingFrom != null && this.updateMixingFrom(current, delta)) {
                        // End mixing from entries once all have completed.
                        var from = current.mixingFrom;
                        current.mixingFrom = null;
                        while (from != null) {
                            this.queue.end(from);
                            from = from.mixingFrom;
                        }
                    }
                    current.trackTime += currentDelta;
                }
                this.queue.drain();
            }
        }, {
            key: "updateMixingFrom",
            value: function updateMixingFrom(to, delta) {
                var from = to.mixingFrom;
                if (from == null) return true;
                var finished = this.updateMixingFrom(from, delta);
                // Require mixTime > 0 to ensure the mixing from entry was applied at least once.
                if (to.mixTime > 0 && (to.mixTime >= to.mixDuration || to.timeScale == 0)) {
                    // Require totalAlpha == 0 to ensure mixing is complete, unless mixDuration == 0 (the transition is a single frame).
                    if (from.totalAlpha == 0 || to.mixDuration == 0) {
                        to.mixingFrom = from.mixingFrom;
                        to.interruptAlpha = from.interruptAlpha;
                        this.queue.end(from);
                    }
                    return finished;
                }
                from.animationLast = from.nextAnimationLast;
                from.trackLast = from.nextTrackLast;
                from.trackTime += delta * from.timeScale;
                to.mixTime += delta * to.timeScale;
                return false;
            }
        }, {
            key: "apply",
            value: function apply(skeleton) {
                if (skeleton == null) throw new Error("skeleton cannot be null.");
                if (this.animationsChanged) this._animationsChanged();
                var events = this.events;
                var tracks = this.tracks;
                var applied = false;
                for (var i = 0, n = tracks.length; i < n; i++) {
                    var current = tracks[i];
                    if (current == null || current.delay > 0) continue;
                    applied = true;
                    var currentPose = i == 0 ? MixPose.current : MixPose.currentLayered;
                    // Apply mixing from entries first.
                    var mix = current.alpha;
                    if (current.mixingFrom != null) mix *= this.applyMixingFrom(current, skeleton, currentPose);else if (current.trackTime >= current.trackEnd && current.next == null) mix = 0;
                    // Apply current entry.
                    var animationLast = current.animationLast,
                        animationTime = current.getAnimationTime();
                    var timelineCount = current.animation.timelines.length;
                    var timelines = current.animation.timelines;
                    if (mix == 1) {
                        for (var ii = 0; ii < timelineCount; ii++) {
                            timelines[ii].apply(skeleton, animationLast, animationTime, events, 1, MixPose.setup, MixDirection.in);
                        }
                    } else {
                        var timelineData = current.timelineData;
                        var firstFrame = current.timelinesRotation.length == 0;
                        if (firstFrame) Utils.setArraySize(current.timelinesRotation, timelineCount << 1, null);
                        var timelinesRotation = current.timelinesRotation;
                        for (var _ii = 0; _ii < timelineCount; _ii++) {
                            var timeline = timelines[_ii];
                            var pose = timelineData[_ii] >= AnimationState.FIRST ? MixPose.setup : currentPose;
                            if (timeline instanceof RotateTimeline) {
                                this.applyRotateTimeline(timeline, skeleton, animationTime, mix, pose, timelinesRotation, _ii << 1, firstFrame);
                            } else {
                                // This fixes the WebKit 602 specific issue described at http://esotericsoftware.com/forum/iOS-10-disappearing-graphics-10109
                                Utils.webkit602BugfixHelper(mix, pose);
                                timeline.apply(skeleton, animationLast, animationTime, events, mix, pose, MixDirection.in);
                            }
                        }
                    }
                    this.queueEvents(current, animationTime);
                    events.length = 0;
                    current.nextAnimationLast = animationTime;
                    current.nextTrackLast = current.trackTime;
                }
                this.queue.drain();
                return applied;
            }
        }, {
            key: "applyMixingFrom",
            value: function applyMixingFrom(to, skeleton, currentPose) {
                var from = to.mixingFrom;
                if (from.mixingFrom != null) this.applyMixingFrom(from, skeleton, currentPose);
                var mix = 0;
                if (to.mixDuration == 0) {
                    // Single frame mix to undo mixingFrom changes.
                    mix = 1;
                    currentPose = MixPose.setup;
                } else {
                    mix = to.mixTime / to.mixDuration;
                    if (mix > 1) mix = 1;
                }
                var events = mix < from.eventThreshold ? this.events : null;
                var attachments = mix < from.attachmentThreshold,
                    drawOrder = mix < from.drawOrderThreshold;
                var animationLast = from.animationLast,
                    animationTime = from.getAnimationTime();
                var timelineCount = from.animation.timelines.length;
                var timelines = from.animation.timelines;
                var timelineData = from.timelineData;
                var timelineDipMix = from.timelineDipMix;
                var firstFrame = from.timelinesRotation.length == 0;
                if (firstFrame) Utils.setArraySize(from.timelinesRotation, timelineCount << 1, null);
                var timelinesRotation = from.timelinesRotation;
                var pose = void 0;
                var alphaDip = from.alpha * to.interruptAlpha,
                    alphaMix = alphaDip * (1 - mix),
                    alpha = 0;
                from.totalAlpha = 0;
                for (var i = 0; i < timelineCount; i++) {
                    var timeline = timelines[i];
                    switch (timelineData[i]) {
                        case AnimationState.SUBSEQUENT:
                            if (!attachments && timeline instanceof AttachmentTimeline) continue;
                            if (!drawOrder && timeline instanceof DrawOrderTimeline) continue;
                            pose = currentPose;
                            alpha = alphaMix;
                            break;
                        case AnimationState.FIRST:
                            pose = MixPose.setup;
                            alpha = alphaMix;
                            break;
                        case AnimationState.DIP:
                            pose = MixPose.setup;
                            alpha = alphaDip;
                            break;
                        default:
                            pose = MixPose.setup;
                            alpha = alphaDip;
                            var dipMix = timelineDipMix[i];
                            alpha *= Math.max(0, 1 - dipMix.mixTime / dipMix.mixDuration);
                            break;
                    }
                    from.totalAlpha += alpha;
                    if (timeline instanceof RotateTimeline) this.applyRotateTimeline(timeline, skeleton, animationTime, alpha, pose, timelinesRotation, i << 1, firstFrame);else {
                        // This fixes the WebKit 602 specific issue described at http://esotericsoftware.com/forum/iOS-10-disappearing-graphics-10109
                        Utils.webkit602BugfixHelper(alpha, pose);
                        timeline.apply(skeleton, animationLast, animationTime, events, alpha, pose, MixDirection.out);
                    }
                }
                if (to.mixDuration > 0) this.queueEvents(from, animationTime);
                this.events.length = 0;
                from.nextAnimationLast = animationTime;
                from.nextTrackLast = from.trackTime;
                return mix;
            }
        }, {
            key: "applyRotateTimeline",
            value: function applyRotateTimeline(timeline, skeleton, time, alpha, pose, timelinesRotation, i, firstFrame) {
                if (firstFrame) timelinesRotation[i] = 0;
                if (alpha == 1) {
                    timeline.apply(skeleton, 0, time, null, 1, pose, MixDirection.in);
                    return;
                }
                var rotateTimeline = timeline;
                var frames = rotateTimeline.frames;
                var bone = skeleton.bones[rotateTimeline.boneIndex];
                if (time < frames[0]) {
                    if (pose == MixPose.setup) bone.rotation = bone.data.rotation;
                    return;
                }
                var r2 = 0;
                if (time >= frames[frames.length - RotateTimeline.ENTRIES]) // Time is after last frame.
                    r2 = bone.data.rotation + frames[frames.length + RotateTimeline.PREV_ROTATION];else {
                    // Interpolate between the previous frame and the current frame.
                    var frame = Animation.binarySearch(frames, time, RotateTimeline.ENTRIES);
                    var prevRotation = frames[frame + RotateTimeline.PREV_ROTATION];
                    var frameTime = frames[frame];
                    var percent = rotateTimeline.getCurvePercent((frame >> 1) - 1, 1 - (time - frameTime) / (frames[frame + RotateTimeline.PREV_TIME] - frameTime));
                    r2 = frames[frame + RotateTimeline.ROTATION] - prevRotation;
                    r2 -= (16384 - (16384.499999999996 - r2 / 360 | 0)) * 360;
                    r2 = prevRotation + r2 * percent + bone.data.rotation;
                    r2 -= (16384 - (16384.499999999996 - r2 / 360 | 0)) * 360;
                }
                // Mix between rotations using the direction of the shortest route on the first frame while detecting crosses.
                var r1 = pose == MixPose.setup ? bone.data.rotation : bone.rotation;
                var total = 0,
                    diff = r2 - r1;
                if (diff == 0) {
                    total = timelinesRotation[i];
                } else {
                    diff -= (16384 - (16384.499999999996 - diff / 360 | 0)) * 360;
                    var lastTotal = 0,
                        lastDiff = 0;
                    if (firstFrame) {
                        lastTotal = 0;
                        lastDiff = diff;
                    } else {
                        lastTotal = timelinesRotation[i]; // Angle and direction of mix, including loops.
                        lastDiff = timelinesRotation[i + 1]; // Difference between bones.
                    }
                    var current = diff > 0,
                        dir = lastTotal >= 0;
                    // Detect cross at 0 (not 180).
                    if (MathUtils.signum(lastDiff) != MathUtils.signum(diff) && Math.abs(lastDiff) <= 90) {
                        // A cross after a 360 rotation is a loop.
                        if (Math.abs(lastTotal) > 180) lastTotal += 360 * MathUtils.signum(lastTotal);
                        dir = current;
                    }
                    total = diff + lastTotal - lastTotal % 360; // Store loops as part of lastTotal.
                    if (dir != current) total += 360 * MathUtils.signum(lastTotal);
                    timelinesRotation[i] = total;
                }
                timelinesRotation[i + 1] = diff;
                r1 += total * alpha;
                bone.rotation = r1 - (16384 - (16384.499999999996 - r1 / 360 | 0)) * 360;
            }
        }, {
            key: "queueEvents",
            value: function queueEvents(entry, animationTime) {
                var animationStart = entry.animationStart,
                    animationEnd = entry.animationEnd;
                var duration = animationEnd - animationStart;
                var trackLastWrapped = entry.trackLast % duration;
                // Queue events before complete.
                var events = this.events;
                var i = 0,
                    n = events.length;
                for (; i < n; i++) {
                    var event = events[i];
                    if (event.time < trackLastWrapped) break;
                    if (event.time > animationEnd) continue; // Discard events outside animation start/end.
                    this.queue.event(entry, event);
                }
                // Queue complete if completed a loop iteration or the animation.
                if (entry.loop ? trackLastWrapped > entry.trackTime % duration : animationTime >= animationEnd && entry.animationLast < animationEnd) {
                    this.queue.complete(entry);
                }
                // Queue events after complete.
                for (; i < n; i++) {
                    var _event = events[i];
                    if (_event.time < animationStart) continue; // Discard events outside animation start/end.
                    this.queue.event(entry, events[i]);
                }
            }
        }, {
            key: "clearTracks",
            value: function clearTracks() {
                var oldDrainDisabled = this.queue.drainDisabled;
                this.queue.drainDisabled = true;
                for (var i = 0, n = this.tracks.length; i < n; i++) {
                    this.clearTrack(i);
                }this.tracks.length = 0;
                this.queue.drainDisabled = oldDrainDisabled;
                this.queue.drain();
            }
        }, {
            key: "clearTrack",
            value: function clearTrack(trackIndex) {
                if (trackIndex >= this.tracks.length) return;
                var current = this.tracks[trackIndex];
                if (current == null) return;
                this.queue.end(current);
                this.disposeNext(current);
                var entry = current;
                while (true) {
                    var from = entry.mixingFrom;
                    if (from == null) break;
                    this.queue.end(from);
                    entry.mixingFrom = null;
                    entry = from;
                }
                this.tracks[current.trackIndex] = null;
                this.queue.drain();
            }
        }, {
            key: "setCurrent",
            value: function setCurrent(index, current, interrupt) {
                var from = this.expandToIndex(index);
                this.tracks[index] = current;
                if (from != null) {
                    if (interrupt) this.queue.interrupt(from);
                    current.mixingFrom = from;
                    current.mixTime = 0;
                    // Store the interrupted mix percentage.
                    if (from.mixingFrom != null && from.mixDuration > 0) current.interruptAlpha *= Math.min(1, from.mixTime / from.mixDuration);
                    from.timelinesRotation.length = 0; // Reset rotation for mixing out, in case entry was mixed in.
                }
                this.queue.start(current);
            }
        }, {
            key: "setAnimation",
            value: function setAnimation(trackIndex, animationName, loop) {
                var animation = this.data.skeletonData.findAnimation(animationName);
                if (animation == null) throw new Error("Animation not found: " + animationName);
                return this.setAnimationWith(trackIndex, animation, loop);
            }
        }, {
            key: "setAnimationWith",
            value: function setAnimationWith(trackIndex, animation, loop) {
                if (animation == null) throw new Error("animation cannot be null.");
                var interrupt = true;
                var current = this.expandToIndex(trackIndex);
                if (current != null) {
                    if (current.nextTrackLast == -1) {
                        // Don't mix from an entry that was never applied.
                        this.tracks[trackIndex] = current.mixingFrom;
                        this.queue.interrupt(current);
                        this.queue.end(current);
                        this.disposeNext(current);
                        current = current.mixingFrom;
                        interrupt = false;
                    } else this.disposeNext(current);
                }
                var entry = this.trackEntry(trackIndex, animation, loop, current);
                this.setCurrent(trackIndex, entry, interrupt);
                this.queue.drain();
                return entry;
            }
        }, {
            key: "addAnimation",
            value: function addAnimation(trackIndex, animationName, loop, delay) {
                var animation = this.data.skeletonData.findAnimation(animationName);
                if (animation == null) throw new Error("Animation not found: " + animationName);
                return this.addAnimationWith(trackIndex, animation, loop, delay);
            }
        }, {
            key: "addAnimationWith",
            value: function addAnimationWith(trackIndex, animation, loop, delay) {
                if (animation == null) throw new Error("animation cannot be null.");
                var last = this.expandToIndex(trackIndex);
                if (last != null) {
                    while (last.next != null) {
                        last = last.next;
                    }
                }
                var entry = this.trackEntry(trackIndex, animation, loop, last);
                if (last == null) {
                    this.setCurrent(trackIndex, entry, true);
                    this.queue.drain();
                } else {
                    last.next = entry;
                    if (delay <= 0) {
                        var duration = last.animationEnd - last.animationStart;
                        if (duration != 0) {
                            if (last.loop) delay += duration * (1 + (last.trackTime / duration | 0));else delay += duration;
                            delay -= this.data.getMix(last.animation, animation);
                        } else delay = 0;
                    }
                }
                entry.delay = delay;
                return entry;
            }
        }, {
            key: "setEmptyAnimation",
            value: function setEmptyAnimation(trackIndex, mixDuration) {
                var entry = this.setAnimationWith(trackIndex, AnimationState.emptyAnimation, false);
                entry.mixDuration = mixDuration;
                entry.trackEnd = mixDuration;
                return entry;
            }
        }, {
            key: "addEmptyAnimation",
            value: function addEmptyAnimation(trackIndex, mixDuration, delay) {
                if (delay <= 0) delay -= mixDuration;
                var entry = this.addAnimationWith(trackIndex, AnimationState.emptyAnimation, false, delay);
                entry.mixDuration = mixDuration;
                entry.trackEnd = mixDuration;
                return entry;
            }
        }, {
            key: "setEmptyAnimations",
            value: function setEmptyAnimations(mixDuration) {
                var oldDrainDisabled = this.queue.drainDisabled;
                this.queue.drainDisabled = true;
                for (var i = 0, n = this.tracks.length; i < n; i++) {
                    var current = this.tracks[i];
                    if (current != null) this.setEmptyAnimation(current.trackIndex, mixDuration);
                }
                this.queue.drainDisabled = oldDrainDisabled;
                this.queue.drain();
            }
        }, {
            key: "expandToIndex",
            value: function expandToIndex(index) {
                if (index < this.tracks.length) return this.tracks[index];
                Utils.ensureArrayCapacity(this.tracks, index - this.tracks.length + 1, null);
                this.tracks.length = index + 1;
                return null;
            }
        }, {
            key: "trackEntry",
            value: function trackEntry(trackIndex, animation, loop, last) {
                var entry = this.trackEntryPool.obtain();
                entry.trackIndex = trackIndex;
                entry.animation = animation;
                entry.loop = loop;
                entry.eventThreshold = 0;
                entry.attachmentThreshold = 0;
                entry.drawOrderThreshold = 0;
                entry.animationStart = 0;
                entry.animationEnd = animation.duration;
                entry.animationLast = -1;
                entry.nextAnimationLast = -1;
                entry.delay = 0;
                entry.trackTime = 0;
                entry.trackLast = -1;
                entry.nextTrackLast = -1;
                entry.trackEnd = Number.MAX_VALUE;
                entry.timeScale = 1;
                entry.alpha = 1;
                entry.interruptAlpha = 1;
                entry.mixTime = 0;
                entry.mixDuration = last == null ? 0 : this.data.getMix(last.animation, animation);
                return entry;
            }
        }, {
            key: "disposeNext",
            value: function disposeNext(entry) {
                var next = entry.next;
                while (next != null) {
                    this.queue.dispose(next);
                    next = next.next;
                }
                entry.next = null;
            }
        }, {
            key: "_animationsChanged",
            value: function _animationsChanged() {
                this.animationsChanged = false;
                var propertyIDs = this.propertyIDs;
                propertyIDs.clear();
                var mixingTo = this.mixingTo;
                for (var i = 0, n = this.tracks.length; i < n; i++) {
                    var entry = this.tracks[i];
                    if (entry != null) entry.setTimelineData(null, mixingTo, propertyIDs);
                }
            }
        }, {
            key: "getCurrent",
            value: function getCurrent(trackIndex) {
                if (trackIndex >= this.tracks.length) return null;
                return this.tracks[trackIndex];
            }
        }, {
            key: "addListener",
            value: function addListener(listener) {
                if (listener == null) throw new Error("listener cannot be null.");
                this.listeners.push(listener);
            }
            /** Removes the listener added with {@link #addListener(AnimationStateListener)}. */

        }, {
            key: "removeListener",
            value: function removeListener(listener) {
                var index = this.listeners.indexOf(listener);
                if (index >= 0) this.listeners.splice(index, 1);
            }
        }, {
            key: "clearListeners",
            value: function clearListeners() {
                this.listeners.length = 0;
            }
        }, {
            key: "clearListenerNotifications",
            value: function clearListenerNotifications() {
                this.queue.clear();
            }
        }]);

        return AnimationState;
    }();

    AnimationState.emptyAnimation = new Animation("<empty>", [], 0);
    AnimationState.SUBSEQUENT = 0;
    AnimationState.FIRST = 1;
    AnimationState.DIP = 2;
    AnimationState.DIP_MIX = 3;
    spine.AnimationState = AnimationState;

    var TrackEntry = function () {
        function TrackEntry() {
            _classCallCheck(this, TrackEntry);

            this.timelineData = new Array();
            this.timelineDipMix = new Array();
            this.timelinesRotation = new Array();
        }

        _createClass(TrackEntry, [{
            key: "reset",
            value: function reset() {
                this.next = null;
                this.mixingFrom = null;
                this.animation = null;
                this.listener = null;
                this.timelineData.length = 0;
                this.timelineDipMix.length = 0;
                this.timelinesRotation.length = 0;
            }
        }, {
            key: "setTimelineData",
            value: function setTimelineData(to, mixingToArray, propertyIDs) {
                if (to != null) mixingToArray.push(to);
                var lastEntry = this.mixingFrom != null ? this.mixingFrom.setTimelineData(this, mixingToArray, propertyIDs) : this;
                if (to != null) mixingToArray.pop();
                var mixingTo = mixingToArray;
                var mixingToLast = mixingToArray.length - 1;
                var timelines = this.animation.timelines;
                var timelinesCount = this.animation.timelines.length;
                var timelineData = Utils.setArraySize(this.timelineData, timelinesCount);
                this.timelineDipMix.length = 0;
                var timelineDipMix = Utils.setArraySize(this.timelineDipMix, timelinesCount);
                outer: for (var i = 0; i < timelinesCount; i++) {
                    var id = timelines[i].getPropertyId();
                    if (!propertyIDs.add(id)) timelineData[i] = AnimationState.SUBSEQUENT;else if (to == null || !to.hasTimeline(id)) timelineData[i] = AnimationState.FIRST;else {
                        for (var ii = mixingToLast; ii >= 0; ii--) {
                            var entry = mixingTo[ii];
                            if (!entry.hasTimeline(id)) {
                                if (entry.mixDuration > 0) {
                                    timelineData[i] = AnimationState.DIP_MIX;
                                    timelineDipMix[i] = entry;
                                    continue outer;
                                }
                            }
                        }
                        timelineData[i] = AnimationState.DIP;
                    }
                }
                return lastEntry;
            }
        }, {
            key: "hasTimeline",
            value: function hasTimeline(id) {
                var timelines = this.animation.timelines;
                for (var i = 0, n = timelines.length; i < n; i++) {
                    if (timelines[i].getPropertyId() == id) return true;
                }return false;
            }
        }, {
            key: "getAnimationTime",
            value: function getAnimationTime() {
                if (this.loop) {
                    var duration = this.animationEnd - this.animationStart;
                    if (duration == 0) return this.animationStart;
                    return this.trackTime % duration + this.animationStart;
                }
                return Math.min(this.trackTime + this.animationStart, this.animationEnd);
            }
        }, {
            key: "setAnimationLast",
            value: function setAnimationLast(animationLast) {
                this.animationLast = animationLast;
                this.nextAnimationLast = animationLast;
            }
        }, {
            key: "isComplete",
            value: function isComplete() {
                return this.trackTime >= this.animationEnd - this.animationStart;
            }
        }, {
            key: "resetRotationDirections",
            value: function resetRotationDirections() {
                this.timelinesRotation.length = 0;
            }
        }]);

        return TrackEntry;
    }();

    spine.TrackEntry = TrackEntry;

    var EventQueue = function () {
        function EventQueue(animState) {
            _classCallCheck(this, EventQueue);

            this.objects = [];
            this.drainDisabled = false;
            this.animState = animState;
        }

        _createClass(EventQueue, [{
            key: "start",
            value: function start(entry) {
                this.objects.push(EventType.start);
                this.objects.push(entry);
                this.animState.animationsChanged = true;
            }
        }, {
            key: "interrupt",
            value: function interrupt(entry) {
                this.objects.push(EventType.interrupt);
                this.objects.push(entry);
            }
        }, {
            key: "end",
            value: function end(entry) {
                this.objects.push(EventType.end);
                this.objects.push(entry);
                this.animState.animationsChanged = true;
            }
        }, {
            key: "dispose",
            value: function dispose(entry) {
                this.objects.push(EventType.dispose);
                this.objects.push(entry);
            }
        }, {
            key: "complete",
            value: function complete(entry) {
                this.objects.push(EventType.complete);
                this.objects.push(entry);
            }
        }, {
            key: "event",
            value: function event(entry, _event2) {
                this.objects.push(EventType.event);
                this.objects.push(entry);
                this.objects.push(_event2);
            }
        }, {
            key: "drain",
            value: function drain() {
                if (this.drainDisabled) return;
                this.drainDisabled = true;
                var objects = this.objects;
                var listeners = this.animState.listeners;
                for (var i = 0; i < objects.length; i += 2) {
                    var type = objects[i];
                    var entry = objects[i + 1];
                    switch (type) {
                        case EventType.start:
                            if (entry.listener != null && entry.listener.start) entry.listener.start(entry);
                            for (var ii = 0; ii < listeners.length; ii++) {
                                if (listeners[ii].start) listeners[ii].start(entry);
                            }break;
                        case EventType.interrupt:
                            if (entry.listener != null && entry.listener.interrupt) entry.listener.interrupt(entry);
                            for (var _ii2 = 0; _ii2 < listeners.length; _ii2++) {
                                if (listeners[_ii2].interrupt) listeners[_ii2].interrupt(entry);
                            }break;
                        case EventType.end:
                            if (entry.listener != null && entry.listener.end) entry.listener.end(entry);
                            for (var _ii3 = 0; _ii3 < listeners.length; _ii3++) {
                                if (listeners[_ii3].end) listeners[_ii3].end(entry);
                            } // Fall through.
                        case EventType.dispose:
                            if (entry.listener != null && entry.listener.dispose) entry.listener.dispose(entry);
                            for (var _ii4 = 0; _ii4 < listeners.length; _ii4++) {
                                if (listeners[_ii4].dispose) listeners[_ii4].dispose(entry);
                            }this.animState.trackEntryPool.free(entry);
                            break;
                        case EventType.complete:
                            if (entry.listener != null && entry.listener.complete) entry.listener.complete(entry);
                            for (var _ii5 = 0; _ii5 < listeners.length; _ii5++) {
                                if (listeners[_ii5].complete) listeners[_ii5].complete(entry);
                            }break;
                        case EventType.event:
                            var event = objects[i++ + 2];
                            if (entry.listener != null && entry.listener.event) entry.listener.event(entry, event);
                            for (var _ii6 = 0; _ii6 < listeners.length; _ii6++) {
                                if (listeners[_ii6].event) listeners[_ii6].event(entry, event);
                            }break;
                    }
                }
                this.clear();
                this.drainDisabled = false;
            }
        }, {
            key: "clear",
            value: function clear() {
                this.objects.length = 0;
            }
        }]);

        return EventQueue;
    }();

    spine.EventQueue = EventQueue;
    var EventType = void 0;
    (function (EventType) {
        EventType[EventType["start"] = 0] = "start";
        EventType[EventType["interrupt"] = 1] = "interrupt";
        EventType[EventType["end"] = 2] = "end";
        EventType[EventType["dispose"] = 3] = "dispose";
        EventType[EventType["complete"] = 4] = "complete";
        EventType[EventType["event"] = 5] = "event";
    })(EventType = spine.EventType || (spine.EventType = {}));

    var AnimationStateAdapter2 = function () {
        function AnimationStateAdapter2() {
            _classCallCheck(this, AnimationStateAdapter2);
        }

        _createClass(AnimationStateAdapter2, [{
            key: "start",
            value: function start(entry) {}
        }, {
            key: "interrupt",
            value: function interrupt(entry) {}
        }, {
            key: "end",
            value: function end(entry) {}
        }, {
            key: "dispose",
            value: function dispose(entry) {}
        }, {
            key: "complete",
            value: function complete(entry) {}
        }, {
            key: "event",
            value: function event(entry, _event3) {}
        }]);

        return AnimationStateAdapter2;
    }();

    spine.AnimationStateAdapter2 = AnimationStateAdapter2;
})(spine || (spine = {}));
})