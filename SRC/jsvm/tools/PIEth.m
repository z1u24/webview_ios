//
//  PIEth.m
//  WebViewPro
//
//  Created by yineng on 2019/7/23.
//  Copyright © 2019 kuplay. All rights reserved.
//

#import "PIEth.h"
#import "wrapper.h"

@implementation PIEth

-(NSArray *)eth_from_mnemonic:(NSString *)mnemonic language:(NSString *)language{
    char *address;
    char *priv_key;
    char *master_seed;
    int a = eth_from_mnemonic([mnemonic UTF8String], [language UTF8String], &address, &priv_key, &master_seed);
    NSString *add = @"";
    NSString *p_key = @"";
    NSString *m_seed = @"";
    NSNumber *code = [[NSNumber alloc] initWithInt:a];
    if(a == 0){
        add = [[NSString alloc] initWithUTF8String:address];
        p_key = [[NSString alloc] initWithUTF8String:priv_key];
        m_seed = [[NSString alloc] initWithUTF8String:master_seed];
        dealloc_rust_cstring(address);
        dealloc_rust_cstring(priv_key);
        dealloc_rust_cstring(master_seed);
    }
    return @[code,add,p_key,m_seed];
}

-(NSArray *)eth_generate:(NSNumber *)strength language:(NSString *)language{
    char *address;
    char *priv_key;
    char *master_seed;
    char *mnemonic;
    int a = eth_generate([strength intValue], [language UTF8String], &address, &priv_key, &master_seed, &mnemonic);
    NSNumber *code = [[NSNumber alloc] initWithInt:a];
    NSString *add = @"";
    NSString *p_key = @"";
    NSString *m_seed = @"";
    NSString *mne = @"";
    if(a == 0){
        add = [[NSString alloc] initWithUTF8String:address];
        p_key = [[NSString alloc] initWithUTF8String:priv_key];
        m_seed = [[NSString alloc] initWithUTF8String:master_seed];
        mne = [[NSString alloc] initWithUTF8String:mnemonic];
        dealloc_rust_cstring(address);
        dealloc_rust_cstring(priv_key);
        dealloc_rust_cstring(master_seed);
        dealloc_rust_cstring(mnemonic);
    }
    return @[code,add,p_key,m_seed,mne];
}

-(NSArray *)eth_select_wallet:(NSString *)language master_seed:(NSString *)master_seed index:(NSNumber *)index{
    char *address;
    char *priv_key;
    int a = eth_select_wallet([language UTF8String], [master_seed UTF8String], [index intValue], &address, &priv_key);
    NSNumber *code = [[NSNumber alloc] initWithInt:a];
    NSString *add = @"";
    NSString *p_key = @"";
    if(a == 0){
        add = [[NSString alloc] initWithUTF8String:address];
        p_key = [[NSString alloc] initWithUTF8String:priv_key];
        dealloc_rust_cstring(address);
        dealloc_rust_cstring(priv_key);
    }
    return @[code,add,p_key];
}

-(NSArray *)eth_sign_raw_transaction:(NSNumber *)chain_id nonce:(NSString *)nonce to:(NSString *)to value:(NSString *)value gas:(NSString *)gas gas_price:(NSString *)gas_price data:(NSString *)data priv_key:(NSString *)priv_key{
    char *tx_hash;
    char *serialized;
    int a = eth_sign_raw_transaction([chain_id intValue], [nonce UTF8String], [to UTF8String], [value UTF8String], [gas UTF8String], [gas_price UTF8String], [data UTF8String], [priv_key UTF8String], &tx_hash, &serialized);
    NSString *t_hash = @"";
    NSString *ser = @"";
    NSNumber *code = [[NSNumber alloc] initWithInt:a];
    if(a == 0){
        t_hash = [[NSString alloc] initWithUTF8String:tx_hash];
        ser = [[NSString alloc] initWithUTF8String:serialized];
        dealloc_rust_cstring(tx_hash);
        dealloc_rust_cstring(serialized);
    }
    return @[code,t_hash,ser];
}

