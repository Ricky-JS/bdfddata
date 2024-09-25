module.exports = {
    log: false,
    rule: false,
    headers: ['guild-id', 'bot-token'], //only put REQUIRED headers.
    access: 'ADMIN', 
    endpoint: async (utils) => {
        let re = await utils.fetch(`https://discord.com/api/v10/guilds/${utils.req.headers['guild-id']}/audit-logs`, {
            method: 'GET',
            headers: {
                Authorization: `Bot ${utils.req.headers['bot-token']}`
            }
        }).then(res => res.json())
        if (utils.req.headers['exclude'] || null) {
            if (Array.isArray(re)) {
            re.forEach(item => utils.handleCustomExclusions(item, utils.req.headers['exclude'] || null));
        } else {
            utils.handleCustomExclusions(re, utils.req.headers['exclude'] || null);
        }
    }
        utils.res.send({ status: 200, details: re, api: Object.assign(utils.config.info, { ping: `${(Date.now() - utils.time)}ms` }) })
    }
}