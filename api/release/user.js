module.exports = {
    log: true,
    rule: true,
    headers: ['user-id'],
    access: 'PUBLIC',
    endpoint: async (utils) => {
        let re = await utils.fetch(`https://discord.com/api/v10/users/${utils.req.headers['user-id']}`, {
            method: 'GET',
            headers: {
                Authorization: `Bot ${utils.config.token}`
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