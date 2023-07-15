const Discord = require('discord.js')
module.exports = async (re) => {
    if (Array.isArray(re)) {
        re?.forEach(r => {
            let flags = new Discord.UserFlagsBitField(r?.user?.public_flags)?.toArray() ?? []
            if (r?.avatar) re.avatar = r?.avatar ? 'https://cdn.discordapp.com/avatars/' + r?.user?.id + '/' + r?.avatar + (r?.avatar?.startsWith(`a_`) ? '.gif' : '.jpg') : null || null
            if (r?.user?.avatar?.startsWith(`a_`) || r?.user?.avatar_decoration || r?.avatar) flags.push('NitroSubscriber')

            if (r?.user?.public_flags || r?.user?.public_flags === 0) r.user.public_flags = flags || null
            if (r?.user?.avatar) r.user.avatar = r?.user?.avatar ? 'https://cdn.discordapp.com/avatars/' + r?.user?.id + '/' + r?.user?.avatar + (r?.user?.avatar?.startsWith(`a_`) ? '.gif' : '.jpg') : null || null
            if (r?.user?.avatar_decoration) r.user.avatar_decoration = r?.user?.avatar_decoration ? 'https://cdn.discordapp.com/avatar-decorations/' + r?.user?.id + '/' + r?.user?.avatar_decoration : null || null
        })
    } else {
        let flags = new Discord.UserFlagsBitField(re?.user?.public_flags)?.toArray() ?? []
        if (re?.avatar) re.avatar = re?.avatar ? 'https://cdn.discordapp.com/avatars/' + re?.user?.id + '/' + re?.avatar + (re?.avatar?.startsWith(`a_`) ? '.gif' : '.jpg') : null || null
        if (re?.user?.avatar?.startsWith(`a_`) || re?.user?.avatar_decoration || re?.avatar) flags.push('NitroSubscriber')

        if (re?.user?.public_flags || re?.user?.public_flags === 0) re.user.public_flags = flags || null
        if (re?.user?.avatar) re.user.avatar = re?.user?.avatar ? 'https://cdn.discordapp.com/avatars/' + re?.user?.id + '/' + re?.user?.avatar + (re?.user?.avatar?.startsWith(`a_`) ? '.gif' : '.jpg') : null || null
        if (re?.user?.avatar_decoration) re.user.avatar_decoration = re?.user?.avatar_decoration ? 'https://cdn.discordapp.com/avatar-decorations/' + re?.user?.id + '/' + re?.user?.avatar_decoration : null || null
    }
    return re;
}