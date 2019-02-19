(function (_cfg, it, it1) {
  var _$temp = void 0,
      node = void 0;_$temp = node;{
    var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 3;_node.attrHash = 994389607;_node.attrs["w-class"] = "mine";_node.attrs["on-down"] = "mineClick";{
      var attrvalue = "";attrvalue += it.selected ? 'z-index: 1;' : '';attrvalue += " ";_node.attrs["style"] = attrvalue;
    }_node.attrHash = _hash.nextHash(_node.attrHash, _calTextHash(_node.attrs["style"]));_$temp = _node;{
      var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "div", "sid": 1 };_node2.children = [];_node2.attrHash = 0;_$temp = _node2;{
        var _$parent3 = _$temp;var _node3 = { "attrs": {}, "tagName": "img", "sid": 2 };_node3.children = [];_node3.attrSize = 3;_node3.attrHash = 3857001080;{
          var _attrvalue = "";_attrvalue += it.mineImgUrl;_attrvalue += "";_node3.attrs["src"] = _attrvalue;
        }_node3.attrHash = _hash.nextHash(_node3.attrHash, _calTextHash(_node3.attrs["src"]));{
          var _attrvalue2 = "";_attrvalue2 += it.beginMining && !it.selected ? 'grayscale' : '';_attrvalue2 += "";_node3.attrs["class"] = _attrvalue2;
        }_node3.attrHash = _hash.nextHash(_node3.attrHash, _calTextHash(_node3.attrs["class"]));{
          var _attrvalue3 = "";_attrvalue3 += "transform:scale(";_attrvalue3 += it.scale || 1;_attrvalue3 += ")";_node3.attrs["style"] = _attrvalue3;
        }_node3.attrHash = _hash.nextHash(_node3.attrHash, _calTextHash(_node3.attrs["style"]));_chFunc(_node3);_$parent3.children.push(_node3);
      }_chFunc(_node2);_$parent2.children.push(_node2);
    }if (it.selected) {
      _$temp = _node;{
        var _$parent4 = _$temp;var _node4 = { "attrs": {}, "tagName": "div", "sid": 3 };_node4.children = [];_node4.attrSize = 1;_node4.attrHash = 2728094258;_node4.attrs["w-class"] = "hp-bg";_$temp = _node4;{
          var _$parent5 = _$temp;var _node5 = { "attrs": {}, "tagName": "div", "sid": 4 };_node5.children = [];_node5.attrSize = 2;_node5.attrHash = 3026531868;_node5.attrs["w-class"] = "hp";{
            var _attrvalue4 = "";_attrvalue4 += "width:";_attrvalue4 += it.hp / it.hpMax * 100 + '%';_attrvalue4 += "; ";_node5.attrs["style"] = _attrvalue4;
          }_node5.attrHash = _hash.nextHash(_node5.attrHash, _calTextHash(_node5.attrs["style"]));_chFunc(_node5);_$parent5.children.push(_node5);
        }_$temp = _node4;{
          var _$parent6 = _$temp;var _node6 = { "attrs": {}, "tagName": "div", "sid": 5 };_node6.children = [];_node6.attrSize = 1;_node6.attrHash = 436149225;_node6.attrs["w-class"] = "count-down";_$temp = _node6;{
            var _$parent7 = _$temp;_addText(it.countDown, _$parent7);
          }_chFunc(_node6);_$parent6.children.push(_node6);
        }_chFunc(_node4);_$parent4.children.push(_node4);
      }if (it.beginMining || it.hoeSelectedLeft) {
        _$temp = _node;{
          var _$parent8 = _$temp;var _node7 = { "attrs": {}, "tagName": "div", "sid": 6 };_node7.children = [];_node7.attrSize = 1;_node7.attrHash = 4055707673;_node7.attrs["w-class"] = "hoe";_$temp = _node7;{
            var _$parent9 = _$temp;var _node8 = { "attrs": {}, "tagName": "img", "sid": 7 };_node8.children = [];_node8.attrSize = 2;_node8.attrHash = 1876402365;{
              var _attrvalue5 = "";_attrvalue5 += it.hoeImgUrl;_attrvalue5 += "";_node8.attrs["src"] = _attrvalue5;
            }_node8.attrHash = _hash.nextHash(_node8.attrHash, _calTextHash(_node8.attrs["src"]));_node8.attrs["w-class"] = "hoe-img";_chFunc(_node8);_$parent9.children.push(_node8);
          }_chFunc(_node7);_$parent8.children.push(_node7);
        }
      }
    }_chFunc(_node);return _node;
  }
});