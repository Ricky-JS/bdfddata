module.exports = {
    log: false,
    rule: false,
    headers: ['bot-token'], //only put REQUIRED headers.
    access: 'ADMIN',
    endpoint: async (utils) => {
        let re = await utils.fetch(`https://discord.com/api/v10/applications/@me`, {
            method: 'GET',
            headers: {
                Authorization: `Bot ${utils.req.headers['bot-token']}`
            }
        }).then(res => res.json())
        utils.res.send({ status: 200, details: re, api: Object.assign(utils.config.info, { ping: `${(Date.now() - utils.time)}ms` }) })
    }
}