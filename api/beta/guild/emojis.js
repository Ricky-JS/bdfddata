module.exports = {
    log: true,
    rule:true,
    headers: ['guild-id', 'bot-token'], //only put REQUIRED headers.
    access: 'PUBLIC',
    endpoint: async (utils) => {
        let eid = utils.req.headers['emoji'] || null
        let re = await utils.fetch(((!eid || eid === 'null') ? `https://discord.com/api/v10/guilds/${utils.req.headers['guild-id']}/emojis` : `https://discord.com/api/v10/guilds/${utils.req.headers['guild-id']}/emojis/${eid}`), {
            method: 'GET',
            headers: {
                Authorization: `Bot ${utils.req.headers['bot-token']}`
            }
        }).then(res => res.json())
        let result = await utils.resolver(re);
        utils.res.send({ status: 200, details: result, api: Object.assign(utils.config.info, { ping: `${(Date.now() - utils.time)}ms` }) })
    }
}