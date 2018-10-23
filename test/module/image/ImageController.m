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
    BOOL crop = NO;
    UIAlertController *alertVC = [UIAlertController alertControllerWithTitle:@"选择照片" message:@"请选择您的照片来源" preferredStyle:UIAlertControllerStyleActionSheet];
    UIAlertAction *cancelAction = [UIAlertAction actionWithTitle:@"取消" style:UIAlertActionStyleCancel handler:nil];
    UIAlertAction *aAction = [UIAlertAction actionWithTitle:@"相册" style:UIAlertActionStyleDefault handler:^(UIAlertAction *action) {
        NSLog(@"相册");
        UIImagePickerController *controller = [[UIImagePickerController alloc] init];
        controller.delegate = self;
        controller.allowsEditing = crop;
        controller.sourceType = UIImagePickerControllerSourceTypePhotoLibrary;
        [[BaseObject getVc] presentViewController:controller animated:YES completion:nil];
    }];
    [alertVC addAction:cancelAction];
    [alertVC addAction:aAction];
    if ([UIImagePickerController isSourceTypeAvailable:UIImagePickerControllerSourceTypeCamera]) {
        UIAlertAction *bAction = [UIAlertAction actionWithTitle:@"拍照" style:UIAlertActionStyleDestructive handler:^(UIAlertAction *action) {
            NSLog(@"拍照");
            UIImagePickerController *controller = [[UIImagePickerController alloc] init];
            controller.delegate = self;
            controller.allowsEditing = crop;
            controller.sourceType = UIImagePickerControllerSourceTypeCamera;
            [[BaseObject getVc] presentViewController:controller animated:YES completion:nil];
        }];
        [alertVC addAction:bAction];
    }
    [[BaseObject getVc] presentViewController:alertVC animated:YES completion:nil];
}

- (void)imagePickerController:(UIImagePickerController *)picker didFinishPickingImage:(UIImage *)image editingInfo:(nullable NSDictionary<NSString *, id> *)editingInfo {
}

- (void)imagePickerController:(UIImagePickerController *)picker didFinishPickingMediaWithInfo:(NSDictionary<NSString *, id> *)info {
    NSLog(@"调用了 didFinishPickingMediaWithInfo");
    [picker dismissViewControllerAnimated:NO completion:^{
        UIImage *image = info[UIImagePickerControllerOriginalImage];
        [ImageUtils getImageColorArray:image];
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
