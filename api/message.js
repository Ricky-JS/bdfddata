module.exports = {
    log: true,
    headers: ['msg-id', 'chan-id', 'bot-token'], //only put REQUIRED headers.
    access: 'PUBLIC',
    endpoint: async (req, res, Discord, fetch, config, t, resolvers) => {
        let re = await fetch(`https://discord.com/api/v10/channels/${req.headers['chan-id']}/messages/${req.headers['msg-id']}`, {
            method: 'GET',
            headers: {
                Authorization: `Bot ${req.headers['bot-token']}`,
            }
        }).then(res => res.json())
        let result = resolvers.message(re);
        res.send({ status: 200, details: result, api: Object.assign(config.info, { ping: `${(Date.now() - t)}ms` }) })
    }
}