module.exports = {
    log: true,
    headers: ['guild-id', 'bot-token'], //only put REQUIRED headers.
    access: 'PUBLIC', //beta
    endpoint: async (req, res, Discord, fetch, config, t, resolvers) => {
        let params = req.body;
        let re = await fetch(`https://discord.com/api/v10/guilds/${req.headers['guild-id']}/prune`, {
            method: 'POST',
            headers: {
                Authorization: `Bot ${req.headers['bot-token']}`,
                'X-Audit-Log-Reason': params?.reason ? params.reason : 'No Reason Provided'
            },
            body: JSON.stringify({
                days: params?.days || 7,
                computed_prune_count: params?.count || true,
                include_roles: params?.roles || []
            })
        }).then(res => res.json())
//        this endpoint does not have anything to be resolved.
        res.send({ status: 200, details: re, api: Object.assign(config.info, { ping: `${(Date.now() - t)}ms` }) })
    }
}