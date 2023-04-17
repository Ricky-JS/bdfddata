module.exports = {
    log: true,
    headers: ['guild-id', 'bot-token'], //only put REQUIRED headers.
    body: ['reason', 'emoji'], // only put REQUIRED params
    access: 'PUBLIC',
    endpoint: async (req, res, Discord, fetch, config, t, resolvers) => {
        let eid = req.body['emoji'] || null
        let reason = req.body['reason'] || null
        let res2;
        let re = await fetch(`https://discord.com/api/v10/guilds/${req.headers['guild-id']}/emojis/${eid}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bot ${req.headers['bot-token']}`,
                'X-Audit-Log-Reason': reason ? reason : 'No Reason Provided'
            },
        }).then(async res => {
            res2 = await res.clone(); 
            try {
            return await res?.json()
            } catch {
                return await res2.text
            }
    })
//        this endpoint does not have anything to be resolved.
    res.send({ status: 200, details: re, api: Object.assign(config.info, { ping: `${(Date.now() - t)}ms` }) })
    }
}