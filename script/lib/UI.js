/**
 * 界面管理器
 * 功能：在 "任意" 的场景内显示界面
 * 注意：界面关闭由界面内部自己实现
 * panelXXX界面最终所在节点树路径：Canvas/UILayer/permanentUI/panelXXX
 * 
 * 要求：
 *      1、resName同时为脚本名、节点名
 *      2、预制体在g_Res中放在prefabPanel类别下
 */

(() => {
    window.g_UI = new class CUI {
        /** 永久UI -- Permanent
         * resName: 想要显示的面板的预置名
         * callback: 生成面板后想要执行的回调函数
         */
        showPerUI(resName, callback) {
            this.showUI(resName, callback, "permanentUI");
        }

        /** 临时UI -- Temporaty
         * resName: 想要显示的面板的预置名
         * callback: 生成面板后想要执行的回调函数
        */
        showTemUI(resName, callback) {
            this.showUI(resName, callback, "temporatyUI");
        }

        /** 过渡UI -- Transition   因为在切地图的时候会反复 active = false/true,
         * 为了保证最后渲染，单独搞一个
         * resName: 想要显示的面板的预置名
         * callback: 生成面板后想要执行的回调函数
        */
        showTranUI(resName, callback) {
            this.showUI(resName, callback, "transitionUI");
        }

        showUI(resName, callback, layer) {
            let canvas = cc.find("Canvas");
            // 在画布下拿UILayer
            let UILayer = canvas.getChildByName("UILayer");
            if (!UILayer) { // 假如UILayer不存在则生成它
                UILayer = new cc.Node(); // 创建节点
                UILayer.name = "UILayer"; // 修改节点名字
                canvas.addChild(UILayer); // 把UILayer这个节点变成画布的子节点
            }
            let subUI = UILayer.getChildByName(layer); // 在UILayer下拿layer
            if (!subUI) { // 假如subUI不存在则生成它
                subUI = new cc.Node(); // 创建节点
                subUI.name = layer; // 修改节点名字
                UILayer.addChild(subUI); // 把subUI这个节点变成UILayer的子节点
            }
            let panel = subUI.getChildByName(resName); // 在subUI下拿resName界面
            if (!panel) { // 假如panel不存在则生成它
                // 去g_Res下获取resName的预制体，实例化获得界面
                panel = cc.instantiate(g_Res.getRes("prefabPanel", resName));
                subUI.addChild(panel); // 把resName对应界面变成subUI的子节点
            } else {
                panel.active = true;
            }
            let script = panel.getComponent(resName);
            if (callback) {
                callback(script); // 界面显示后传入界面控制脚本供外部脚本操作
            }
        }
    }
})()