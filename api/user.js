module.exports = {
    log: true,
    headers: ['user-id'],
    access: 'PUBLIC',
    endpoint: async (req, res, Discord, fetch, config, t, resolvers) => {
        let re = await fetch(`https://discord.com/api/v10/users/${req.headers['user-id']}`, {
            method: 'GET',
            headers: {
                Authorization: `Bot ${config.token}`
            }
        }).then(res => res.json())
        let result = resolvers.user(re)
        res.send({ status: 200, details: result, api: Object.assign(config.info, { ping: `${(Date.now() - t)}ms` }) })
    }
}