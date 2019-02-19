_$define("pi_pt/init/p2p/p2p.s", function (require, exports, module){
// import { BonBuffer } from "../../../pi/util/bon";
// import { addToMeta, removeFromMeta, Struct, notifyModify, StructMgr} from "../../../pi/struct/struct_mgr";
// import { StructInfo, Type, FieldInfo, EnumType, EnumInfo} from "../../../pi/struct/sinfo";
// import * as bigInt from "../../../pi/bigint/biginteger";
// export class P2PCfg extends Struct {
//     addr: string;
//     con: string;
//     peer_list: Array<[string,number]>;
// 	static _$info =  new StructInfo("pi_pt/init/p2p/p2p.P2PCfg",3553000890,  new Map( [["constructor","true"],["hasmgr","false"]]), [new FieldInfo("addr", 
// new EnumType( Type.Str ), null), new FieldInfo("con", 
// new EnumType( Type.Str ), null), new FieldInfo("peer_list", 
// new EnumType( Type.Arr, 
// new EnumType( Type.Struct, new StructInfo("",1257683291, null, [new FieldInfo("0", 
// new EnumType( Type.Str ), null), new FieldInfo("1", 
// new EnumType( Type.U32 ), null) ])  ) ), null) ]);
// 	constructor(addr?: string,con?: string,peer_list?: Array<[string,number]>, old?: P2PCfg){
// 		super();
// 		if(!old){
// 			this.addr = addr;
// 			this.con = con;
// 			this.peer_list = peer_list;
// 		}else{
// 			this.addr = addr === undefined? old.addr:addr;
// 			this.con = con === undefined? old.con:con;
// 			this.peer_list = peer_list === undefined? old.peer_list:peer_list;
// 		}
// 	}
// 	bonDecode(bb:BonBuffer) {
// 		this.addr = bb.readUtf8();
// 		this.con = bb.readUtf8();
// 		this.peer_list = bb.readArray(() => {
// 	return     [bb.readUtf8(), bb.readInt()] as [string,number];
// })
// ;
//         }
// 	bonEncode(bb:BonBuffer) {        
//         bb.writeUtf8(this.addr);
//         bb.writeUtf8(this.con);
//         bb.writeArray(this.peer_list, (el) => {    
//             bb.writeUtf8(el[0]);
//             bb.writeInt(el[1]);
//         });
// 	}
// }
"use strict";
})