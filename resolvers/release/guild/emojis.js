const Discord = require('discord.js')
module.exports = async (re, type = 'default') => {
    if(type === 'default') {
    if (Array.isArray(re)) {
        re?.forEach(r => {
            if (re[re.indexOf(r)]?.user?.public_flags || re[re.indexOf(r)]?.user?.public_flags === 0) re[re.indexOf(r)].user.public_flags = new Discord.UserFlagsBitField(re[re.indexOf(r)].user.public_flags)?.toArray()
            if (re[re.indexOf(r)]?.user?.banner) re[re.indexOf(r)].user.banner = re[re.indexOf(r)].user.banner ? 'https://cdn.discordapp.com/banners/' + re[re.indexOf(r)].user.id + '/' + re[re.indexOf(r)].user.banner + (re[re.indexOf(r)].user.banner.startsWith(`a_`) ? '.gif' : '.png') : null || null
            if (re[re.indexOf(r)]?.user?.avatar) re[re.indexOf(r)].user.avatar = re[re.indexOf(r)].user.avatar ? 'https://cdn.discordapp.com/avatars/' + re[re.indexOf(r)].user.id + '/' + re[re.indexOf(r)].user.avatar + (re[re.indexOf(r)].user.avatar.startsWith(`a_`) ? '.gif' : '.png') : null || null
            if (re[re.indexOf(r)]?.user?.avatar_decoration) re[re.indexOf(r)].user.avatar_decoration = re[re.indexOf(r)].user.avatar_decoration ? 'https://cdn.discordapp.com/avatar-decorations/' + re[re.indexOf(r)].user.id + '/' + re[re.indexOf(r)].user.avatar_decoration : null || null
            if (re[re.indexOf(r)]?.id) re[re.indexOf(r)].url = `https://cdn.discordapp.com/emojis/${re[re.indexOf(r)].id}.${re[re.indexOf(r)].animated ? 'gif' : 'png'}?size=96&quality=lossless`
            if (re[re.indexOf(r)]?.id) re[re.indexOf(r)].identifier = `<${re[re.indexOf(r)].animated ? "a" : ""}:${re[re.indexOf(r)].name}:${re[re.indexOf(r)].id}>`
        })
    } else {
        if (re?.user?.public_flags || re?.user?.public_flags === 0) re.user.public_flags = new Discord.UserFlagsBitField(re.user.public_flags)?.toArray()
        if (re?.user?.banner) re.user.banner = re.user.banner ? 'https://cdn.discordapp.com/banners/' + re.user.id + '/' + re.user.banner + (re.user.banner.startsWith(`a_`) ? '.gif' : '.png') : null || null
        if (re?.user?.avatar) re.user.avatar = re.user.avatar ? 'https://cdn.discordapp.com/avatars/' + re.user.id + '/' + re.user.avatar + (re.user.avatar.startsWith(`a_`) ? '.gif' : '.png') : null || null
        if (re?.user?.avatar_decoration) re.user.avatar_decoration = re.user.avatar_decoration ? 'https://cdn.discordapp.com/avatar-decorations/' + re.user.id + '/' + re.user.avatar_decoration : null || null
        if (re?.id) re.url = `https://cdn.discordapp.com/emojis/${re.id}.${re.animated ? 'gif' : 'png'}?size=512&quality=lossless`
        if (re?.id) re.identifier = `<${re.animated ? "a" : ""}:${re.name}:${re.id}>`
    }
    return re;
}



    if(type === 'simple') {
        let emojis = {};
        for (const emoji of re) {
            Object.assign(emojis, JSON.parse(`{"<${emoji.animated ? "a" : ""}:${emoji.name}:${emoji.id}>": {"name":"${emoji.name}", "id":"${emoji.id}", "animated":${emoji.animated}, "url": "https://cdn.discordapp.com/emojis/${emoji.id}.${emoji.animated ? 'gif' : 'png'}?size=96&quality=lossless"}}`))
        }
        
        let count = Object.keys(emojis).length;
    
        return {emojis, count};
    }
}