module.exports = {
    log: true,
    rule: true,
    headers: ['guild-id', 'bot-token'], //only put REQUIRED headers.
    access: 'PUBLIC',
    endpoint: async (utils) => {
        let sid = utils.req.headers['sticker'] || null
        let re = await utils.fetch(`https://discord.com/api/v10/guilds/${utils.req.headers['guild-id']}/stickers`, {
            method: 'GET',
            headers: {
                Authorization: `Bot ${utils.req.headers['bot-token']}`
            }
        }).then(res => res.json())
        let result = await utils.resolver((!sid || sid === 'null' || sid === null) ? re : re?.filter(s => (sid ? (sid === s.id || sid === s.name) : s)));
        utils.res.send({ status: 200, details: result, api: Object.assign(utils.config.infold, { ping: `${(Date.now() - utils.time)}ms` }) })
    }
}