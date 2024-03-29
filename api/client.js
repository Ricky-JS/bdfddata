module.exports = {
    log: true,
    rule: true,
    headers: ['bot-token'], //only put REQUIRED headers.
    access: 'PUBLIC',
    endpoint: async (utils) => {
        let re = await utils.fetch(`https://discord.com/api/v10/oauth2/applications/@me`, {
            method: 'GET',
            headers: {
                Authorization: `Bot ${utils.req.headers['bot-token']}`
            }
        }).then(res => res.json())
        let result = await utils.resolver(re)
        utils.res.send({ status: 200, details: result, api: Object.assign(utils.config.infold, { ping: `${(Date.now() - utils.time)}ms` }) })
    }
}