const Discord = require('discord.js')
module.exports = async (re) => {
    if (Array.isArray(re)) {
        re?.forEach(r => {
            if (r?.type) r.type = Discord.ApplicationCommandType[r.type]
            if (re[re.indexOf(r)]?.options) re[re.indexOf(r)]?.options.forEach(ree => {
                ree.type = Discord.ApplicationCommandOptionType[ree.type]
            })
        })
    } else {
        if (re?.type) re.type = Discord.ApplicationCommandType[re.type]
        if (re?.options) re?.options.forEach(ree => {
            ree.type = Discord.ApplicationCommandOptionType[ree.type]
        })
    }
    return re;
}