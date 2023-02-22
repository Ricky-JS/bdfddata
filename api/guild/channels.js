module.exports = async (req, res, Discord, fetch, config, t) => {
        let gid = req.headers['guild-id']
        let cid = req.headers['channel'] || null
        if (!gid) return res.send({ status: 400, error: `${config.errors.headers.guildId}`, api: Object.assign(config.info, {ping : `${(Date.now() - t)}ms`}) })
        let re = await fetch(`https://discord.com/api/v10/guilds/${gid}/channels`, {
            method: 'GET',
            headers: {
                Authorization: `Bot ${req.headers['bot-token']}`
            }
        }).then(res => res.json())

        re?.forEach(r => {
            r.type = Discord.ChannelType[r.type] || null
            r.flags = Discord.ChannelFlags[r.flags] | null



            if (re[re.indexOf(r)]?.permission_overwrites) re[re.indexOf(r)]?.permission_overwrites.forEach(po => {
                re[re.indexOf(r)].permission_overwrites[re[re.indexOf(r)].permission_overwrites.indexOf(po)].type = Discord.OverwriteType[re[re.indexOf(r)].permission_overwrites[re[re.indexOf(r)].permission_overwrites.indexOf(po)].type] || null
                re[re.indexOf(r)].permission_overwrites[re[re.indexOf(r)].permission_overwrites.indexOf(po)].allow = new Discord.PermissionsBitField(re[re.indexOf(r)].permission_overwrites[re[re.indexOf(r)].permission_overwrites.indexOf(po)].allow)?.toArray() || null
                re[re.indexOf(r)].permission_overwrites[re[re.indexOf(r)].permission_overwrites.indexOf(po)].deny = new Discord.PermissionsBitField(re[re.indexOf(r)].permission_overwrites[re[re.indexOf(r)].permission_overwrites.indexOf(po)].deny)?.toArray() || null

            })
        })

        if (!cid || cid === 'null') {
            res.send({ status: 200, details: re, api: Object.assign(config.info, {ping : `${(Date.now() - t)}ms`}) })
        }
        else {
            res.send({ status: 200, details: re?.filter(c => (cid ? (cid === c.id || cid === c.name) : c)), api: Object.assign(config.info, {ping : `${(Date.now() - t)}ms`}) })
        }
}
