//
//  ImageController.m
//  WebViewPro
//
//  Created by Apple on 2018/10/18.
//  Copyright © 2018年 kupay. All rights reserved.
//

#import "ImageController.h"

@interface ImageController () <UIImagePickerControllerDelegate, UINavigationControllerDelegate>
@end

@implementation ImageController

- (void)startSelectImage {
    //判断摄像头是否可用
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



- (void)imagePickerController:(UIImagePickerController *)picker didFinishPickingMediaWithInfo:(NSDictionary<NSString *, id> *)info {
    NSLog(@"调用了 didFinishPickingMediaWithInfo");
    [picker dismissViewControllerAnimated:NO completion:^{
        //UIImage *image = info[UIImagePickerControllerOriginalImage];
        //[ImageUtils getImageColorArray:image];
    }];
}

- (void)imagePickerControllerDidCancel:(UIImagePickerController *)picker {
    NSLog(@"没有操作、用户选择了取消");
}

- (void)saveImage:(UIImage *)image :IntoGallery {
    UIImageWriteToSavedPhotosAlbum(image, self, @selector(saveImageSuccess), nil);
}

- (void)saveImageSuccess {
    NSLog(@"saveImageSuccess");
}

@end
