(function (_cfg, it, it1) {
  var _$temp = void 0,
      node = void 0;_$temp = node;{
    var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 2;_node.attrHash = 1195718865;_node.attrs["w-class"] = "item";{
      var attrvalue = "";attrvalue += it.style ? it.style : '';attrvalue += "";_node.attrs["style"] = attrvalue;
    }_node.attrHash = _hash.nextHash(_node.attrHash, _calTextHash(_node.attrs["style"]));_$temp = _node;{
      var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "span", "sid": 1 };_node2.children = [];_node2.attrSize = 1;_node2.attrHash = 136397174;_node2.attrs["w-class"] = "itemName";_$temp = _node2;{
        var _$parent3 = _$temp;_addText(it.name, _$parent3);
      }_chFunc(_node2);_$parent2.children.push(_node2);
    }if (it.describe && it.describe != "") {
      _$temp = _node;{
        var _$parent4 = _$temp;var _node3 = { "attrs": {}, "tagName": "span", "sid": 2 };_node3.children = [];_node3.attrSize = 1;_node3.attrHash = 3942496064;_node3.attrs["w-class"] = "itemDesc";_$temp = _node3;{
          var _$parent5 = _$temp;_addText(it.describe, _$parent5);
        }_chFunc(_node3);_$parent4.children.push(_node3);
      }
    }_$temp = _node;{
      var _$parent6 = _$temp;var _node4 = { "attrs": {}, "tagName": "img", "sid": 3 };_node4.children = [];_node4.childHash = 0;_node4.attrSize = 2;_node4.attrHash = 2946844161;_node4.attrs["src"] = "../../res/image/right_arrow2_gray.png";_node4.attrs["w-class"] = "itemImg";_$parent6.children.push(_node4);
    }_chFunc(_node);return _node;
  }
});