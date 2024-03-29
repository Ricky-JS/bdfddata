module.exports = {
    log: true,
    rule: true,
    headers: ['user-id'],
    access: 'PUBLIC',
    endpoint: async (utils) => {
        let re = await utils.fetch(`https://discord.com/api/v10/users/${utils.req.headers['user-id']}`, {
            method: 'GET',
            headers: {
                Authorization: `Bot ${utils.config.token}`
            }
        }).then(res => res.json())
        let result = await utils.resolver(re)
        utils.res.send({ status: 200, details: result, api: Object.assign(utils.config.infold, { ping: `${(Date.now() - utils.time)}ms` }) })
    }
}