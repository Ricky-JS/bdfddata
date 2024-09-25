module.exports = {
    log: false,
    rule: true,
    headers: ['chan-id', 'bot-token'], //only put REQUIRED headers.
    access: 'PUBLIC',
    endpoint: async (utils) => {
        let mid = utils.req.headers['msg-id'] || null
        let re;

        if(!mid || mid === 'null') {
            let limit = utils.req.headers['limit'] || 50
            if(limit>100) return utils.res.send({ status: 400, details: 'Message limit cannt exceed 100', api: Object.assign(utils.config.info, { ping: `${(Date.now() - utils.time)}ms` }) })
            if(limit<1) return utils.res.send({ status: 400, details: 'Message limit cannt subceed 1', api: Object.assign(utils.config.info, { ping: `${(Date.now() - utils.time)}ms` }) })
    
        re = await utils.fetch(`https://discord.com/api/v10/channels/${utils.req.headers['chan-id']}/messages?limit=${limit}`, {
            method: 'GET',
            headers: {
                Authorization: `Bot ${utils.req.headers['bot-token']}`
            }
        }).then(res => res.json())
} else {
    re = await utils.fetch(`https://discord.com/api/v10/channels/${utils.req.headers['chan-id']}/messages/${utils.req.headers['msg-id']}`, {
        method: 'GET',
        headers: {
            Authorization: `Bot ${utils.req.headers['bot-token']}`,
        }
    }).then(res => res.json())
}

if (utils.req.headers['exclude'] || null) {
    if (Array.isArray(re)) {
    re.forEach(item => utils.handleCustomExclusions(item, utils.req.headers['exclude'] || null));
} else {
    utils.handleCustomExclusions(re, utils.req.headers['exclude'] || null);
}
}

        utils.res.send({ status: 200, details: await utils.resolver(re), api: Object.assign(utils.config.info, { ping: `${(Date.now() - utils.time)}ms` }) })   
    }
}