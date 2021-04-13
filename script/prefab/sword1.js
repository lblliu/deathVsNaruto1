
cc.Class({
    extends: cc.Component,

    properties: {

    },
    doLauch(speed, direction, maxDis) {
        if (!this.enterFlag) {
            this.node.x += speed * direction;//确定攻击方向
            this.distance += speed;
        }
        if (this.distance >= maxDis) {
            this.flag = 2;
        }
        if (this.enterFlag) {
            this.flag = 1;
        }
        return this.flag;
    },
    changeColider() {
        let collider = this.node.getComponent(cc.BoxCollider);
        collider.enabled = false;
        collider.enabled = true;
    },
    onCollisionEnter(other, self) {
        if (other.tag == 2) {
            let hurtID = other.node.uid;
            if (hurtID && hurtID != this.node.uid) {
                this.enterFlag = true;
            }
        }
    },
    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.node.script = this;
    },

    start() {
        this.distance = 0;
        this.flag = 0;
        this.enterFlag = false;
    },

    // update (dt) {},
});
