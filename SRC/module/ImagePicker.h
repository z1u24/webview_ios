//
//  ImagePicker.h
//  WebViewPro
//
//  Created by Apple on 2018/8/22.
//  Copyright © 2018年 kupay. All rights reserved.
//

#ifndef ImagePicker_h
#define ImagePicker_h

#import <UIKit/UIKit.h>
#import <Foundation/Foundation.h>
#import "TZImagePickerController.h"
#import "BaseObject.h"
#import "ImageUtils.h"



@interface ImagePicker : BaseObject

- (void)chooseImage:(NSNumber *)useCamera single:(NSNumber *)single max:(NSNumber *)max callJS:(CallJS)callJS;

- (void)getContent:(CallJS)callJS;

- (void)getAHash:(CallJS)callJS;

@end


#endif /* ImagePicker_h */
