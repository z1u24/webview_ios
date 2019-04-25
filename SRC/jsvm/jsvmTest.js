console.log("世界")
//----------------------分界线HTTP请求案例----------------------
//let task = JSVM.request();
//task.cancel(); // 取消当前请求，会有回调走fail
//----------------------分界线FMDB案例----------------------
//function create(tabName) {
//    JSVM.store.create(tabName,()=> {
//                      console.log("创建成功"+tabName)
//                      },(e)=> {
//                      console.log("创建失败"+tabName+","+e)
//                      },undefined)
//}
//function write(tabName,key,data) {
//    JSVM.store.write(tabName,key,data,()=> {
//                      console.log("写入成功"+tabName)
//                      },(e)=> {
//                      console.log("写入失败"+tabName+","+e)
//                      },undefined)
//}
//function read(tabName,key) {
//    JSVM.store.read(tabName,key,(data)=> {
//                      console.log("读取成功"+tabName+"数据="+data)
//                      },(e)=> {
//                      console.log("读取失败"+tabName+","+e)
//                      },undefined)
//}
//function remove(tabName,key) {
//    JSVM.store.remove(tabName,key,()=> {
//                      console.log("删除成功"+tabName)
//                      },(e)=> {
//                      console.log("删除失败"+tabName+","+e)
//                      },undefined)
//}
//
//function iterate(tabName) {
//    JSVM.store.iterate(tabName,(data)=> {
//                      console.log("获取全部表格成功"+tabName+"数据="+data)
//                      },(e)=> {
//                      console.log("获取全部表格失败"+tabName+","+e)
//                      },undefined)
//}
//
//function deleteTab(tabName) {
//    JSVM.store.delete(tabName,()=> {
//                      console.log("移除表格成功"+tabName)
//                      },(e)=> {
//                      console.log("移除表格失败"+tabName+","+e)
//                      },undefined)
//}
//
//
//let tabName = "Student"
//let key = "王大锤"
//let data = {"age": 18,"sex":"男"}
//let a =JSON.stringify(data)
////console.log("序列化String="+a)
//let c = JSON.parse(a)
////console.log("序列化对象="+c)
//
//let key1 = "子墨"
//let data1 = {"age": 38,"sex":"女"}
//let d = JSON.stringify(data1)
//
//// 正确使用时
//create(tabName)
//write(tabName,key,a)
//write(tabName,key1,d)
//read(tabName,key)
//iterate(tabName)
//remove(tabName,key)
//deleteTab(tabName)

// 错误使用时
//read(tabName,key)
//remove(tabName,key)
//deleteTab(tabName)

// 阻塞线程时候（仅仅在测试的时候打开）
//for(let i = 0;i<1000;i++){
//    create(tabName)
//    write(tabName,key,a)
//    read(tabName,key)
//    remove(tabName,key)
//}
//console.log("不影响其他线程执行")


//----------------------分界线Timer案例----------------------
//let a = 0;
//function testSetTimeout(input = 2000) {
//    let t = setTimeout(function() {
//                       a+=1
//                       console.log(a)
//                       },input);
//    clearTimeout(t);
//}
//testSetTimeout(1000);
//
//let b = 0;
//function testSetInterval(input = 2000) {
//    let t = setInterval(()=> {
//                        b+=1
//                        console.log(b)
//                        },input)
//    clearInterval(t)
//}
//testSetInterval(1000)

