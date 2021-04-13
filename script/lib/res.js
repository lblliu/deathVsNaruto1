(() => {
    let TABLE = {
        // demo:{
        //     type:cc.Node,
        //     path:"prefab",
        //     list:["loginPrefab"]
        // }
        roleIcon: {
            type: cc.SpriteFrame,
            path: "texture/icon",
            list: ["narutoIcon", "sakuraIcon"],
        },
        prefabIcon: {
            type: cc.Prefab,
            path: "prefab/icon",
            list: ["roleIcon"],
        },
        prefabPanel: {
            type: cc.Prefab,
            path: "prefab/UIPerfab",
            list: ["iconLayer", "setLayer", "bgLayer"],
        },
        prefabMap: {
            type: cc.Prefab,
            path: "prefab/map",
            list: ["bgNode4", "bgNode3", "bgNode2", "bgNode1",],
        },
        atlasFrame: {
            type: cc.SpriteAtlas,
            path: "atles",
            list: ["narutoIcon_1", "narutoIcon_2"]
        },
        prefabSkill: {
            type: cc.Prefab,
            path: "prefab/sword",
            list: ["sword2", "sword1"]
        },
        prefabSplash: {
            type: cc.Prefab,
            path: "prefab/splash",
            list: ["splash"]
        },
        prefabBook: {
            type: cc.Prefab,
            path: "prefab/panel",
            list: ["bookLayer"]
        },
        audio: {
            path: "audio",
            type: cc.AudioClip,
            list: ["attack1", "BGM", "click", "gameBGM1", "gameBGM2",
                "gameBGM3", "gameBGM4", "luoxuanwan", "runBGM", "jumpBGM", "attack2",
                "jumpDownBGM", "shoulijian", "yingfengche", "demage1", "demage2",
                "demage3", "hougongshu", "KO", "winGame"],
        }
    }
    class CRes {
        constructor() {
            this._data = {};
            this.loadNum = -1;
        }
        getLoadNum() {
            return this.loadNum;
        }
        loadRes() {
            this.loadNum = 0;
            for (let key in TABLE) {
                this.loadNum++;
                this.doLoad(key);
            }
        }
        doLoad(key) {
            let resList = [];
            for (let name of TABLE[key].list) {
                let resName = TABLE[key].path + "/" + name;
                resList.push(resName);
            }
            this._data[key] = {};
            let func = () => {
                let tempList = resList.splice(0, 5);
                cc.loader.loadResArray(
                    tempList,
                    TABLE[key].type,
                    (err, dataList) => {
                        if (resList.length <= 0) {
                            this.loadNum--;
                        } else {
                            func();
                        }
                        if (err) {
                            cc.log(err, key);
                            return;
                        }
                        for (let res of dataList) {
                            this._data[key][res.name] = res;
                        }
                    }
                )
            }
            func();
        }
        getRes(key, name) {
            if (this.loadNum != 0) {
                cc.log("资源未加载完毕!", name, key);
                return;
            }
            if (this._data[key]) {
                return this._data[key][name];
            }
        }
    }
    window.g_Res = new CRes();
})()