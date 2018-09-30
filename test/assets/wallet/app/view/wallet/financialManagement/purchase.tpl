(function (_cfg, it, it1) {
	var _$temp = void 0,
	    node = void 0;_$temp = node;{
		var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 2;_node.attrHash = 138104688;_node.attrs["class"] = "new-page";_node.attrs["w-class"] = "new-page";_$temp = _node;{
			var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "div", "sid": 1 };_node2.children = [];_node2.attrSize = 1;_node2.attrHash = 3010684512;_node2.attrs["w-class"] = "botBox";_$temp = _node2;{
				var _$parent3 = _$temp;var _node3 = { "attrs": {}, "tagName": "div", "sid": 2 };_node3.children = [];_node3.attrSize = 1;_node3.attrHash = 2437642848;_node3.attrs["w-class"] = "ConfirmPay";_$temp = _node3;{
					var _$parent4 = _$temp;var _node4 = { "attrs": {}, "tagName": "span", "sid": 3 };_node4.children = [];_node4.attrSize = 1;_node4.attrHash = 443517254;_node4.attrs["w-class"] = "confirmText";_$temp = _node4;{
						var _$parent5 = _$temp;_addText(it1.cfgData.title, _$parent5);
					}_chFunc(_node4);_$parent4.children.push(_node4);
				}_$temp = _node3;{
					var _$parent6 = _$temp;var _node5 = { "attrs": {}, "tagName": "span", "sid": 4 };_node5.children = [];_node5.attrHash = 0;_$temp = _node5;{
						var _$parent7 = _$temp;_addText(it1.spend, _$parent7);
					}_$temp = _node5;{
						var _$parent8 = _$temp;var _node6 = _installText("&nbsp;", 1553561131);;
						_$parent8.children.push(_node6);
					}_$temp = _node5;{
						var _$parent9 = _$temp;_addText(it.product.coinType, _$parent9);
					}_chFunc(_node5);_$parent6.children.push(_node5);
				}_$temp = _node3;{
					var _$parent10 = _$temp;var _node7 = { "attrs": {}, "tagName": "img", "sid": 5 };_node7.children = [];_node7.childHash = 0;_node7.attrSize = 3;_node7.attrHash = 1320499539;_node7.attrs["src"] = "../../../res/image/close_blue.png";_node7.attrs["w-class"] = "closeBtn";_node7.attrs["on-tap"] = "close";_$parent10.children.push(_node7);
				}_chFunc(_node3);_$parent3.children.push(_node3);
			}_$temp = _node2;{
				var _$parent11 = _$temp;var _node8 = { "attrs": {}, "tagName": "div", "sid": 6 };_node8.children = [];_node8.attrSize = 1;_node8.attrHash = 3224068953;_node8.attrs["w-class"] = "details";_$temp = _node8;{
					var _$parent12 = _$temp;var _node9 = { "attrs": {}, "tagName": "p", "sid": 7 };_node9.children = [];_node9.attrHash = 0;_$temp = _node9;{
						var _$parent13 = _$temp;_addText(it1.cfgData.detail[0] + it.product.unitPrice, _$parent13);
					}_$temp = _node9;{
						var _$parent14 = _$temp;_addText(it.product.coinType, _$parent14);
					}_chFunc(_node9);_$parent12.children.push(_node9);
				}_$temp = _node8;{
					var _$parent15 = _$temp;var _node10 = { "attrs": {}, "tagName": "p", "sid": 8 };_node10.children = [];_node10.attrHash = 0;_$temp = _node10;{
						var _$parent16 = _$temp;_addText(it1.cfgData.detail[1] + it.product.productName, _$parent16);
					}_chFunc(_node10);_$parent15.children.push(_node10);
				}_$temp = _node8;{
					var _$parent17 = _$temp;var _node11 = { "attrs": {}, "tagName": "p", "sid": 9 };_node11.children = [];_node11.attrHash = 0;_$temp = _node11;{
						var _$parent18 = _$temp;_addText(it1.cfgData.detail[2] + it.amount + it1.cfgData.detail[5], _$parent18);
					}_chFunc(_node11);_$parent17.children.push(_node11);
				}_$temp = _node8;{
					var _$parent19 = _$temp;var _node12 = { "attrs": {}, "tagName": "p", "sid": 10 };_node12.children = [];_node12.attrHash = 0;_$temp = _node12;{
						var _$parent20 = _$temp;_addText(it1.cfgData.detail[3] + it.product.profit, _$parent20);
					}_chFunc(_node12);_$parent19.children.push(_node12);
				}_$temp = _node8;{
					var _$parent21 = _$temp;var _node13 = { "attrs": {}, "tagName": "p", "sid": 11 };_node13.children = [];_node13.attrHash = 0;_$temp = _node13;{
						var _$parent22 = _$temp;_addText(it1.cfgData.detail[4] + it.product.lockday, _$parent22);
					}_chFunc(_node13);_$parent21.children.push(_node13);
				}_chFunc(_node8);_$parent11.children.push(_node8);
			}_$temp = _node2;{
				var _$parent23 = _$temp;var _node14 = { "attrs": {}, "tagName": "div", "sid": 12 };_node14.children = [];_node14.attrSize = 1;_node14.attrHash = 854203028;_node14.attrs["w-class"] = "tag";_$temp = _node14;{
					var _$parent24 = _$temp;_addText(it1.cfgData.mess, _$parent24);
				}_chFunc(_node14);_$parent23.children.push(_node14);
			}_$temp = _node2;{
				var _$parent25 = _$temp;var _node15 = { "attrs": {}, "tagName": "div", "sid": 13 };_node15.children = [];_node15.attrSize = 2;_node15.attrHash = 2509012085;_node15.attrs["ev-btn-tap"] = "purchaseClicked";_node15.attrs["w-class"] = "btn";_$temp = _node15;{
					var _$parent26 = _$temp;var _node16 = { "attrs": {}, "tagName": "app-components1-btn-btn", "sid": 14 };_node16.hasChild = false;_node16.child = null;_node16.attrHash = 0;_$temp = _node16;{
						var _$parent27 = _$temp;var _node17 = {}; //jpair pre

						_node17["name"] = it1.cfgData.btnName;
						//jpair suf
						//jpair pre

						{
							var jvalue = "";
							jvalue = "big";
							//jpair suf

							_node17["types"] = jvalue;
						}
						//jpair pre

						{
							var _jvalue = "";
							_jvalue = "white";
							//jpair suf

							_node17["color"] = _jvalue;
						}
						_addJson(_node17, _$parent27);
					}_chFunc(_node16);_$parent26.children.push(_node16);
				}_chFunc(_node15);_$parent25.children.push(_node15);
			}_chFunc(_node2);_$parent2.children.push(_node2);
		}_chFunc(_node);return _node;
	}
});