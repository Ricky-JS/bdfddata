const Discord = require('discord.js')
module.exports = async (re) => {
    if (Array.isArray(re)) {
        re?.forEach(r => {
            if (r?.member?.joined_at) r.member.joined_at = (new Date(r.member.joined_at) / 1000)?.toFixed() || null
            if (r?.member?.premium_since) r.member.premium_since = (new Date(r.member.premium_since) / 1000)?.toFixed() || null
            if (r?.member?.communication_disabled_until) r.member.communication_disabled_until = (new Date(r.member.communication_disabled_until) / 1000)?.toFixed() || null
          
            let flags = new Discord.UserFlagsBitField(r?.user?.public_flags)?.toArray() ?? []
            if (r?.user?.banner || r?.user?.avatar?.startsWith(`a_`) || r?.user?.avatar_decoration) flags.push('NitroSubscriber')
            if (r?.user?.public_flags || r?.user?.public_flags === 0) r.user.public_flags = flags || null
            if (r?.user?.banner) r.user.banner = r?.user?.banner ? 'https://cdn.discordapp.com/banners/' + r?.user?.id + '/' + r?.user?.banner + (r?.user?.banner?.startsWith(`a_`) ? '.gif' : '.png') : null || null
            if (r?.user?.avatar) r.user.avatar = r.user?.avatar ? 'https://cdn.discordapp.com/avatars/' + r?.user?.id + '/' + r?.user?.avatar + (r?.user?.avatar?.startsWith(`a_`) ? '.gif' : '.png') : null || null
            if (r?.user?.avatar_decoration) r.user.avatar_decoration = r?.user?.avatar_decoration ? 'https://cdn.discordapp.com/avatar-decorations/' + r?.user?.id + '/' + r.user?.avatar_decoration : null || null
            if (r?.user?.banner_color) r.user.banner_color = r?.user?.banner_color?.replace('#', '') || null
        })
    } else {}
    return re;
}