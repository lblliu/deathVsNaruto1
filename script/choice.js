
cc.Class({
    extends: cc.Component,

    properties: {

    },
    initIcon() {//初始化选角色的界面
        let prefabIconLayer = g_Res.getRes("prefabPanel", "iconLayer");
        this.iconLayer = cc.instantiate(prefabIconLayer);
        this.UILayer.addChild(this.iconLayer);
        this.iconContent = cc.find("view/content", this.iconLayer);
        for (let info in g_Table.tbRole) {
            let name = g_Table.tbRole[info].name;
            let sp = g_Res.getRes("roleIcon", name);
            let prefab = g_Res.getRes("prefabIcon", "roleIcon");
            let node = cc.instantiate(prefab);
            node.iconName = name;
            this.optionsList.push(node);
            this.iconContent.addChild(node);
            node.getComponent(cc.Sprite).spriteFrame = sp;
        }
        this.optionName = this.optionsList[0].iconName;
        this.optionsListNum = this.optionsList.length;
        let icon = this.optionsList[0].getChildByName("icon");
        icon.active = true;
    },
    onchoosRole() {//同步选角色的键盘
        let oldJ = this.oldOptionNumber % 4;
        this.oldOptionNumber = this.optionNumber;
        let Maxj = this.optionsListNum % 4;
        let MaxI = (this.optionsListNum - Maxj) / 4;
        if (this.keyCtrl & 1) {
            this.optionI -= 1;
        }
        if (this.keyCtrl & 2) {
            this.optionI += 1;
        }
        if (this.keyCtrl & 4) {
            this.optionJ -= 1;
        }
        if (this.keyCtrl & 8) {
            this.optionJ += 1;
        }
        if (this.optionsListNum / 4 == 0 || oldJ >= Maxj) {
            if (this.optionI < 0) {
                this.optionI = MaxI - 1;
            }
            if (this.optionI > MaxI - 1) {
                this.optionI = 0;
            }
        } else {
            if (this.optionI < 0) {
                this.optionI = MaxI;
            }
            if (this.optionI > MaxI) {
                this.optionI = 0;
            }
        }
        if (this.optionsListNum / 4 == 0 || this.optionI <= MaxI - 1) {
            if (this.optionJ < 0) {
                this.optionJ = 3;
            }
            if (this.optionJ > 3) {
                this.optionJ = 0;
            }
        } else {
            if (this.optionJ < 0) {
                this.optionJ = Maxj - 1;
            }
            if (this.optionJ > Maxj - 1) {
                this.optionJ = 0;
            }
        }
        this.optionNumber = this.optionI * 4 + this.optionJ;
        this.changeOption();
    },
    onSetOption() {//同步选取生命等按键
        this.oldTimeNum = this.timeNum;
        this.oldHpNum = this.hpNum;
        this.oldEnergyNum = this.energyNum;
        this.oldOptionNumber = this.optionNumber;
        let childrenList = this.optionsList[this.optionNumber].children;
        if (this.keyCtrl & 1) {
            this.optionNumber -= 1;//向上移动
        }
        if (this.keyCtrl & 2) {
            this.optionNumber += 1;
        }
        if (this.keyCtrl & 4) {
            if (this.optionName == "timeNum") {
                if (this.timeNum > 0) {
                    this.timeNum -= 1;
                }
            }
            if (this.optionName == "hpNum") {
                if (this.hpNum > 0) {
                    this.hpNum -= 1;
                }
            }
            if (this.optionName == "energyNum") {
                if (this.energyNum > 0) {
                    this.energyNum -= 1;
                }
            }
        }
        if (this.keyCtrl & 8) {
            if (this.optionName == "timeNum") {
                if (this.timeNum < childrenList.length - 1) {
                    this.timeNum += 1;
                }
            }
            if (this.optionName == "hpNum") {
                if (this.hpNum < childrenList.length - 1) {
                    this.hpNum += 1;
                }
            }
            if (this.optionName == "energyNum") {
                if (this.energyNum < childrenList.length - 1) {
                    this.energyNum += 1;
                }
            }
        }
        if (this.energyNum != this.oldEnergyNum) {
            this.changChild(childrenList, this.energyNum, this.oldEnergyNum);
        }
        if (this.hpNum != this.oldHpNum) {
            this.changChild(childrenList, this.hpNum, this.oldHpNum);
        }
        if (this.timeNum != this.oldTimeNum) {
            this.changChild(childrenList, this.timeNum, this.oldTimeNum);
        }
        if (this.optionNumber < 0) {
            this.optionNumber = this.optionsList.length - 1;
        }
        if (this.optionNumber > this.optionsList.length - 1) {
            this.optionNumber = 0;
        }
        this.changeSetOption();
    },
    onBgOption() {
        this.oldOptionNumber = this.optionNumber;
        if (this.keyCtrl & 4) {
            this.optionNumber -= 1;
        }
        if (this.keyCtrl & 8) {
            this.optionNumber += 1;
        }
        if (this.optionNumber < 0) {
            this.optionNumber = this.optionsList.length - 1;
        }
        if (this.optionNumber > this.optionsList.length - 1) {
            this.optionNumber = 0;
        }
        this.changeBGOption();
    },
    changeBGOption() {
        let tempNode1 = this.optionsList[this.oldOptionNumber];
        tempNode1.active = false;
        let tempNode2 = this.optionsList[this.optionNumber];
        tempNode2.active = true;
        this.optionName = tempNode2.name;
        this.bgName.string = this.bgNameList[this.optionNumber];
    },
    changChild(list, newNum, oldNum) {//改变子选项
        list[oldNum].active = false;
        list[newNum].active = true;
    },
    changeSetOption() {//改变选择项目
        let tempNode1 = this.optionsList[this.oldOptionNumber];
        tempNode1.scale = cc.v2(1, 1);
        let tempNode2 = this.optionsList[this.optionNumber];
        tempNode2.scale = cc.v2(this.scalePower, this.scalePower);
        this.optionName = tempNode2.name;
    },
    onSyncOperation() {//更新键盘
        if (!g_defind.player1) {//人物没有选择成功，进入
            this.onchoosRole();
            return;
        }
        if (g_defind.startGame == 1) {//选择游戏数据
            this.onSetOption();
            return;
        }
        if (g_defind.startGame == 2) {//选择地图
            this.onBgOption();
            return;
        }
    },
    judgeEnter() {//判断选中的选项
        switch (this.optionName) {
            case "narutoIcon":
                this.choosRole();
                break;
            case "sakuraIcon":
                this.choosRole();
                break;
            case "startLabel":
            case "timeNum":
            case "hpNum":
            case "energyNum":
                this.initbgChoice();
                break;
            case "bgNode":
            case "bgNode1":
            case "bgNode2":
            case "bgNode3":
            case "bgNode4":
                this.readyGame();
                break;
        }
    },
    readyGame() {//转入战斗场景，初始化战斗数据
        g_defind.startGame = 3;
        g_defind.chioseBg = this.optionName;
        cc.director.loadScene("game");
    },
    choosRole() {//选择角色
        if (!g_defind.player1) {
            g_defind.player1 = this.optionName;
            return;
        }
        if (!g_defind.player2) {
            g_defind.player2 = this.optionName;
            return;
        }
    },
    initbgChoice() {//初始化地图选择界面
        let initData = {
            hpNum: this.hpNum,
            timeNum: this.timeNum,
            energyNum: this.energyNum,
        };
        g_defind.initData = initData;
        g_defind.startGame = 2;
        this.setLayer.destroy();
        let prefab = g_Res.getRes("prefabPanel", "bgLayer");
        this.bgLayer = cc.instantiate(prefab);
        this.UILayer.addChild(this.bgLayer);
        this.initVariable();
        this.optionsList = this.bgLayer.getChildByName("bgAll").children;
        this.bgName = this.bgLayer.getChildByName("bgLabel").getComponent(cc.Label);
        this.optionName = this.optionsList[this.optionNumber].name;
    },
    initSetLayer() {//初始化时间血量等选择
        this.iconLayer.destroy();
        this.iconLayer = undefined;
        let prefabIconLayer = g_Res.getRes("prefabPanel", "setLayer");
        this.setLayer = cc.instantiate(prefabIconLayer);
        this.UILayer.addChild(this.setLayer);
        this.initVariable();//将变量还原
        this.optionsList = this.setLayer.getChildByName("chooseLayer").children;
        this.optionsList[this.optionNumber].scale = cc.v2(this.scalePower, this.scalePower);
        this.optionName = this.optionsList[this.optionNumber].name;
    },
    changeOption() {//显示下一个选择框，隐藏上一个
        let icon1 = this.optionsList[this.oldOptionNumber].getChildByName("icon");
        icon1.active = false;
        let icon2 = this.optionsList[this.optionNumber].getChildByName("icon");
        icon2.active = true;
        this.optionName = this.optionsList[this.optionNumber].iconName;
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
            case cc.macro.KEY.left:
                this.keyCtrl &= ~4;
                break;
            case cc.macro.KEY.right:
                this.keyCtrl &= ~8;
                break;
        }
    },
    onKeyDown(keyCode) {//按键按下
        switch (+keyCode) {
            case cc.macro.KEY.up:
                this.playerMusicEffect("click");
                this.keyCtrl |= 1;
                break;
            case cc.macro.KEY.down:
                this.playerMusicEffect("click");
                this.keyCtrl |= 2;
                break;
            case cc.macro.KEY.left:
                this.playerMusicEffect("click");
                this.keyCtrl |= 4;
                break;
            case cc.macro.KEY.right:
                this.playerMusicEffect("click");
                this.keyCtrl |= 8;
                break;
            case cc.macro.KEY.enter:
                this.playerMusicEffect("click");
                this.judgeEnter();
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
    initVariable() {//初始化变量
        this.bgNameList = g_defind.bgList;
        this.timeNum = 0;
        this.hpNum = 0;
        this.energyNum = 0;
        this.oldTimeNum = 0;
        this.oldHpNum = 0;
        this.oldEnergyNum = 0;
        this.keyCtrl = 0;
        this.oldKeyCtrl = 0;
        this.optionsListNum = 0;
        this.optionNumber = 0;
        this.oldOptionNumber = this.optionNumber;
        this.optionName = null;
        this.optionsList = [];
        this.keys = {};
        this.scalePower = 1.3;
    },
    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.keyC = g_Slot.on(g_Event.L_KEY_CTRL, (keys) => {
            this.onKeyCtrl(keys);
        });
    },

    start() {
        this.optionI = 0;
        this.optionJ = 0;
        this.UILayer = cc.find("Canvas/UILayer");
        this.initVariable();
        this.initIcon();
    },

    update(dt) {
        if (this.oldKeyCtrl != this.keyCtrl) {
            this.onSyncOperation();
            this.oldKeyCtrl = this.keyCtrl;
        }
        if (g_defind.player1 && this.iconLayer) {
            this.initSetLayer();
        }
    },
    onDestroy() {
        g_Slot.off(g_Event.L_KEY_CTRL, this.keyC);
        g_Ctrl.clearKeys();
    }
});
