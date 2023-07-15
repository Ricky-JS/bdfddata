module.exports = {
    log: true,
    rule: true,
    headers: ['guild-id', 'bot-token'], //only put REQUIRED headers.
    body: ['name', 'privacy_level', 'scheduled_start_time', 'entity_type'], //only put REQUIRED params.
    access: 'PUBLIC',
    endpoint: async (utils) => {
        let re = await utils.fetch(`https://discord.com/api/v10/guilds/${utils.req.headers['guild-id']}/scheduled-events`, {
            method: 'POST',
            headers: {
                Authorization: `Bot ${utils.req.headers['bot-token']}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(utils.req.body)
        }).then(res => res.json())
        let result = await utils.resolver(re);
        utils.res.send({ status: 200, details: result, api: Object.assign(utils.config.infold, { ping: `${(Date.now() - utils.time)}ms` }) })
    }
}