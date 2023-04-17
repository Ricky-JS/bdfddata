module.exports = {
    log: true,
    headers: ['bot-token'], //only put REQUIRED headers.
    access: 'PUBLIC',
    endpoint: async (req, res, Discord, fetch, config, t, resolver) => {
        let gid = req.headers['guild-id']
        let re = await fetch(`${(gid && gid !== 'null' && gid !== null) ? `https://discord.com/api/v10/guilds/${gid}?with_counts=true` : `https://discord.com/api/v10/users/@me/guilds`}`, {
            method: 'GET',
            headers: {
                Authorization: `Bot ${req.headers['bot-token']}`,
            }
        }).then(res => res.json())

        let result = await resolver.guild(re);
        res.send({ status: 200, details: result, api: Object.assign(config.info, { ping: `${(Date.now() - t)}ms` }) })
    }
}