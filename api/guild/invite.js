module.exports = {
    log: true,
    headers: ['guild-id', 'bot-token'], //only put REQUIRED headers.
    access: 'PUBLIC',
    endpoint: async (utils) => {
        let iid = utils.req.headers['invite'] || null
        let re = await utils.fetch(((!iid || iid === 'null') ? `https://discord.com/api/v10/guilds/${utils.req.headers['guild-id']}/invites` : `https://discord.com/api/v10/invites/${iid}`), {
            method: 'GET',
            headers: {
                Authorization: `Bot ${utils.req.headers['bot-token']}`
            }
        }).then(res => res.json())
        let result = await utils.resolvers.guild_invite(re);
        utils.res.send({ status: 200, details: result, api: Object.assign(utils.config.info, { ping: `${(Date.now() - utils.time)}ms` }) })
    }
}