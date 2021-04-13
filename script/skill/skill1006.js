(() => {
    window.g_Skill = window.g_Skill || {}
    window.g_Skill[1006] = new class CSkill1001 {
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
            let effectLayer = cc.find("Canvas/effectLayer");
            let prefab = g_Res.getRes("prefabSkill", "sword1");
            let node = cc.instantiate(prefab);
            effectLayer.addChild(node);
            node.setPosition(obj.node.getPosition());
            node.uid = uid;
            data.state = 1;
            data.time = 0;
            data.num = 0;
            data.node = node;
            data.direction = obj.getDirection();
            node.scaleX = data.direction;
            data.distance = 0;//实时距离
            data.maxDis = 200;
            data.speed = 10;
        }
        doLauch(data, obj) {//移动
            if (data.state != 1) {
                return;
            }
            let flag = data.node.script.doLauch(data.speed, data.direction, data.maxDis);
            if (flag == 1) {
                data.state = 2;
            } else if (flag == 2) {
                data.state = 3;
            }
        }
        doBack(data, obj) {
            if (data.state != 2) {
                return;
            }
            data.time += 20 / 1000;
            if (data.time >= 0.2) {
                data.node.script.changeColider();
                data.time -= 0.2;
                data.num += 1;
            }
            if (data.num > 3) {
                data.state = 3;
            }
        }
        delEffect(uid, data) {
            if (data.state != 3) {
                return;
            }
            data.node.destroy();
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
                this.doLauch(data, obj);
                this.doBack(data, obj);
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