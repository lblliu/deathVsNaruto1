cc.Class({
    extends: cc.Component,

    properties: {

    },
    showHelp() {
        this.labelLayer.runAction(cc.fadeIn(0.5));
        this.breakNode.active = true;
    },
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        this.bookLayer = this.node.parent;
        this.labelLayer = this.bookLayer.getChildByName("lableLayer");
        this.breakNode = this.labelLayer.getChildByName("break");
        this.breakNode.on(cc.Node.EventType.TOUCH_START, () => {
            let action = cc.sequence(
                cc.fadeOut(0.5),
                cc.callFunc(() => {
                    this.bookLayer.destroy();
                })
            );
            this.bookLayer.runAction(action);
        })
    },

    // update (dt) {},
});
