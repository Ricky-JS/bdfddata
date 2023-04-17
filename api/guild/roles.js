module.exports = {
    log: true,
    headers: ['guild-id', 'bot-token'], //only put REQUIRED headers.
    access: 'PUBLIC',
    endpoint: async (req, res, Discord, fetch, config, t, resolvers) => {
        let rid = req.headers['role'] || null
        let re = await fetch(`https://discord.com/api/v10/guilds/${req.headers['guild-id']}/roles`, {
            method: 'GET',
            headers: {
                Authorization: `Bot ${req.headers['bot-token']}`
            }
        }).then(res => res.json())
        let result = await resolvers.guild_roles((!rid || rid === 'null' || rid === null) ? re : re?.filter(r => (rid ? (rid === r.id || rid === r.name) : r)));
        res.send({ status: 200, details: result, api: Object.assign(config.info, { ping: `${(Date.now() - t)}ms` }) })
    }
}