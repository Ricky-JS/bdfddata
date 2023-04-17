module.exports = {
    log: true,
    headers: ['guild-id', 'bot-token'], //only put REQUIRED headers.
    body: ['event'], //only put REQUIRED params.
    access: 'PUBLIC',
    endpoint: async (req, res, Discord, fetch, config, t, resolvers) => {
        let b = req.body;
        let re = await fetch(`https://discord.com/api/v10/guilds/${req.headers['guild-id']}/scheduled-events/${b.event}/users?limit=${b?.limit||100}&with_member=${b?.with_member||false}&before=${b?.before||'0'}&after=${b?.after||'0'}`, {
            method: 'GET',
            headers: {
                Authorization: `Bot ${req.headers['bot-token']}`
            }
        }).then(res => res.json())
        let result = await resolvers.guild_event_users(re)
        res.send({ status: 200, details: re, api: Object.assign(config.info, { ping: `${(Date.now() - t)}ms` }) })
    }
}