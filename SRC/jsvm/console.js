
console.log = function(one,two,three,four){
    if (isConsole) {
        console.print(one,two,three,four);
    }
};


class WebSocket{
    constructor(url) {
        console.log(url);
        this.ws = WebSocketManger.getWebSocket(url);
    }
    
    send(sendData){
        if( typeof(sendData) == "string" ){
            this.ws.sendWithType(sendData,'string');
        }else{
            this.ws.sendWithType(self.base64js.fromByteArray(sendData),'bin');
        }
    }

    close(){
        this.ws.close();
    }

    set onopen(cb){
        this.ws.onopen = cb;
    }

    set onclose(cb){
        this.ws.onclose = cb;
    }

    set onerror(cb){
        this.ws.onerror = cb;
    }

    set onmessage(cb){
        var om = function (dic, type){
            if( typeof(type) == "string" ){
                cb(dic);
            }else{
                dic.data = self.base64js.toByteArray(dic.data);
                cb(dic);
            }
        }
        this.ws.onmessage = om;
    }

}
