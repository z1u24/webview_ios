(function (_cfg, it, it1) {
  var _$temp = void 0,
      node = void 0;_$temp = node;{
    var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 1;_node.attrHash = 2898828711;_node.attrs["style"] = "position:absolute;width:100%;height:100%;top:0px;left:0px;background-color:gray;";_$temp = _node;{
      var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "div", "sid": 1 };_node2.children = [];_node2.attrSize = 1;_node2.attrHash = 3410112300;_node2.attrs["w-class"] = "user-edit-wrap";_$temp = _node2;{
        var _$parent3 = _$temp;var _node3 = { "attrs": {}, "tagName": "div", "sid": 2 };_node3.children = [];_node3.attrSize = 1;_node3.attrHash = 4275137225;_node3.attrs["w-class"] = "avatar-wrap";_$temp = _node3;{
          var _$parent4 = _$temp;var _node4 = { "attrs": {}, "tagName": "img", "sid": 3 };_node4.children = [];_node4.attrSize = 2;_node4.attrHash = 303934790;_node4.attrs["w-class"] = "avatar";{
            var attrvalue = "";attrvalue += "../../res/images/";attrvalue += it.avatorPath;attrvalue += "";_node4.attrs["src"] = attrvalue;
          }_node4.attrHash = _hash.nextHash(_node4.attrHash, _calTextHash(_node4.attrs["src"]));_chFunc(_node4);_$parent4.children.push(_node4);
        }_chFunc(_node3);_$parent3.children.push(_node3);
      }_$temp = _node2;{
        var _$parent5 = _$temp;var _node5 = { "attrs": {}, "tagName": "div", "sid": 4 };_node5.children = [];_node5.attrSize = 1;_node5.attrHash = 128998671;_node5.attrs["w-class"] = "edit-info-wrap";_$temp = _node5;{
          var _$parent6 = _$temp;var _node6 = { "attrs": {}, "tagName": "span", "sid": 5 };_node6.children = [];_node6.attrSize = 1;_node6.attrHash = 4232090967;_node6.attrs["w-class"] = "userName";_$temp = _node6;{
            var _$parent7 = _$temp;_addText(it.userName, _$parent7);
          }_chFunc(_node6);_$parent6.children.push(_node6);
        }_$temp = _node5;{
          var _$parent8 = _$temp;var _node7 = { "attrs": {}, "tagName": "span", "sid": 6 };_node7.children = [];_node7.attrSize = 1;_node7.attrHash = 4088947395;_node7.attrs["w-class"] = "otherInfo";_$temp = _node7;{
            var _$parent9 = _$temp;_addText(it.otherInfo, _$parent9);
          }_chFunc(_node7);_$parent8.children.push(_node7);
        }_chFunc(_node5);_$parent5.children.push(_node5);
      }_chFunc(_node2);_$parent2.children.push(_node2);
    }_chFunc(_node);return _node;
  }
});