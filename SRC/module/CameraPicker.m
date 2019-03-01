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
    __block UIImage *image;
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
        self->image = [info objectForKey:UIImagePickerControllerOriginalImage];
        NSData *dataImage = UIImageJPEGRepresentation(self->image, 0.7);
        NSString *result = [dataImage base64EncodedStringWithOptions:NSDataBase64EncodingEndLineWithLineFeed];
        //NSString *base64 = [NSString stringWithFormat:@"%s%@", "data:image/png;base64,", result];
        self->selCallJS(Success,@[result]);
    }];
}

-(void)getContent:(NSNumber *)quality callJS:(CallJS)callJS{
    NSData *dataImage = UIImageJPEGRepresentation(self->image, quality.floatValue/100.00);
    NSString *base64 = [dataImage base64EncodedStringWithOptions:NSDataBase64EncodingEndLineWithLineFeed];
    self->selCallJS(Success,@[base64]);
}


@end
