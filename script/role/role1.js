
cc.Class({
    extends: cc.Component,

    properties: {

    },
    hougong1() {
        this.hurtCollider.enabled = false;
    },
    playerMusicEffect(name) {//播放音效
        if (name == "runBGM") {
            if (this.stateRunEffect == 0) {
                let prefab = g_Res.getRes("audio", name);
                this.stateRunEffect = cc.audioEngine.playEffect(prefab);
            } else {
                if (cc.audioEngine.getState(this.stateRunEffect) == -1) {
                    let prefab = g_Res.getRes("audio", name);
                    this.stateRunEffect = cc.audioEngine.playEffect(prefab);
                }
            }
        } else {
            let prefab = g_Res.getRes("audio", name);
            cc.audioEngine.playEffect(prefab);
        }
    },
    getNodeX() {//对外提供获取y坐标接口
        return this.node.x;
    },
    shotSword2() {//影风车回调
        g_SkillManger.doSkill(1005, 1);
    },
    shotSword1() {//手里剑
        g_SkillManger.doSkill(1006, 1);
    },
    setNum(hpNum, energyNum) {
        this.hpNum = hpNum - 1;
        this.hpLabel.string = "X" + this.hpNum;
        this.energyNum = energyNum;
        this.angerLabel.string = this.energyNum;
    },
    setFrame(sf) {//改变图片
        this.m_sprit.spriteFrame = sf;
    },
    doPlayEffect(type) {
        let prefab = g_Res.getRes("prefabSplash", "splash");
        let node1 = cc.instantiate(prefab);
        this.effectLayer.addChild(node1);
        if (type == "shouji1") {
            node1.getComponent(cc.Animation).play("shouji1");
        } else if (type == "shouji2") {
            node1.getComponent(cc.Animation).play("shouji2");
        } else if (type == "shouji3") {
            node1.getComponent(cc.Animation).play("shouji3");
        } else if (type == "shouji4") {
            node1.getComponent(cc.Animation).play("shouji4");
        } else if (type == "shouji5") {
            node1.getComponent(cc.Animation).play("shouji5");
        } else {
            node1.destroy();
        }
        node1.setPosition(this.node.getPosition());
        node1.getComponent(cc.Animation).on(cc.Animation.EventType.FINISHED, () => {
            node1.destroy();
        });
    },
    doHurt(other) {
        let attackID, skillID, number;
        if (other.tag <= 11010 && other.tag >= 11000) {
            let parentN = other.node.parent.parent;
            attackID = parentN.uid;
            skillID = 2;
            this.hurt = 5;
            if (other.tag == 11004) {
                number = 1;
            }
        }
        if (other.tag == 11020) {
            g_Object.getRole2().stopSkill("luoxuanwan2");
            let parentN = other.node.parent.parent;
            attackID = parentN.uid;
            skillID = 1;
            this.hurt = 10;
        }
        if (other.tag == 11021) {
            let parentN = other.node.parent.parent;
            attackID = parentN.uid;
            skillID = 1;
            this.hurt = 10;
        }
        if (other.tag == 11022) {
            attackID = other.node.uid;
            skillID = 3;
            this.hurt = 10;
        }
        if (other.tag == 11023) {
            attackID = other.node.uid;
            skillID = 3;
            this.hurt = 10;
        }
        if (other.tag == 11024) {
            attackID = other.node.parent.parent;
            skillID = 4;
            this.hurt = 20;
        }
        if (!attackID || !skillID) {
            return;
        }
        if (attackID == this.m_ID) {
            return;
        }
        this.changeHp(skillID, number);
        if (this.defenseFlag == 1) {
            this.damageLock = true;
            this.changeState(null);
            this.ANIM.stop();
            this.changeSkillState("damage");
            if (other.tag == 11024 || other.tag == 11004) {
                this.seriousinjuryFlag = false;
            }
        }
    },
    doAttack() {
        if (g_defind.lock1 && !this.damageLock) {
            g_defind.lock1 = false;
            if ((this.collision & 2) == 0 && this.conuntNum == 0 && this.jumpAttackFlag == 3) {
                this.changeState("jumpAttack");
                this.m_JumpInfo = null;
            } else {
                if (this.attackNum > 3) {
                    this.attackNum = 0;
                }
                this.attackNum++;
                let name = "attack" + this.attackNum;
                this.changeState(name);
            }
        }
    },
    doDefense() {//防御
        if ((g_defind.lock1 || this.defenseFlag == 2) && !this.damageLock) {
            if (this.defenseFlag == 2) {
                this.defenseFlag = 3;
                this.changeState("defense", 1002);
            } else {
                this.defenseFlag = 2;
                g_defind.lock1 = false;
                this.changeState("defense");
            }
        }
    },
    onDefense() {
        g_defind.lock1 = true;
        this.defenseFlag = 1;
        this.changeState("standby");
    },
    onDamage() {
        this.damageLock = false;
        this.flagAttack = false;
        g_defind.lock1 = true;
        this.seriousinjuryFlag = true;
        this.changeState("standby");
    },
    doJump() {//跳
        if (!g_defind.lock1 || this.damageLock || this.jumpNum > 1 || this.jumpAttackFlag == 2) {
            return;
        } else {
            if (this.jumpNum == 0) {
                this.jumpNum = 1;
                this.m_JumpInfo = {
                    speed: 15,
                    state: true,
                };
                this.playerMusicEffect("jumpBGM");
            } else if (this.jumpNum == 1 && ((this.m_JumpInfo && this.m_JumpInfo.speed <= 0) || !this.m_JumpInfo)) {
                this.jumpNum = 2;
                this.m_JumpInfo = {
                    speed: 15,
                    state: true,
                };
                this.playerMusicEffect("jumpBGM");
            }
        }
    },
    refreshJump() {
        let { speed } = this.m_JumpInfo;
        this.node.y += speed;
        this.m_JumpInfo.speed--;
        if (this.m_JumpInfo.speed < -10) {
            this.m_JumpInfo.speed = -10;
        }
        if (this.node.y <= -320) {
            this.m_JumpInfo = null;
        }
    },
    changeHp(skillID, number) {//改变血量
        let hurt = 0;
        if (this.defenseFlag != 1) {
            hurt = 1;
        } else {
            hurt = this.hurt;
        }
        if (skillID == 2) {
            if (number == 1) {
                this.doPlayEffect("shouji2");
            } else {
                this.doPlayEffect("shouji1");
            }
            this.playerMusicEffect("demage2");
        } else if (skillID == 1) {
            this.doPlayEffect("shouji5");
            this.playerMusicEffect("demage3");
        } else if (skillID == 3) {
            this.doPlayEffect("shouji4");
            this.playerMusicEffect("demage3");
        } else if (skillID == 4) {
            this.doPlayEffect("shouji3");
            this.playerMusicEffect("demage1");
        }
        this.hp -= hurt;
        this.hpRatio.progress = this.hp / 100;
        if (this.hp <= 0) {
            if (this.hpNum > 0) {
                this.hp = 100;
                this.hpNum--;
                this.hpLabel.string = "X" + this.hpNum;
                this.hpRatio.progress = 1;
                return;
            }
            for (let uid of g_defind.roleList) {
                if (uid != this.m_ID) {
                    g_defind.winPlayer = uid;
                }
            }
        }
    },
    changeAttackLast(num, tag) {//具体改变攻击体大小
        let collisionAttack = this.attackNode.getComponent(cc.BoxCollider);
        let tbFrameRole = g_Table.tbAttack[num];
        collisionAttack.tag = tag;
        collisionAttack.offset = cc.v2(tbFrameRole.x, tbFrameRole.y);
        collisionAttack.size = cc.size(tbFrameRole.w, tbFrameRole.h);
        this.attackNode.active = true;
    },
    changeAttack() {//初始化攻击体大小
        if (this.attackNum != 0) {
            switch (this.attackNum) {
                case 1:
                    this.playerMusicEffect("attack1");
                    this.changeAttackLast(1001, 11001);//第一下攻击
                    break;
                case 2:
                    this.playerMusicEffect("attack1");
                    this.changeAttackLast(1002, 11002);
                    break;
                case 3:
                    this.playerMusicEffect("attack2");
                    this.changeAttackLast(1003, 11003);
                    break;
                case 4:
                    this.playerMusicEffect("attack2");
                    this.changeAttackLast(1004, 11004);
                    break;
            }
        } else if (this.jumpAttackFlag == 3) {
            this.playerMusicEffect("attack1");
            this.changeAttackLast(1005, 11005);
            this.jumpAttackFlag = 2;

        }
    },
    onKeyFrame(keyFrame) {//判断逻辑事件
        if (keyFrame == 1) {
            // this.m_attack.active = true;
            this.flagAttack = true;
            this.changeAttack();
        } else if (keyFrame == 2) {
            this.attackNode.active = false;
            this.flagAttack = false;
        } else if (keyFrame == 5) {
            g_defind.lock1 = true;
            this.jumpAttackFlag = 1;
            this.changeState("standby");
        } else if (keyFrame == 4) {
            // this.damageLock = false;
            // this.changeState("standby");
        }
    },
    changeState(state, num = 1001) {//改变角色状态
        this.m_Shape = num;
        this.m_State = state;
    },
    getDirection() {//获取角色方向
        return this.subNode.scaleX;

    },
    overSkill() {//技能结束帧
        if (this.hurtCollider.enabled == false) {
            this.hurtCollider.enabled = true;
        }
        g_defind.lock1 = true;
        // g_defind.lxLock1 = true;
        this.changeState("standby");
    },
    stopSkill(name) {//中断证管理器，播放技能动画
        g_defind.lock1 = true;
        this.changeState(null);
        this.changeSkillState(name);
    },
    changeSkillState(state, cb) {//动画改变函数
        if (state == "luoxuanwan") {
            if (this.energyNum <= 0) {
                this.overSkill();
                return;
            } else {
                this.energyNum--;
                g_defind["lxLock1"] = false;
                this.playerMusicEffect("luoxuanwan");
                this.angerLabel.string = this.energyNum;
            }
        }
        this.angerNum += 10;
        this.angerRatio.progress = this.angerNum / 100;
        if (this.angerNum >= 100) {
            this.angerNum -= 100;
            this.angerRatio.progress = this.angerNum / 100;
            this.energyNum += 1;
            this.angerLabel.string = this.energyNum;
        }
        if (g_defind.lock1 || state == "damage") {
            g_defind.lock1 = false;
            this.ANIM.play(state);
            this.ANIM.off(cc.Animation.EventType.FINISHED);
            if (cb) {
                this.ANIM.once(cc.Animation.EventType.FINISHED, (key, animState) => {
                    cb();
                });
            }
        }
    },
    doMove() {//移动
        if (this.isDie || !g_defind.lock1 || this.damageLock) {
            return;
        }
        let x = 0;
        if (this.keyCtrl & 8) {//待改
            if ((this.collision & 8) == 0) {//待改
                x += 1;
            }
        }
        if (this.keyCtrl & 4) {//待改
            if ((this.collision & 4) == 0) {//待改
                x -= 1;
            }
        }
        this.refreshDirection(x);
        if (x != 0) {
            this.playerMusicEffect("runBGM");
            this.changeState("run");
            this.node.x += x * this.speed;
        }
        if (x == 0 && this.m_State == "run") {
            this.changeState("standby");
        }
    },
    refreshDirection(x) {//改变任务方向
        let k = (x < 0 ? -1 : (x > 0 ? 1 : 0));//待改
        if (k == 0) {
            return;
        }
        this.subNode.scaleX = k;
        // this.attackNode.scaleX = k;
    },
    getShapeAndState() {//获取状态及id
        return {
            shape: this.m_Shape,
            state: this.m_State,
        }
    },
    onSyncOperation(keyCtrl) {//同步按键
        this.keyCtrl = keyCtrl;
    },
    onCollisionEnter(other, self) {
        if (Math.floor(self.tag / 1000) == 1) {
            if ((other.tag == 0 || other.tag == 3)) {//待改
                if ((this.m_JumpInfo && this.m_JumpInfo.speed <= 0) || !this.m_JumpInfo) {
                    this.jumpNum = 0;
                    this.m_JumpInfo = null
                    this.playerMusicEffect("jumpDownBGM");
                }
                this.collision |= self.tag - 1000;
                if (self.tag == 1002) {
                    this.conuntNum++;
                    this.jumpAttackFlag = 1;
                }
            }
            // if (Math.floor(other.tag / 1000) == 1) {
            //     this.collision |= self.tag - 1000;
            // }
        }
        if (self.tag == 2) {
            this.doHurt(other);
        }
    },
    // onCollisionStay(other, self) {//当碰撞产生后，碰撞结束前的情况下，每次计算碰撞结果后调用
    //     if (self.tag == 4 && other.tag == 0) {
    //         this.otherNode = other;
    //         this.otherNode.enabled = false;
    //     }
    // },
    onCollisionExit(other, self) {
        if (Math.floor(self.tag / 1000) == 1) {
            if (other.tag == 0 || other.tag == 3) {//待改
                this.collision &= ~(self.tag - 1000);
                if (self.tag == 1002 && (other.tag == 0 || other.tag == 3)) {
                    this.conuntNum--;
                    if (this.conuntNum == 0) {
                        this.jumpAttackFlag = 3;
                    }
                }
            }
        }
    },
    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.node.script = this;
        this.node.uid = g_defind.roleList[0];//待改
        this.ANIM = this.node.getComponent(cc.Animation);
    },

    start() {
        this.flagAttack = false;
        this.conuntNum = 0;
        this.jumpNum = 0;//跳跃次数
        this.stopFlag = false;//二段技能停止技能
        this.damageLock = false;//受击状态僵直锁
        this.seriousinjuryFlag = true;//受击击飞锁
        this.defenseFlag = 1;//是否防御
        this.jumpAttackFlag = 1;//跳踢技能锁 1:不能攻击 2：攻击了 3：可以攻击
        this.keyCtrl = 0;
        this.collision = 0;
        this.angerNum = 0;
        this.hp = 100;
        this.hurt = 0;
        this.speed = 5;
        this.m_ID = g_defind.roleList[0];//待改
        this.m_Shape = 1001;
        this.attackNum = 0;
        this.m_State = "standby";
        this.time = 0;
        this.effectLayer = cc.find("Canvas/effectLayer");
        this.hpPro = cc.find("Canvas/UILayer/player1/playerHPBg1");
        this.hpLabel = cc.find("Canvas/UILayer/player1/hpNum1").getComponent(cc.Label);
        this.hpPros = this.hpPro.getComponents(cc.ProgressBar);
        this.hpRatio = this.hpPros[0];
        this.blackHpRatio = this.hpPros[1];
        this.hurtCollider = this.node.getComponents(cc.BoxCollider)[3];
        this.angerPro = cc.find("Canvas/UILayer/angerBg1/luqikuang");//怒气
        this.angerLabel = cc.find("Canvas/UILayer/angerBg1/angerNum").getComponent(cc.Label);
        this.angerRatio = this.angerPro.getComponent(cc.ProgressBar);
        this.subNode = this.node.getChildByName("subNode");
        this.attackNode = this.node.getChildByName("subNode").getChildByName("attack");
        this.spriteNode = this.node.getChildByName("subNode").getChildByName("sprite");
        this.m_sprit = this.spriteNode.getComponent(cc.Sprite);
        g_Object.addObj(this.m_ID, this);
        g_FrameManager.addObj(this.m_ID);
    },

    update(dt) {
        if (this.hp <= 0) {
            this.ANIM.stop();
            this.changeState("die");
        }
        if (g_defind.winPlayer == this.m_ID) {
            this.changeState("win");
        }
        if (g_defind.winPlayer && g_defind.winPlayer != this.m_ID && Math.abs(this.node.x) < 550) {
            this.node.x += -5 * this.getDirection();
        }
        if (this.blackHpRatio.progress > this.hpRatio.progress) {//暗血
            let multiple = Math.max(Math.max((this.blackHpRatio.progress - this.hpRatio.progress) * 100 / 10, 1), 1);
            this.blackHpRatio.progress -= 0.005 * multiple;
        }
        if (this.blackHpRatio.progress < this.hpRatio.progress) {
            this.blackHpRatio.progress = this.hpRatio.progress;
        }
        if (!g_defind.winPlayer) {
            this.doMove();
            if (this.m_JumpInfo) {//跳
                this.refreshJump();
            }
            if ((this.collision & 2) == 0 && this.conuntNum == 0) {//不是跳，悬空
                if (!this.m_JumpInfo) {
                    this.node.y -= 5;
                }
            }
            if (g_defind.lock1 && this.attackNum != 0) {//判定第一次出拳
                this.time += dt;
                if (this.time >= 0.5) {
                    this.attackNum = 0;
                    g_defind.lock1 = true;
                    this.time = 0;
                }
            }
            if (this.attackNum != 0 && this.flagAttack) {
                if ((this.collision & 8) == 0 && (this.collision & 4) == 0) {
                    switch (this.attackNum) {
                        case 1:
                            this.node.x += this.subNode.scaleX * 2;//待改
                            break;
                        case 2:
                            this.node.x += this.subNode.scaleX * 2;//待改
                            break;
                        case 3:
                            this.node.x += this.subNode.scaleX * 3;//待改
                            break;
                        case 4:
                            this.node.x += this.subNode.scaleX * 4;//待改
                            break;
                    }
                }
            }
            if (!this.seriousinjuryFlag && this.damageLock) {
                if (this.subNode.scaleX == 1 && (this.collision & 4) == 0) {
                    this.node.x += -this.subNode.scaleX * 4;
                }
                if (this.subNode.scaleX == -1 && (this.collision & 8) == 0) {
                    this.node.x += -this.subNode.scaleX * 4;
                }
                this.node.y += 6;
            }
            if (this.m_State == "standby") {
                if (g_Object.getRole2().getNodeX() < this.node.x) {
                    this.subNode.scaleX = -1;
                } else if (g_Object.getRole2().getNodeX() >= this.node.x) {
                    this.subNode.scaleX = 1;
                }
            }
        }

    },
    onDestroy() {
        g_Object.delObj(this.m_ID);
        g_FrameManager.delObj(this.m_ID);
    }
});
