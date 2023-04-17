module.exports = {
    log: true,
    headers: ['guild-id', 'bot-token'], //only put REQUIRED headers.
    access: 'PUBLIC',
    endpoint: async (req, res, Discord, fetch, config, t, resolvers) => {
        let eid = req.headers['event'] || null
        let re = await fetch(((!eid || eid === 'null') ? `https://discord.com/api/v10/guilds/${req.headers['guild-id']}/scheduled-events?with_user_count=true` : `https://discord.com/api/v10/guilds/${req.headers['guild-id']}/scheduled-events/${eid}?with_user_count=true`), {
            method: 'GET',
            headers: {
                Authorization: `Bot ${req.headers['bot-token']}`
            }
        }).then(res => res.json())
        let result = await resolvers.guild_events(re);
        res.send({ status: 200, details: result, api: Object.assign(config.info, { ping: `${(Date.now() - t)}ms` }) })
    }
}