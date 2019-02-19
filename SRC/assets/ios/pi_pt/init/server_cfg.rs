#[constructor=true,hasmgr=false,primary=name,db=memory]
struct Server{
    name: String,
    nobjs: &[String]
}

#[constructor=true,hasmgr=false,db=memory]
struct AsyncCfg{
    nobjs: &[String]
}

#[constructor=true,hasmgr=false,primary=name,db=memory]
struct RawNetMgr{
    name: String,
    nobjs: &[String]
}

#[constructor=true,hasmgr=false,db=memory]
struct RawNetCfg{
    addr: String, //ip和端口
    protocol: String, //网络协议
    connectEvent: bool, //是否抛出连接事件
    netMgr: RawNetMgr,
    nobjs: &[String]
}

#[constructor=true,hasmgr=false,primary=name,db=memory]
struct TlsNetMgr{
    name: String,
    recvBuffSize: usize,
    nobjs: &[String]
}

#[constructor=true,hasmgr=false,db=memory]
struct TlsNetCfg{
    addr: String, //ip和端口
    protocol: String, //网络协议
    certPath: String,    //TLS证书路径
    keyPath: String,     //TLS密钥路径
    connectEvent: bool, //是否抛出连接事件
    netMgr: TlsNetMgr,
    nobjs: &[String]
}

#[constructor=true,hasmgr=false,db=memory]
enum NetCfg{
    Raw(RawNetCfg),
    Tls(TlsNetCfg),
}


#[constructor=true,hasmgr=false,primary=name,db=memory]
struct MqttCfg{
    net: NetCfg,
    send_buf_size: usize,
    recv_timeout: usize,
    name: String,
    nobjs: &[String]
}

#[constructor=true,hasmgr=false,primary=name,db=memory]
struct RpcCfg{
    mqtt: MqttCfg,
    name: String,
    nobjs: &[String]
}

enum DbType{
    File(String),
    Memory,
}

#[constructor=true,hasmgr=false,primary=name]
struct DbCfg{
    name: String,
    dbType: DbType,
}

#[constructor=true,hasmgr=false,db=memory]
struct HttpsCfg{
    ip: String,
    port: u16, //端口
    keep_alive_timeout: usize,
    handle_timeout: usize,
    root: String, //根路径
    uploadRoot: Option<String>,
    gen_head: Option<HashMap<String, String>>, 
}

#[constructor=true,hasmgr=false,db=memory]
struct HttpsTlsCfg{
    ip: String,
    port: u16, //端口
    keep_alive_timeout: usize,
    handle_timeout: usize,
    root: String, //根路径
    uploadRoot: Option<String>,
    certPath: String,    //TLS证书路径
    keyPath: String,     //TLS密钥路径
    gen_head: Option<HashMap<String, String>>,
}
