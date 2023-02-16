module.exports = async (req, res, Discord, fetch, config, t) => {
        let gid = req.headers['guild-id'] || null
        let aid = req.headers['app-id']
        let slid = req.headers['slash'] || null

        if (!gid) return res.send({ status: 400, error: `${config.header_errors.guildId}`, api: Object.assign(config.info, {ping : `${(Date.now() - t)}ms`}) })
        if (!aid) return res.send({ status: 400, error: `${config.header_errors.appId}`, api: Object.assign(config.info, {ping : `${(Date.now() - t)}ms`}) })

        let re = await fetch(`https://discord.com/api/v10/applications/${aid}/guilds/${gid}/commands`, {
            method: 'GET',
            headers: {
                Authorization: `Bot ${req.headers['bot-token']}`
            }
        }).then(res => res.json())


        re?.forEach(r => {
            r.type = (r.type === 1) ? 'CHAT_INPUT' : (r.type === 2) ? 'USER' : 'MESSAGE'
            if (re[re.indexOf(r)]?.options) re[re.indexOf(r)]?.options.forEach(ree => {
                ree.type = (ree.type === 1) ? 'SUB_COMMAND' : (ree.type === 2) ? 'SUB_COMMAND_GROUP' : (ree.type === 3) ? 'STRING' : (ree.type === 4) ? 'INTEGER' : (ree.type === 5) ? 'BOOLEAN' : (ree.type === 6) ? 'USER' : (ree.type === 7) ? 'CHANNEL' : (ree.type === 8) ? 'ROLE' : (ree.type === 9) ? 'MENTIONABLE' : (ree.type === 10) ? 'NUMBER' : 'ATTACHMENT'
            })
        })

        if ((!slid || slid === 'null' || slid === null)) {
            res.send({ status: 200, details: re, api: Object.assign(config.info, {ping : `${(Date.now() - t)}ms`}) })
        }
        else {
            res.send({ status: 200, details: re?.filter(s => (slid ? (slid === s.id || slid === s.name) : s)), api: Object.assign(config.info, {ping : `${(Date.now() - t)}ms`}) })
        }

}