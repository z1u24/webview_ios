(function (_cfg, it, it1) {
  var _$temp = void 0,
      node = void 0;_$temp = node;{
    var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 1;_node.attrHash = 1045235690;_node.attrs["w-class"] = "item";_$temp = _node;{
      var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "div", "sid": 1 };_node2.children = [];_node2.attrSize = 1;_node2.attrHash = 136397174;_node2.attrs["w-class"] = "itemName";_$temp = _node2;{
        var _$parent3 = _$temp;var _node3 = { "attrs": {}, "tagName": "span", "sid": 2 };_node3.children = [];_node3.attrSize = 1;_node3.attrHash = 1043954522;_node3.attrs["w-class"] = "itemleft";_$temp = _node3;{
          var _$parent4 = _$temp;_addText(it.name, _$parent4);
        }if (it.showPin) {
          _$temp = _node3;{
            var _$parent5 = _$temp;var _node4 = { "attrs": {}, "tagName": "span", "sid": 3 };_node4.children = [];_node4.attrSize = 1;_node4.attrHash = 2405874756;_node4.attrs["w-class"] = "other";_$temp = _node4;{
              var _$parent6 = _$temp;_addText(it1.cfgData.pin, _$parent6);
            }_chFunc(_node4);_$parent5.children.push(_node4);
          }
        }_chFunc(_node3);_$parent3.children.push(_node3);
      }_$temp = _node2;{
        var _$parent7 = _$temp;var _node5 = { "attrs": {}, "tagName": "span", "sid": 4 };_node5.children = [];_node5.attrHash = 0;_$temp = _node5;{
          var _$parent8 = _$temp;_addText(it.data, _$parent8);
        }_chFunc(_node5);_$parent7.children.push(_node5);
      }_chFunc(_node2);_$parent2.children.push(_node2);
    }_$temp = _node;{
      var _$parent9 = _$temp;var _node6 = { "attrs": {}, "tagName": "div", "sid": 5 };_node6.children = [];_node6.attrSize = 1;_node6.attrHash = 2937775176;_node6.attrs["w-class"] = "itemTime";_$temp = _node6;{
        var _$parent10 = _$temp;var _node7 = { "attrs": {}, "tagName": "span", "sid": 6 };_node7.children = [];_node7.attrSize = 1;_node7.attrHash = 1043954522;_node7.attrs["w-class"] = "itemleft";_$temp = _node7;{
          var _$parent11 = _$temp;_addText(it.time, _$parent11);
        }_chFunc(_node7);_$parent10.children.push(_node7);
      }if (it.describe && it.describe != "") {
        _$temp = _node6;{
          var _$parent12 = _$temp;var _node8 = { "attrs": {}, "tagName": "span", "sid": 7 };_node8.children = [];_node8.attrHash = 0;_$temp = _node8;{
            var _$parent13 = _$temp;_addText(it.describe, _$parent13);
          }_chFunc(_node8);_$parent12.children.push(_node8);
        }
      }_chFunc(_node6);_$parent9.children.push(_node6);
    }_chFunc(_node);return _node;
  }
});