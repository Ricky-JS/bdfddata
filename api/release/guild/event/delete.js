module.exports = {
    log: true,
    rule: false,
    headers: ['guild-id', 'bot-token'], //only put REQUIRED headers.
    body: ['event'], //only put REQUIRED params.
    access: 'PUBLIC',
    endpoint: async (utils) => {
        let res2;
        let re = await utils.fetch(`https://discord.com/api/v10/guilds/${utils.req.headers['guild-id']}/scheduled-events/${utils.req.body['event']}?with_user_count=true`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bot ${utils.req.headers['bot-token']}`
            }
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