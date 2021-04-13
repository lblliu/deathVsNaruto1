
cc.Class({
    extends: cc.Component,

    properties: {

    },
    initGame() {
        let bgName = g_defind.chioseBg;
        if (g_defind.chioseBg == "bgNode") {
            bgName = bgName + Math.floor(Math.random() * 4 + 1);
        }
        let tempName = "gameBGM" + bgName[bgName.length - 1];
        let tempAutio = g_Res.getRes("audio", tempName);
        let a = cc.audioEngine.playMusic(tempAutio, loop = true);
        if (tempName != "gameBGM4") {
            cc.audioEngine.setVolume(a, 0.5);
        }
        let prefab = g_Res.getRes("prefabMap", bgName);
        let node = cc.instantiate(prefab);
        this.bgLayer.addChild(node);
        if (g_defind.pattern == "doubleGame") {
            this.timeNum = g_defind.startGameInfo.timeNum[g_defind.initData.timeNum];
            this.hpNum = g_defind.startGameInfo.hpNum[g_defind.initData.hpNum];
            this.energyNum = g_defind.startGameInfo.energyNum[g_defind.initData.energyNum];
        } else if (g_defind.pattern == "practiceLabel") {
            this.timeNum = "无限";
            this.hpNum = 999;
            this.energyNum = 999;
        }
        if (this.timeNum != 60) {
            this.timeLabel.string = this.timeNum;
            this.timeNum = 100;
        }
        this.role1.setNum(this.hpNum, this.energyNum);
        this.role2.setNum(this.hpNum, this.energyNum);
    },
    plotQuan(number) {
        this.layerPlot.x = g_Table.tbPlot[number].x;
        this.layerPlot.y = g_Table.tbPlot[number].y;
        this.layerPlot.width = g_Table.tbPlot[number].w;
        this.layerPlot.height = g_Table.tbPlot[number].h;
        this.textPlot.string = g_Table.tbPlot[number].label;
    },
    plotArrow(number) {
        this.arrowPlot.x = g_Table.tbPlot[number].arrow.x;
        this.arrowPlot.y = g_Table.tbPlot[number].arrow.y;
        this.arrowPlot.angle = g_Table.tbPlot[number].arrow.r;
    },
    plotGame() {
        if (g_defind.camera) {
            return;
        };
        if (this.plotStep == 0) {
            this.layerPlot.active = true;
            this.textPlotNode.active = true;
            this.plotQuan(1000);
        } else if (this.plotStep == 1) {
            this.arrowPlot.active = true;
            this.plotQuan(1001);
            this.plotArrow(1001);
        } else if (this.plotStep == 2) {
            this.arrowPlot.active = true;
            this.plotQuan(1002);
            this.plotArrow(1002);
        } else if (this.plotStep == 3) {
            this.arrowPlot.active = true;
            this.plotQuan(1003);
            this.plotArrow(1003);
        } else if (this.plotStep == 4) {
            this.arrowPlot.active = true;
            this.plotQuan(1004);
            this.plotArrow(1004);
        } else if (this.plotStep == 5) {
            this.arrowPlot.active = true;
            this.plotQuan(1005);
            this.plotArrow(1005);
        } else if (this.plotStep == 6) {
            this.arrowPlot.active = true;
            this.plotQuan(1006);
            this.plotArrow(1006);
        } else if (this.plotStep == 7) {
            this.arrowPlot.active = true;
            this.plotQuan(1007);
            this.plotArrow(1007);
        } else if (this.plotStep == 8) {
            this.arrowPlot.active = true;
            this.plotQuan(1008);
            this.plotArrow(1008);
        } else if (this.plotStep == 9) {
            this.arrowPlot.active = true;
            this.plotQuan(1009);
            this.plotArrow(1009);
        } else if (this.plotStep == 10) {
            this.arrowPlot.active = false;
            this.layerPlot.active = false;
            this.textPlotNode.active = false;
            g_defind.camera = true;
        }
    },
    judgeTime() {
        let hp1 = this.role1.hp;
        let hp2 = this.role2.hp;
        if (hp1 > hp2) {
            g_defind.winPlayer = 1;
        } else if (hp2 > hp1) {
            g_defind.winPlayer = 2;
        } else if (hp1 == hp2) {
            g_defind.winPlayer = 2;
        }
    },
    winPlayers() {//播放胜利动画
        // this.winBg.active = true;
        let winBgNode;
        g_Slot.off(g_Event.L_KEY_CTRL, this.keyC);
        g_Ctrl.clearKeys();
        if (g_defind.winPlayer == 1) {
            winBgNode = this.winBg;
        } else {
            winBgNode = this.winBg1;
        }
        let action = cc.sequence(
            cc.fadeIn(0.5),
            cc.scaleTo(1, 1.5),
            cc.callFunc(() => {
                let prefab1 = g_Res.getRes("audio", "winGame");
                cc.audioEngine.playEffect(prefab1);
            }),
            cc.fadeOut(0.5),
            cc.callFunc(() => {
                winBgNode.runAction(cc.fadeIn(0.5));
            }),
            cc.delayTime(2.5),
            cc.callFunc(() => {
                cc.director.loadScene("over");
            }),
        );
        this.koNode.runAction(action);
    },
    dosyncOperation() {
        for (let uid of g_defind.roleList) {
            let obj = g_Object.getObj(uid);
            if (obj) {
                obj.onSyncOperation(this.keyCtrl);
            }
        }
    },
    doExitGame() {
        if (g_defind.pattern == "practiceLabel") {
            this.exitLabel.active = true;
            setTimeout(() => {
                cc.director.loadScene("hall");
            }, 2000)
        }
    },
    doJump(uid) {//控制角色跳
        let obj = g_Object.getObj(uid);
        if (obj) {
            obj.doJump();
        }
    },
    doAttack(uid) {
        let obj = g_Object.getObj(uid);
        if (obj) {
            obj.doAttack();
        }
    },
    doDefense(uid) {
        let obj = g_Object.getObj(uid);
        if (obj) {
            obj.doDefense();
        }
    },
    onDefense(uid) {
        let obj = g_Object.getObj(uid);
        if (obj) {
            obj.onDefense();
        }
    },
    doSkill(skillID, uid) {
        g_SkillManger.doSkill(skillID, uid);
    },
    onKeyUp(keyCode) {
        if (!g_defind.camera) {
            return;
        }
        switch (+keyCode) {
            case cc.macro.KEY.a:
                this.keyCtrl &= ~4;
                break;
            case cc.macro.KEY.d:
                this.keyCtrl &= ~8;
                break;
            case cc.macro.KEY.left:
                this.keyCtrl &= ~1;
                break;
            case cc.macro.KEY.right:
                this.keyCtrl &= ~2;
                break;
            case cc.macro.KEY.down:
                this.onDefense(2);
                break;
            case cc.macro.KEY.s:
                this.onDefense(1);
                break;
        }
    },
    onKeyDown(keyCode) {
        if (!g_defind.camera) {
            if (keyCode == cc.macro.KEY.enter) {
                this.plotStep++;
                this.plotGame();
            }
            return;
        }
        switch (+keyCode) {
            case cc.macro.KEY.a:
                this.keyCtrl |= 4;
                break;
            case cc.macro.KEY.d:
                this.keyCtrl |= 8;
                break;
            case cc.macro.KEY.left:
                this.keyCtrl |= 1;
                break;
            case cc.macro.KEY.right:
                this.keyCtrl |= 2;
                break;
            case cc.macro.KEY.down:
                this.doDefense(2);
                break;
            case cc.macro.KEY.num1:
                this.doAttack(2);
                break;
            case cc.macro.KEY.num2://角色1跳
                this.doJump(2);
                break;
            case cc.macro.KEY.num3:
                this.doSkill(1003, 2);
                break;
            case cc.macro.KEY.num4:
                this.doSkill(1002, 2);
                break;
            case cc.macro.KEY.num5:
                this.doSkill(1001, 2);
                break;
            case cc.macro.KEY.num6:
                this.doSkill(1004, 2);
                break;
            case cc.macro.KEY.s:
                this.doDefense(1);
                break;
            case cc.macro.KEY.j:
                this.doAttack(1);
                break;
            case cc.macro.KEY.k://角色1跳
                this.doJump(1);
                break;
            case cc.macro.KEY.l:
                this.doSkill(1003, 1);
                break;
            case cc.macro.KEY.u:
                this.doSkill(1002, 1);
                break;
            case cc.macro.KEY.i:
                this.doSkill(1001, 1);
                break;
            case cc.macro.KEY.o:
                this.doSkill(1004, 1);
                break;
            case cc.macro.KEY.escape:
                this.doExitGame();
                break;
        }
    },
    onConDown(keyCode) {
        if (!g_defind.camera) {
            return;
        }
        switch (+keyCode) {
            case cc.macro.KEY.a:
                this.keyCtrl |= 4;
                break;
            case cc.macro.KEY.d:
                this.keyCtrl |= 8;
                break;
            case cc.macro.KEY.left:
                this.keyCtrl |= 1;
                break;
            case cc.macro.KEY.right:
                this.keyCtrl |= 2;

                break;
            case cc.macro.KEY.down:
                this.doDefense(2);
                break;
            case cc.macro.KEY.num1:
                this.doAttack(2);
                break;
            case cc.macro.KEY.num2://角色1跳
                this.doJump(2);
                break;
            case cc.macro.KEY.num3:
                break;
            case cc.macro.KEY.num4:
                break;
            case cc.macro.KEY.num5:
                break;
            case cc.macro.KEY.num6:
                break;
            case cc.macro.KEY.j:
                this.doAttack(1);
                break;
            case cc.macro.KEY.k://角色1跳
                this.doJump(1);
                break;
            case cc.macro.KEY.l:
                break;
            case cc.macro.KEY.u:
                break;
            case cc.macro.KEY.i:
                break;
            case cc.macro.KEY.o:
                break;
            case cc.macro.KEY.s:
                this.doDefense(1);
                break;
        }
    },
    onKeyCtrl(keys) {
        let tempKeys = JSON.parse(JSON.stringify(keys));
        for (let keyCode in keys) {
            if (this.keys[keyCode] != undefined) {
                delete this.keys[keyCode];
            }
            if (keys[keyCode]) {
                this.onKeyDown(keyCode);//按一次
            } else {
                this.onConDown(keyCode);
            }

        }
        for (let delKey in this.keys) {
            this.onKeyUp(delKey);
        }
        this.keys = tempKeys;
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        cc.director.getCollisionManager().enabled = true;
        // cc.director.getCollisionManager().enabledDebugDraw = true;
        this.keyC = g_Slot.on(g_Event.L_KEY_CTRL, (keys) => {
            this.onKeyCtrl(keys);
        })
    },

    start() {
        this.plotStep = 0;
        this.plotFlag = true;
        this.keys = {};
        this.keyCtrl = 0;
        this.flag = true;
        this.timeFlag = true;
        this.time = 0;
        this.bgLayer = cc.find("Canvas/bgLayer");
        this.role1 = cc.find("Canvas/role1").script;
        this.role2 = cc.find("Canvas/role2").script;
        this.cameraNode = cc.find("Canvas/Main Camera");
        this.winBg = cc.find("Canvas/UILayer/winBg");
        this.winBg1 = cc.find("Canvas/UILayer/winBg1");
        this.koNode = cc.find("Canvas/UILayer/ko");
        this.timeNode = cc.find("Canvas/UILayer/timeLabel");
        this.exitLabel = cc.find("Canvas/UILayer/label");
        this.layerPlot = cc.find("Canvas/plotLayer/layer");
        this.textPlotNode = cc.find("Canvas/plotLayer/text");
        this.textPlot = this.textPlotNode.getComponent(cc.RichText);
        this.arrowPlot = cc.find("Canvas/plotLayer/arrow");
        this.timeLabel = this.timeNode.getComponent(cc.Label);
        this.cameraNode.script.followeHero();
        this.initGame();
        this.plotGame();
    },

    update(dt) {
        this.dosyncOperation();
        if (g_defind.winPlayer && this.flag) {
            this.flag = false;
            let prefab = g_Res.getRes("audio", "KO");
            cc.audioEngine.playEffect(prefab);
            this.winPlayers();
        }
        if (this.timeNum <= 60 && this.timeFlag) {
            this.time += dt;
            if (this.time >= 1) {
                this.time -= 1;
                this.timeLabel.string--;
            }
            if (this.timeLabel.string <= 0) {
                this.timeFlag = false;
                this.judgeTime();
            }
        }
    },
    onDestroy() {
        g_Slot.off(g_Event.L_KEY_CTRL, this.keyC);
    }
});
