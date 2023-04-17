module.exports = {
    log: true,
    headers: ['guild-id', 'bot-token'], //only put REQUIRED headers.
    access: 'PUBLIC',
    endpoint: async (req, res, Discord, fetch, config, t, resolvers) => {
        let eid = req.headers['emoji'] || null
        let re = await fetch(((!eid || eid === 'null') ? `https://discord.com/api/v10/guilds/${req.headers['guild-id']}/emojis` : `https://discord.com/api/v10/guilds/${req.headers['guild-id']}/emojis/${eid}`), {
            method: 'GET',
            headers: {
                Authorization: `Bot ${req.headers['bot-token']}`
            }
        }).then(res => res.json())
        let result = await resolvers.guild_emojis(re);
        res.send({ status: 200, details: result, api: Object.assign(config.info, { ping: `${(Date.now() - t)}ms` }) })
    }
}