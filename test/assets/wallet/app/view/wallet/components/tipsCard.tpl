(function (_cfg, it, it1) {
  var _$temp = void 0,
      node = void 0;_$temp = node;{
    var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 1;_node.attrHash = 2786971788;_node.attrs["w-class"] = "top-box";_$temp = _node;{
      var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "div", "sid": 1 };_node2.children = [];_node2.attrSize = 2;_node2.attrHash = 4103100898;_node2.attrs["w-class"] = "top-tip-title";{
        var attrvalue = "";attrvalue += it.titleStyle;attrvalue += "";_node2.attrs["style"] = attrvalue;
      }_node2.attrHash = _hash.nextHash(_node2.attrHash, _calTextHash(_node2.attrs["style"]));_$temp = _node2;{
        var _$parent3 = _$temp;_addText(it.title, _$parent3);
      }_chFunc(_node2);_$parent2.children.push(_node2);
    }_$temp = _node;{
      var _$parent4 = _$temp;var _node3 = { "attrs": {}, "tagName": "div", "sid": 2 };_node3.children = [];_node3.attrSize = 2;_node3.attrHash = 1068794801;_node3.attrs["w-class"] = "top-tip-content";{
        var _attrvalue = "";_attrvalue += it.contentStyle;_attrvalue += "";_node3.attrs["style"] = _attrvalue;
      }_node3.attrHash = _hash.nextHash(_node3.attrHash, _calTextHash(_node3.attrs["style"]));_$temp = _node3;{
        var _$parent5 = _$temp;_addText(it.content, _$parent5);
      }_chFunc(_node3);_$parent4.children.push(_node3);
    }_chFunc(_node);return _node;
  }
});