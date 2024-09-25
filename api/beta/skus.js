module.exports = {
    log: false,
    rule: true,
    headers: ['bot-token', 'app-id'], //only put REQUIRED headers.
    access: 'ALPHA',
    endpoint: async (utils) => {
        let re = await utils.fetch(`https://discord.com/api/v10/applications/${utils.req.headers['app-id']}/skus`, {
            method: 'GET',
            headers: {
                Authorization: `Bot ${utils.req.headers['bot-token']}`
            }
        }).then(res => res.json())
        let result = await utils.resolver(re)

        utils.res.send({ status: 200, details: re, api: Object.assign(utils.config.info, { ping: `${(Date.now() - utils.time)}ms` }) })
    }
}