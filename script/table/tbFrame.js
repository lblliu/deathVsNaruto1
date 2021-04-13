(() => {
    window.g_Table = window.g_Table || {};
    window.g_Table.tbFrame = {
        1001: {//shape相当于服务端CID
            file: "narutoIcon_1",
            state: {
                attack1: 10001,
                attack2: 10002,
                attack3: 10003,
                attack4: 10004,
                jumpAttack: 10005,
                standby: 10006,
                defense: 10007,
                run: 10008,
                win: 10009,
                damage: 10010,
                die: 10011,
            }
        },
        1002: {
            file: "narutoIcon_1",
            state: {
                defense: 10012,
            }
        },
        2001: {//螺旋丸
            file: "narutoIcon_1",
            state: {
                skill: 20001,
            }
        },
        2002: {//后宫术
            file: "narutoIcon_2",
            state: {
                skill: 20002,
            }
        },
        2003: {//手里剑
            file: "narutoIcon_3",
            state: {
                skill: 20003,
            }
        },
        2004: {//影风车
            file: "narutoIcon_4",
            state: {
                skill: 20004,
            }
        },
    }
    /**
     * 0:无
     * 1：攻击开始
     * 2：攻击结束
     * 3：受击开始
     * 4：受击结束
     * 5：结束帧
     */
    window.g_Table.tbFrameAnim = {
        10001: {//攻击1
            frame: ["1", "2", "3", "4"],
            key: [0, 1, 2, 5],
        },
        10002: {//攻击2
            frame: ["1", "2", "3", "4", "5", "6"],
            key: [0, 0, 1, 0, 2, 5],
        },
        10003: {//攻击3
            frame: ["1", "2", "3", "4", "5"],
            key: [0, 0, 1, 2, 5],
        },
        10004: {//攻击4
            frame: ["1", "2", "3", "4", "5", "6", "6", "7"],
            key: [0, 0, 1, 0, 0, 2, 0, 5],

        },
        10005: {//跳踢
            frame: ["1", "1", "2", "3", "4", "5", "6", "7", "8"],
            key: [0, 1, 2, 0, 0, 0, 0, 0, 5],
        },
        10006: {//待机
            frame: ["1", "2", "3", "4"],

        },
        10007: {//防御
            frame: ["1", "2", "3"],

        },
        10008: {//跑
            frame: ["1", "2", "3", "4", "5", "6", "7", "8"],
            key: [0, 0, 0, 0, 0, 0, 0, 5],
        },
        10009: {//胜利
            frame: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16"],

        },
        10010: {//受伤
            frame: ["1", "2", "3", "4", "4", "4", "4"],
            key: [0, 0, 0, 0, 0, 0, 4],

        },
        10011: {//死亡
            frame: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
        },
        10012: {//防御第二段
            frame: ["3"],
        },
        20001: {//螺旋丸
            frame: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"],
        },
        20002: {//后宫术
            frame: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10",
                "11", "12", "13", "14", "15", "16", "17", "18", "19", "20",
                "21", "22", "23", "24", "25", "26", "27", "28", "29", "30",
                "31", "32", "33", "34", "35"],
        },
        20003: {//手里剑
            frame: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10",
                "11", "12", "13"],
        },
        20004: {//影风车
            frame: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10",
                "11", "12", "13", "14", "15", "16", "17", "18", "19", "20"
                , "21"],
        },
    }
})()