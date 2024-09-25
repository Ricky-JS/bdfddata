const delay = ms => new Promise(res => setTimeout(res, ms));
module.exports = {
    log: true,
    rule: false,
    headers: ['msg-id', 'chan-id', 'bot-token'], //only put REQUIRED headers.
    body: ['emojis'], //only put REQUIRED parameters.
    access: 'PUBLIC',
    endpoint: async (utils) => {
        if(!Array.isArray(utils.req.body['emojis'])) return utils.res.send({status: 400, error: "Body Parameter `emojis` must be sent as Array."});
    let res2;
    let re;
        for await (let emoji of utils.req.body['emojis']) {
            re = await utils.fetch(`https://discord.com/api/v10/channels/${utils.req.headers['chan-id']}/messages/${utils.req.headers['msg-id']}/reactions/${emoji}/@me`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bot ${utils.req.headers['bot-token']}`,
                }
            }).then(async res => {
                res2 = await res.clone(); 
                try {
                return await res?.json()
                } catch {
                    return await res2.text
                }
        })
        await delay(500) // delays execution to accommodate cooldowns
        }
    utils.res.send({ status: 200, details: re, api: Object.assign(utils.config.info, { ping: `${(Date.now() - utils.time)}ms` }) })
    }
}