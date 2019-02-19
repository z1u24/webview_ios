(function (_cfg, it, it1) {
  var _$temp = void 0,
      node = void 0;_$temp = node;{
    var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 2;_node.attrHash = 2434185513;{
      var attrvalue = "";attrvalue += "box ";attrvalue += it.selected === it.hoeType ? 'box-selected' : 'box-noselected';attrvalue += "";_node.attrs["w-class"] = attrvalue;
    }_node.attrHash = _hash.nextHash(_node.attrHash, _calTextHash(_node.attrs["w-class"]));_node.attrs["on-tap"] = "selectHoeClick";_$temp = _node;{
      var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "img", "sid": 1 };_node2.children = [];_node2.attrSize = 2;_node2.attrHash = 1157699736;{
        var _attrvalue = "";_attrvalue += it.imgUrl;_attrvalue += "";_node2.attrs["src"] = _attrvalue;
      }_node2.attrHash = _hash.nextHash(_node2.attrHash, _calTextHash(_node2.attrs["src"]));_node2.attrs["style"] = "width:100%;height:100%;";_chFunc(_node2);_$parent2.children.push(_node2);
    }_$temp = _node;{
      var _$parent3 = _$temp;var _node3 = { "attrs": {}, "tagName": "div", "sid": 2 };_node3.children = [];_node3.attrSize = 1;_node3.attrHash = 2364436711;_node3.attrs["w-class"] = "holded-num";_$temp = _node3;{
        var _$parent4 = _$temp;_addText(it.holdedNumber > 99 ? "99+" : it.holdedNumber, _$parent4);
      }_chFunc(_node3);_$parent3.children.push(_node3);
    }_chFunc(_node);return _node;
  }
});