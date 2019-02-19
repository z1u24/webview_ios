(function (_cfg, it, it1) {
  var _$temp = void 0,
      node = void 0;_$temp = node;{
    var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 1;_node.attrHash = 3273864753;{
      var attrvalue = "";attrvalue += "box ";attrvalue += it.received ? 'received_bg' : '';attrvalue += "";_node.attrs["w-class"] = attrvalue;
    }_node.attrHash = _hash.nextHash(_node.attrHash, _calTextHash(_node.attrs["w-class"]));_$temp = _node;{
      var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "img", "sid": 1 };_node2.children = [];_node2.attrSize = 2;_node2.attrHash = 1443863410;{
        var _attrvalue = "";_attrvalue += it.imgUrl;_attrvalue += "";_node2.attrs["src"] = _attrvalue;
      }_node2.attrHash = _hash.nextHash(_node2.attrHash, _calTextHash(_node2.attrs["src"]));_node2.attrs["w-class"] = "gift";_chFunc(_node2);_$parent2.children.push(_node2);
    }if (it.received) {
      _$temp = _node;{
        var _$parent3 = _$temp;var _node3 = { "attrs": {}, "tagName": "div", "sid": 2 };_node3.children = [];_node3.childHash = 2809313202;_node3.attrSize = 1;_node3.attrHash = 2158257406;_node3.attrs["w-class"] = "received";_$temp = _node3;{
          var _$parent4 = _$temp;var _node4 = { "attrs": {}, "tagName": "img", "sid": 3 };_node4.children = [];_node4.childHash = 0;_node4.attrSize = 1;_node4.attrHash = 4272556677;_node4.attrs["src"] = "../../res/image/award_received.png";_$parent4.children.push(_node4);
        }_$parent3.children.push(_node3);
      }
    } else {
      _$temp = _node;{
        var _$parent5 = _$temp;var _node5 = { "attrs": {}, "tagName": "div", "sid": 4 };_node5.children = [];_node5.attrSize = 1;_node5.attrHash = 1596773559;_node5.attrs["w-class"] = "continue-days";_$temp = _node5;{
          var _$parent6 = _$temp;_addText(it.continuedDays, _$parent6);
        }_chFunc(_node5);_$parent5.children.push(_node5);
      }
    }_chFunc(_node);return _node;
  }
});