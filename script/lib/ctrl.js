/**键盘控制管理器
 * 不断监听
 * 监听多键：g_Slot.on(g_Event.L_KEY_CTRL,(keys)=>{})
 * 监听按下
 * 
 * 
 * 状态监听？？？？？
 */
(() => {
    window.g_Ctrl = new class CCtrl {
        constructor() {
            this.lastEmpty = true;
            this._key = {};
            cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, (event) => {
                this.onKeyDown(event);
            });
            cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, (event) => {
                this.onkeyUp(event);
            });
            this.run();
        }
        clearKeys() {
            this._key = {};
        }
        doRun() {
            let keys = Object.keys(this._key);
            if (keys.length <= 0) {
                if (!this.lastEmpty) {
                    this.lastEmpty = true;
                } else {
                    return;
                }
            } else {
                this.lastEmpty = false;
            }
            g_Slot.emit(g_Event.L_KEY_CTRL, this._key);
            for (let key of keys) {
                this._key[key] = false;
            }
        }
        run() {
            setTimeout(() => {
                this.run();
                this.doRun();
            }, 50);
        }
        onKeyDown(event) {
            if (this._key[event.keyCode] == undefined) {
                this._key[event.keyCode] = true;
            }
        }
        onkeyUp(event) {
            if (this._key[event.keyCode] != undefined) {
                delete this._key[event.keyCode]
            }
        }
    }
})()