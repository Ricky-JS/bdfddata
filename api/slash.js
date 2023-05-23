module.exports = {
    log: true,
    headers: ['app-id', 'bot-token'], //only put REQUIRED headers.
    access: 'PUBLIC',
    endpoint: async (utils) => {
        let slid = utils.req.headers['slash'] || null
        let re = await utils.fetch(((!slid || slid === 'null' || slid === null) ? `https://discord.com/api/v10/applications/${utils.req.headers['app-id']}/commands` : `https://discord.com/api/v10/applications/${utils.req.headers['app-id']}/commands/${slid}`), {
            method: 'GET',
            headers: {
                Authorization: `Bot ${utils.req.headers['bot-token']}`
            }
        }).then(res => res.json())
        let result = await utils.resolvers.slash(re);
        utils.res.send({ status: 200, details: result, api: Object.assign(utils.config.info, { ping: `${(Date.now() - utils.time)}ms` }) })
    }
}