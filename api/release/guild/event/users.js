module.exports = {
    log: true,
    rule: true,
    headers: ['guild-id', 'bot-token'], //only put REQUIRED headers.
    body: ['event'], //only put REQUIRED params.
    access: 'PUBLIC',
    endpoint: async (utils) => {
        let b = utils.req.body;
        let re = await utils.fetch(`https://discord.com/api/v10/guilds/${utils.req.headers['guild-id']}/scheduled-events/${b.event}/users?limit=${b?.limit||100}&with_member=${b?.with_member||false}&before=${b?.before||'0'}&after=${b?.after||'0'}`, {
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