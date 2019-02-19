(function (_cfg, it, it1) {
  var _$temp = void 0,
      node = void 0;_$temp = node;{
    var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 3;_node.attrHash = 3836071042;_node.attrs["w-class"] = "pi-input-box";_node.attrs["class"] = "chat-input";{
      var attrvalue = "";attrvalue += it && it.style ? it.style : '';attrvalue += "";_node.attrs["style"] = attrvalue;
    }_node.attrHash = _hash.nextHash(_node.attrHash, _calTextHash(_node.attrs["style"]));_$temp = _node;{
      var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "div", "sid": 1 };_node2.children = [];_node2.attrSize = 1;_node2.attrHash = 3802218103;_node2.attrs["w-class"] = "hideMsg";_$temp = _node2;{
        var _$parent3 = _$temp;_addText(it1.currentValue ? it1.currentValue : '1', _$parent3);
      }_chFunc(_node2);_$parent2.children.push(_node2);
    }_$temp = _node;{
      var _$parent4 = _$temp;var _node3 = { "attrs": {}, "tagName": "textarea", "sid": 2 };_node3.children = [];_node3.attrSize = 12;_node3.attrHash = 426119513;_node3.attrs["unchange"] = "true";_node3.attrs["w-class"] = "pi-input__inner";{
        var _attrvalue = "";_attrvalue += it.style ? it.style : '';_attrvalue += "";_node3.attrs["style"] = _attrvalue;
      }_node3.attrHash = _hash.nextHash(_node3.attrHash, _calTextHash(_node3.attrs["style"]));_node3.attrs["type"] = "text";_node3.attrs["autocomplete"] = "off";{
        var _attrvalue2 = "";_attrvalue2 += it && it.placeHolder ? it.placeHolder : '';_attrvalue2 += "";_node3.attrs["placeholder"] = _attrvalue2;
      }_node3.attrHash = _hash.nextHash(_node3.attrHash, _calTextHash(_node3.attrs["placeholder"]));{
        var _attrvalue3 = "";_attrvalue3 += it && it.maxLength ? it.maxLength : '';_attrvalue3 += "";_node3.attrs["maxlength"] = _attrvalue3;
      }_node3.attrHash = _hash.nextHash(_node3.attrHash, _calTextHash(_node3.attrs["maxlength"]));_node3.attrs["on-input"] = "change";_node3.attrs["on-blur"] = "onBlur";_node3.attrs["on-focus"] = "onFocus";_node3.attrs["on-compositionstart"] = "compositionstart";_node3.attrs["on-compositionend"] = "compositionend";_$temp = _node3;{
        var _$parent5 = _$temp;_addText(it1.currentValue, _$parent5);
      }_chFunc(_node3);_$parent4.children.push(_node3);
    }_chFunc(_node);return _node;
  }
});