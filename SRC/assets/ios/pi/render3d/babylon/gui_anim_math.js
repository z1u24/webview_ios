_$define("pi/render3d/babylon/gui_anim_math", function (require, exports, module){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });

var AnimMath = function () {
  function AnimMath() {
    _classCallCheck(this, AnimMath);
  }

  _createClass(AnimMath, null, [{
    key: "line",

    /**
     *
     * @param x
     */
    value: function line(x) {
      return x;
    }
    /**
     * 2 次 函数 0-1， 分三段
    // +----------------------------------+
    // |                                  |
    // |            XXXXX                 |
    // |         XX       XX              |
    // |      XX           XX             |
    // |     XX             XX            |
    // |    XX               XX           |
    // |     +-------+        XX +------+ |
    // |             +-------+ XX         |
    // |                        XX        |
    // |                         XX       |
    // |                          XX      |
    // |                            XX    |
    // |                             XX   |
    // |                                  |
    // +----------------------------------+
     * @param x
    */

  }, {
    key: "power2_1_3_down_0",
    value: function power2_1_3_down_0(x) {
      return -9 * Math.pow(x, 2) + 6 * x;
    }
    /**
     *
    //                 +-+*
    //               ++  |**
    //             ++    | **
    //           ++      |  *
    //         ++        |  **
    //       ++          |   **
    //     ++            |    *
    //   ++              |    **
    //  +                |     *
    // ++-----------------------+
    //       +-----+     +------+
     * @param x
     */

  }, {
    key: "back1",
    value: function back1(x) {
      return x < 3 / 4 ? 4 * x / 3 : 4 * (1 - x);
    }
    /**
     *
     * @param x
     */

  }, {
    key: "roundTipAnim",
    value: function roundTipAnim(x) {
      return x < 0.3 ? 10 * x / 3 : x < 0.7 ? 1 : -10 * (x - 1) / 3;
    }
    /**
     *
     * @param x
     */

  }, {
    key: "sin_2PI",
    value: function sin_2PI(x) {
      return Math.sin(2 * Math.PI * x);
    }
    /**
     *
     * @param x
     */

  }, {
    key: "sin_PI",
    value: function sin_PI(x) {
      return Math.sin(Math.PI * x);
    }
  }]);

  return AnimMath;
}();

exports.AnimMath = AnimMath;
})