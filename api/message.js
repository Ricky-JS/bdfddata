module.exports = {
    log: true,
    headers: ['msg-id', 'chan-id', 'bot-token'], //only put REQUIRED headers.
    access: 'PUBLIC',
    endpoint: async (utils) => {
        let re = await utils.fetch(`https://discord.com/api/v10/channels/${utils.req.headers['chan-id']}/messages/${utils.req.headers['msg-id']}`, {
            method: 'GET',
            headers: {
                Authorization: `Bot ${utils.req.headers['bot-token']}`,
            }
        }).then(res => res.json())
        let result = await utils.resolvers.message(re);
        utils.res.send({ status: 200, details: result, api: Object.assign(utils.config.info, { ping: `${(Date.now() - utils.time)}ms` }) })
    }
}