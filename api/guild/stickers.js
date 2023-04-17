module.exports = {
    log: true,
    headers: ['guild-id', 'bot-token'], //only put REQUIRED headers.
    access: 'PUBLIC',
    endpoint: async (req, res, Discord, fetch, config, t, resolvers) => {
        let sid = req.headers['sticker'] || null
        let re = await fetch(`https://discord.com/api/v10/guilds/${req.headers['guild-id']}/stickers`, {
            method: 'GET',
            headers: {
                Authorization: `Bot ${req.headers['bot-token']}`
            }
        }).then(res => res.json())
        let result = await resolvers.guild_stickers((!sid || sid === 'null' || sid === null) ? re : re?.filter(s => (sid ? (sid === s.id || sid === s.name) : s)));
        res.send({ status: 200, details: result, api: Object.assign(config.info, { ping: `${(Date.now() - t)}ms` }) })
    }
}