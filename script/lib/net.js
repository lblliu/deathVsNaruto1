(() => {
    window.g_Net = new class CNet {
        constructor() {
            this.url = null;
            this._uid = null;
            this.app = null;
        }
        set uid(val) {
            this._uid = val;
        }
        get uid() {
            return this._uid;
        }
        doConnect(url) {
            this.app = new WebSocket(url);
            this.app.onopen = () => {//长连接成功之后调用

            }
            this.app.onerror = () => {//长连接出错调用

            }
            this.app.onclose = () => {//长连接关闭时掉用

            }
            this.app.onmessage = (event) => {//服务器发过来的数据event.data
                this.onMessage(JSON.parse(event.data));
            }
        }
        send(data) {
            this.app.send(JSON.stringify(data));
        }
        onMessage(data) {
            g_Slot.emit(data.key, data);
        }
        httpRequest(url, data, cb, isParse = true) {
            let xhr = cc.loader.getXMLHttpRequest();
            if (!data) {//判断是否存在data
                xhr.open("GET", null);
            } else {
                xhr.open("GET", url + "?data=" + JSON.stringify(data));
            }
            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        if (isParse) {
                            cb(JSON.parse(xhr.responseText));
                        } else {
                            cb(xhr.responseText);
                        }
                    } else {
                        cb(null);
                    }
                }
            }
            xhr.send();
        }
    }
})()