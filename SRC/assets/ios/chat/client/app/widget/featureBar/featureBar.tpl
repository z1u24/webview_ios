(function (_cfg, it, it1) {
  var _$temp = void 0,
      node = void 0;_$temp = node;{
    var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 1;_node.attrHash = 1065331216;_node.attrs["w-class"] = "featurebar";_$temp = _node;{
      var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "img", "sid": 1 };_node2.children = [];_node2.attrSize = 2;_node2.attrHash = 3891465491;_node2.attrs["w-class"] = "icon";{
        var attrvalue = "";attrvalue += "../../res/images/";attrvalue += it.iconPath;attrvalue += "";_node2.attrs["src"] = attrvalue;
      }_node2.attrHash = _hash.nextHash(_node2.attrHash, _calTextHash(_node2.attrs["src"]));_chFunc(_node2);_$parent2.children.push(_node2);
    }_$temp = _node;{
      var _$parent3 = _$temp;var _node3 = { "attrs": {}, "tagName": "span", "sid": 2 };_node3.children = [];_node3.attrSize = 1;_node3.attrHash = 2710496119;_node3.attrs["w-class"] = "text";_$temp = _node3;{
        var _$parent4 = _$temp;_addText(it.text, _$parent4);
      }_chFunc(_node3);_$parent3.children.push(_node3);
    }_$temp = _node;{
      var _$parent5 = _$temp;var _node4 = { "attrs": {}, "tagName": "img", "sid": 3 };_node4.children = [];_node4.childHash = 0;_node4.attrSize = 3;_node4.attrHash = 1232575168;_node4.attrs["w-class"] = "more";_node4.attrs["src"] = "../../res/images/more-gray.png";_node4.attrs["on-tap"] = "more";_$parent5.children.push(_node4);
    }_chFunc(_node);return _node;
  }
});