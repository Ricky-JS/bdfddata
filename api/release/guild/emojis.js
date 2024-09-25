module.exports = {
    log: true,
    rule: true,
    headers: ['guild-id', 'bot-token'], //only put REQUIRED headers.
    access: 'PUBLIC',
    endpoint: async (utils) => {
        let u = new URLSearchParams(utils.req.url);
        let simple = u.get(utils.req.url.split('=')[0])
        let eid = utils.req.headers['emoji'] || null
        let result;
        let re = await utils.fetch(((!eid || eid === 'null') ? `https://discord.com/api/v10/guilds/${utils.req.headers['guild-id']}/emojis` : `https://discord.com/api/v10/guilds/${utils.req.headers['guild-id']}/emojis/${eid}`), {
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

        if(simple && simple === 'true') {
            if(!Array.isArray(re)) return utils.res.send({ status: 400, details: 'Parameter `simple` can only be used on emoji list.', api: Object.assign(utils.config.info, { ping: `${(Date.now() - utils.time)}ms` }) })
            result = await utils.resolver(re, 'simple');
        } else result = await utils.resolver(re, 'default');
        utils.res.send({ status: 200, details: result, api: Object.assign(utils.config.info, { ping: `${(Date.now() - utils.time)}ms` }) })
    }
}