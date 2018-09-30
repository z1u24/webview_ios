(function (_cfg, it, it1) {
  var _$temp = void 0,
      node = void 0;_$temp = node;{
    var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 1;_node.attrHash = 1045235690;_node.attrs["w-class"] = "item";_$temp = _node;{
      var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "img", "sid": 1 };_node2.children = [];_node2.attrSize = 2;_node2.attrHash = 1356816673;{
        var attrvalue = "";attrvalue += it.img;attrvalue += "";_node2.attrs["src"] = attrvalue;
      }_node2.attrHash = _hash.nextHash(_node2.attrHash, _calTextHash(_node2.attrs["src"]));_node2.attrs["w-class"] = "itemImg";_chFunc(_node2);_$parent2.children.push(_node2);
    }_$temp = _node;{
      var _$parent3 = _$temp;var _node3 = { "attrs": {}, "tagName": "div", "sid": 2 };_node3.children = [];_node3.attrSize = 1;_node3.attrHash = 2863761446;_node3.attrs["style"] = "display: inline-block;flex: 1 0 0;";_$temp = _node3;{
        var _$parent4 = _$temp;var _node4 = { "attrs": {}, "tagName": "div", "sid": 3 };_node4.children = [];_node4.attrSize = 1;_node4.attrHash = 136397174;_node4.attrs["w-class"] = "itemName";_$temp = _node4;{
          var _$parent5 = _$temp;var _node5 = { "attrs": {}, "tagName": "span", "sid": 4 };_node5.children = [];_node5.attrSize = 1;_node5.attrHash = 704573987;_node5.attrs["w-class"] = "itemLeft";_$temp = _node5;{
            var _$parent6 = _$temp;_addText(it.name, _$parent6);
          }_chFunc(_node5);_$parent5.children.push(_node5);
        }_$temp = _node4;{
          var _$parent7 = _$temp;var _node6 = { "attrs": {}, "tagName": "span", "sid": 5 };_node6.children = [];_node6.attrHash = 0;_$temp = _node6;{
            var _$parent8 = _$temp;_addText(it.data, _$parent8);
          }_chFunc(_node6);_$parent7.children.push(_node6);
        }_chFunc(_node4);_$parent4.children.push(_node4);
      }_$temp = _node3;{
        var _$parent9 = _$temp;var _node7 = { "attrs": {}, "tagName": "div", "sid": 6 };_node7.children = [];_node7.attrSize = 1;_node7.attrHash = 2937775176;_node7.attrs["w-class"] = "itemTime";_$temp = _node7;{
          var _$parent10 = _$temp;var _node8 = { "attrs": {}, "tagName": "span", "sid": 7 };_node8.children = [];_node8.attrSize = 1;_node8.attrHash = 704573987;_node8.attrs["w-class"] = "itemLeft";_$temp = _node8;{
            var _$parent11 = _$temp;_addText(it.time, _$parent11);
          }_chFunc(_node8);_$parent10.children.push(_node8);
        }if (it.describe && it.describe != "") {
          _$temp = _node7;{
            var _$parent12 = _$temp;var _node9 = { "attrs": {}, "tagName": "span", "sid": 8 };_node9.children = [];_node9.attrSize = 1;_node9.attrHash = 354003296;_node9.attrs["style"] = "color: #F7931A;";_$temp = _node9;{
              var _$parent13 = _$temp;_addText(it.describe, _$parent13);
            }_chFunc(_node9);_$parent12.children.push(_node9);
          }
        }_chFunc(_node7);_$parent9.children.push(_node7);
      }_chFunc(_node3);_$parent3.children.push(_node3);
    }_chFunc(_node);return _node;
  }
});