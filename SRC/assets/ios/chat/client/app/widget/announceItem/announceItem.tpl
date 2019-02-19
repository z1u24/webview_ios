(function (_cfg, it, it1) {
  var _$temp = void 0,
      node = void 0;_$temp = node;{
    var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrHash = 0;if (it.announce && !it.announce.cancel) {
      _$temp = _node;{
        var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "div", "sid": 1 };_node2.children = [];_node2.attrSize = 1;_node2.attrHash = 1058457359;_node2.attrs["w-class"] = "item-wrap";_$temp = _node2;{
          var _$parent3 = _$temp;var _node3 = { "attrs": {}, "tagName": "div", "sid": 2 };_node3.children = [];_node3.attrSize = 1;_node3.attrHash = 1019047777;_node3.attrs["w-class"] = "title";_$temp = _node3;{
            var _$parent4 = _$temp;_addText(it.noticeTitle, _$parent4);
          }_chFunc(_node3);_$parent3.children.push(_node3);
        }_$temp = _node2;{
          var _$parent5 = _$temp;var _node4 = { "attrs": {}, "tagName": "div", "sid": 3 };_node4.children = [];_node4.attrSize = 1;_node4.attrHash = 4199677935;_node4.attrs["w-class"] = "time";_$temp = _node4;{
            var _$parent6 = _$temp;_addText(it.time, _$parent6);
          }_chFunc(_node4);_$parent5.children.push(_node4);
        }_chFunc(_node2);_$parent2.children.push(_node2);
      }
    }_chFunc(_node);return _node;
  }
});