(() => {
    window.g_Skill = window.g_Skill || {}
    window.g_Skill[1004] = new class CSkill1001 {
        constructor() {
            this._data = {};
            this.run();
        }
        doSkill(uid) {
            if (this._data[uid]) {
                return;
            }
            this._data[uid] = {
                state: 0,
            }
        }
        createEffect(uid, data, obj) {//创建攻击图像
            if (data.state != 0) {
                return;
            }
            data.state = 1;
            obj.changeState(null);
            obj.changeSkillState("yingfengche");
            obj.playerMusicEffect("yingfengche");
        }
        delEffect(uid, data) {
            if (data.state != 1) {
                return;
            }
            delete this._data[uid];
        }
        doRun() {
            for (let uid in this._data) {
                let data = this._data[uid];
                let obj = g_Object.getObj(uid);
                if (!obj) {
                    continue;
                }
                this.createEffect(uid, data, obj);
                this.delEffect(uid, data);
            }
        }
        run() {
            setTimeout(() => {
                this.doRun();
                this.run();
            }, 20)
        }
    }
})()          