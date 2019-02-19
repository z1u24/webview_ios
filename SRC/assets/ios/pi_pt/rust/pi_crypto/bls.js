_$define("pi_pt/rust/pi_crypto/bls", function (require, exports, module){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var vm_1 = require("../../vm/vm");
var nobject_1 = require("../../vm/nobject");
var sinfo_1 = require("../../../pi/struct/sinfo");
var vec_1 = require("../def/vec");

var BlsId = function (_nobject_1$NObject) {
    _inherits(BlsId, _nobject_1$NObject);

    function BlsId() {
        _classCallCheck(this, BlsId);

        return _possibleConstructorReturn(this, (BlsId.__proto__ || Object.getPrototypeOf(BlsId)).apply(this, arguments));
    }

    return BlsId;
}(nobject_1.NObject);

BlsId._$info = new sinfo_1.StructInfo("pi_pt/rust/pi_crypto/bls.BlsId", 1811307610, new Map(), []);
exports.BlsId = BlsId;

var BlsSecretKey = function (_nobject_1$NObject2) {
    _inherits(BlsSecretKey, _nobject_1$NObject2);

    function BlsSecretKey() {
        _classCallCheck(this, BlsSecretKey);

        return _possibleConstructorReturn(this, (BlsSecretKey.__proto__ || Object.getPrototypeOf(BlsSecretKey)).apply(this, arguments));
    }

    return BlsSecretKey;
}(nobject_1.NObject);

BlsSecretKey._$info = new sinfo_1.StructInfo("pi_pt/rust/pi_crypto/bls.BlsSecretKey", 1950901979, new Map(), []);
exports.BlsSecretKey = BlsSecretKey;

var BlsPublicKey = function (_nobject_1$NObject3) {
    _inherits(BlsPublicKey, _nobject_1$NObject3);

    function BlsPublicKey() {
        _classCallCheck(this, BlsPublicKey);

        return _possibleConstructorReturn(this, (BlsPublicKey.__proto__ || Object.getPrototypeOf(BlsPublicKey)).apply(this, arguments));
    }

    return BlsPublicKey;
}(nobject_1.NObject);

BlsPublicKey._$info = new sinfo_1.StructInfo("pi_pt/rust/pi_crypto/bls.BlsPublicKey", 4133171068, new Map(), []);
exports.BlsPublicKey = BlsPublicKey;

var BlsSignature = function (_nobject_1$NObject4) {
    _inherits(BlsSignature, _nobject_1$NObject4);

    function BlsSignature() {
        _classCallCheck(this, BlsSignature);

        return _possibleConstructorReturn(this, (BlsSignature.__proto__ || Object.getPrototypeOf(BlsSignature)).apply(this, arguments));
    }

    return BlsSignature;
}(nobject_1.NObject);

BlsSignature._$info = new sinfo_1.StructInfo("pi_pt/rust/pi_crypto/bls.BlsSignature", 3585355902, new Map(), []);
exports.BlsSignature = BlsSignature;

var BlsIdVec = function (_nobject_1$NObject5) {
    _inherits(BlsIdVec, _nobject_1$NObject5);

    function BlsIdVec() {
        _classCallCheck(this, BlsIdVec);

        return _possibleConstructorReturn(this, (BlsIdVec.__proto__ || Object.getPrototypeOf(BlsIdVec)).apply(this, arguments));
    }

    return BlsIdVec;
}(nobject_1.NObject);

BlsIdVec._$info = new sinfo_1.StructInfo("pi_pt/rust/pi_crypto/bls.BlsIdVec", 504915720, new Map(), []);
/**
 * @param k:usize
 * @return
 */
BlsIdVec.new = function (k) {
    var result = vm_1.call(1252421489, [k]);
    result = new BlsIdVec(result);
    return result;
};
exports.BlsIdVec = BlsIdVec;

var BlsSecKeyVec = function (_nobject_1$NObject6) {
    _inherits(BlsSecKeyVec, _nobject_1$NObject6);

    function BlsSecKeyVec() {
        _classCallCheck(this, BlsSecKeyVec);

        return _possibleConstructorReturn(this, (BlsSecKeyVec.__proto__ || Object.getPrototypeOf(BlsSecKeyVec)).apply(this, arguments));
    }

    return BlsSecKeyVec;
}(nobject_1.NObject);

BlsSecKeyVec._$info = new sinfo_1.StructInfo("pi_pt/rust/pi_crypto/bls.BlsSecKeyVec", 1657720652, new Map(), []);
/**
 * @param k:usize
 * @return
 */
BlsSecKeyVec.new = function (k) {
    var result = vm_1.call(2592527877, [k]);
    result = new BlsSecKeyVec(result);
    return result;
};
exports.BlsSecKeyVec = BlsSecKeyVec;

var BlsPubKeyVec = function (_nobject_1$NObject7) {
    _inherits(BlsPubKeyVec, _nobject_1$NObject7);

    function BlsPubKeyVec() {
        _classCallCheck(this, BlsPubKeyVec);

        return _possibleConstructorReturn(this, (BlsPubKeyVec.__proto__ || Object.getPrototypeOf(BlsPubKeyVec)).apply(this, arguments));
    }

    return BlsPubKeyVec;
}(nobject_1.NObject);

BlsPubKeyVec._$info = new sinfo_1.StructInfo("pi_pt/rust/pi_crypto/bls.BlsPubKeyVec", 4233471477, new Map(), []);
/**
 * @param k:usize
 * @return
 */
BlsPubKeyVec.new = function (k) {
    var result = vm_1.call(3404883075, [k]);
    result = new BlsPubKeyVec(result);
    return result;
};
exports.BlsPubKeyVec = BlsPubKeyVec;

var BlsSigVec = function (_nobject_1$NObject8) {
    _inherits(BlsSigVec, _nobject_1$NObject8);

    function BlsSigVec() {
        _classCallCheck(this, BlsSigVec);

        return _possibleConstructorReturn(this, (BlsSigVec.__proto__ || Object.getPrototypeOf(BlsSigVec)).apply(this, arguments));
    }

    return BlsSigVec;
}(nobject_1.NObject);

BlsSigVec._$info = new sinfo_1.StructInfo("pi_pt/rust/pi_crypto/bls.BlsSigVec", 2231627723, new Map(), []);
/**
 * @param k:usize
 * @return
 */
BlsSigVec.new = function (k) {
    var result = vm_1.call(2903230657, [k]);
    result = new BlsSigVec(result);
    return result;
};
exports.BlsSigVec = BlsSigVec;
/*
* 线程安全的初始化
*/
/**
 * @param curve:Curve
 * @return bool
 */
exports.blsInit = function (curve) {
    return vm_1.call(2498464569, [curve]);
};
/**
 * @return usize
 */
exports.blsGetOpUnitSize = function () {
    return vm_1.call(1295262082, []);
};
/**
 * @param max_buf_size:usize
 * @return Option<String>
 */
exports.blsGetCurveOrder = function (max_buf_size) {
    var result = vm_1.call(2496411899, [max_buf_size]);
    if (result !== undefined && result !== null) {}
    return result;
};
/**
 * @param max_buf_size:usize
 * @return Option<String>
 */
exports.blsGetFieldOrder = function (max_buf_size) {
    var result = vm_1.call(755737870, [max_buf_size]);
    if (result !== undefined && result !== null) {}
    return result;
};
/**
 * @return pi_crypto::bls::BlsPublicKey
 */
exports.blsGetGeneratorOfG2 = function () {
    var result = vm_1.call(3253072797, []);
    result = new BlsPublicKey(result);
    return result;
};
/**
 * @param x:i32
 * @return pi_crypto::bls::BlsId
 */
exports.blsIdSetInt = function (x) {
    var result = vm_1.call(4280890483, [x]);
    result = new BlsId(result);
    return result;
};
/**
 * @param buf:String
 * @return Option<pi_crypto::bls::BlsId>
 */
exports.blsIdSetDecStr = function (buf) {
    var result = vm_1.call(2402380511, [buf]);
    if (result !== undefined && result !== null) {
        result = new BlsId(result);
    }
    return result;
};
/**
 * @param buf:String
 * @return Option<pi_crypto::bls::BlsId>
 */
exports.blsIdSetHexStr = function (buf) {
    var result = vm_1.call(2426850537, [buf]);
    if (result !== undefined && result !== null) {
        result = new BlsId(result);
    }
    return result;
};
/**
 * @param max_buf_size:usize
 * @param id:&BlsId
 * @return Option<String>
 */
exports.blsIdGetDecStr = function (max_buf_size, id) {
    id = id.self;
    var result = vm_1.call(3075954650, [max_buf_size, id]);
    if (result !== undefined && result !== null) {}
    return result;
};
/**
 * @param max_buf_size:usize
 * @param id:&BlsId
 * @return Option<String>
 */
exports.blsIdGetHexStr = function (max_buf_size, id) {
    id = id.self;
    var result = vm_1.call(3801863647, [max_buf_size, id]);
    if (result !== undefined && result !== null) {}
    return result;
};
/**
 * @param buf:Vec<u8>
 * @return Option<pi_crypto::bls::BlsSecretKey>
 */
exports.blsHashToSecretKey = function (buf) {
    buf = buf.self;
    var result = vm_1.call(1719604587, [buf]);
    if (result !== undefined && result !== null) {
        result = new BlsSecretKey(result);
    }
    return result;
};
/**
 * @param sec_key:&BlsSecretKey
 * @return Option<pi_crypto::bls::BlsPublicKey>
 */
exports.blsGetPublicKey = function (sec_key) {
    sec_key = sec_key.self;
    var result = vm_1.call(3025531400, [sec_key]);
    if (result !== undefined && result !== null) {
        result = new BlsPublicKey(result);
    }
    return result;
};
/**
 * @param sec_key:&BlsSecretKey
 * @return Option<pi_crypto::bls::BlsSignature>
 */
exports.blsGetPop = function (sec_key) {
    sec_key = sec_key.self;
    var result = vm_1.call(3723291352, [sec_key]);
    if (result !== undefined && result !== null) {
        result = new BlsSignature(result);
    }
    return result;
};
/**
 * @param sig:&BlsSignature
 * @param pub_key:&BlsPublicKey
 * @return bool
 */
exports.blsVerifyPop = function (sig, pub_key) {
    sig = sig.self;
    pub_key = pub_key.self;
    return vm_1.call(1669774542, [sig, pub_key]);
};
/**
 * @param max_buf_size:usize
 * @param id:&BlsId
 * @return Option<Vec<u8>>
 */
exports.blsIdSerialize = function (max_buf_size, id) {
    id = id.self;
    var result = vm_1.call(1235807017, [max_buf_size, id]);
    if (result !== undefined && result !== null) {
        result = new vec_1.Vec(result);
    }
    return result;
};
/**
 * @param max_buf_size:usize
 * @param sec_key:&BlsSecretKey
 * @return Option<Vec<u8>>
 */
exports.blsSecretKeySerialize = function (max_buf_size, sec_key) {
    sec_key = sec_key.self;
    var result = vm_1.call(3671848448, [max_buf_size, sec_key]);
    if (result !== undefined && result !== null) {
        result = new vec_1.Vec(result);
    }
    return result;
};
/**
 * @param max_buf_size:usize
 * @param pub_key:&BlsPublicKey
 * @return Option<Vec<u8>>
 */
exports.blsPublicKeySerialize = function (max_buf_size, pub_key) {
    pub_key = pub_key.self;
    var result = vm_1.call(1900424700, [max_buf_size, pub_key]);
    if (result !== undefined && result !== null) {
        result = new vec_1.Vec(result);
    }
    return result;
};
/**
 * @param max_buf_size:usize
 * @param sig:&BlsSignature
 * @return Option<Vec<u8>>
 */
exports.blsSignatureSerialize = function (max_buf_size, sig) {
    sig = sig.self;
    var result = vm_1.call(2045530324, [max_buf_size, sig]);
    if (result !== undefined && result !== null) {
        result = new vec_1.Vec(result);
    }
    return result;
};
/**
 * @param buf:Vec<u8>
 * @return Option<pi_crypto::bls::BlsId>
 */
exports.blsIdDeserialize = function (buf) {
    buf = buf.self;
    var result = vm_1.call(298607248, [buf]);
    if (result !== undefined && result !== null) {
        result = new BlsId(result);
    }
    return result;
};
/**
 * @param buf:Vec<u8>
 * @return Option<pi_crypto::bls::BlsSecretKey>
 */
exports.blsSecretKeyDeserialize = function (buf) {
    buf = buf.self;
    var result = vm_1.call(2029782143, [buf]);
    if (result !== undefined && result !== null) {
        result = new BlsSecretKey(result);
    }
    return result;
};
/**
 * @param buf:Vec<u8>
 * @return Option<pi_crypto::bls::BlsPublicKey>
 */
exports.blsPublicKeyDeserialize = function (buf) {
    buf = buf.self;
    var result = vm_1.call(1922268706, [buf]);
    if (result !== undefined && result !== null) {
        result = new BlsPublicKey(result);
    }
    return result;
};
/**
 * @param buf:Vec<u8>
 * @return Option<pi_crypto::bls::BlsSignature>
 */
exports.blsSignatureDeserialize = function (buf) {
    buf = buf.self;
    var result = vm_1.call(760927771, [buf]);
    if (result !== undefined && result !== null) {
        result = new BlsSignature(result);
    }
    return result;
};
/**
 * @param lhs:&BlsId
 * @param rhs:&BlsId
 * @return bool
 */
exports.blsIdIsEqual = function (lhs, rhs) {
    lhs = lhs.self;
    rhs = rhs.self;
    return vm_1.call(1304117942, [lhs, rhs]);
};
/**
 * @param lhs:&BlsSecretKey
 * @param rhs:&BlsSecretKey
 * @return bool
 */
exports.blsSecretKeyIsEqual = function (lhs, rhs) {
    lhs = lhs.self;
    rhs = rhs.self;
    return vm_1.call(1202562609, [lhs, rhs]);
};
/**
 * @param lhs:&BlsPublicKey
 * @param rhs:&BlsPublicKey
 * @return bool
 */
exports.blsPublicKeyIsEqual = function (lhs, rhs) {
    lhs = lhs.self;
    rhs = rhs.self;
    return vm_1.call(1494397139, [lhs, rhs]);
};
/**
 * @param lhs:&BlsSignature
 * @param rhs:&BlsSignature
 * @return bool
 */
exports.blsSignatureIsEqual = function (lhs, rhs) {
    lhs = lhs.self;
    rhs = rhs.self;
    return vm_1.call(1251457612, [lhs, rhs]);
};
/**
 * @param sec_key:&BlsSecretKey
 * @param rhs:&BlsSecretKey
 */
exports.blsSecretKeyAdd = function (sec_key, rhs) {
    sec_key = sec_key.self;
    rhs = rhs.self;
    vm_1.call(863200741, [sec_key, rhs]);
};
/**
 * @param pub_key:&BlsPublicKey
 * @param rhs:&BlsPublicKey
 */
exports.blsPublicKeyAdd = function (pub_key, rhs) {
    pub_key = pub_key.self;
    rhs = rhs.self;
    vm_1.call(3082139465, [pub_key, rhs]);
};
/**
 * @param sig:&BlsSignature
 * @param rhs:&BlsSignature
 */
exports.blsSignatureAdd = function (sig, rhs) {
    sig = sig.self;
    rhs = rhs.self;
    vm_1.call(3576086575, [sig, rhs]);
};
/**
 * @param src_key:&BlsSecretKey
 * @param k:usize
 * @param id:&BlsId
 * @return Option<pi_crypto::bls::BlsSecretKey>
 */
exports.blsSecretKeyShare = function (src_key, k, id) {
    src_key = src_key.self;
    id = id.self;
    var result = vm_1.call(3750445483, [src_key, k, id]);
    if (result !== undefined && result !== null) {
        result = new BlsSecretKey(result);
    }
    return result;
};
/**
 * @param src_key:&BlsPublicKey
 * @param k:usize
 * @param id:&BlsId
 * @return Option<pi_crypto::bls::BlsPublicKey>
 */
exports.blsPublicKeyShare = function (src_key, k, id) {
    src_key = src_key.self;
    id = id.self;
    var result = vm_1.call(3551222567, [src_key, k, id]);
    if (result !== undefined && result !== null) {
        result = new BlsPublicKey(result);
    }
    return result;
};
/**
 * @param vec:&BlsIdVec
 * @param index:usize
 * @return Option<pi_crypto::bls::BlsId>
 */
exports.blsGetIdFromVec = function (vec, index) {
    vec = vec.self;
    var result = vm_1.call(4217857181, [vec, index]);
    if (result !== undefined && result !== null) {
        result = new BlsId(result);
    }
    return result;
};
/**
 * @param vec:&mutBlsIdVec
 * @param id:&BlsId
 */
exports.blsAddIdToVec = function (vec, id) {
    vec = vec.self;
    id = id.self;
    vm_1.call(3778283533, [vec, id]);
};
/**
 * @param vec:&BlsSecKeyVec
 * @param index:usize
 * @return Option<pi_crypto::bls::BlsSecretKey>
 */
exports.blsGetSecretKeyFromVec = function (vec, index) {
    vec = vec.self;
    var result = vm_1.call(1905417019, [vec, index]);
    if (result !== undefined && result !== null) {
        result = new BlsSecretKey(result);
    }
    return result;
};
/**
 * @param vec:&mutBlsSecKeyVec
 * @param sec_key:&BlsSecretKey
 */
exports.blsAddSecretKeyToVec = function (vec, sec_key) {
    vec = vec.self;
    sec_key = sec_key.self;
    vm_1.call(2172313629, [vec, sec_key]);
};
/**
 * @param vec:&BlsSecKeyVec
 * @return Option<pi_crypto::bls::BlsSecretKey>
 */
exports.blsGetSecretKeyVec = function (vec) {
    vec = vec.self;
    var result = vm_1.call(2861556416, [vec]);
    if (result !== undefined && result !== null) {
        result = new BlsSecretKey(result);
    }
    return result;
};
/**
 * @param vec:&BlsPubKeyVec
 * @param index:usize
 * @return Option<pi_crypto::bls::BlsPublicKey>
 */
exports.blsGetPublicKeyFromVec = function (vec, index) {
    vec = vec.self;
    var result = vm_1.call(4054179525, [vec, index]);
    if (result !== undefined && result !== null) {
        result = new BlsPublicKey(result);
    }
    return result;
};
/**
 * @param vec:&mutBlsPubKeyVec
 * @param pub_key:&BlsPublicKey
 */
exports.blsAddPublicKeyToVec = function (vec, pub_key) {
    vec = vec.self;
    pub_key = pub_key.self;
    vm_1.call(3718730423, [vec, pub_key]);
};
/**
 * @param vec:&BlsPubKeyVec
 * @return Option<pi_crypto::bls::BlsPublicKey>
 */
exports.blsGetPublicKeyVec = function (vec) {
    vec = vec.self;
    var result = vm_1.call(2864459653, [vec]);
    if (result !== undefined && result !== null) {
        result = new BlsPublicKey(result);
    }
    return result;
};
/**
 * @param vec:&BlsSigVec
 * @param index:usize
 * @return Option<pi_crypto::bls::BlsSignature>
 */
exports.blsGetSignatureFromVec = function (vec, index) {
    vec = vec.self;
    var result = vm_1.call(376820189, [vec, index]);
    if (result !== undefined && result !== null) {
        result = new BlsSignature(result);
    }
    return result;
};
/**
 * @param vec:&mutBlsSigVec
 * @param sig:&BlsSignature
 */
exports.blsAddSignatureToVec = function (vec, sig) {
    vec = vec.self;
    sig = sig.self;
    vm_1.call(263952757, [vec, sig]);
};
/**
 * @param vec:&BlsSigVec
 * @return Option<pi_crypto::bls::BlsSignature>
 */
exports.blsGetSignatureKeyVec = function (vec) {
    vec = vec.self;
    var result = vm_1.call(2039602097, [vec]);
    if (result !== undefined && result !== null) {
        result = new BlsSignature(result);
    }
    return result;
};
/**
 * @param sec_key_vec:&BlsSecKeyVec
 * @param id_vec:&BlsIdVec
 * @param n:usize
 * @return Option<pi_crypto::bls::BlsSecretKey>
 */
exports.blsSecretKeyRecover = function (sec_key_vec, id_vec, n) {
    sec_key_vec = sec_key_vec.self;
    id_vec = id_vec.self;
    var result = vm_1.call(1087017908, [sec_key_vec, id_vec, n]);
    if (result !== undefined && result !== null) {
        result = new BlsSecretKey(result);
    }
    return result;
};
/**
 * @param pub_key_vec:&BlsPubKeyVec
 * @param id_vec:&BlsIdVec
 * @param n:usize
 * @return Option<pi_crypto::bls::BlsPublicKey>
 */
exports.blsPublicKeyRecover = function (pub_key_vec, id_vec, n) {
    pub_key_vec = pub_key_vec.self;
    id_vec = id_vec.self;
    var result = vm_1.call(993477813, [pub_key_vec, id_vec, n]);
    if (result !== undefined && result !== null) {
        result = new BlsPublicKey(result);
    }
    return result;
};
/**
 * @param sig_vec:&BlsSigVec
 * @param id_vec:&BlsIdVec
 * @param n:usize
 * @return Option<pi_crypto::bls::BlsSignature>
 */
exports.blsSignatureRecover = function (sig_vec, id_vec, n) {
    sig_vec = sig_vec.self;
    id_vec = id_vec.self;
    var result = vm_1.call(3587763353, [sig_vec, id_vec, n]);
    if (result !== undefined && result !== null) {
        result = new BlsSignature(result);
    }
    return result;
};
/**
 * @param sec_key:&BlsSecretKey
 * @param data:Arc<Vec<u8>>
 * @return Option<pi_crypto::bls::BlsSignature>
 */
exports.blsSign = function (sec_key, data) {
    sec_key = sec_key.self;
    data = data.self;
    var result = vm_1.call(3188209906, [sec_key, data]);
    if (result !== undefined && result !== null) {
        result = new BlsSignature(result);
    }
    return result;
};
/**
 * @param sig:&BlsSignature
 * @param pub_key:&BlsPublicKey
 * @param data:Arc<Vec<u8>>
 * @return bool
 */
exports.blsVerify = function (sig, pub_key, data) {
    sig = sig.self;
    pub_key = pub_key.self;
    data = data.self;
    return vm_1.call(2084703123, [sig, pub_key, data]);
};
var Curve;
(function (Curve) {
    Curve[Curve["MclBnCurveFp254BNb"] = 0] = "MclBnCurveFp254BNb";
    Curve[Curve["MclBnCurveFp382_1"] = 1] = "MclBnCurveFp382_1";
    Curve[Curve["MclBnCurveFp382_2"] = 2] = "MclBnCurveFp382_2";
    Curve[Curve["MclBnCurveFp462"] = 3] = "MclBnCurveFp462";
    Curve[Curve["MclBnCurveSNARK1"] = 4] = "MclBnCurveSNARK1";
    Curve[Curve["MclBls12CurveFp381"] = 5] = "MclBls12CurveFp381";
})(Curve = exports.Curve || (exports.Curve = {}));
})