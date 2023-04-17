module.exports = {
    log:true,
    headers: ['guild-id', 'app-id', 'bot-token'], //only put REQUIRED headers.
    access: 'PUBLIC',
    endpoint: async (req, res, Discord, fetch, config, t, resolvers) => {
        let slid = req.headers['slash'] || null
        let re = await fetch(((!slid || slid === 'null' || slid === null) ? `https://discord.com/api/v10/applications/${req.headers['app-id']}/guilds/${req.headers['guild-id']}/commands` : `https://discord.com/api/v10/applications/${req.headers['app-id']}/guilds/${req.headers['guild-id']}/commands/${slid}`), {
                method: 'GET',
                headers: {
                    Authorization: `Bot ${req.headers['bot-token']}`
                }
            }).then(res => res.json())
        
        let result = await resolvers.guild_slash(re);
        res.send({ status: 200, details: result, api: Object.assign(config.info, {ping : `${(Date.now() - t)}ms`}) })
}
}