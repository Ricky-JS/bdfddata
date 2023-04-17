module.exports = {
    log: true,
    headers: ['guild-id', 'bot-token'], //only put REQUIRED headers.
    body: ['event'], //only put REQUIRED params.
    access: 'PUBLIC',
    endpoint: async (req, res, Discord, fetch, config, t, resolvers) => {
        let re = await fetch(`https://discord.com/api/v10/guilds/${req.headers['guild-id']}/scheduled-events/${req.body['event']}`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bot ${req.headers['bot-token']}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(req.body)
        }).then(res => res.json())
        let result = await resolvers.guild_events(re);
res.send({ status: 200, details: result, api: Object.assign(config.info, { ping: `${(Date.now() - t)}ms` }) })
    }
}