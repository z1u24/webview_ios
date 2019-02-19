(function (_cfg, it, it1) {
	var _$temp = void 0,
	    node = void 0;_$temp = node;{
		var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 1;_node.attrHash = 497362468;_node.attrs["w-class"] = "rank-item";_$temp = _node;{
			var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "div", "sid": 1 };_node2.children = [];_node2.attrSize = 1;_node2.attrHash = 1591473757;_node2.attrs["w-class"] = "rank-left";if (it.rank === 0) {
				_$temp = _node2;{
					var _$parent3 = _$temp;var _node3 = { "attrs": {}, "tagName": "widget", "sid": 2 };_node3.hasChild = false;_node3.child = null;_node3.childHash = 1474565954;_node3.attrSize = 1;_node3.attrHash = 211628441;_node3.attrs["w-class"] = "no-rank";_node3.attrs["w-tag"] = "pi-ui-lang";_node3.tagName = _node3.attrs["w-tag"];_$temp = _node3;{
						var _$parent4 = _$temp;var _node4 = {}; //jpair pre

						{
							var jvalue = "";
							jvalue = "暂无排名";
							//jpair suf

							_node4["zh_Hans"] = jvalue;
						}
						//jpair pre

						{
							var _jvalue = "";
							_jvalue = "暫無排名";
							//jpair suf

							_node4["zh_Hant"] = _jvalue;
						}
						//jpair pre

						{
							var _jvalue2 = "";
							_jvalue2 = "";
							//jpair suf

							_node4["en"] = _jvalue2;
						}
						_addJson(_node4, _$parent4);
					}_$parent3.children.push(_node3);
				}
			} else if (it.rank < 4 && it.rank > 0) {
				_$temp = _node2;{
					var _$parent5 = _$temp;var _node5 = { "attrs": {}, "tagName": "img", "sid": 3 };_node5.children = [];_node5.attrSize = 4;_node5.attrHash = 3919014788;_node5.attrs["w-class"] = "rank-img";{
						var attrvalue = "";attrvalue += "../../res/image1/rank-NO";attrvalue += it.rank;attrvalue += ".png";_node5.attrs["src"] = attrvalue;
					}_node5.attrHash = _hash.nextHash(_node5.attrHash, _calTextHash(_node5.attrs["src"]));_node5.attrs["width"] = "60px";_node5.attrs["height"] = "70px;";_chFunc(_node5);_$parent5.children.push(_node5);
				}
			} else {
				_$temp = _node2;{
					var _$parent6 = _$temp;var _node6 = { "attrs": {}, "tagName": "div", "sid": 4 };_node6.children = [];_node6.attrSize = 1;_node6.attrHash = 32768078;_node6.attrs["w-class"] = "rank-num";_$temp = _node6;{
						var _$parent7 = _$temp;_addText(it.rank, _$parent7);
					}_chFunc(_node6);_$parent6.children.push(_node6);
				}
			}_$temp = _node2;{
				var _$parent8 = _$temp;var _node7 = { "attrs": {}, "tagName": "img", "sid": 5 };_node7.children = [];_node7.attrSize = 3;_node7.attrHash = 1707091086;_node7.attrs["w-class"] = "rank-headImg";{
					var _attrvalue = "";_attrvalue += it.avatar ? it.avatar : '../../res/image1/default_head.png';_attrvalue += "";_node7.attrs["src"] = _attrvalue;
				}_node7.attrHash = _hash.nextHash(_node7.attrHash, _calTextHash(_node7.attrs["src"]));_node7.attrs["height"] = "100%";_chFunc(_node7);_$parent8.children.push(_node7);
			}_$temp = _node2;{
				var _$parent9 = _$temp;var _node8 = { "attrs": {}, "tagName": "div", "sid": 6 };_node8.children = [];_node8.attrSize = 1;_node8.attrHash = 367478504;_node8.attrs["style"] = "display: flex;justify-content: space-between;flex-direction: column;";_$temp = _node8;{
					var _$parent10 = _$temp;var _node9 = { "attrs": {}, "tagName": "p", "sid": 7 };_node9.children = [];_node9.attrSize = 1;_node9.attrHash = 1960803115;_node9.attrs["w-class"] = "rank-name";_$temp = _node9;{
						var _$parent11 = _$temp;_addText(it.userName, _$parent11);
					}_chFunc(_node9);_$parent10.children.push(_node9);
				}_$temp = _node8;{
					var _$parent12 = _$temp;var _node10 = { "attrs": {}, "tagName": "p", "sid": 8 };_node10.children = [];_node10.attrSize = 1;_node10.attrHash = 723236504;_node10.attrs["w-class"] = "rank-kt";_$temp = _node10;{
						var _$parent13 = _$temp;_addText(it.ktNum, _$parent13);
					}_$temp = _node10;{
						var _$parent14 = _$temp;var _node11 = _installText("KT", 3071125820);;
						_$parent14.children.push(_node11);
					}_chFunc(_node10);_$parent12.children.push(_node10);
				}_chFunc(_node8);_$parent9.children.push(_node8);
			}_chFunc(_node2);_$parent2.children.push(_node2);
		}if (it.medal) {
			_$temp = _node;{
				var _$parent15 = _$temp;var _node12 = { "attrs": {}, "tagName": "img", "sid": 9 };_node12.children = [];_node12.attrSize = 3;_node12.attrHash = 1172724259;_node12.attrs["w-class"] = "medal-right";{
					var _attrvalue2 = "";_attrvalue2 += "../../res/image/medals/medal";_attrvalue2 += it.medal;_attrvalue2 += ".png";_node12.attrs["src"] = _attrvalue2;
				}_node12.attrHash = _hash.nextHash(_node12.attrHash, _calTextHash(_node12.attrs["src"]));_node12.attrs["height"] = "100%";_chFunc(_node12);_$parent15.children.push(_node12);
			}
		}_chFunc(_node);return _node;
	}
});