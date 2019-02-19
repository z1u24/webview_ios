(function (_cfg, it, it1) {
  var _$temp = void 0,
      node = void 0;_$temp = node;{
    var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 2;_node.attrHash = 829643686;_node.attrs["w-class"] = "select-user-wrap";_node.attrs["on-tap"] = "changeSelect";_$temp = _node;{
      var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "div", "sid": 1 };_node2.children = [];_node2.attrSize = 1;_node2.attrHash = 1696881672;_node2.attrs["w-class"] = "slect-wrap";_$temp = _node2;{
        var _$parent3 = _$temp;var _node3 = { "attrs": {}, "tagName": "div", "sid": 2 };_node3.children = [];_node3.childHash = 2370944817;_node3.attrSize = 1;_node3.attrHash = 4275137225;_node3.attrs["w-class"] = "avatar-wrap";_$temp = _node3;{
          var _$parent4 = _$temp;var _node4 = { "attrs": {}, "tagName": "img", "sid": 3 };_node4.children = [];_node4.childHash = 0;_node4.attrSize = 2;_node4.attrHash = 884279964;_node4.attrs["w-class"] = "avatar";_node4.attrs["src"] = "../../res/images/user.png";_$parent4.children.push(_node4);
        }_$parent3.children.push(_node3);
      }_$temp = _node2;{
        var _$parent5 = _$temp;var _node5 = { "attrs": {}, "tagName": "span", "sid": 4 };_node5.children = [];_node5.attrSize = 1;_node5.attrHash = 4232090967;_node5.attrs["w-class"] = "userName";_$temp = _node5;{
          var _$parent6 = _$temp;_addText(it.name, _$parent6);
        }_chFunc(_node5);_$parent5.children.push(_node5);
      }if (it.isSelect) {
        _$temp = _node2;{
          var _$parent7 = _$temp;var _node6 = { "attrs": {}, "tagName": "img", "sid": 5 };_node6.children = [];_node6.childHash = 0;_node6.attrSize = 2;_node6.attrHash = 2651505828;_node6.attrs["w-class"] = "selectIcon";_node6.attrs["src"] = "../../res/images/icon_right2.png";_$parent7.children.push(_node6);
        }
      }_chFunc(_node2);_$parent2.children.push(_node2);
    }_chFunc(_node);return _node;
  }
});