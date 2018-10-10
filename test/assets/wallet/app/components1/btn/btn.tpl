(function (_cfg, it, it1) {
  var _$temp = void 0,
      node = void 0;_$temp = node;{
    var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 3;_node.attrHash = 4260271187;{
      var attrvalue = "";attrvalue += "btn btn-";attrvalue += it.types;attrvalue += " btn-";attrvalue += it.color;attrvalue += "";_node.attrs["w-class"] = attrvalue;
    }_node.attrHash = _hash.nextHash(_node.attrHash, _calTextHash(_node.attrs["w-class"]));_node.attrs["on-tap"] = "doTap";{
      var _attrvalue = "";_attrvalue += it.style ? it.style : '';_attrvalue += " animation:";_attrvalue += it1.isAbleBtn ? 'btnClick 0.2s' : '';_attrvalue += "";_node.attrs["style"] = _attrvalue;
    }_node.attrHash = _hash.nextHash(_node.attrHash, _calTextHash(_node.attrs["style"]));_$temp = _node;{
      var _$parent2 = _$temp;_addText(it.name, _$parent2);
    }_chFunc(_node);return _node;
  }
});