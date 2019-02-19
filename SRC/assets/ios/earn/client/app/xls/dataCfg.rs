

#[db=memory,readonly=true,primary=pid]struct PrizeCfg{ pid: u32, zh_hans: str, zh_hant: str, unit: str, }

#[db=memory,readonly=true]struct ActTicketNumCfg{ actType: u32, ticketNum: u32, desc: str, }