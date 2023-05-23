module.exports = {
    log: true,
    headers: ['guild-id', 'bot-token'], //only put REQUIRED headers.
    access: 'PUBLIC', 
    endpoint: async (utils) => {
        let mid = utils.req.headers['member'] || null
        let re = await utils.fetch(((!mid || mid === 'null') ? `https://discord.com/api/v10/guilds/${utils.req.headers['guild-id']}/bans` : `https://discord.com/api/v10/guilds/${utils.req.headers['guild-id']}/bans/${mid}`), {
            method: 'GET',
            headers: {
                Authorization: `Bot ${utils.req.headers['bot-token']}`
            }
        }).then(res => res.json())
        let result = await utils.resolvers.guild_bans(re);
        utils.res.send({ status: 200, details: result, api: Object.assign(utils.config.info, { ping: `${(Date.now() - utils.time)}ms` }) })
    }
}