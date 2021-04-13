/**
 * 全局对象管理器
 * 功能：在全局获取注册过后的脚本对象
 */
(() => {
    window.g_Object = new class CObject {
        constructor() {
            this.m_data = {};
        }
        //注册脚本对象
        addObj(pid, script) {
            this.m_data[pid] = script;
        }
        //获得脚本对象
        getObj(pid) {
            if (this.m_data[pid]) {
                return this.m_data[pid];
            } else {
                console.log("查无此对象");
            }
        }
        delObj(pid) {//删除脚本对象
            if (this.m_data[pid]) {
                delete this.m_data[pid];
            }
        }
        getAllObj() {//获取所有脚本
            return this.m_data;
        }
        getRole1() {
            return this.m_data[1];
        }
        getRole2() {
            return this.m_data[2];
        }
    }
})()