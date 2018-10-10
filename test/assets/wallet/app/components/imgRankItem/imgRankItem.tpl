(function (_cfg, it, it1) {
  var _$temp = void 0,
      node = void 0;_$temp = node;{
    var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 1;_node.attrHash = 1045235690;_node.attrs["w-class"] = "item";_$temp = _node;{
      var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "span", "sid": 1 };_node2.children = [];_node2.attrSize = 1;_node2.attrHash = 3802403657;_node2.attrs["w-class"] = "itemRank";_$temp = _node2;{
        var _$parent3 = _$temp;_addText(it.rank, _$parent3);
      }_chFunc(_node2);_$parent2.children.push(_node2);
    }_$temp = _node;{
      var _$parent4 = _$temp;var _node3 = { "attrs": {}, "tagName": "img", "sid": 2 };_node3.children = [];_node3.attrSize = 2;_node3.attrHash = 1356816673;{
        var attrvalue = "";attrvalue += it.img;attrvalue += "";_node3.attrs["src"] = attrvalue;
      }_node3.attrHash = _hash.nextHash(_node3.attrHash, _calTextHash(_node3.attrs["src"]));_node3.attrs["w-class"] = "itemImg";_chFunc(_node3);_$parent4.children.push(_node3);
    }_$temp = _node;{
      var _$parent5 = _$temp;var _node4 = { "attrs": {}, "tagName": "div", "sid": 3 };_node4.children = [];_node4.attrSize = 1;_node4.attrHash = 2863761446;_node4.attrs["style"] = "display: inline-block;flex: 1 0 0;";_$temp = _node4;{
        var _$parent6 = _$temp;var _node5 = { "attrs": {}, "tagName": "div", "sid": 4 };_node5.children = [];_node5.attrSize = 1;_node5.attrHash = 136397174;_node5.attrs["w-class"] = "itemName";_$temp = _node5;{
          var _$parent7 = _$temp;_addText(it.name, _$parent7);
        }_chFunc(_node5);_$parent6.children.push(_node5);
      }_$temp = _node4;{
        var _$parent8 = _$temp;var _node6 = { "attrs": {}, "tagName": "div", "sid": 5 };_node6.children = [];_node6.attrSize = 1;_node6.attrHash = 936179753;_node6.attrs["w-class"] = "itemDescribe";_$temp = _node6;{
          var _$parent9 = _$temp;_addText(it.describe, _$parent9);
        }_chFunc(_node6);_$parent8.children.push(_node6);
      }_chFunc(_node4);_$parent5.children.push(_node4);
    }_chFunc(_node);return _node;
  }
});