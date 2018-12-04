//
//  VersionManager.h
//  WebViewPro
//
//  Created by yineng on 2018/12/3.
//  Copyright © 2018 kuplay. All rights reserved.
//

#import "BaseObject.h"

NS_ASSUME_NONNULL_BEGIN

@interface VersionManager : BaseObject

- (void)getVersionId:(NSArray *)array;

- (void)appUpdate:(NSArray *)array;

@end

NS_ASSUME_NONNULL_END
