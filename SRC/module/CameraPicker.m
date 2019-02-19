//
//  cameraPicker.m
//  WebViewPro
//
//  Created by yineng on 2018/12/29.
//  Copyright © 2018 kuplay. All rights reserved.
//

#import "CameraPicker.h"
#import "ImageUtils.h"

@interface CameraPicker() <UIImagePickerControllerDelegate, UINavigationControllerDelegate>

@end

@implementation CameraPicker{
    CallJS selCallJS;
}

-(void)takePhoto:(CallJS)callJS{
    selCallJS = callJS;
    BOOL isCamera = [UIImagePickerController isCameraDeviceAvailable:UIImagePickerControllerCameraDeviceRear] && [UIImagePickerController isCameraDeviceAvailable:UIImagePickerControllerCameraDeviceFront];
    if (!isCamera) {
        NSLog(@"没有摄像头");
        return;
    }
    UIImagePickerController *controller = [[UIImagePickerController alloc] init];
    controller.delegate = self;
    controller.allowsEditing = YES;
    controller.sourceType = UIImagePickerControllerSourceTypeCamera;
    [[BaseObject getVc] presentViewController:controller animated:YES completion:nil];
}

- (void)imagePickerController:(UIImagePickerController *)picker didFinishPickingMediaWithInfo:(NSDictionary<UIImagePickerControllerInfoKey,id> *)info{
    [picker dismissViewControllerAnimated:YES completion:^{
        UIImage *image = [info objectForKey:UIImagePickerControllerOriginalImage];
        NSString *base64 = [ImageUtils image2base64:image];
        self->selCallJS(Success,@[base64]);
    }];
    
}

@end
