

#[db=memory,readonly=true,primary=pid]struct WeightMiningCfg{ pid: u32, id: u32, hits: u32, count: u32, weight: u32, }
const isRateAward: String = "formula#(id:u32):bool#(id/100000|0) == 4";
const isWeightAward: String = "formula#(id:u32):bool#(id/100000|0) == 1";
const isAverageAward: String = "formula#(id:u32):bool#(id/100000|0) == 2";

#[db=memory,readonly=true,primary=id]struct AverageAwardCfg{ id: u32, prop: u32, min: u32, max: u32, count: u32, limit: u32, }

#[db=memory,readonly=true,primary=id]struct WeightAwardCfg{ id: u32, prop: u32, min: u32, max: u32, count: u32, limit: u32, weight: u32, }

#[db=memory,readonly=true,primary=id]struct RateAwardCfg{ id: u32, prop: u32, min: u32, max: u32, count: u32, rate: u32, }

#[db=memory,readonly=true,primary=id]struct STConvertCfg{ id: u32, num: u32, count: u32, name: str, value: str, desc: str, progress: str, tips: str, level: u8, }

#[db=memory,readonly=true,primary=id]struct RegularAwardCfg{ id: u32, prop: u32, num: u32, count: u32, desc: str, }

#[db=memory,readonly=true,primary=days]struct SeriesLoginAwardCfg{ days: u32, prop: u32, num: u32, count: u32, desc: str, }

#[db=memory,readonly=true,primary=id]struct InviteAwardCfg{ id: u32, prop: u32, num: u32, count: u32, desc: str, }

#[db=memory,readonly=true,primary=pid]struct AdAwardCfg{ pid: u32, prop: u32, num: u32, desc: str, }