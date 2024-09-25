module.exports = {
    log: false,
    rule: true,
    headers: ['bot-token', 'app-id'], //only put REQUIRED headers.
    access: 'ALPHA',
    endpoint: async (utils) => {
        let u = new URLSearchParams(utils.req.url);
        let simple = u.get(utils.req.url.split('=')[0])
        let result;
        let re = await utils.fetch(`https://discord.com/api/v10/applications/${utils.req.headers['app-id']}/entitlements`, {
            method: 'GET',
            headers: {
                Authorization: `Bot ${utils.req.headers['bot-token']}`
            }
        }).then(res => res.json())


        if (simple && simple === 'true') {
            if (!Array.isArray(re)) return utils.res.send({ status: 400, details: 'Parameter `simple` can only be used on entitlement list.', api: Object.assign(utils.config.info, { ping: `${(Date.now() - utils.time)}ms` }) })
            result = await utils.resolver(re, 'simple');
        } else result = await utils.resolver(re, 'default');

        utils.res.send({ status: 200, details: result, api: Object.assign(utils.config.info, { ping: `${(Date.now() - utils.time)}ms` }) })
    }
}