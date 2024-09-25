const Discord = require('discord.js')
module.exports = async (re, type = 'default') => {

    re?.forEach(r => {
        let flags = new Discord.UserFlagsBitField(r?.public_flags)?.toArray() ?? []
        if (r?.public_flags || r?.public_flags === 0) r.public_flags = flags || null
        if (r?.avatar) r.avatar = r?.avatar ? 'https://cdn.discordapp.com/avatars/' + r?.id + '/' + r?.avatar + (r?.avatar?.startsWith(`a_`) ? '.gif' : '.png') : null || null
        if (r?.avatar_decoration) r.avatar_decoration = r?.avatar_decoration ? 'https://cdn.discordapp.com/avatar-decorations/' + r?.id + '/' + r.avatar_decoration : null || null
        })
        return re;
}