module.exports = {
    log: true,
    headers: ['guild-id', 'bot-token'], //only put REQUIRED headers.
    access: 'PUBLIC', 
    endpoint: async (req, res, Discord, fetch, config, t, resolvers) => {
        let mid = req.headers['member'] || null
        let re = await fetch(((!mid || mid === 'null') ? `https://discord.com/api/v10/guilds/${req.headers['guild-id']}/bans` : `https://discord.com/api/v10/guilds/${req.headers['guild-id']}/bans/${mid}`), {
            method: 'GET',
            headers: {
                Authorization: `Bot ${req.headers['bot-token']}`
            }
        }).then(res => res.json())
        let result = await resolvers.guild_bans(re);
        res.send({ status: 200, details: result, api: Object.assign(config.info, { ping: `${(Date.now() - t)}ms` }) })
    }
}