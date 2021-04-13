(() => {
    window.g_Slot = new class CSlot extends cc.EventTarget {

    }
    window.g_Event = {
        //游戏协议以E开头
        E_Login: "login",//登陆游戏
        //游戏逻辑以L开头
        L_KEY_CTRL: "ctrl",
    }
}
)()