const Discord = require('discord.js')
module.exports = async (re) => {
    if (Array.isArray(re)) {
        re?.forEach(ree => {
            if (ree?.icon) ree.icon = ree?.icon ? 'https://cdn.discordapp.com/icons/' + ree.id + '/' + ree?.icon + (ree?.icon?.startsWith(`a_`) ? '.gif' : '.png') : null || null;
            if (ree?.banner) ree.banner = ree?.banner ? 'https://cdn.discordapp.com/banners/' + ree.id + '/' + ree?.banner + (ree?.banner?.startsWith(`a_`) ? '.gif' : '.png') : null || null;
            if (ree?.system_channel_flags) ree.system_channel_flags = new Discord.SystemChannelFlagsBitField(re?.system_channel_flags).toArray() || null;
            if (ree?.splash) ree.splash = ree?.splash ? 'https://cdn.discordapp.com/splashes/' + ree.id + '/' + ree?.splash + (ree?.splash?.startsWith(`a_`) ? '.gif' : '.png') : null || null;
            if (ree?.discovery_splash) ree.discovery_splash = ree?.discovery_splash ? 'https://cdn.discordapp.com/discovery_splashes/' + ree.id + '/' + ree?.discovery_splash + (ree?.discovery_splash?.startsWith(`a_`) ? '.gif' : '.png') : null || null;



            if (!ree?.vanity_url_code) delete ree.vanity_url_code;
            delete ree.roles;
            delete ree.emojis;
            delete ree.stickers;
        })
    } else {
        if (re?.icon) re.icon = re?.icon ? 'https://cdn.discordapp.com/icons/' + re.id + '/' + re?.icon + (re?.icon?.startsWith(`a_`) ? '.gif' : '.png') : null || null;
        if (re?.banner) re.banner = re?.banner ? 'https://cdn.discordapp.com/banners/' + re.id + '/' + re?.banner + (re?.banner?.startsWith(`a_`) ? '.gif' : '.png') : null || null;
        if (re?.system_channel_flags) re.system_channel_flags = new Discord.SystemChannelFlagsBitField(re?.system_channel_flags).toArray() || null;
        if (re?.splash) re.splash = re?.splash ? 'https://cdn.discordapp.com/splashes/' + re.id + '/' + re?.splash + (re?.splash?.startsWith(`a_`) ? '.gif' : '.png') : null || null;
        if (re?.discovery_splash) re.discovery_splash = re?.discovery_splash ? 'https://cdn.discordapp.com/discovery_splashes/' + re.id + '/' + re?.discovery_splash + (re?.discovery_splash?.startsWith(`a_`) ? '.gif' : '.png') : null || null;



        if (!re?.vanity_url_code) delete re.vanity_url_code;
        delete re.roles;
        delete re.emojis;
        delete re.stickers;
    }
    return re;
}