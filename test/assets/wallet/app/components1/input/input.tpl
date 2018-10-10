(function (_cfg, it, it1) {
  var _$temp = void 0,
      node = void 0;_$temp = node;{
    var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 2;_node.attrHash = 2983613905;_node.attrs["w-class"] = "pi-input-box";_node.attrs["class"] = "pi-input";_$temp = _node;{
      var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "input", "sid": 1 };_node2.children = [];_node2.attrSize = 13;_node2.attrHash = 114009441;{
        var attrvalue = "";attrvalue += it && it.disabled ? 'pi-input__inner-disabled' : 'pi-input__inner';attrvalue += "";_node2.attrs["w-class"] = attrvalue;
      }_node2.attrHash = _hash.nextHash(_node2.attrHash, _calTextHash(_node2.attrs["w-class"]));{
        var _attrvalue = "";_attrvalue += "pi-input ";_attrvalue += it && it.disabled ? 'pi-input__inner-disabled pi-input-dom' : 'pi-input__inner1 pi-input-dom';_attrvalue += "";_node2.attrs["class"] = _attrvalue;
      }_node2.attrHash = _hash.nextHash(_node2.attrHash, _calTextHash(_node2.attrs["class"]));{
        var _attrvalue2 = "";_attrvalue2 += it.style ? it.style : '';_attrvalue2 += "";_node2.attrs["style"] = _attrvalue2;
      }_node2.attrHash = _hash.nextHash(_node2.attrHash, _calTextHash(_node2.attrs["style"]));{
        var _attrvalue3 = "";_attrvalue3 += it.itype ? it.itype : 'text';_attrvalue3 += "";_node2.attrs["type"] = _attrvalue3;
      }_node2.attrHash = _hash.nextHash(_node2.attrHash, _calTextHash(_node2.attrs["type"]));_node2.attrs["autocomplete"] = "off";{
        var _attrvalue4 = "";_attrvalue4 += it && it.placeHolder ? it.placeHolder : '';_attrvalue4 += "";_node2.attrs["placeholder"] = _attrvalue4;
      }_node2.attrHash = _hash.nextHash(_node2.attrHash, _calTextHash(_node2.attrs["placeholder"]));{
        var _attrvalue5 = "";_attrvalue5 += it1 && it1.currentValue ? it1.currentValue : '';_attrvalue5 += "";_node2.attrs["value"] = _attrvalue5;
      }_node2.attrHash = _hash.nextHash(_node2.attrHash, _calTextHash(_node2.attrs["value"]));{
        var _attrvalue6 = "";_attrvalue6 += it && it.maxLength ? it.maxLength : '';_attrvalue6 += "";_node2.attrs["maxlength"] = _attrvalue6;
      }_node2.attrHash = _hash.nextHash(_node2.attrHash, _calTextHash(_node2.attrs["maxlength"]));{
        var _attrvalue7 = "";_attrvalue7 = it && it.disabled ? 'disabled' : false;_node2.attrs["disabled"] = _attrvalue7;
      }_node2.attrHash = _hash.nextHash(_node2.attrHash, _calTextHash(_node2.attrs["disabled"]));{
        var _attrvalue8 = "";_attrvalue8 = it && it.autofocus ? 'autofocus' : false;_node2.attrs["autofocus"] = _attrvalue8;
      }_node2.attrHash = _hash.nextHash(_node2.attrHash, _calTextHash(_node2.attrs["autofocus"]));_node2.attrs["on-input"] = "change";_node2.attrs["on-blur"] = "blur";_node2.attrs["on-focus"] = "focus";_chFunc(_node2);_$parent2.children.push(_node2);
    }if (it1.showClear) {
      _$temp = _node;{
        var _$parent3 = _$temp;var _node3 = { "attrs": {}, "tagName": "img", "sid": 2 };_node3.children = [];_node3.childHash = 0;_node3.attrSize = 3;_node3.attrHash = 3979573404;_node3.attrs["w-class"] = "clearBtn";_node3.attrs["src"] = "../../res/image/btn_img_close.png";_node3.attrs["on-tap"] = "clearClickListener";_$parent3.children.push(_node3);
      }
    }_chFunc(_node);return _node;
  }
});