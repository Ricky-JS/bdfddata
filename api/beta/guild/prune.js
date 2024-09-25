module.exports = {
    log: true,
    rule: false,
    headers: ['guild-id', 'bot-token'], //only put REQUIRED headers.
    access: 'PUBLIC', //beta
    endpoint: async (utils) => {
        let params = utils.req.body;
        let re = await utils.fetch(`https://discord.com/api/v10/guilds/${utils.req.headers['guild-id']}/prune`, {
            method: 'POST',
            headers: {
                Authorization: `Bot ${utils.req.headers['bot-token']}`,
                'X-Audit-Log-Reason': params?.reason ? params.reason : 'No Reason Provided'
            },
            body: JSON.stringify({
                days: params?.days || 7,
                computed_prune_count: params?.count || true,
                include_roles: params?.roles || []
            })
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