-(NSArray *)get_public_key_by_mnemonic:(NSString *)mnemonic language:(NSString *)language{
    char *public_key;
    int a = get_public_key_by_mnemonic([mnemonic UTF8String], [language UTF8String], &public_key);
    NSNumber *code = [[NSNumber alloc] initWithInt:a];
    NSString *p_key = @"";
    if(a == 0){
        p_key = [[NSString alloc] initWithUTF8String:public_key];
        dealloc_rust_cstring(public_key);
    }
    return @[code,p_key];
}

-(NSArray *)token_balance_call_data:(NSString *)addr{
    char *balance = token_balance_call_data([addr UTF8String]);
    NSString *to = [[NSString alloc] initWithUTF8String:balance];
    dealloc_rust_cstring(balance);
    return @[to];
}

-(NSArray *)token_transfer_call_data:(NSString *)addr_to value:(NSString *)value{
    
    char *transfer = token_transfer_call_data([addr_to UTF8String], [value UTF8String]);
    NSString *to = [[NSString alloc] initWithUTF8String:transfer];
    dealloc_rust_cstring(transfer);
    return @[to];
}

-(NSArray *)btc_build_raw_transaction_from_single_address:(NSString *)address priv_key:(NSString *)priv_key input:(NSString *)input output:(NSString *)output{
    char *raw_tx;
    char *tx_hash;
    int a = btc_build_raw_transaction_from_single_address([address UTF8String], [priv_key UTF8String], [input UTF8String], [output UTF8String], &raw_tx, &tx_hash);
    NSNumber *code = [[NSNumber alloc] initWithInt:a];
    NSString *r_tx = @"";
    NSString *t_hash = @"";
    if (a == 0) {
        r_tx = [[NSString alloc] initWithUTF8String:raw_tx];
        t_hash = [[NSString alloc] initWithUTF8String:tx_hash];
        dealloc_rust_cstring(raw_tx);
        dealloc_rust_cstring(tx_hash);
    }
    return @[code,r_tx,t_hash];
}

-(NSArray *)btc_from_mnemonic:(NSString *)mnemonic network:(NSString *)network language:(NSString *)language pass_phrase:(NSString *)pass_phrase{
    char *root_xpriv;
    char *root_seed;
    int a = btc_from_mnemonic([mnemonic UTF8String], [network UTF8String], [language UTF8String], [pass_phrase UTF8String], &root_xpriv, &root_seed);
    NSNumber *code = [[NSNumber alloc] initWithInt:a];
    NSString *r_xpriv = @"";
    NSString *r_seed = @"";
    if (a == 0) {
        r_xpriv = [[NSString alloc] initWithUTF8String:root_xpriv];
        r_seed = [[NSString alloc] initWithUTF8String:root_seed];
        dealloc_rust_cstring(root_xpriv);
        dealloc_rust_cstring(root_seed);
    }
    return @[code,r_xpriv,r_seed];
}

-(NSArray *)btc_from_seed:(NSString *)seed network:(NSString *)network language:(NSString *)language{
    char *root_xpriv;
    int a = btc_from_seed([seed UTF8String], [network UTF8String], [language UTF8String], &root_xpriv);
    NSNumber *code = [[NSNumber alloc] initWithInt:a];
    NSString *r_xpriv = @"";
    if (a == 0) {
        r_xpriv = [[NSString alloc] initWithUTF8String:root_xpriv];
        dealloc_rust_cstring(root_xpriv);
    }
    return @[code,r_xpriv];
}

-(NSArray *)btc_generate:(NSNumber *)strength network:(NSString *)network language:(NSString *)language pass_phrase:(NSString *)pass_phrase{
    char *root_xpriv;
    char *mnemonic;
    int a = btc_generate([strength intValue], [network UTF8String], [language UTF8String], [pass_phrase UTF8String], &root_xpriv, &mnemonic);
    NSNumber *code = [[NSNumber alloc] initWithInt:a];
    NSString *r_xpriv = @"";
    NSString *mne = @"";
    if (a == 0) {
        r_xpriv = [[NSString alloc] initWithUTF8String:root_xpriv];
        mne = [[NSString alloc] initWithUTF8String:mnemonic];
        dealloc_rust_cstring(root_xpriv);
        dealloc_rust_cstring(mnemonic);
    }
    return @[code,r_xpriv,mne];
}

