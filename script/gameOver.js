
cc.Class({
    extends: cc.Component,

    properties: {
    },
    initdefind() {
        g_defind = {
            startGame: 1,
            camera: true,
            startGameInfo: {
                timeNum: {
                    0: 60,
                    1: "无限",
                },
                hpNum: {
                    0: 1,
                    1: 2
                },
                energyNum: {
                    0: 1,
                    1: 2,
                },
            },
            bgList: ["随机地图", "富士山", "教皇殿", "海盗船", "天台",],
            chioseBg: "bgNode",
            roleList: [1, 2],
            lock1: true,//玩家一技能锁
            lock2: true,//玩家二技能锁
            lxLock1: true,
            lxLock2: true,
        }
    },

    onKeyCtrl(keys) {
        for (let keyCode in keys) {
            if (keys[keyCode]) {
                if (keyCode == cc.macro.KEY.enter) {
                    cc.director.loadScene("hall");
                }
            }
        }
    },
    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.keyC = g_Slot.on(g_Event.L_KEY_CTRL, (keys) => {
            this.onKeyCtrl(keys);
        })
    },

    start() {
        g_defind = {};
        this.time = 0;
        this.number = 5;
        this.label = cc.find("Canvas/label").getComponent(cc.Label);
        this.initdefind();
        this.timeKey = setTimeout(() => {
            cc.director.loadScene("hall");
        }, 5000);
    },

    update(dt) {
        this.time += dt;
        if (this.time >= 1) {
            this.time -= 1;
            this.number--;
            this.label.string = "按enter继续(" + this.number + ")";
        }
    },
    onDestroy() {
        clearTimeout(this.timeKey);
        g_Slot.off(g_Event.L_KEY_CTRL, this.keyC);
    }
});
