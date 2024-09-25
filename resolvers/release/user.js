const Discord = require('discord.js')
module.exports = async (re) => {
    let flags = new Discord.UserFlagsBitField(re?.public_flags)?.toArray() ?? []
    let flags2 = new Discord.UserFlagsBitField(re?.flags)?.toArray() ?? []
    if (re?.banner || re?.avatar?.startsWith(`a_`) || re?.avatar_decoration) flags.push('NitroSubscriber')
    if (re?.banner || re?.avatar?.startsWith(`a_`) || re?.avatar_decoration) flags2.push('NitroSubscriber')
    if (re?.public_flags || re?.public_flags === 0) re.public_flags = flags || null
    if (re?.flags || re?.flags === 0) re.flags = flags2 || null
    if (re?.banner) re.banner = re?.banner ? 'https://cdn.discordapp.com/banners/' + re?.id + '/' + re?.banner + (re?.banner?.startsWith(`a_`) ? '.gif' : '.png') : null || null
    if (re?.avatar) re.avatar = re?.avatar ? 'https://cdn.discordapp.com/avatars/' + re?.id + '/' + re?.avatar + (re?.avatar?.startsWith(`a_`) ? '.gif' : '.png') : null || null
    if (re?.avatar_decoration) re.avatar_decoration = re?.avatar_decoration ? 'https://cdn.discordapp.com/avatar-decorations/' + re?.id + '/' + re.avatar_decoration : null || null
    if (re?.banner_color) re.banner_color = re?.banner_color?.replace('#', '') || null
    return re;
}