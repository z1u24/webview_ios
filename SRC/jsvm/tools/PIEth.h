//
//  PIEth.h
//  WebViewPro
//
//  Created by yineng on 2019/7/23.
//  Copyright © 2019 kuplay. All rights reserved.
//

#import <Foundation/Foundation.h>


@interface PIEth : NSObject

-(NSArray *)eth_from_mnemonic:(NSString *)mnemonic language:(NSString *)language;

-(NSArray *)eth_generate:(NSNumber *)strength language:(NSString *)language;

-(NSArray *)eth_select_wallet:(NSString *)language master_seed:(NSString *)master_seed index:(NSNumber *)index;

-(NSArray *)eth_sign_raw_transaction:(NSNumber *)chain_id nonce:(NSString *)nonce to:(NSString *)to value:(NSString *)value gas:(NSString *)gas gas_price:(NSString *)gas_price data:(NSString *)data priv_key:(NSString *)priv_key;

-(NSArray *)get_public_key_by_mnemonic:(NSString *)mnemonic language:(NSString *)language;

-(NSArray *)token_balance_call_data:(NSString *)addr;

-(NSArray *)token_transfer_call_data:(NSString *)addr_to value:(NSString *)value;

-(NSArray *)btc_build_raw_transaction_from_single_address:(NSString *)address priv_key:(NSString *)priv_key input:(NSString *)input output:(NSString *)output;

-(NSArray *)btc_from_mnemonic:(NSString *)mnemonic network:(NSString *)network language:(NSString *)language pass_phrase:(NSString *)pass_phrase;

-(NSArray *)btc_from_seed:(NSString *)seed network:(NSString *)network language:(NSString *)language;

-(NSArray *)btc_generate:(NSNumber *)strength network:(NSString *)network language:(NSString *)language pass_phrase:(NSString *)pass_phrase;

-(NSArray *)btc_private_key_of:(NSNumber *)index root_xpriv:(NSString *)root_xpriv;

-(NSArray *)btc_to_address:(NSString *)network priv_key:(NSString *)priv_key;

-(NSArray *)btc_build_pay_to_pub_key_hash:(NSString *)address;

-(NSArray *)rust_decrypt:(NSString *)key nonce:(NSString *)nonce aad:(NSString *)aad cipher_text:(NSString *)cipher_text;

-(NSArray *)rust_encrypt:(NSString *)key nonce:(NSString *)nonce aad:(NSString *)aad plain_text:(NSString *)plain_text;

-(NSArray *)rust_sha256:(NSString *)data;

-(NSArray *)rust_sign:(NSString *)priv_key msg:(NSString *)msg;

@end

