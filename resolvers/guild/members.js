const Discord = require('discord.js')
module.exports = async (re, type = 'default') => {

    if(type === 'default') {
    if (Array.isArray(re)) {
        re?.forEach(r => {
            if (r?.joined_at) r.joined_at = (new Date(r.joined_at) / 1000)?.toFixed() || null
            if (r?.premium_since) r.premium_since = (new Date(r.premium_since) / 1000)?.toFixed() || null
            if (r?.communication_disabled_until) r.communication_disabled_until = (new Date(r.communication_disabled_until) / 1000)?.toFixed() || null

            let flags = new Discord.UserFlagsBitField(r?.user?.public_flags)?.toArray() ?? []
            if (r?.avatar) re.avatar = r?.avatar ? 'https://cdn.discordapp.com/avatars/' + r?.user?.id + '/' + r?.avatar + (r?.avatar?.startsWith(`a_`) ? '.gif' : '.jpg') : null || null
            if (r?.user?.avatar?.startsWith(`a_`) || r?.user?.avatar_decoration || r?.user?.banner) flags.push('NitroSubscriber')

            if (r?.user?.public_flags || r?.user?.public_flags === 0) r.user.public_flags = flags || null
            if (r?.user?.avatar) r.user.avatar = r?.user?.avatar ? 'https://cdn.discordapp.com/avatars/' + r?.user?.id + '/' + r?.user?.avatar + (r?.user?.avatar?.startsWith(`a_`) ? '.gif' : '.jpg') : null || null
            if (r?.user?.banner) r.user.banner = r?.user?.banner ? 'https://cdn.discordapp.com/banners/' + r?.user?.id + '/' + r?.user?.banner + (r?.user?.banner?.startsWith(`a_`) ? '.gif' : '.jpg') : null || null
            if (r?.user?.avatar_decoration) r.user.avatar_decoration = r?.user?.avatar_decoration ? 'https://cdn.discordapp.com/avatar-decorations/' + r?.user?.id + '/' + r?.user?.avatar_decoration : null || null
        })
    } else {
        if (re?.joined_at) re.joined_at = (new Date(re.joined_at) / 1000)?.toFixed() || null
        if (re?.premium_since) re.premium_since = (new Date(re.premium_since) / 1000)?.toFixed() || null
        if (re?.communication_disabled_until) re.communication_disabled_until = (new Date(re.communication_disabled_until) / 1000)?.toFixed() || null
        let flags = new Discord.UserFlagsBitField(re?.user?.public_flags)?.toArray() ?? []
        if (re?.avatar) re.avatar = re?.avatar ? 'https://cdn.discordapp.com/avatars/' + re?.user?.id + '/' + re?.avatar + (re?.avatar?.startsWith(`a_`) ? '.gif' : '.jpg') : null || null
        if (re?.user?.avatar?.startsWith(`a_`) || re?.user?.avatar_decoration || re?.user?.banner) flags.push('NitroSubscriber')

        if (re?.user?.public_flags || re?.user?.public_flags === 0) re.user.public_flags = flags || null
        if (re?.user?.avatar) re.user.avatar = re?.user?.avatar ? 'https://cdn.discordapp.com/avatars/' + re?.user?.id + '/' + re?.user?.avatar + (re?.user?.avatar?.startsWith(`a_`) ? '.gif' : '.jpg') : null || null
        if (re?.user?.banner) re.user.banner = re?.user?.banner ? 'https://cdn.discordapp.com/banners/' + re?.user?.id + '/' + re?.user?.banner + (re?.user?.banner?.startsWith(`a_`) ? '.gif' : '.jpg') : null || null
        if (re?.user?.avatar_decoration) re.user.avatar_decoration = re?.user?.avatar_decoration ? 'https://cdn.discordapp.com/avatar-decorations/' + re?.user?.id + '/' + re?.user?.avatar_decoration : null || null
    }
    return re;
}


    if(type === 'simple') {
        let bots = [];
        let users = [];
        for await (const member of re) {
            if(member?.user?.bot) bots.push(member.user.id)
            else users.push(member.user.id)
        }
        let count = {
            users: users.length,
            bots: bots.length,
            total: users.length + bots.length
        }
        return {bots, count, users};
    }
}