//
//  JSBundle.swift
//  tbsWebView
//
//  Created by Apple on 17/9/1.
//  Copyright © 2017年 Ganchu. All rights reserved.
//

import UIKit

//MARK: callJS的状态
enum callJSType:Int{
    case Success = 0
    case Fail = 1
    case Callback = 100
}

class JSBundle: NSObject {
    
    var nameArray:[String:Any] = [:]
    
    static var id = 0;
    
    static var dictionary:[Int:Any] = [Int:Any]()
    
    //MARK: 初始化对象并添加到字典中
    func initImpl(_ classType: NSObject.Type,_ array:Array<Any> )  {
        let obj = classType.init()
        let listenerId = array[0] as! Int
        JSBundle.id += 1
        JSBundle.dictionary.updateValue(obj, forKey: JSBundle.id)
        JSBundle.callJS(listenerId,callJSType.Success,JSBundle.id)
    }
    
    //MARK: 收到JS的消息，做分发
    func sendMessage(_ json:Any) {
        var array = json as! Array<Any>
        let arrayClassName = array[0] as! String
        let funcName = array[1] as! String
        let nativeID = array[2] as! Int
        array.removeFirst(3)
        
        guard let stringFromClassName = nameArray["\(arrayClassName)"]  else {
            print("JSBunldleError = class名字错误")
            return
        }
        
        let className = NSStringFromClass(stringFromClassName as! AnyClass)
        guard  let classType = NSClassFromString(className) as? NSObject.Type else {
            print("JSBunldleError = class实例化失败")
            return
        }
        
        if nativeID == 0 {
            if funcName == "init" {
                initImpl(classType,array)
            }else {
                classType.perform(NSSelectorFromString("\(funcName):"), with: array)
            }
        }else {
            
            if funcName == "close" {
                JSBundle.dictionary.removeValue(forKey: nativeID)
                return
            }
            // 寻找hash表对象
            guard let cls = JSBundle.dictionary[nativeID] as? NSObject else {
                print("JSBunldleError = cls取值为空")
                return
            }
            if cls.responds(to: NSSelectorFromString("\(funcName):")) {
                cls.perform(NSSelectorFromString("\(funcName):"), with: array)
            }else {
                JSBundle.callJSError(arrayClassName, funcName, "")
            }
        }
    }
    
    // MARK: 封装callJS方法。
    class func callJS(_ id: Any,_ code: callJSType, _ params:Any...)  {
        var sinfo = "window['handle_Native_Message'](\(id),\(code.rawValue),"
        var p = [Any]()
        if let y = params[0] as? Array<Any> {
            p = y
        }else {
            p = params
        }
        for i in p {
            if let j = i as? String {
                sinfo.append("'\(j)',")
            } else {
                sinfo.append("\(i),")
            }
        }
        sinfo.remove(at: sinfo.index(before: sinfo.endIndex))
        sinfo.append(")")

        ViewController.webView.evaluateJavaScript(sinfo) { (item, error) in
            if error != nil {
                print(error as Any)
            }
        }
    }
    // MARK: 封装向js抛出错误的方法
    class func callJSError(_ arrayClassName:String,_ funcName:String,_ msg:String) {
        print("开始抛出error")
        ViewController.webView.evaluateJavaScript("window['handle_Native_ThrowError']('\(arrayClassName)','\(funcName)','ios没有这个方法msg=\(msg)')") { (item, error) in
            if error != nil {
                print("item=\(item),error=\(error)")
            }
        }
    }
}
