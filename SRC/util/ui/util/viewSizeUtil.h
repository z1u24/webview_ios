//
//  viewSizeUtil.h
//  UI
//
//  Created by yineng on 2019/5/10.
//  Copyright © 2019 com.z1u24. All rights reserved.
//

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@interface viewSizeUtil : NSObject

-(float)getHeightSize;
-(float)getWidthSize;
-(CGRect)makeFrame:(CGRect)frame;
-(CGRect)makeBackFrame:(CGRect)frame;
- (BOOL)isNotchScreen;
@end

NS_ASSUME_NONNULL_END
