(function (_cfg, it, it1) {
  var _$temp = void 0,
      node = void 0;_$temp = node;{
    var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 2;_node.attrHash = 138104688;_node.attrs["class"] = "new-page";_node.attrs["w-class"] = "new-page";_$temp = _node;{
      var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "app-components1-blankDiv-topDiv", "sid": 1 };_node2.hasChild = false;_node2.child = null;_node2.childHash = 2946814719;_node2.attrHash = 0;_$parent2.children.push(_node2);
    }_$temp = _node;{
      var _$parent3 = _$temp;var _node3 = { "attrs": {}, "tagName": "div", "sid": 2 };_node3.children = [];_node3.attrSize = 1;_node3.attrHash = 3212685024;_node3.attrs["style"] = "position:relative;flex:1 0 0;";_$temp = _node3;{
        var _$parent4 = _$temp;var _node4 = { "attrs": {}, "tagName": "div", "sid": 3 };_node4.children = [];_node4.childHash = 2180854212;_node4.attrSize = 2;_node4.attrHash = 2463597893;_node4.attrs["w-class"] = "share-box";_node4.attrs["on-tap"] = "shareClick";_$temp = _node4;{
          var _$parent5 = _$temp;var _node5 = { "attrs": {}, "tagName": "img", "sid": 4 };_node5.children = [];_node5.childHash = 0;_node5.attrSize = 2;_node5.attrHash = 993295635;_node5.attrs["src"] = "../../../res/image/share_blue.png";_node5.attrs["w-class"] = "share";_$parent5.children.push(_node5);
        }_$parent4.children.push(_node4);
      }_$temp = _node3;{
        var _$parent6 = _$temp;var _node6 = { "attrs": {}, "tagName": "div", "sid": 5 };_node6.children = [];_node6.childHash = 4277900080;_node6.attrSize = 2;_node6.attrHash = 1668804261;_node6.attrs["w-class"] = "back-box";_node6.attrs["on-tap"] = "backClick";_$temp = _node6;{
          var _$parent7 = _$temp;var _node7 = { "attrs": {}, "tagName": "img", "sid": 6 };_node7.children = [];_node7.childHash = 0;_node7.attrSize = 2;_node7.attrHash = 3877175437;_node7.attrs["src"] = "../../../res/image/left_arrow_white.png";_node7.attrs["w-class"] = "back";_$parent7.children.push(_node7);
        }_$parent6.children.push(_node6);
      }_$temp = _node3;{
        var _$parent8 = _$temp;var _node8 = { "attrs": {}, "tagName": "div", "sid": 7 };_node8.children = [];_node8.attrSize = 1;_node8.attrHash = 2812074640;_node8.attrs["w-class"] = "container";_$temp = _node8;{
          var _$parent9 = _$temp;var _node9 = { "attrs": {}, "tagName": "div", "sid": 8 };_node9.children = [];_node9.attrSize = 1;_node9.attrHash = 2619352664;_node9.attrs["w-class"] = "top";_$temp = _node9;{
            var _$parent10 = _$temp;var _node10 = { "attrs": {}, "tagName": "div", "sid": 9 };_node10.children = [];_node10.attrSize = 2;_node10.attrHash = 1881014820;_node10.attrs["w-class"] = "avatar";{
              var attrvalue = "";attrvalue += "background-image: url(";attrvalue += it.avatar ? it.avatar : '../../../res/image/share_default_avatar.png';attrvalue += ");";_node10.attrs["style"] = attrvalue;
            }_node10.attrHash = _hash.nextHash(_node10.attrHash, _calTextHash(_node10.attrs["style"]));_chFunc(_node10);_$parent10.children.push(_node10);
          }nickname = { "zh_Hans": it.nickName ? it.nickName : "我还没想好名字", "zh_Hant": it.nickName ? it.nickName : "我還沒想好名字", "en": "" };_$temp = _node9;{
            var _$parent11 = _$temp;var _node11 = { "attrs": {}, "tagName": "widget", "sid": 10 };_node11.hasChild = false;_node11.child = null;_node11.attrSize = 1;_node11.attrHash = 658058609;_node11.attrs["w-tag"] = "pi-ui-lang";_node11.tagName = _node11.attrs["w-tag"];_node11.attrs["w-class"] = "nickname";_$temp = _node11;{
              var _$parent12 = _$temp;_addJson(nickname, _$parent12);
            }_chFunc(_node11);_$parent11.children.push(_node11);
          }addr = { "zh_Hans": "我正在KuPay", "zh_Hant": "我正在KuPay", "en": "" };_$temp = _node9;{
            var _$parent13 = _$temp;var _node12 = { "attrs": {}, "tagName": "widget", "sid": 11 };_node12.hasChild = false;_node12.child = null;_node12.attrSize = 1;_node12.attrHash = 3994975512;_node12.attrs["w-tag"] = "pi-ui-lang";_node12.tagName = _node12.attrs["w-tag"];_node12.attrs["w-class"] = "app-addr";_$temp = _node12;{
              var _$parent14 = _$temp;_addJson(addr, _$parent14);
            }_chFunc(_node12);_$parent13.children.push(_node12);
          }_chFunc(_node9);_$parent9.children.push(_node9);
        }_$temp = _node8;{
          var _$parent15 = _$temp;var _node13 = { "attrs": {}, "tagName": "div", "sid": 12 };_node13.children = [];_node13.attrSize = 1;_node13.attrHash = 832204064;_node13.attrs["w-class"] = "bottom";action = { "zh_Hans": "扫描二维码", "zh_Hant": "掃描二維碼", "en": "" };_$temp = _node13;{
            var _$parent16 = _$temp;var _node14 = { "attrs": {}, "tagName": "widget", "sid": 13 };_node14.hasChild = false;_node14.child = null;_node14.attrSize = 1;_node14.attrHash = 1990456788;_node14.attrs["w-tag"] = "pi-ui-lang";_node14.tagName = _node14.attrs["w-tag"];_node14.attrs["w-class"] = "action";_$temp = _node14;{
              var _$parent17 = _$temp;_addJson(action, _$parent17);
            }_chFunc(_node14);_$parent16.children.push(_node14);
          }_$temp = _node13;{
            var _$parent18 = _$temp;var _node15 = { "attrs": {}, "tagName": "img", "sid": 14 };_node15.children = [];_node15.childHash = 0;_node15.attrSize = 2;_node15.attrHash = 2323426949;_node15.attrs["src"] = "../../../res/image/share_qrcode.png";_node15.attrs["w-class"] = "qrcode";_$parent18.children.push(_node15);
          }desc = { "zh_Hans": "更安全的一站式数字资产管理平台", "zh_Hant": "更安全的一站式數字資產管理平台", "en": "" };_$temp = _node13;{
            var _$parent19 = _$temp;var _node16 = { "attrs": {}, "tagName": "widget", "sid": 15 };_node16.hasChild = false;_node16.child = null;_node16.attrSize = 1;_node16.attrHash = 1990456788;_node16.attrs["w-tag"] = "pi-ui-lang";_node16.tagName = _node16.attrs["w-tag"];_node16.attrs["w-class"] = "action";_$temp = _node16;{
              var _$parent20 = _$temp;_addJson(desc, _$parent20);
            }_chFunc(_node16);_$parent19.children.push(_node16);
          }_chFunc(_node13);_$parent15.children.push(_node13);
        }_chFunc(_node8);_$parent8.children.push(_node8);
      }_chFunc(_node3);_$parent3.children.push(_node3);
    }_chFunc(_node);return _node;
  }
});