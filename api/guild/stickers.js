module.exports = async (req, res, Discord, fetch, config, t) => {
        let gid = req.headers['guild-id']
        let sid = req.headers['sticker'] || null
        if (!gid) return res.send({ status: 400, error: `${config.errors.headers.guildId}`, api: Object.assign(config.info, {ping : `${(Date.now() - t)}ms`}) })
        let re = await fetch(`https://discord.com/api/v10/guilds/${gid}/stickers`, {
            method: 'GET',
            headers: {
                Authorization: `Bot ${req.headers['bot-token']}`
            }
        }).then(res => res.json())

        re?.forEach(r => {
            if (re[re.indexOf(r)]?.user?.public_flags || re[re.indexOf(r)]?.user?.public_flags === 0) re[re.indexOf(r)].user.public_flags = new Discord.UserFlagsBitField(re[re.indexOf(r)].user.public_flags)?.toArray()
            if (re[re.indexOf(r)]?.user?.banner) re[re.indexOf(r)].user.banner = re[re.indexOf(r)].user.banner ? 'https://cdn.discordapp.com/banners/' + re[re.indexOf(r)].user.id + '/' + re[re.indexOf(r)].user.banner + (re[re.indexOf(r)].user.banner.startsWith(`a_`) ? '.gif' : '.jpg') : null || null
            if (re[re.indexOf(r)]?.user?.avatar) re[re.indexOf(r)].user.avatar = re[re.indexOf(r)].user.avatar ? 'https://cdn.discordapp.com/avatars/' + re[re.indexOf(r)].user.id + '/' + re[re.indexOf(r)].user.avatar + (re[re.indexOf(r)].user.avatar.startsWith(`a_`) ? '.gif' : '.jpg') : null || null
            if (re[re.indexOf(r)]?.user?.avatar_decoration) re[re.indexOf(r)].user.avatar_decoration = re[re.indexOf(r)].user.avatar_decoration ? 'https://cdn.discordapp.com/avatar-decorations/' + re[re.indexOf(r)].user.id + '/' + re[re.indexOf(r)].user.avatar_decoration : null || null


            if (re[re.indexOf(r)]?.type) re[re.indexOf(r)].type = ((re[re.indexOf(r)].type === 1) ? 'Standard' : 'Guild') || null;
            if (re[re.indexOf(r)]?.format_type) re[re.indexOf(r)].format_type = ((re[re.indexOf(r)].format_type === 1) ? 'png' : (re[re.indexOf(r)].format_type === 2) ? 'apng' : (re[re.indexOf(r)].format_type === 3) ? 'lottie' : 'gif') || null;
            if (re[re.indexOf(r)]) re[re.indexOf(r)].url = 'https://cdn.discordapp.com/stickers/' + re[re.indexOf(r)].id + '.' + (re[re.indexOf(r)].format_type) || null;
            delete re[re.indexOf(r)].asset
        })

        if (!sid || sid === 'null') {
            res.send({ status: 200, details: re, api: Object.assign(config.info, {ping : `${(Date.now() - t)}ms`}) })
        }
        else {
            res.send({ status: 200, details: re?.filter(s => (sid ? (sid === s.id || sid.replaceAll(':', '') === s.name) : s)), api: Object.assign(config.info, {ping : `${(Date.now() - t)}ms`}) })
        }
}