
cc.Class({
    extends: cc.Component,

    properties: {

    },
    onSyncOperation() {//更新键盘
        this.oldOptionNumber = this.optionNumber;
        if (this.keyCtrl & 1) {
            this.optionNumber -= 1;
        }
        if (this.keyCtrl & 2) {
            this.optionNumber += 1;
        }
        if (this.optionNumber < 0) {
            this.optionNumber = this.optionsList.length - 1;
        }
        if (this.optionNumber > this.optionsList.length - 1) {
            this.optionNumber = 0;
        }
        this.changeOption();
    },
    judgeEnter() {//判断选中的选项
        switch (this.optionName) {
            case "practiceLabel":
                cc.log("单机游戏");
                g_defind.camera = false;
                g_defind.pattern = "practiceLabel";
                cc.director.loadScene("game");
                break;
            case "doubleGame":
                cc.log("双人游戏");
                g_defind.pattern = "doubleGame";
                cc.director.loadScene("choice");
                break;
            case "helpNode":
                cc.log("帮助");
                let prefab = g_Res.getRes("prefabBook", "bookLayer");
                this.Booknode = cc.instantiate(prefab);
                this.UILayer.addChild(this.Booknode);
                break;
        }
    },
    destroyBook() {
        if (this.Booknode) {
            let action = cc.sequence(
                cc.fadeOut(0.5),
                cc.callFunc(() => {
                    this.Booknode.destroy();
                })
            );
            this.Booknode.runAction(action);
        };
    },
    changeOption() {
        let tempNode1 = this.optionsList[this.oldOptionNumber];
        tempNode1.scale = cc.v2(1, 1);
        let tempNode2 = this.optionsList[this.optionNumber];
        tempNode2.scale = cc.v2(this.scalePower, this.scalePower);
        this.optionName = tempNode2.name;
    },
    playerMusicEffect(name) {
        let prefab = g_Res.getRes("audio", name);
        cc.audioEngine.playEffect(prefab);
    },
    onKeyUp(keyCode) {//按键抬起
        switch (+keyCode) {
            case cc.macro.KEY.up:
                this.keyCtrl &= ~1;
                break;
            case cc.macro.KEY.down:
                this.keyCtrl &= ~2;
                break;
        }
    },
    onKeyDown(keyCode) {//按键按下
        switch (+keyCode) {
            case cc.macro.KEY.up:
                this.keyCtrl |= 1;
                this.playerMusicEffect("click");
                break;
            case cc.macro.KEY.down:
                this.playerMusicEffect("click");
                this.keyCtrl |= 2;
                break;
            case cc.macro.KEY.enter:
                this.playerMusicEffect("click");
                this.judgeEnter();
                break;
            case cc.macro.KEY.escape:
                this.playerMusicEffect("click");
                this.destroyBook();
                break;
        }
    },

    onKeyCtrl(keys) {//监听键盘管理器的消息
        let tempKeys = JSON.parse(JSON.stringify(keys));
        for (let keyCode in keys) {
            if (this.keys[keyCode] != undefined) {
                delete this.keys[keyCode];
            }
            if (keys[keyCode]) {
                this.onKeyDown(keyCode);//按一次
            }
        }
        for (let delKey in this.keys) {
            this.onKeyUp(delKey);
        }
        this.keys = tempKeys;
    },
    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.keyC = g_Slot.on(g_Event.L_KEY_CTRL, (keys) => {
            this.onKeyCtrl(keys);
        });
    },

    start() {
        let prefab = g_Res.getRes("audio", "BGM");
        cc.audioEngine.playMusic(prefab, loop = true);
        this.keyCtrl = 0;
        this.oldKeyCtrl = 0;
        this.scalePower = 1.3;
        this.optionNumber = 0;
        this.keys = {};
        this.oldOptionNumber = this.optionNumber;
        this.optionName = null;
        this.optionsList = [];
        this.UILayer = cc.find("Canvas/UILayer");
        this.optionsList = cc.find("Canvas/options").children;
        this.optionsList[this.optionNumber].scale = cc.v2(this.scalePower, this.scalePower);
        this.optionName = this.optionsList[this.optionNumber].name;
    },

    update(dt) {
        if (this.oldKeyCtrl != this.keyCtrl) {
            this.onSyncOperation();
            this.oldKeyCtrl = this.keyCtrl;
        }
    },
    onDestroy() {
        g_Slot.off(g_Event.L_KEY_CTRL, this.keyC);
        g_Ctrl.clearKeys();
    }
});
