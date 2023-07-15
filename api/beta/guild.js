module.exports = {
    log: true,
    rule: true,
    headers: ['bot-token'], //only put REQUIRED headers.
    access: 'PUBLIC',
    endpoint: async (utils) => {
        let gid = utils.req.headers['guild-id']
        let re = await utils.fetch(`${(gid && gid !== 'null' && gid !== null) ? `https://discord.com/api/v10/guilds/${gid}?with_counts=true` : `https://discord.com/api/v10/users/@me/guilds`}`, {
            method: 'GET',
            headers: {
                Authorization: `Bot ${utils.req.headers['bot-token']}`,
            }
        }).then(res => res.json())

        let result = await utils.resolver(re);
        utils.res.send({ status: 200, details: result, api: Object.assign(utils.config.info, { ping: `${(Date.now() - utils.time)}ms` }) })
    }
}