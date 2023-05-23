module.exports = {
    log: true,
    headers: ['guild-id', 'bot-token'], //only put REQUIRED headers.
    body: ['event'], //only put REQUIRED params.
    access: 'PUBLIC',
    endpoint: async (utils) => {
        let re = await utils.fetch(`https://discord.com/api/v10/guilds/${utils.req.headers['guild-id']}/scheduled-events/${utils.req.body['event']}`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bot ${utils.req.headers['bot-token']}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(utils.req.body)
        }).then(res => res.json())
        let result = await utils.resolvers.guild_events(re);
        utils.res.send({ status: 200, details: result, api: Object.assign(utils.config.info, { ping: `${(Date.now() - utils.time)}ms` }) })
    }
}