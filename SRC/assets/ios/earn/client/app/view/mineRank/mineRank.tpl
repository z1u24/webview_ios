(function (_cfg, it, it1) {
	var _$temp = void 0,
	    node = void 0;_$temp = node;{
		var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 4;_node.attrHash = 3380790512;_node.attrs["class"] = "new-page";_node.attrs["w-class"] = "new-page";_node.attrs["ev-back-click"] = "backPrePage";_node.attrs["ev-refresh-click"] = "refresh";topBarTitle = { "zh_Hans": "挖矿排名", "zh_Hant": "挖礦排名", "en": "" };_$temp = _node;{
			var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "div", "sid": 1 };_node2.children = [];_node2.attrSize = 1;_node2.attrHash = 3150824206;_node2.attrs["style"] = "background:linear-gradient(135deg,rgba(48,131,255,1) 0%,rgba(21,102,223,1) 100%);";_$temp = _node2;{
				var _$parent3 = _$temp;var _node3 = { "attrs": {}, "tagName": "app-components1-topBar-topBar2", "sid": 2 };_node3.hasChild = false;_node3.child = null;_node3.attrHash = 0;_$temp = _node3;{
					var _$parent4 = _$temp;var _node4 = {}; //jpair pre

					_node4["scrollHeight"] = 0;
					//jpair suf
					//jpair pre

					_node4["text"] = topBarTitle;
					//jpair suf
					_addJson(_node4, _$parent4);
				}_chFunc(_node3);_$parent3.children.push(_node3);
			}_$temp = _node2;{
				var _$parent5 = _$temp;var _node5 = { "attrs": {}, "tagName": "div", "sid": 3 };_node5.children = [];_node5.attrSize = 1;_node5.attrHash = 3008141472;_node5.attrs["w-class"] = "content flex-col";_$temp = _node5;{
					var _$parent6 = _$temp;var _node6 = { "attrs": {}, "tagName": "div", "sid": 4 };_node6.children = [];_node6.attrSize = 1;_node6.attrHash = 3686237213;_node6.attrs["w-class"] = "top-annunciate";_$temp = _node6;{
						var _$parent7 = _$temp;var _node7 = { "attrs": {}, "tagName": "div", "sid": 5 };_node7.children = [];_node7.attrSize = 1;_node7.attrHash = 966481652;_node7.attrs["w-class"] = "notice";if (it.notice[it.noticeShow]) {
							_$temp = _node7;{
								var _$parent8 = _$temp;var _node8 = { "attrs": {}, "tagName": "p", "sid": 6 };_node8.children = [];_node8.attrSize = 2;_node8.attrHash = 3335433093;_node8.attrs["w-class"] = "notice-show";_node8.attrs["class"] = "down-to-top";_$temp = _node8;{
									var _$parent9 = _$temp;_addText(it.notice[it.noticeShow], _$parent9);
								}_chFunc(_node8);_$parent8.children.push(_node8);
							}
						}_chFunc(_node7);_$parent7.children.push(_node7);
					}_chFunc(_node6);_$parent6.children.push(_node6);
				}_$temp = _node5;{
					var _$parent10 = _$temp;var _node9 = { "attrs": {}, "tagName": "div", "sid": 7 };_node9.children = [];_node9.attrSize = 1;_node9.attrHash = 621309583;_node9.attrs["w-class"] = "topbar";_$temp = _node9;{
						var _$parent11 = _$temp;var _node10 = { "attrs": {}, "tagName": "div", "sid": 8 };_node10.children = [];_node10.attrSize = 2;_node10.attrHash = 3959472671;_node10.attrs["w-class"] = "topbar-bg";{
							var attrvalue = "";attrvalue += "transform: translateX(";attrvalue += 100 * it.topbarSel;attrvalue += "%);";_node10.attrs["style"] = attrvalue;
						}_node10.attrHash = _hash.nextHash(_node10.attrHash, _calTextHash(_node10.attrs["style"]));_chFunc(_node10);_$parent11.children.push(_node10);
					}_$temp = _node9;{
						var _$parent12 = _$temp;var _node11 = { "attrs": {}, "tagName": "div", "sid": 9 };_node11.children = [];_node11.attrSize = 1;_node11.attrHash = 445913218;_node11.attrs["w-class"] = "topbar-text";{
							var _$i = 0;
							for (var _iterator = it.topbarList, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
								var _ref;

								if (_isArray) {
									if (_i >= _iterator.length) break;
									_ref = _iterator[_i++];
								} else {
									_i = _iterator.next();
									if (_i.done) break;
									_ref = _i.value;
								}

								var item = _ref;
								var i = _$i++;_$temp = _node11;{
									var _$parent13 = _$temp;var _node12 = { "attrs": {}, "tagName": "widget", "sid": 10 };_node12.hasChild = false;_node12.child = null;_node12.attrSize = 2;_node12.attrHash = 3735228328;{
										var _attrvalue = "";_attrvalue += "topbarChange(";_attrvalue += i;_attrvalue += ")";_node12.attrs["on-tap"] = _attrvalue;
									}_node12.attrHash = _hash.nextHash(_node12.attrHash, _calTextHash(_node12.attrs["on-tap"]));{
										var _attrvalue2 = "";_attrvalue2 += "topbar-item ";_attrvalue2 += i === it.topbarSel ? 'topbar-item-select' : '';_attrvalue2 += "";_node12.attrs["w-class"] = _attrvalue2;
									}_node12.attrHash = _hash.nextHash(_node12.attrHash, _calTextHash(_node12.attrs["w-class"]));_node12.attrs["w-tag"] = "pi-ui-lang";_node12.tagName = _node12.attrs["w-tag"];_$temp = _node12;{
										var _$parent14 = _$temp;_addJson(item.title, _$parent14);
									}_chFunc(_node12);_$parent13.children.push(_node12);
								}
							}
						}_chFunc(_node11);_$parent12.children.push(_node11);
					}_chFunc(_node9);_$parent10.children.push(_node9);
				}_chFunc(_node5);_$parent5.children.push(_node5);
			}_chFunc(_node2);_$parent2.children.push(_node2);
		}_$temp = _node;{
			var _$parent15 = _$temp;var _node13 = { "attrs": {}, "tagName": "div", "sid": 11 };_node13.children = [];_node13.attrSize = 2;_node13.attrHash = 3189422572;_node13.attrs["w-class"] = "rank-list";_node13.attrs["id"] = "rankList";_$temp = _node13;{
				var _$parent16 = _$temp;var _node14 = { "attrs": {}, "tagName": "div", "sid": 12 };_node14.children = [];_node14.attrSize = 1;_node14.attrHash = 4122756366;_node14.attrs["w-class"] = "self-rank";_$temp = _node14;{
					var _$parent17 = _$temp;var _node15 = { "attrs": {}, "tagName": "widget", "sid": 13 };_node15.hasChild = false;_node15.child = null;_node15.attrHash = 3542077467;_node15.attrs["w-tag"] = "earn-client-app-view-mineRank-rankItem";_node15.tagName = _node15.attrs["w-tag"];_$temp = _node15;{
						var _$parent18 = _$temp;_addJson(it.myRank, _$parent18);
					}_chFunc(_node15);_$parent17.children.push(_node15);
				}_chFunc(_node14);_$parent16.children.push(_node14);
			}_$temp = _node13;{
				var _$parent19 = _$temp;var _node16 = { "attrs": {}, "tagName": "div", "sid": 14 };_node16.children = [];_node16.attrSize = 1;_node16.attrHash = 3691760597;_node16.attrs["w-class"] = "rank-otherlist";{
					var _$i2 = 0;
					for (var _iterator2 = it.rankList, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
						var _ref2;

						if (_isArray2) {
							if (_i2 >= _iterator2.length) break;
							_ref2 = _iterator2[_i2++];
						} else {
							_i2 = _iterator2.next();
							if (_i2.done) break;
							_ref2 = _i2.value;
						}

						var _item = _ref2;
						var _i3 = _$i2++;_$temp = _node16;{
							var _$parent20 = _$temp;var _node17 = { "attrs": {}, "tagName": "widget", "sid": 15 };_node17.hasChild = false;_node17.child = null;_node17.attrHash = 3542077467;_node17.attrs["w-tag"] = "earn-client-app-view-mineRank-rankItem";_node17.tagName = _node17.attrs["w-tag"];_$temp = _node17;{
								var _$parent21 = _$temp;_addJson(_item, _$parent21);
							}_chFunc(_node17);_$parent20.children.push(_node17);
						}
					}
				}_chFunc(_node16);_$parent19.children.push(_node16);
			}_chFunc(_node13);_$parent15.children.push(_node13);
		}_chFunc(_node);return _node;
	}
});