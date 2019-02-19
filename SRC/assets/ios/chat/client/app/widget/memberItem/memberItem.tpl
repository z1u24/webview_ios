(function (_cfg, it, it1) {
  var _$temp = void 0,
      node = void 0;_$temp = node;{
    var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 1;_node.attrHash = 3946973477;_node.attrs["w-class"] = "member-info-wrap";if (it.isAdmin || it.isOwner) {
      _$temp = _node;{
        var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "img", "sid": 1 };_node2.children = [];_node2.attrSize = 3;_node2.attrHash = 887127212;_node2.attrs["w-class"] = "avatar-wrap";{
          var attrvalue = "";attrvalue += it.avatorPath;attrvalue += "";_node2.attrs["src"] = attrvalue;
        }_node2.attrHash = _hash.nextHash(_node2.attrHash, _calTextHash(_node2.attrs["src"]));{
          var _attrvalue = "";_attrvalue += "border:solid 5px ";_attrvalue += it.isOwner ? '#F7E62A' : '#2AE1F7';_attrvalue += "";_node2.attrs["style"] = _attrvalue;
        }_node2.attrHash = _hash.nextHash(_node2.attrHash, _calTextHash(_node2.attrs["style"]));_chFunc(_node2);_$parent2.children.push(_node2);
      }
    } else {
      _$temp = _node;{
        var _$parent3 = _$temp;var _node3 = { "attrs": {}, "tagName": "img", "sid": 2 };_node3.children = [];_node3.attrSize = 2;_node3.attrHash = 656786862;_node3.attrs["w-class"] = "avatar-wrap";{
          var _attrvalue2 = "";_attrvalue2 += it.avatorPath;_attrvalue2 += "";_node3.attrs["src"] = _attrvalue2;
        }_node3.attrHash = _hash.nextHash(_node3.attrHash, _calTextHash(_node3.attrs["src"]));_chFunc(_node3);_$parent3.children.push(_node3);
      }
    }_$temp = _node;{
      var _$parent4 = _$temp;var _node4 = { "attrs": {}, "tagName": "span", "sid": 3 };_node4.children = [];_node4.attrSize = 1;_node4.attrHash = 2710496119;_node4.attrs["w-class"] = "text";_$temp = _node4;{
        var _$parent5 = _$temp;_addText(it.text ? it.text : it.name, _$parent5);
      }_chFunc(_node4);_$parent4.children.push(_node4);
    }if (it.isAdmin || it.isOwner) {
      _$temp = _node;{
        var _$parent6 = _$temp;var _node5 = { "attrs": {}, "tagName": "span", "sid": 4 };_node5.children = [];_node5.attrSize = 2;_node5.attrHash = 1009216855;_node5.attrs["w-class"] = "badge";{
          var _attrvalue3 = "";_attrvalue3 += "background:";_attrvalue3 += it.isOwner ? '#F7E62A' : '#2AE1F7';_attrvalue3 += "";_node5.attrs["style"] = _attrvalue3;
        }_node5.attrHash = _hash.nextHash(_node5.attrHash, _calTextHash(_node5.attrs["style"]));_chFunc(_node5);_$parent6.children.push(_node5);
      }
    }_chFunc(_node);return _node;
  }
});