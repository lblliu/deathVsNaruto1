cc.Class({
    extends: cc.Component,

    properties: {

    },
    loadSence() {
        cc.director.loadScene("login");
    },
    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        g_Res.loadRes();
    },

    start() {
        this.progressNode = cc.find("Canvas/progressBar")
        this.progressBar = this.progressNode.getComponent(cc.ProgressBar);
        this.progressSlider = this.progressNode.getComponent(cc.Slider);
        this.progressSlider.progress = 0;
        this.progressBar.progress = 0;
        this.goal = 0;
        this.allResNum = g_Res.getLoadNum();
        if (this.allResNum == 0) {
            this.allResNum = 1;
        }
        this.speed = 0.005;
        this.step = 0;
    },

    update(dt) {
        if (this.goal >= 0) {
            let resNum = g_Res.getLoadNum();
            let ratio = (this.allResNum - resNum) / (this.allResNum * 2);
            if (this.goal < ratio) {
                this.goal = ratio;
            }
            if (this.progressBar.progress >= 0.49 && this.step == 0) {
                this.step = 2;
                cc.director.preloadScene(
                    "login",
                    (cur, all, item) => {
                        let ratio2 = cur / (all * 2);
                        if (this.goal <= ratio2 + 0.5) {
                            this.goal = ratio2 + 0.5;
                        }
                    },
                    () => {

                    },
                );
            }
            if (this.progressBar.progress < this.goal) {
                this.progressBar.progress += this.speed;
                this.progressSlider.progress = this.progressBar.progress;
            } else {
                this.progressBar.progress += this.speed * 0.1;
                this.progressSlider.progress = this.progressBar.progress;
            }
            if (this.step == 2) {
                if (this.progressBar.progress >= 1) {
                    this.goal = -1;
                    this.loadSence();
                }
            }
        }
    },
});
