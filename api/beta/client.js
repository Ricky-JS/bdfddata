module.exports = {
    log: true,
    rule: true,
    headers: ['bot-token'], //only put REQUIRED headers.
    access: 'PUBLIC',
    endpoint: async (utils) => {
        let re = await utils.fetch(`https://discord.com/api/v10/oauth2/applications/@me`, {
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
    
        let result = await utils.resolver(re)
        utils.res.send({ status: 200, details: result, api: Object.assign(utils.config.info, { ping: `${(Date.now() - utils.time)}ms` }) })
    }
}