-(NSArray *)btc_private_key_of:(NSNumber *)index root_xpriv:(NSString *)root_xpriv{
    char *priv_key;
    int a = btc_private_key_of([index intValue], [root_xpriv UTF8String], &priv_key);
    NSNumber *code = [[NSNumber alloc] initWithInt:a];
    NSString *p_key = @"";
    if (a == 0) {
        p_key = [[NSString alloc] initWithUTF8String:priv_key];
        dealloc_rust_cstring(priv_key);
    }
    return @[code,p_key];
}

-(NSArray *)btc_to_address:(NSString *)network priv_key:(NSString *)priv_key{
    char *address;
    int a = btc_to_address([network UTF8String], [priv_key UTF8String], &address);
    NSNumber *code = [[NSNumber alloc] initWithInt:a];
    NSString *add = @"";
    if (a == 0) {
        add = [[NSString alloc] initWithUTF8String:address];
        dealloc_rust_cstring(address);
    }
    return @[code,add];
}

-(NSArray *)btc_build_pay_to_pub_key_hash:(NSString *)address{
    char *script_pubkey;
    int a = btc_build_pay_to_pub_key_hash([address UTF8String], &script_pubkey);
    NSNumber *code = [[NSNumber alloc] initWithInt:a];
    NSString *s_pubkey = @"";
    if (a == 0) {
        s_pubkey = [[NSString alloc] initWithUTF8String:script_pubkey];
        dealloc_rust_cstring(script_pubkey);
    }
    return @[code,s_pubkey];
}

-(NSArray *)rust_decrypt:(NSString *)key nonce:(NSString *)nonce aad:(NSString *)aad cipher_text:(NSString *)cipher_text{
    char *out_plain_text;
    if(aad == nil) aad = @"";
    int a = rust_decrypt([key UTF8String], [nonce UTF8String], [aad UTF8String], [cipher_text UTF8String], &out_plain_text);
    NSNumber *code = [[NSNumber alloc] initWithInt:a];
    NSString *o_p_t = @"";
    if (a == 0) {
        o_p_t = [[NSString alloc] initWithUTF8String:out_plain_text];
        dealloc_rust_cstring(out_plain_text);
    }
    return @[code,o_p_t];
}

-(NSArray *)rust_encrypt:(NSString *)key nonce:(NSString *)nonce aad:(NSString *)aad plain_text:(NSString *)plain_text{
    char *out_cipher_text;
    int a = rust_encrypt([key UTF8String], [nonce UTF8String], [aad UTF8String], [plain_text UTF8String], &out_cipher_text);
    NSNumber *code = [[NSNumber alloc] initWithInt:a];
    NSString *o_c_t = @"";
    if (a == 0) {
        o_c_t = [[NSString alloc] initWithUTF8String:out_cipher_text];
        dealloc_rust_cstring(out_cipher_text);
    }
    return @[code,o_c_t];
}

-(NSArray *)rust_sha256:(NSString *)data{
    char *hash;
    int a = rust_sha256([data UTF8String],&hash);
    NSNumber *code = [[NSNumber alloc] initWithInt:a];
    NSString *h = @"";
    if (a == 0) {
        h = [[NSString alloc] initWithUTF8String:hash];
        dealloc_rust_cstring(hash);
    }
    return @[code,h];
}

-(NSArray *)rust_sign:(NSString *)priv_key msg:(NSString *)msg{
    char *signature;
    int a = rust_sign([priv_key UTF8String], [msg UTF8String], &signature);
    NSNumber *code = [[NSNumber alloc] initWithInt:a];
    NSString *sign = @"";
    if (a == 0) {
        sign = [[NSString alloc] initWithUTF8String:signature];
        dealloc_rust_cstring(signature);
    }
    return @[code,sign];
}

@end
