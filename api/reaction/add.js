module.exports = {
    log: true,
    headers: ['msg-id', 'chan-id', 'bot-token'], //only put REQUIRED headers.
    body: ['emoji'], //only put REQUIRED parameters.
    access: 'PUBLIC',
    endpoint: async (req, res, Discord, fetch, config, t, resolvers) => {
        let res2;
        let re = await fetch(`https://discord.com/api/v10/channels/${req.headers['chan-id']}/messages/${req.headers['msg-id']}/reactions/${req.body['emoji']}/@me`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bot ${req.headers['bot-token']}`,
                }
            }).then(async res => {
                res2 = await res.clone(); 
                try {
                return await res?.json()
                } catch {
                    return await res2.text
                }
        })

//        let result = resolvers.reactions(re);
        res.send({ status: 200, details: re, api: Object.assign(config.info, { ping: `${(Date.now() - t)}ms` }) })
    }
}