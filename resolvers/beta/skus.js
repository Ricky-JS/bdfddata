const Discord = require('discord.js')
module.exports = async (re) => {
    if (Array.isArray(re)) {
        re?.forEach(r => {
            if (r?.flags) r.flags = Discord.SKUFlags[r.flags]
            if (r?.type) r.type = Discord.SKUType[r.type]
        })
    } else {
        if (re?.flags) re.flags = Discord.SKUFlags[re.flags]
        if (re?.type) re.type = Discord.SKUType[re.type]
    }
    return re;
}