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
#import "ImageController.h"
#import "TZImagePickerController.h"
#import "BaseObject.h"
#import "ImageUtils.h"

@interface ImagePicker : BaseObject

- (void)chooseImage:(NSArray *)array;

@end


#endif /* ImagePicker_h */
