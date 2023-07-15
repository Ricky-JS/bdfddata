const Discord = require('discord.js')
module.exports = async (re) => {
    if(Array.isArray(re)) {
        re?.forEach(r => {
            if (r?.expires_at) r.expires_at = Math.floor(new Date(r.expires_at).getTime() / 1000)
            if (r?.created_at) r.created_at = Math.floor(new Date(r.created_at).getTime() / 1000)
            if (r?.guild?.icon) r.guild.icon = r.guild.icon ? 'https://cdn.discordapp.com/icons/' + r.guild.id + '/' + r.guild.icon + (r.guild?.icon?.startsWith(`a_`) ? '.gif' : '.jpg') : null || null;
            if (r?.guild?.banner) r.guild.banner = r.guild?.banner ? 'https://cdn.discordapp.com/banners/' + r.guild.id + '/' + r.guild?.banner + (r.guild?.banner?.startsWith(`a_`) ? '.gif' : '.jpg') : null || null;
            if (r?.guild?.system_channel_flags) r.guild.system_channel_flags = new Discord.SystemChannelFlagsBitField(r.guild?.system_channel_flags).toArray() || null;
            if (r?.guild?.splash) r.guild.splash = r?.guild.splash ? 'https://cdn.discordapp.com/splashes/' + r.guild.id + '/' + r.guild?.splash + (r.guild?.splash?.startsWith(`a_`) ? '.gif' : '.jpg') : null || null;
            if (r?.guild?.discovery_splash) r.guild.discovery_splash = r?.discovery_splash ? 'https://cdn.discordapp.com/discovery_splashes/' + r.guild.id + '/' + r.guild?.discovery_splash + (r.guild?.discovery_splash?.startsWith(`a_`) ? '.gif' : '.jpg') : null || null;
            let flags = new Discord.UserFlagsBitField(r?.public_flags)?.toArray() ?? []
            if (r?.inviter?.avatar?.startsWith(`a_`) || r?.inviter?.avatar_decoration) flags.push('NitroSubscriber')
            if (r?.inviter?.public_flags || r?.inviter?.public_flags === 0) r.inviter.public_flags = flags || null
            if (r?.inviter?.avatar) r.inviter.avatar = r?.inviter?.avatar ? 'https://cdn.discordapp.com/avatars/' + r?.inviter?.id + '/' + r?.inviter?.avatar + (r?.inviter?.avatar?.startsWith(`a_`) ? '.gif' : '.jpg') : null || null
            if (r?.inviter?.avatar_decoration) r.inviter.avatar_decoration = r?.inviter?.avatar_decoration ? 'https://cdn.discordapp.com/avatar-decorations/' + r?.inviter?.id + '/' + r.inviter?.avatar_decoration : null || null
        })
    } else {
        if (re?.expires_at) re.expires_at = Math.floor(new Date(re.expires_at).getTime() / 1000)
        if (re?.created_at) re.created_at = Math.floor(new Date(re.created_at).getTime() / 1000)
        if (re?.guild?.icon) re.guild.icon = re.guild?.icon ? 'https://cdn.discordapp.com/icons/' + re.guild.id + '/' + re?.guild.icon + (re.guild?.icon?.startsWith(`a_`) ? '.gif' : '.jpg') : null || null;
        if (re?.guild?.banner) re.guild.banner = re.guild?.banner ? 'https://cdn.discordapp.com/banners/' + re.guild.id + '/' + re.guild?.banner + (re.guild?.banner?.startsWith(`a_`) ? '.gif' : '.jpg') : null || null;
        if (re?.guild?.system_channel_flags) re.guild.system_channel_flags = new Discord.SystemChannelFlagsBitField(re.guild?.system_channel_flags).toArray() || null;
        if (re?.guild?.splash) re.guild.splash = re?.guild.splash ? 'https://cdn.discordapp.com/splashes/' + re.guild.id + '/' + re.guild?.splash + (re.guild?.splash?.startsWith(`a_`) ? '.gif' : '.jpg') : null || null;
        if (re?.guild?.discovery_splash) re.guild.discovery_splash = re?.discovery_splash ? 'https://cdn.discordapp.com/discovery_splashes/' + re.guild.id + '/' + re.guild?.discovery_splash + (re.guild?.discovery_splash?.startsWith(`a_`) ? '.gif' : '.jpg') : null || null;
        let flags = new Discord.UserFlagsBitField(re?.public_flags)?.toArray() ?? []
        if (re?.inviter?.avatar?.startsWith(`a_`) || re?.inviter?.avatar_decoration) flags.push('NitroSubscriber')
        if (re?.inviter?.public_flags || re?.inviter?.public_flags === 0) re.inviter.public_flags = flags || null
        if (re?.inviter?.avatar) re.inviter.avatar = re?.inviter?.avatar ? 'https://cdn.discordapp.com/avatars/' + re?.inviter?.id + '/' + re?.inviter?.avatar + (re?.inviter?.avatar?.startsWith(`a_`) ? '.gif' : '.jpg') : null || null
        if (re?.inviter?.avatar_decoration) re.inviter.avatar_decoration = re?.inviter?.avatar_decoration ? 'https://cdn.discordapp.com/avatar-decorations/' + re?.inviter?.id + '/' + re.inviter?.avatar_decoration : null || null
    }
    return re;
}