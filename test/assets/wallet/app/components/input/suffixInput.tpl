(function (_cfg, it, it1) {
  var _$temp = void 0,
      node = void 0;_$temp = node;{
    var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 2;_node.attrHash = 2983613905;_node.attrs["w-class"] = "pi-input-box";_node.attrs["class"] = "pi-input";_$temp = _node;{
      var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "input", "sid": 1 };_node2.children = [];_node2.attrSize = 11;_node2.attrHash = 1635465641;_node2.attrs["w-class"] = "pi-input__inner";_node2.attrs["class"] = "pi-input";{
        var attrvalue = "";attrvalue += it.style;attrvalue += "";_node2.attrs["style"] = attrvalue;
      }_node2.attrHash = _hash.nextHash(_node2.attrHash, _calTextHash(_node2.attrs["style"]));{
        var _attrvalue = "";_attrvalue += it.itype ? it.itype : 'text';_attrvalue += "";_node2.attrs["type"] = _attrvalue;
      }_node2.attrHash = _hash.nextHash(_node2.attrHash, _calTextHash(_node2.attrs["type"]));_node2.attrs["autocomplete"] = "off";{
        var _attrvalue2 = "";_attrvalue2 += it.placeHolder;_attrvalue2 += "";_node2.attrs["placeholder"] = _attrvalue2;
      }_node2.attrHash = _hash.nextHash(_node2.attrHash, _calTextHash(_node2.attrs["placeholder"]));{
        var _attrvalue3 = "";_attrvalue3 += it1.currentValue;_attrvalue3 += "";_node2.attrs["value"] = _attrvalue3;
      }_node2.attrHash = _hash.nextHash(_node2.attrHash, _calTextHash(_node2.attrs["value"]));_node2.attrs["on-input"] = "change";_node2.attrs["on-blur"] = "blur";_node2.attrs["on-focus"] = "focus";_node2.attrs["autofocus"] = "false";_chFunc(_node2);_$parent2.children.push(_node2);
    }if (it1.showClear) {
      _$temp = _node;{
        var _$parent3 = _$temp;var _node3 = { "attrs": {}, "tagName": "img", "sid": 2 };_node3.children = [];_node3.attrSize = 3;_node3.attrHash = 836357084;_node3.attrs["w-class"] = "pi-input__suffix";{
          var _attrvalue4 = "";_attrvalue4 += "../../res/image/";_attrvalue4 += it.available ? 'icon_right2' : 'fail';_attrvalue4 += ".png";_node3.attrs["src"] = _attrvalue4;
        }_node3.attrHash = _hash.nextHash(_node3.attrHash, _calTextHash(_node3.attrs["src"]));_node3.attrs["on-tap"] = "clearClickListener";_chFunc(_node3);_$parent3.children.push(_node3);
      }
    }_chFunc(_node);return _node;
  }
});