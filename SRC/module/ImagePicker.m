//
//  ImagePicker.m
//  WebViewPro
//
//  Created by Apple on 2018/8/22.
//  Copyright © 2018年 kupay. All rights reserved.
//
#import "ImagePicker.h"

@interface ImagePicker () <TZImagePickerControllerDelegate>

@end

@implementation ImagePicker{
    CallJS selCallJS;
    bool onlyOne;
}

- (instancetype)init
{
    self = [super init];
    if (self) {
        onlyOne = false;
    }
    return self;
}

- (void)chooseImage:(NSNumber *)useCamera single:(NSNumber *)single max:(NSNumber *)max callJS:(CallJS)callJS{
    selCallJS = callJS;
    int maxCount = 1;
    if (1 != [single intValue]) maxCount = [max intValue];//设置最大可选的张数(只有当single 不等于 1 的时候才会生效)
    onlyOne = 1 == maxCount;
    TZImagePickerController *imagePickerVc = [[TZImagePickerController alloc] initWithMaxImagesCount:maxCount delegate:self];
    imagePickerVc.allowTakePicture = 1 == [useCamera intValue];//设置是否可以拍照
    //不允许选择视频、录制视频
    imagePickerVc.allowPickingOriginalPhoto = NO;
    imagePickerVc.allowTakeVideo = NO;
    imagePickerVc.allowPickingVideo = NO;
    imagePickerVc.allowPickingMultipleVideo = NO;
    [[BaseObject getVc] presentViewController:imagePickerVc animated:YES completion:nil];
}

#pragma mark - UIImagePickerController Delegate
///
- (BOOL)isAssetCanSelect:(id)asset{
    PHAsset *phAsset = (PHAsset *)asset;
    if ([[phAsset valueForKey:@"filename"] hasSuffix:@"GIF"]) {
        return NO;
    }
    return YES;
}

///拍照、选视频图片、录像 后的回调（这种方式选择视频时，会自动压缩，但是很耗时间）
- (void)imagePickerController:(UIImagePickerController *)picker didFinishPickingMediaWithInfo:(NSDictionary<NSString *, id> *)info {
    selCallJS(Success,@[@"图片已经选择了"]);
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
    NSLog(@"123");
    if (nil == photos || 0 == [photos count]) {
        selCallJS(Fail,@[@"选择图片失败"]);
    } else {
        if (onlyOne) {
            //非原图舍弃
//            UIImage *image = photos[0];
//            [ImageUtils getImageColorArray:image];
            
            TZImageManager *imageManager = [TZImageManager manager];
            [imageManager getOriginalPhotoWithAsset:assets[0] completion:^(UIImage *photo, NSDictionary *info) {
                NSString *width = [NSString stringWithFormat:@"%d",[ImageUtils getImageWidth:photo]];
                NSString *height = [NSString stringWithFormat:@"%d",[ImageUtils getImageHeight:photo]];
                NSString *result = [ImageUtils image2base64:photo];
                NSString *base64 = [NSString stringWithFormat:@"%s%@", "data:image/png;base64,", result];
                //1，保存图片到内存。 Documents/selected.png
                NSLog(@"%@  %@",width,height);
                NSString *docPath = [NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES) lastObject];
                docPath = [docPath stringByAppendingString:@"/selectes.png"];
                [UIImagePNGRepresentation(photo) writeToFile:docPath atomically:YES];
                docPath = [@"file://" stringByAppendingString:docPath];
                self->selCallJS(Success,@[width, height, base64]);
            }];
            
        }
    }
}


- (void)getContent:(NSNumber *)quality callJS:(CallJS)callJS{
    
    NSString *docPath = [NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES) lastObject];
    docPath = [docPath stringByAppendingString:@"/selectes.png"];
    UIImage *image = [UIImage imageWithContentsOfFile:docPath];
    NSData *dataImage = UIImageJPEGRepresentation(image, quality.floatValue/100.00);
    NSString *base64 = [dataImage base64EncodedStringWithOptions:NSDataBase64EncodingEndLineWithLineFeed];
    callJS(Success,@[base64]);
}

- (void)getAHash:(CallJS)callJS{
    NSString *docPath = [NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES) lastObject];
    docPath = [docPath stringByAppendingString:@"/selectes.png"];
    UIImage *image = [UIImage imageWithContentsOfFile:docPath];
    NSString *ahash = [NSString stringWithUTF8String:[ImageUtils getAhash:image]];
    callJS(Success,@[ahash]);
    
}

- (void)tz_imagePickerControllerDidCancel:(TZImagePickerController *)picker {
    selCallJS(Fail,@[@"用户选择了取消!!"]);
}

@end
