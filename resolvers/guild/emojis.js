const Discord = require('discord.js')
module.exports = async (re) => {
    if (Array.isArray(re)) {
        re?.forEach(r => {
            if (re[re.indexOf(r)]?.user?.public_flags || re[re.indexOf(r)]?.user?.public_flags === 0) re[re.indexOf(r)].user.public_flags = new Discord.UserFlagsBitField(re[re.indexOf(r)].user.public_flags)?.toArray()
            if (re[re.indexOf(r)]?.user?.banner) re[re.indexOf(r)].user.banner = re[re.indexOf(r)].user.banner ? 'https://cdn.discordapp.com/banners/' + re[re.indexOf(r)].user.id + '/' + re[re.indexOf(r)].user.banner + (re[re.indexOf(r)].user.banner.startsWith(`a_`) ? '.gif' : '.jpg') : null || null
            if (re[re.indexOf(r)]?.user?.avatar) re[re.indexOf(r)].user.avatar = re[re.indexOf(r)].user.avatar ? 'https://cdn.discordapp.com/avatars/' + re[re.indexOf(r)].user.id + '/' + re[re.indexOf(r)].user.avatar + (re[re.indexOf(r)].user.avatar.startsWith(`a_`) ? '.gif' : '.jpg') : null || null
            if (re[re.indexOf(r)]?.user?.avatar_decoration) re[re.indexOf(r)].user.avatar_decoration = re[re.indexOf(r)].user.avatar_decoration ? 'https://cdn.discordapp.com/avatar-decorations/' + re[re.indexOf(r)].user.id + '/' + re[re.indexOf(r)].user.avatar_decoration : null || null
        })
    } else {
        if (re?.user?.public_flags || re[re.indexOf(r)]?.user?.public_flags === 0) re.user.public_flags = new Discord.UserFlagsBitField(re.user.public_flags)?.toArray()
        if (re?.user?.banner) re.user.banner = re.user.banner ? 'https://cdn.discordapp.com/banners/' + re.user.id + '/' + re.user.banner + (re.user.banner.startsWith(`a_`) ? '.gif' : '.jpg') : null || null
        if (re?.user?.avatar) re.user.avatar = re.user.avatar ? 'https://cdn.discordapp.com/avatars/' + re.user.id + '/' + re.user.avatar + (re.user.avatar.startsWith(`a_`) ? '.gif' : '.jpg') : null || null
        if (re?.user?.avatar_decoration) re.user.avatar_decoration = re.user.avatar_decoration ? 'https://cdn.discordapp.com/avatar-decorations/' + re.user.id + '/' + re.user.avatar_decoration : null || null
    }
    return re;
}