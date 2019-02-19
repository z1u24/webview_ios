(function (_cfg, it, it1) {
  var _$temp = void 0,
      node = void 0;_$temp = node;{
    var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrHash = 0;_$temp = _node;{
      var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "div", "sid": 1 };_node2.children = [];_node2.attrSize = 1;_node2.attrHash = 2632071153;{
        var attrvalue = "";attrvalue += "name-info-wrap ";attrvalue += it.cardType == 'redEnv' ? 'redEnvTop' : '';attrvalue += "";_node2.attrs["w-class"] = attrvalue;
      }_node2.attrHash = _hash.nextHash(_node2.attrHash, _calTextHash(_node2.attrs["w-class"]));if (it.cardType == "redEnv") {
        _$temp = _node2;{
          var _$parent3 = _$temp;var _node3 = { "attrs": {}, "tagName": "img", "sid": 2 };_node3.children = [];_node3.childHash = 0;_node3.attrSize = 2;_node3.attrHash = 1628765022;_node3.attrs["w-class"] = "redEnvImg";_node3.attrs["src"] = "../../res/images/redEnvelope.png";_$parent3.children.push(_node3);
        }
      } else {
        _$temp = _node2;{
          var _$parent4 = _$temp;var _node4 = { "attrs": {}, "tagName": "img", "sid": 3 };_node4.children = [];_node4.attrSize = 2;_node4.attrHash = 656786862;_node4.attrs["w-class"] = "avatar-wrap";{
            var _attrvalue = "";_attrvalue += it.avatorPath;_attrvalue += "";_node4.attrs["src"] = _attrvalue;
          }_node4.attrHash = _hash.nextHash(_node4.attrHash, _calTextHash(_node4.attrs["src"]));_chFunc(_node4);_$parent4.children.push(_node4);
        }
      }_$temp = _node2;{
        var _$parent5 = _$temp;var _node5 = { "attrs": {}, "tagName": "span", "sid": 4 };_node5.children = [];_node5.attrSize = 2;_node5.attrHash = 3893466762;_node5.attrs["w-class"] = "name-card-info";{
          var _attrvalue2 = "";_attrvalue2 += "color:";_attrvalue2 += it.cardType == 'redEnv' ? '#fff' : '#222';_attrvalue2 += "";_node5.attrs["style"] = _attrvalue2;
        }_node5.attrHash = _hash.nextHash(_node5.attrHash, _calTextHash(_node5.attrs["style"]));_$temp = _node5;{
          var _$parent6 = _$temp;_addText(it.cardInfo, _$parent6);
        }_chFunc(_node5);_$parent5.children.push(_node5);
      }_chFunc(_node2);_$parent2.children.push(_node2);
    }_$temp = _node;{
      var _$parent7 = _$temp;var _node6 = { "attrs": {}, "tagName": "div", "sid": 5 };_node6.children = [];_node6.attrSize = 1;_node6.attrHash = 1266855694;_node6.attrs["w-class"] = "cardType";_$temp = _node6;{
        var _$parent8 = _$temp;_addText(it.cardTypeShow, _$parent8);
      }_chFunc(_node6);_$parent7.children.push(_node6);
    }_chFunc(_node);return _node;
  }
});