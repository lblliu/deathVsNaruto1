/**
 * 使用帧动画管理器的条件：
 * 1.对象提供getShapeAndState函数，用于判断对象造型和当前状态
 * 2.对象提供setFrame函数，管理器写入spriteFrame，功能为对象处理帧动画的图片
 */
(() => {
    window.g_FrameManager = new class CFrameManager {
        constructor() {
            this._data = {};
            this.run();
        }
        addObj(iID) {
            this._data[iID] = {
                curFrame: 0,
                state: "",
            }
        }
        // setLock(iID, state) {
        //     this._data[iID].lock = state;
        // }
        // getLock(iID) {
        //     return this._data[iID].lock;
        // }
        delObj(iID) {
            if (this._data[iID]) {
                delete this._data[iID];
            }
        }
        run() {
            setTimeout(() => {
                this.run();
                this.doRun();
            }, 100)
        }
        doRun() {
            for (let iID in this._data) {
                let obj = g_Object.getObj(iID);
                let { shape, state } = obj.getShapeAndState();//对象提供造型和状态
                if (state != this._data[iID].state || (state == "damage" && this._data[iID].state == "damage" && this._data[iID].curFrame != 0)) {//判断状态改变时进行处理
                    this._data[iID].state = state;//记录状态
                    this._data[iID].curFrame = 0;//帧动画指针清零
                }
                if (!state) {
                    continue;
                }
                let info = g_Table.tbFrame[shape];//通过造型去帧导表拿对应角色的信息
                let atlasName = shape < 2000 ? "narutoIcon_1" : "narutoIcon_2";//通过shape确定图集
                let pList = g_Res.getRes("atlasFrame", atlasName + ".plist");//获取具体图集
                let fListCode = info.state[state];//根据对象状态获取对应状态的帧列表
                let fListDct = g_Table.tbFrameAnim[fListCode];
                let sfName = `${info.file}_${state}_${fListDct.frame[this._data[iID].curFrame]}`;//拼接子图名
                let sf = pList.getSpriteFrame(sfName);//获取子图
                let keyFrame = 0;
                if (fListDct.key) {
                    keyFrame = fListDct.key[this._data[iID].curFrame];
                }
                this._data[iID].curFrame++; //切换帧指针
                this._data[iID].curFrame %= fListDct.frame.length;
                obj.setFrame(sf);//设置图片让对象自己去做
                obj.onKeyFrame(keyFrame);
                // if (this._data[iID].curFrame == 0 && fList.length > 1) {
                //     obj.onLastFrame();
                // }
            }
        }
        // run(objLayer) {
        //     let pList = g_Res.getRes("atlasHero", "hero.plist");
        //     let iID = 1;
        //     let state = "attack";
        //     for (let child of objLayer.children) {
        //         let sp = child.getComponentInChildren(cc.Sprite);
        //         if (child.curFrame == undefined) {
        //             child.curFrame = 0;
        //         }
        //         let key = `hero_0${iID}_${state}_0${child.curFrame + 1}`;
        //         sp.spriteFrame = pList.getSpriteFrame(key);
        //         child.curFrame++;
        //         child.curFrame = child.curFrame % 4;
        //         iID++;
        //     }
        // }
    }
})()