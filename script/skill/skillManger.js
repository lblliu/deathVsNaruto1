(() => {
    window.g_SkillManger = new class CSkillManger {
        constructor() {
        }
        doSkill(skillID, uid) {
            if (g_Skill[skillID]) {
                let obj = g_Object.getObj(uid);
                if (obj && !obj.damageLock) {
                    if (g_defind["lock" + uid] || skillID > 1004) {
                        g_Skill[skillID].doSkill(uid);
                    }
                }
            }
            // || (g_defind["lxLock" + uid] && skillID == 1001)
        }
    }
})()