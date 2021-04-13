
cc.Class({
    extends: cc.Component,

    properties: {

    },
    checkLogin(account, password) {

        if (account == '' || password == '') {
            cc.log("密码账号不能为空！");
        } else {
            let url = "http://localhost:9999/login";
            let info = {
                key: g_Event.E_Login,
                sub: 1,
                data: {
                    account,
                    password,
                }
            }
            g_Net.httpRequest(url, info, (data) => {
                if (data.code == 0) {
                    cc.log("登陆成功！");
                    cc.director.loadScene("hall");
                } else if (data.code == 1) {
                    cc.log("密码或账号错误");
                } else if (data.code == 2) {
                    cc.log("账号不存在");
                }
            })
        }
    },
    checkRegister(account, password) {
        if (account == '' || password == '') {
            cc.log("密码账号不能为空！");
        } else {
            let url = "http://localhost:9999/login";
            let info = {
                key: g_Event.E_Login,
                sub: 2,
                data: {
                    account,
                    password,
                }
            }
            g_Net.httpRequest(url, info, (data) => {
                if (data.code == 0) {
                    cc.log("注册成功！");
                } else if (data.code == 1) {
                    cc.log("账号已经存在！");
                }
            })
        }

    },
    onClickButton(data, tag) {
        let account = this.inputAccount.string;
        let password = this.inputPassword.string;
        switch (tag) {
            case "login":
                this.checkLogin(account, password);
                break;
            case "register":
                this.checkRegister(account, password);
                break;
        }
    },
    // LIFE-CYCLE CALLBACKS:

    onLoad() {
    },

    start() {
        this.inputAccount = cc.find("Canvas/inputAccount").getComponent(cc.EditBox);
        this.inputPassword = cc.find("Canvas/inputPassword").getComponent(cc.EditBox);
    },

    // update (dt) {},
});
