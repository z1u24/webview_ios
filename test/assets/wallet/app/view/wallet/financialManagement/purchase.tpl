(function (_cfg, it, it1) {
	var _$temp = void 0,
	    node = void 0;_$temp = node;{
		var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 2;_node.attrHash = 138104688;_node.attrs["class"] = "new-page";_node.attrs["w-class"] = "new-page";_$temp = _node;{
			var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "div", "sid": 1 };_node2.children = [];_node2.attrSize = 1;_node2.attrHash = 3010684512;_node2.attrs["w-class"] = "botBox";_$temp = _node2;{
				var _$parent3 = _$temp;var _node3 = { "attrs": {}, "tagName": "div", "sid": 2 };_node3.children = [];_node3.attrSize = 1;_node3.attrHash = 2437642848;_node3.attrs["w-class"] = "ConfirmPay";_$temp = _node3;{
					var _$parent4 = _$temp;var _node4 = { "attrs": {}, "tagName": "span", "sid": 3 };_node4.children = [];_node4.childHash = 3200659898;_node4.attrSize = 1;_node4.attrHash = 443517254;_node4.attrs["w-class"] = "confirmText";_$temp = _node4;{
						var _$parent5 = _$temp;var _node5 = _installText("确认付款", 2735263386);;
						_$parent5.children.push(_node5);
					}_$parent4.children.push(_node4);
				}_$temp = _node3;{
					var _$parent6 = _$temp;var _node6 = { "attrs": {}, "tagName": "span", "sid": 4 };_node6.children = [];_node6.attrHash = 0;_$temp = _node6;{
						var _$parent7 = _$temp;_addText(it1.spend, _$parent7);
					}_$temp = _node6;{
						var _$parent8 = _$temp;var _node7 = _installText("&nbsp;", 1553561131);;
						_$parent8.children.push(_node7);
					}_$temp = _node6;{
						var _$parent9 = _$temp;_addText(it.product.coinType, _$parent9);
					}_chFunc(_node6);_$parent6.children.push(_node6);
				}_$temp = _node3;{
					var _$parent10 = _$temp;var _node8 = { "attrs": {}, "tagName": "img", "sid": 5 };_node8.children = [];_node8.childHash = 0;_node8.attrSize = 3;_node8.attrHash = 1320499539;_node8.attrs["src"] = "../../../res/image/close_blue.png";_node8.attrs["w-class"] = "closeBtn";_node8.attrs["on-tap"] = "close";_$parent10.children.push(_node8);
				}_chFunc(_node3);_$parent3.children.push(_node3);
			}_$temp = _node2;{
				var _$parent11 = _$temp;var _node9 = { "attrs": {}, "tagName": "div", "sid": 6 };_node9.children = [];_node9.attrSize = 1;_node9.attrHash = 3224068953;_node9.attrs["w-class"] = "details";_$temp = _node9;{
					var _$parent12 = _$temp;var _node10 = { "attrs": {}, "tagName": "p", "sid": 7 };_node10.children = [];_node10.attrHash = 0;_$temp = _node10;{
						var _$parent13 = _$temp;var _node11 = _installText("购买单价：", 3650464858);;
						_$parent13.children.push(_node11);
					}_$temp = _node10;{
						var _$parent14 = _$temp;_addText(it.product.unitPrice, _$parent14);
					}_$temp = _node10;{
						var _$parent15 = _$temp;_addText(it.product.coinType, _$parent15);
					}_chFunc(_node10);_$parent12.children.push(_node10);
				}_$temp = _node9;{
					var _$parent16 = _$temp;var _node12 = { "attrs": {}, "tagName": "p", "sid": 8 };_node12.children = [];_node12.attrHash = 0;_$temp = _node12;{
						var _$parent17 = _$temp;var _node13 = _installText("产品名称：", 2003985254);;
						_$parent17.children.push(_node13);
					}_$temp = _node12;{
						var _$parent18 = _$temp;_addText(it.product.productName, _$parent18);
					}_chFunc(_node12);_$parent16.children.push(_node12);
				}_$temp = _node9;{
					var _$parent19 = _$temp;var _node14 = { "attrs": {}, "tagName": "p", "sid": 9 };_node14.children = [];_node14.attrHash = 0;_$temp = _node14;{
						var _$parent20 = _$temp;var _node15 = _installText("购买份数：", 2135069541);;
						_$parent20.children.push(_node15);
					}_$temp = _node14;{
						var _$parent21 = _$temp;_addText(it.amount, _$parent21);
					}_$temp = _node14;{
						var _$parent22 = _$temp;var _node16 = _installText("份", 4105707745);;
						_$parent22.children.push(_node16);
					}_chFunc(_node14);_$parent19.children.push(_node14);
				}_$temp = _node9;{
					var _$parent23 = _$temp;var _node17 = { "attrs": {}, "tagName": "p", "sid": 10 };_node17.children = [];_node17.attrHash = 0;_$temp = _node17;{
						var _$parent24 = _$temp;var _node18 = _installText("年化收益：", 637568466);;
						_$parent24.children.push(_node18);
					}_$temp = _node17;{
						var _$parent25 = _$temp;_addText(it.product.profit, _$parent25);
					}_chFunc(_node17);_$parent23.children.push(_node17);
				}_$temp = _node9;{
					var _$parent26 = _$temp;var _node19 = { "attrs": {}, "tagName": "p", "sid": 11 };_node19.children = [];_node19.attrHash = 0;_$temp = _node19;{
						var _$parent27 = _$temp;var _node20 = _installText("锁定期：", 2508525672);;
						_$parent27.children.push(_node20);
					}_$temp = _node19;{
						var _$parent28 = _$temp;_addText(it.product.lockday, _$parent28);
					}_chFunc(_node19);_$parent26.children.push(_node19);
				}_chFunc(_node9);_$parent11.children.push(_node9);
			}_$temp = _node2;{
				var _$parent29 = _$temp;var _node21 = { "attrs": {}, "tagName": "div", "sid": 12 };_node21.children = [];_node21.childHash = 2822028757;_node21.attrSize = 1;_node21.attrHash = 854203028;_node21.attrs["w-class"] = "tag";_$temp = _node21;{
					var _$parent30 = _$temp;var _node22 = _installText("如果云账户余额不够，将自动从本地钱包中扣款", 4141238712);;
					_$parent30.children.push(_node22);
				}_$parent29.children.push(_node21);
			}_$temp = _node2;{
				var _$parent31 = _$temp;var _node23 = { "attrs": {}, "tagName": "div", "sid": 13 };_node23.children = [];_node23.childHash = 1973520702;_node23.attrSize = 2;_node23.attrHash = 2509012085;_node23.attrs["ev-btn-tap"] = "purchaseClicked";_node23.attrs["w-class"] = "btn";_$temp = _node23;{
					var _$parent32 = _$temp;var _node24 = { "attrs": {}, "tagName": "app-components1-btn-btn", "sid": 14 };_node24.hasChild = false;_node24.child = null;_node24.childHash = 2112029850;_node24.attrHash = 0;_$temp = _node24;{
						var _$parent33 = _$temp;var _node25 = {}; //jpair pre

						{
							var jvalue = "";
							jvalue = "确认";
							//jpair suf

							_node25["name"] = jvalue;
						}
						//jpair pre

						{
							var _jvalue = "";
							_jvalue = "big";
							//jpair suf

							_node25["types"] = _jvalue;
						}
						//jpair pre

						{
							var _jvalue2 = "";
							_jvalue2 = "white";
							//jpair suf

							_node25["color"] = _jvalue2;
						}
						_addJson(_node25, _$parent33);
					}_$parent32.children.push(_node24);
				}_$parent31.children.push(_node23);
			}_chFunc(_node2);_$parent2.children.push(_node2);
		}_chFunc(_node);return _node;
	}
});