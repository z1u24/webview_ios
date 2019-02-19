_$define("pi_pt/rust/pi_serv/js_net", function (require, exports, module){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var vm_1 = require("../../vm/vm");
var nobject_1 = require("../../vm/nobject");
var sinfo_1 = require("../../../pi/struct/sinfo");
var server_1 = require("../mqtt/server");
var server_2 = require("../rpc/server");
var api_1 = require("../net/api");

var NetMgr = function (_nobject_1$NObject) {
    _inherits(NetMgr, _nobject_1$NObject);

    function NetMgr() {
        _classCallCheck(this, NetMgr);

        return _possibleConstructorReturn(this, (NetMgr.__proto__ || Object.getPrototypeOf(NetMgr)).apply(this, arguments));
    }

    return NetMgr;
}(nobject_1.NObject);

NetMgr._$info = new sinfo_1.StructInfo("pi_pt/rust/pi_serv/js_net.NetMgr", 2462173101, new Map(), []);
/**
 * @return js_net::NetMgr
 */
NetMgr.new = function () {
    var result = vm_1.call(545958709, []);
    result = new NetMgr(result);
    return result;
};
exports.NetMgr = NetMgr;

var TlsNetMgr = function (_nobject_1$NObject2) {
    _inherits(TlsNetMgr, _nobject_1$NObject2);

    function TlsNetMgr() {
        _classCallCheck(this, TlsNetMgr);

        return _possibleConstructorReturn(this, (TlsNetMgr.__proto__ || Object.getPrototypeOf(TlsNetMgr)).apply(this, arguments));
    }

    return TlsNetMgr;
}(nobject_1.NObject);

TlsNetMgr._$info = new sinfo_1.StructInfo("pi_pt/rust/pi_serv/js_net.TlsNetMgr", 4120821321, new Map(), []);
/**
 * @param recv_buff_size:usize
 * @return js_net::TlsNetMgr
 */
TlsNetMgr.new = function (recv_buff_size) {
    var result = vm_1.call(471202658, [recv_buff_size]);
    result = new TlsNetMgr(result);
    return result;
};
exports.TlsNetMgr = TlsNetMgr;
/*
* 网络连接Handler
*/

var NetHandler = function (_nobject_1$NObject3) {
    _inherits(NetHandler, _nobject_1$NObject3);

    function NetHandler() {
        _classCallCheck(this, NetHandler);

        return _possibleConstructorReturn(this, (NetHandler.__proto__ || Object.getPrototypeOf(NetHandler)).apply(this, arguments));
    }

    return NetHandler;
}(nobject_1.NObject);

NetHandler._$info = new sinfo_1.StructInfo("pi_pt/rust/pi_serv/js_net.NetHandler", 1707332364, new Map(), []);
//构建一个处理器
/**
 * @param handler:String
 * @param gray:JSGray
 * @return js_net::NetHandler
 */
NetHandler.new = function (handler, gray) {
    gray = gray.self;
    var result = vm_1.call(1849109725, [handler, gray]);
    result = new NetHandler(result);
    return result;
};
exports.NetHandler = NetHandler;
/*
* Topic处理器
*/

var TopicHandler = function (_nobject_1$NObject4) {
    _inherits(TopicHandler, _nobject_1$NObject4);

    function TopicHandler() {
        _classCallCheck(this, TopicHandler);

        return _possibleConstructorReturn(this, (TopicHandler.__proto__ || Object.getPrototypeOf(TopicHandler)).apply(this, arguments));
    }

    return TopicHandler;
}(nobject_1.NObject);

TopicHandler._$info = new sinfo_1.StructInfo("pi_pt/rust/pi_serv/js_net.TopicHandler", 15779622, new Map(), []);
//构建一个处理器
/**
 * @param gray:&Arc<RwLock<GrayTab<JSGray>>>
 * @return
 */
TopicHandler.new = function (gray) {
    gray = gray.self;
    var result = vm_1.call(2637800921, [gray]);
    result = new TopicHandler(result);
    return result;
};
exports.TopicHandler = TopicHandler;
//为mqtt绑定网络， 返回mqttserver
/**
 * @param mgr:&mutNetMgr
 * @param addr:String
 * @param protocol:String
 * @param send_buf_size:usize
 * @param recv_timeout:usize
 * @return mqtt::server::ServerNode
 */
exports.mqttBind = function (mgr, addr, protocol, send_buf_size, recv_timeout) {
    mgr = mgr.self;
    var result = vm_1.call(357009886, [mgr, addr, protocol, send_buf_size, recv_timeout]);
    result = new server_1.ServerNode(result);
    return result;
};
/**
 * @param mgr:&mutNetMgr
 * @param addr:String
 * @param protocol:String
 * @param handler:&NetHandler
 * @param close_handler:&NetHandler
 */
exports.netConnectBind = function (mgr, addr, protocol, handler, close_handler) {
    mgr = mgr.self;
    handler = handler.self;
    close_handler = close_handler.self;
    vm_1.call(3222050891, [mgr, addr, protocol, handler, close_handler]);
};
//为mqtt绑定安全网络， 返回mqttserver
/**
 * @param mgr:&mutTlsNetMgr
 * @param addr:String
 * @param protocol:String
 * @param cert_path:String
 * @param key_path:String
 * @param send_buf_size:usize
 * @param recv_timeout:usize
 * @return mqtt::server::ServerNode
 */
exports.mqttBindTls = function (mgr, addr, protocol, cert_path, key_path, send_buf_size, recv_timeout) {
    mgr = mgr.self;
    var result = vm_1.call(3574413612, [mgr, addr, protocol, cert_path, key_path, send_buf_size, recv_timeout]);
    result = new server_1.ServerNode(result);
    return result;
};
/**
 * @param mgr:&mutTlsNetMgr
 * @param addr:String
 * @param protocol:String
 * @param cert_path:String
 * @param key_path:String
 * @param handler:&NetHandler
 * @param close_handler:&NetHandler
 */
exports.netConnectBindTls = function (mgr, addr, protocol, cert_path, key_path, handler, close_handler) {
    mgr = mgr.self;
    handler = handler.self;
    close_handler = close_handler.self;
    vm_1.call(2877879633, [mgr, addr, protocol, cert_path, key_path, handler, close_handler]);
};
/**
 * @param node:&ServerNode
 * @return mqtt::server::ServerNode
 */
exports.cloneServerNode = function (node) {
    node = node.self;
    var result = vm_1.call(2248917003, [node]);
    result = new server_1.ServerNode(result);
    return result;
};
/**
 * @param server:&RPCServer
 * @return rpc::server::RPCServer
 */
exports.cloneRpcServer = function (server) {
    server = server.self;
    var result = vm_1.call(3695051784, [server]);
    result = new server_2.RPCServer(result);
    return result;
};
/**
 * @param server_node:&ServerNode
 * @param topic:String
 * @param can_publish:bool
 * @param can_subscribe:bool
 * @return Result<bool,String>
 */
exports.setMqttTopic = function (server_node, topic, can_publish, can_subscribe) {
    server_node = server_node.self;
    var result = vm_1.call(2482429183, [server_node, topic, can_publish, can_subscribe]);
    return result;
};
/**
 * @param server_node:&ServerNode
 * @param topic:String
 * @return Result<(),String>
 */
exports.unsetMqttTopic = function (server_node, topic) {
    server_node = server_node.self;
    var result = vm_1.call(2867121613, [server_node, topic]);
    return result;
};
/**
 * @param server:&ServerNode
 * @param retain:bool
 * @param qos:QoS
 * @param topic:String
 * @param payload:&[u8]
 * @return Result<(),Error>
 */
exports.mqttPublish = function (server, retain, qos, topic, payload) {
    server = server.self;
    var result = vm_1.call(1551231400, [server, retain, qos, topic, payload]);
    return result;
};
/**
 * @param session:&Arc<Session>
 * @param topic:String
 * @param data:&[u8]
 */
exports.mqttRespond = function (session, topic, data) {
    session = session.self;
    vm_1.call(2874114884, [session, topic, data]);
};
//为rpc注册handler
/**
 * @param serv:&mutRPCServer
 * @param topic:String
 * @param sync:bool
 * @param handler:&Arc<TopicHandler>
 * @return Result<(),Error>
 */
exports.registerRpcHandler = function (serv, topic, sync, handler) {
    serv = serv.self;
    handler = handler.self;
    var result = vm_1.call(138660483, [serv, topic, sync, handler]);
    return result;
};
//为rpc注册handler
/**
 * @param th:TopicHandler
 * @return Arc<js_net::TopicHandler>
 */
exports.arcNewTopicHandler = function (th) {
    th = th.self;
    var result = vm_1.call(527952504, [th]);
    result = new TopicHandler(result);
    return result;
};
//为pi_p2p封装一个P2PManage::new方法
// pub fn p2p_manage_new(addr: &str, arr1: Vec<String>, arr2: Vec<u32>) -> P2PManage {
//     let mut map: FnvHashMap<SocketAddr, u64> = FnvHashMap::default();
//     let mut i = 0;
//     for time in arr2 {
//         map.insert(arr1.get(i).unwrap().parse().unwrap(), time as u64);
//         i += 1;
//     }
//     P2PManage::new(addr.parse().unwrap(), map)
// }
/**
 * @param socket:Socket
 * @return Arc<net::api::Socket>
 */
exports.creatArcSokect = function (socket) {
    socket = socket.self;
    var result = vm_1.call(3781439120, [socket]);
    result = new api_1.Socket(result);
    return result;
};
var QoS;
(function (QoS) {
    QoS[QoS["AtMostOnce"] = 0] = "AtMostOnce";
    QoS[QoS["AtLeastOnce"] = 1] = "AtLeastOnce";
    QoS[QoS["ExactlyOnce"] = 2] = "ExactlyOnce";
})(QoS = exports.QoS || (exports.QoS = {}));
})