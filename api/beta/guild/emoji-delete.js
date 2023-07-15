module.exports = {
    log: true,
    rule:false,
    headers: ['guild-id', 'bot-token'], //only put REQUIRED headers.
    body: ['emoji'], // only put REQUIRED params
    access: 'PUBLIC',
    endpoint: async (utils) => {
        let eid = utils.req.body['emoji'] || null
        let reason = utils.req.body['reason'] || null
        let res2;
        let re = await utils.fetch(`https://discord.com/api/v10/guilds/${utils.req.headers['guild-id']}/emojis/${eid}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bot ${utils.req.headers['bot-token']}`,
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
    utils.res.send({ status: 200, details: re, api: Object.assign(utils.config.info, { ping: `${(Date.now() - utils.time)}ms` }) })
    }
}