(function (_cfg, it, it1) {
  var _$temp = void 0,
      node = void 0;_$temp = node;{
    var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 1;_node.attrHash = 2352323612;_node.attrs["style"] = "height: 100%;";if (it.announce && !it.announce.cancel) {
      _$temp = _node;{
        var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "div", "sid": 1 };_node2.children = [];_node2.attrSize = 1;_node2.attrHash = 1980585598;_node2.attrs["w-class"] = "latest-announce-wrap";_$temp = _node2;{
          var _$parent3 = _$temp;var _node3 = { "attrs": {}, "tagName": "img", "sid": 2 };_node3.children = [];_node3.childHash = 0;_node3.attrSize = 2;_node3.attrHash = 1329018943;_node3.attrs["src"] = "../../res/images/sound.png";_node3.attrs["style"] = "margin-left: 30px;margin-right: 15px;";_$parent3.children.push(_node3);
        }_$temp = _node2;{
          var _$parent4 = _$temp;var _node4 = { "attrs": {}, "tagName": "div", "sid": 3 };_node4.children = [];_node4.attrSize = 1;_node4.attrHash = 2255799052;_node4.attrs["w-class"] = "content-wrap";_$temp = _node4;{
            var _$parent5 = _$temp;_addText(it.noticeTitle, _$parent5);
          }_chFunc(_node4);_$parent4.children.push(_node4);
        }_$temp = _node2;{
          var _$parent6 = _$temp;var _node5 = { "attrs": {}, "tagName": "img", "sid": 4 };_node5.children = [];_node5.childHash = 0;_node5.attrSize = 3;_node5.attrHash = 2001906194;_node5.attrs["src"] = "../../res/images/close_blue.png";_node5.attrs["on-tap"] = "closeAnnounce";_node5.attrs["style"] = "margin-right: 30px;";_$parent6.children.push(_node5);
        }_chFunc(_node2);_$parent2.children.push(_node2);
      }
    }_chFunc(_node);return _node;
  }
});