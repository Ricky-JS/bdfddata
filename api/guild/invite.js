module.exports = {
    log: true,
    headers: ['guild-id', 'bot-token'], //only put REQUIRED headers.
    access: 'PUBLIC',
    endpoint: async (req, res, Discord, fetch, config, t, resolvers) => {
        let iid = req.headers['invite'] || null
        let re = await fetch(((!iid || iid === 'null') ? `https://discord.com/api/v10/guilds/${req.headers['guild-id']}/invites` : `https://discord.com/api/v10/invites/${iid}`), {
            method: 'GET',
            headers: {
                Authorization: `Bot ${req.headers['bot-token']}`
            }
        }).then(res => res.json())
        let result = await resolvers.guild_invite(re);
        res.send({ status: 200, details: result, api: Object.assign(config.info, { ping: `${(Date.now() - t)}ms` }) })
    }
}