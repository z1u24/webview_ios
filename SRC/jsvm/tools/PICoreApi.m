//
//  PICoreApi.m
//  WebViewPro
//
//  Created by yineng on 2019/7/23.
//  Copyright © 2019 kuplay. All rights reserved.
//

#import "PICoreApi.h"
#import "PIEth.h"

@implementation PICoreApi

- (instancetype)initWithJSContext:(JSContext *)runtime
{
    self = [super init];
    if (self) {
        PIEth *pe = [[PIEth alloc] init];
        [runtime evaluateScript:@"var api = {};"];
        [runtime evaluateScript:@"api.eth = {};"];
        [runtime evaluateScript:@"api.btc = {};"];
        [runtime evaluateScript:@"api.cipher = {};"];
        runtime[@"api"][@"eth"][@"eth_from_mnemonic"] = ^(JSValue *mneonic, JSValue *language){
            NSArray *result = [pe eth_from_mnemonic:mneonic.toString language:language.toString];
            return result;
        };
        
        runtime[@"api"][@"eth"][@"eth_generate"] = ^(JSValue *generate, JSValue *language){
            NSArray *result = [pe eth_generate:generate.toNumber language:language.toString];
            return result;
        };
        
        runtime[@"api"][@"eth"][@"eth_select_wallet"] = ^(JSValue *wallet, JSValue *master_seed, JSValue *index){
            NSArray *result = [pe eth_select_wallet:wallet.toString master_seed:master_seed.toString index:index.toNumber];
            return result;
        };
        
        runtime[@"api"][@"eth"][@"eth_sign_raw_transaction"] = ^(JSValue *transaction, JSValue *nonce, JSValue *to, JSValue *value, JSValue *gas, JSValue *gas_price, JSValue *data, JSValue *priv_key){
            NSArray *result = [pe eth_sign_raw_transaction:transaction.toNumber nonce:nonce.toString to:to.toString value:value.toString gas:gas.toString gas_price:gas_price.toString data:data.toString priv_key:priv_key.toString];
            return result;
        };
        
        runtime[@"api"][@"eth"][@"get_public_key_by_mnemonic"] = ^(JSValue *mneonic, JSValue *language){
            NSArray *result = [pe get_public_key_by_mnemonic:mneonic.toString language:language.toString];
            return result;
        };
        
        runtime[@"api"][@"eth"][@"token_balance_call_data"] = ^(JSValue *data){
            NSArray *result = [pe token_balance_call_data:data.toString];
            return result;
        };
        
        runtime[@"api"][@"eth"][@"token_transfer_call_data"] = ^(JSValue *data, JSValue *value){
            NSArray *result = [pe token_transfer_call_data:data.toString value:value.toString];
            return result;
        };
        
        runtime[@"api"][@"btc"][@"btc_build_raw_transaction_from_single_address"] = ^(JSValue *address, JSValue *priv_key, JSValue *input, JSValue *output){
            NSArray *result = [pe btc_build_raw_transaction_from_single_address:address.toString priv_key:priv_key.toString input:input.toString output:output.toString];
            return result;
        };
        runtime[@"api"][@"btc"][@"btc_from_mnemonic"] = ^(JSValue *mnemonic, JSValue *network, JSValue *language, JSValue *pass_phrase){
            NSArray *result = [pe btc_from_mnemonic:mnemonic.toString network:network.toString language:language.toString pass_phrase:pass_phrase.toString];
            return result;
        };
        runtime[@"api"][@"btc"][@"btc_from_seed"] = ^(JSValue *seed, JSValue *network, JSValue *language){
            NSArray *result = [pe btc_from_seed:seed.toString network:network.toString language:language.toString];
            return result;
        };
        runtime[@"api"][@"btc"][@"btc_generate"] = ^(JSValue *generate, JSValue *network, JSValue *language, JSValue *pass_phrase){
            NSArray *result = [pe btc_generate:generate.toNumber network:network.toString language:language.toString pass_phrase:pass_phrase.toString];
            return result;
        };
        runtime[@"api"][@"btc"][@"btc_private_key_of"] = ^(JSValue *key, JSValue *root_xpriv){
            NSArray *result = [pe btc_private_key_of:key.toNumber root_xpriv:root_xpriv.toString];
            return result;
        };
        runtime[@"api"][@"btc"][@"btc_to_address"] = ^(JSValue *address, JSValue *priv_key){
            NSArray *result = [pe btc_to_address:address.toString priv_key:priv_key.toString];
            return result;
        };
        runtime[@"api"][@"btc"][@"btc_build_pay_to_pub_key_hash"] = ^(JSValue *address){
            NSArray *result = [pe btc_build_pay_to_pub_key_hash:address.toString];
            return result;
        };
        runtime[@"api"][@"cipher"][@"rust_decrypt"] = ^(JSValue *key, JSValue *nonce, JSValue *aad, JSValue *cipher_text){
            NSArray *result = [pe rust_decrypt:key.toString nonce:nonce.toString aad:aad.toString cipher_text:cipher_text.toString];
            return result;
        };
        runtime[@"api"][@"cipher"][@"rust_encrypt"] = ^(JSValue *key, JSValue *nonce, JSValue *aad, JSValue *plain_text){
            NSArray *result = [pe rust_encrypt:key.toString nonce:nonce.toString aad:aad.toString plain_text:plain_text.toString];
            return result;
        };
        runtime[@"api"][@"cipher"][@"rust_sha256"] = ^(JSValue *data){
            NSArray *result = [pe rust_sha256:data.toString];
            return result;
        };
        runtime[@"api"][@"cipher"][@"rust_sign"] = ^(JSValue *priv_key, JSValue *msg){
            NSArray *result = [pe rust_sign:priv_key.toString msg:msg.toString];
            return result;
        };
    }
    return self;
}

@end
