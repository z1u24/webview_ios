(function (_cfg, it, it1) {
  var _$temp = void 0,
      node = void 0;_$temp = node;{
    var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 1;_node.attrHash = 1250095831;_node.attrs["w-class"] = "modal-mask";_$temp = _node;{
      var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "div", "sid": 1 };_node2.children = [];_node2.attrSize = 1;_node2.attrHash = 4252679546;_node2.attrs["w-class"] = "body";_$temp = _node2;{
        var _$parent3 = _$temp;var _node3 = { "attrs": {}, "tagName": "div", "sid": 2 };_node3.children = [];_node3.attrSize = 1;_node3.attrHash = 1019047777;_node3.attrs["w-class"] = "title";_$temp = _node3;{
          var _$parent4 = _$temp;_addText(it.title, _$parent4);
        }_chFunc(_node3);_$parent3.children.push(_node3);
      }_$temp = _node2;{
        var _$parent5 = _$temp;var _node4 = { "attrs": {}, "tagName": "div", "sid": 3 };_node4.children = [];_node4.attrSize = 2;_node4.attrHash = 503636906;_node4.attrs["w-class"] = "content";{
          var attrvalue = "";attrvalue += it.style ? it.style : '';attrvalue += "";_node4.attrs["style"] = attrvalue;
        }_node4.attrHash = _hash.nextHash(_node4.attrHash, _calTextHash(_node4.attrs["style"]));_$temp = _node4;{
          var _$parent6 = _$temp;_addText(it.content, _$parent6);
        }_chFunc(_node4);_$parent5.children.push(_node4);
      }_$temp = _node2;{
        var _$parent7 = _$temp;var _node5 = { "attrs": {}, "tagName": "div", "sid": 4 };_node5.children = [];_node5.attrSize = 1;_node5.attrHash = 2566746008;_node5.attrs["w-class"] = "btns";_$temp = _node5;{
          var _$parent8 = _$temp;var _node6 = { "attrs": {}, "tagName": "div", "sid": 5 };_node6.children = [];_node6.attrSize = 2;_node6.attrHash = 3340574570;_node6.attrs["w-class"] = "btn-cancel";_node6.attrs["on-tap"] = "cancelBtnClick";_$temp = _node6;{
            var _$parent9 = _$temp;_addText(it.cancelText ? it.cancelText : it1.cfgData.cancelText, _$parent9);
          }_chFunc(_node6);_$parent8.children.push(_node6);
        }_$temp = _node5;{
          var _$parent10 = _$temp;var _node7 = { "attrs": {}, "tagName": "div", "sid": 6 };_node7.children = [];_node7.attrSize = 2;_node7.attrHash = 4264153071;_node7.attrs["w-class"] = "btn-ok";_node7.attrs["on-tap"] = "okBtnClick";_$temp = _node7;{
            var _$parent11 = _$temp;_addText(it.sureText ? it.sureText : it1.cfgData.sureText, _$parent11);
          }_chFunc(_node7);_$parent10.children.push(_node7);
        }_chFunc(_node5);_$parent7.children.push(_node5);
      }_chFunc(_node2);_$parent2.children.push(_node2);
    }_chFunc(_node);return _node;
  }
});