
cc.Class({
    extends: cc.Component,

    properties: {

    },
    followeHero() {
        this.followUId1 = g_defind.roleList[0];
        this.followUId2 = g_defind.roleList[1];
    },
    /**
     * 相机执行跟随绑定角色
     */
    followCamera() {
        if (!g_defind.camera) {
            return;
        }
        let obj1 = g_Object.getObj(this.followUId1);
        let obj2 = g_Object.getObj(this.followUId2);
        if (obj1 && obj2) {
            let rolePos1 = obj1.node.getPosition();//获取玩家一的坐标
            let rolePos2 = obj2.node.getPosition();//获取玩家二的坐标
            let distance = rolePos1.sub(rolePos2).mag();
            let ratio = 2.3 - Math.floor(10 * distance / this.magnification) / 10 * 0.1;
            if (distance < 170) {
                ratio = 2.3;
            }
            if (distance > 920 || ratio < 1) {
                ratio = 1;
            }
            if (this.oldRatio - ratio < -0.01) {
                this.oldRatio += 0.01;
            } else if (this.oldRatio - ratio > 0.01) {
                this.oldRatio -= 0.01;
            }
            this.camera.zoomRatio = this.oldRatio;
            let midpointPos = cc.v2((rolePos1.x + rolePos2.x) / 2, (rolePos1.y + rolePos2.y) / 2);
            let tempy = midpointPos.y - Math.floor(10 * this.h / this.oldRatio) / 10;
            let tempy1 = midpointPos.y + Math.floor(10 * this.h / this.oldRatio) / 10;
            let tempx1 = midpointPos.x - Math.floor(10 * this.w / this.oldRatio) / 10;
            let tempx2 = midpointPos.x + Math.floor(10 * this.w / this.oldRatio) / 10;
            if (tempy < -320) {
                midpointPos.y = -320 + Math.floor(10 * this.h / this.oldRatio) / 10;
            }
            if (tempy1 > 320) {
                midpointPos.y = 320 - Math.floor(10 * this.h / this.oldRatio) / 10;
            }
            if (tempx1 < -480) {
                midpointPos.x = -480 + Math.floor(10 * this.w / this.oldRatio) / 10;
            }
            if (tempx2 > 480) {
                midpointPos.x = 480 - Math.floor(10 * this.w / this.oldRatio) / 10;
            }
            this.node.setPosition(midpointPos);//获取相机坐标
        }
    },
    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.node.script = this;

    },

    start() {
        this.magnification = Math.floor(10 * 920 / 15) / 10;
        this.camera = this.node.getComponent(cc.Camera);
        this.w = cc.winSize.width / 2;
        this.h = cc.winSize.height / 2;
        this.oldRatio = this.camera.zoomRatio;
        this.speed = 0.5;
    },

    update(dt) {
        this.followCamera();
    },
});
