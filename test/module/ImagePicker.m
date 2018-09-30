//
//  ImagePicker.m
//  WebViewPro
//
//  Created by Apple on 2018/8/22.
//  Copyright © 2018年 kupay. All rights reserved.
//
#import "ImagePicker.h"
#import "TZImagePickerController.h"

@interface ImagePicker()<TZImagePickerControllerDelegate>

@end

@implementation ImagePicker
int callbackId;
bool onlyOne = false;
- (void) chooseImage:(NSArray *) array{
    callbackId = [[array objectAtIndex:0] intValue];//回调的Id
    int useCamera=[[array objectAtIndex:1] intValue];//是否启用相机
    int single=[[array objectAtIndex:2] intValue];//是否为单选(只能选择一张)
    int max=[[array objectAtIndex:3] intValue];//最大可选择的张数(当single为1时、此参数无效！)
    int maxCount=1;
    if (1 != single) maxCount = max;//设置最大可选的张数(只有当single 不等于 1 的时候才会生效)
    onlyOne = 1 == maxCount;
    TZImagePickerController *imagePickerVc = [[TZImagePickerController alloc] initWithMaxImagesCount:maxCount delegate:self];
    imagePickerVc.allowTakePicture = 1 == useCamera;//设置是否可以拍照
    //照片就是照片、不允许选择视频、拍照什么的~
    imagePickerVc.allowTakeVideo = NO;
    imagePickerVc.allowPickingVideo = NO;
    imagePickerVc.allowPickingMultipleVideo = NO;
    [[BaseObject getVc] presentViewController:imagePickerVc animated:YES completion:nil];
}

#pragma mark - UIImagePickerController Delegate

///拍照、选视频图片、录像 后的回调（这种方式选择视频时，会自动压缩，但是很耗时间）
- (void)imagePickerController:(UIImagePickerController *)picker didFinishPickingMediaWithInfo:(NSDictionary<NSString *,id> *)info {
    [JSBundle callJS:[NSNumber numberWithInt:callbackId] code:0 params:[NSArray arrayWithObjects: @"图片已经选择了",nil]];
}

// The picker should dismiss itself; when it dismissed these handle will be called.
// If isOriginalPhoto is YES, user picked the original photo.
// You can get original photo with asset, by the method [[TZImageManager manager] getOriginalPhotoWithAsset:completion:].
// The UIImage Object in photos default width is 828px, you can set it by photoWidth property.
// 这个照片选择器会自己dismiss，当选择器dismiss的时候，会执行下面的代理方法
// 如果isSelectOriginalPhoto为YES，表明用户选择了原图
// 你可以通过一个asset获得原图，通过这个方法：[[TZImageManager manager] getOriginalPhotoWithAsset:completion:]
// photos数组里的UIImage对象，默认是828像素宽，你可以通过设置photoWidth属性的值来改变它
- (void)imagePickerController:(TZImagePickerController *)picker didFinishPickingPhotos:(NSArray<UIImage *> *)photos sourceAssets:(NSArray *)assets isSelectOriginalPhoto:(BOOL)isSelectOriginalPhoto infos:(NSArray<NSDictionary *> *)infos {
    if (nil == photos || 0 == [photos count]) {
        [JSBundle callJS:[NSNumber numberWithInt:callbackId] code:1 params:[NSArray arrayWithObjects: @"选择图片失败",nil]];
    }else{
        if (onlyOne) {
            UIImage *image = [photos objectAtIndex:0];
            NSString *result = [ImageUtils image2base64:image];
            NSString *base64 = [NSString stringWithFormat:@"%s%@","data:image/png;base64,",result];
            [JSBundle callJS:[NSNumber numberWithInt:callbackId] code:0 params:[NSArray arrayWithObjects: @"600",@"600",base64,nil]];
        }
    }
}

- (void) tz_imagePickerControllerDidCancel:(TZImagePickerController *)picker{
    [JSBundle callJS:[NSNumber numberWithInt:callbackId] code:1 params:[NSArray arrayWithObjects: @"用户选择了取消!!",nil]];
}

@end
