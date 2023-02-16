module.exports = async (req, res, Discord, fetch, config, t) => {
        let gid = req.headers['guild-id'] || null
        let rid = req.headers['role'] || null

        if (!gid) return res.send({ status: 400, error: `${config.errors.headers.guildId}`, api: Object.assign(config.info, {ping : `${(Date.now() - t)}ms`}) })

        let re = await fetch(`https://discord.com/api/v10/guilds/${gid}/roles`, {
            method: 'GET',
            headers: {
                Authorization: `Bot ${req.headers['bot-token']}`
            }
        }).then(res => res.json())



        re?.forEach(r => {
            if (re[re.indexOf(r)]?.permissions) re[re.indexOf(r)].permissions = new Discord.PermissionsBitField(re[re.indexOf(r)].permissions)?.toArray()
        })

        re?.forEach(r => {
            if (re[re.indexOf(r)]?.icon) re[re.indexOf(r)].icon = re[re.indexOf(r)].icon ? 'https://cdn.discordapp.com/role-icons/' + re[re.indexOf(r)].id + '/' + re[re.indexOf(r)].icon + '.jpg' : null || null
        })

        if ((!rid || rid === 'null' || rid === null)) {
            res.send({ status: 200, details: re, api: Object.assign(config.info, {ping : `${(Date.now() - t)}ms`}) })
        }
        else {
            res.send({ status: 200, details: re?.filter(r => (rid ? (rid === r.id || rid === r.name) : r)), api: Object.assign(config.info, {ping : `${(Date.now() - t)}ms`}) })
        }
}