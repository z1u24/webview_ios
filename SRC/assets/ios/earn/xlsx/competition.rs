

#[db=memory,readonly=true,primary=pid]struct LOLTeamInfosCfg{ pid: u32, teamName: str, area: str, pic: str, }

#[db=memory,readonly=true,primary=pid]struct LOLTypeCfg{ pid: u32, name: str, season: str, pic: str, }