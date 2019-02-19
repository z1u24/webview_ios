

#[db=memory,readonly=true,primary=id]struct MineHpCfg{ id: u32, hp: u32, }

#[db=memory,readonly=true,primary=id]struct ItemInitCfg{ id: u32, typeNum: u32, enumNum: u32, count: u32, desc: str, }

#[db=memory,readonly=true]struct MedalCfg{ id: u32, typeNum: str, coinType: u32, coinNum: u32, desc: str, descHant: str, }

#[db=memory,readonly=true]struct AchievementMedalCfg{ id: u32, typeNum: str, coinType: u32, coinNum: u32, desc: str, descHant: str, }